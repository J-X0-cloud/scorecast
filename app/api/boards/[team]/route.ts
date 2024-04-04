import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { isTeamId } from "@/lib/data/teams";
import { getBoardSnapshot } from "@/lib/scoring";

const querySchema = z.object({
  range: z.enum(["today", "week", "month"]).default("today"),
});

/**
 * GET /api/boards/:team?range=today|week|month
 *
 * Board snapshot for screens and the mobile app: KPI tiles, team target with pacing and the
 * ranked leaderboard for every metric. Screens poll this every 15 seconds as a fallback when
 * the live event stream is unavailable.
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ team: string }> }) {
  const { team } = await params;
  if (!isTeamId(team)) {
    return NextResponse.json({ error: "unknown_team", team }, { status: 404 });
  }

  const query = querySchema.safeParse(Object.fromEntries(request.nextUrl.searchParams));
  if (!query.success) {
    return NextResponse.json({ error: "invalid_query", issues: query.error.flatten().fieldErrors }, { status: 400 });
  }

  return NextResponse.json(getBoardSnapshot(team, query.data.range), {
    headers: { "Cache-Control": "private, max-age=10, stale-while-revalidate=20" },
  });
}
