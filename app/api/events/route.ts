import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { hasValidIngestToken } from "@/lib/auth";
import { activityEventSchema, eventStore, toStoredEvent } from "@/lib/events";

const listQuerySchema = z.object({
  team: z.enum(["west", "east", "support"]),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

/**
 * POST /api/events
 *
 * Ingest endpoint for the REST API and webhook connectors. Accepts a single event or a batch
 * of up to 100. Events with an `id` are idempotent: re-sending the same id is acknowledged but
 * not stored twice, so connectors can retry safely.
 */
export async function POST(request: NextRequest) {
  if (!hasValidIngestToken(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = z
    .union([activityEventSchema, z.array(activityEventSchema).min(1).max(100)])
    .safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_event", issues: parsed.error.issues }, { status: 422 });
  }

  const incoming = Array.isArray(parsed.data) ? parsed.data : [parsed.data];
  const accepted = [];
  let duplicates = 0;

  for (const event of incoming) {
    if (event.id && (await eventStore.has(event.id))) {
      duplicates += 1;
      continue;
    }
    const stored = toStoredEvent(event);
    await eventStore.append(stored);
    accepted.push({ id: stored.id, kind: stored.kind, notify: stored.notify });
  }

  return NextResponse.json({ accepted, duplicates }, { status: 202 });
}

/** GET /api/events?team=east&limit=20: recent events for a team's activity feed. */
export async function GET(request: NextRequest) {
  const query = listQuerySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!query.success) {
    return NextResponse.json({ error: "invalid_query", issues: query.error.flatten().fieldErrors }, { status: 400 });
  }
  const events = await eventStore.recent(query.data.team, query.data.limit);
  return NextResponse.json({ events });
}
