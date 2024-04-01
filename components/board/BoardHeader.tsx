import type { RangeId, TeamId } from "@/types/board";
import { rangeLabel } from "@/lib/data/ranges";
import { SNAPSHOT_TIME } from "@/lib/data/snapshot";
import { TEAMS } from "@/lib/data/teams";
import { LogoMark } from "@/components/ui/Logo";
import { LiveDot } from "@/components/ui/LiveDot";

/** Compact header used on embedded (read-only) boards: team, screen location, range and clock. */
export function BoardHeader({ teamId, range }: { teamId: TeamId; range: RangeId }) {
  const team = TEAMS[teamId];
  return (
    <div className="btop mini">
      <div className="btop-l">
        <span className="bl">
          <LogoMark />
        </span>
        <div>
          <b>{team.name}</b>
          <small>{team.screen}</small>
        </div>
      </div>
      <div className="btop-r">
        <span className="chip on">{rangeLabel(range)}</span>
        <LiveDot />
        <span className="clock">{SNAPSHOT_TIME}</span>
      </div>
    </div>
  );
}
