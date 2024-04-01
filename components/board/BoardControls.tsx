import Link from "next/link";
import type { RangeId, TeamId } from "@/types/board";
import { RANGES } from "@/lib/data/ranges";
import { SNAPSHOT_TIME } from "@/lib/data/snapshot";
import { TEAMS, TEAM_ORDER } from "@/lib/data/teams";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

interface BoardControlsProps {
  team: TeamId;
  range: RangeId;
  rotating: boolean;
  onTeamChange: (team: TeamId) => void;
  onRangeChange: (range: RangeId) => void;
  onToggleRotation: () => void;
}

/** Top bar of the full-screen board: team tabs, date range, clock and TV rotation. */
export function BoardControls({
  team,
  range,
  rotating,
  onTeamChange,
  onRangeChange,
  onToggleRotation,
}: BoardControlsProps) {
  return (
    <div className="btop">
      <div className="btop-l">
        <Logo />
        <span className="sep" />
        <div className="ttabs" role="group" aria-label="Team">
          {TEAM_ORDER.map((id) => {
            const t = TEAMS[id];
            return (
              <button
                key={id}
                type="button"
                className={id === team ? "tt on" : "tt"}
                aria-pressed={id === team}
                onClick={() => onTeamChange(id)}
              >
                <Icon name={t.kind === "support" ? "headset" : "users"} />
                {t.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btop-r">
        <div className="rtabs" role="group" aria-label="Date range">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              className={r.id === range ? "rt on" : "rt"}
              aria-pressed={r.id === range}
              onClick={() => onRangeChange(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
        <span className="clock">{SNAPSHOT_TIME}</span>
        <button
          type="button"
          className={rotating ? "tvbtn on" : "tvbtn"}
          aria-label="TV rotation"
          aria-pressed={rotating}
          onClick={onToggleRotation}
        >
          <Icon name="rotate" />
          <span>TV rotation</span>
        </button>
        <Link className="exit" href="/" aria-label="Back to site">
          <Icon name="arrow" />
          <span>Back to site</span>
        </Link>
      </div>
    </div>
  );
}
