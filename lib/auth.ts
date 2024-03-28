import { timingSafeEqual } from "node:crypto";

/**
 * Checks `Authorization: Bearer <token>` against the workspace ingest token.
 * Comparison is constant-time so the token can't be probed byte by byte.
 */
export function hasValidIngestToken(request: Request): boolean {
  const expected = process.env.SCORECAST_INGEST_TOKEN;
  if (!expected) return false;

  const header = request.headers.get("authorization") ?? "";
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) return false;

  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
