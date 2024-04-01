import type { LeaderboardRow, MetricDefinition } from "@/types/board";
import { leaderboardScale } from "@/lib/scoring";
import { Avatar } from "@/components/ui/Avatar";
import { Crown } from "@/components/ui/Crown";

interface LeaderboardRanksProps {
  metric: MetricDefinition;
  rows: readonly LeaderboardRow[];
  /** Total places shown, podium included. */
  limit?: number;
}

/** Podium display order: second, first, third. */
const PODIUM_ORDER = [1, 0, 2] as const;

function progressCaption(metric: MetricDefinition, row: LeaderboardRow): string {
  if (metric.cumulative) return `${Math.round(row.progress * 100)}% of target`;
  return row.progress >= 1 ? "on target" : "below target";
}

/** Podium plus ranked rows with a progress-to-target bar. Pure, so previews can render it on the server. */
export function LeaderboardRanks({ metric, rows, limit = 8 }: LeaderboardRanksProps) {
  const scale = leaderboardScale(rows);
  const targetPosition = 100 / scale;

  return (
    <>
      <div className="podium">
        {PODIUM_ORDER.map((place) => {
          const row = rows[place];
          if (!row) return null;
          return (
            <div className={`pod p${place + 1}`} key={row.name}>
              {place === 0 && <Crown />}
              <Avatar name={row.name} index={row.rosterIndex} size="xl" />
              <b>{row.name}</b>
              <em>{row.display}</em>
              <div className="step">
                <span>{place + 1}</span>
              </div>
            </div>
          );
        })}
      </div>
      <ol className="lb-rows">
        {rows.slice(3, limit).map((row, i) => (
          <li key={row.name}>
            <span className="rk">{i + 4}</span>
            <Avatar name={row.name} index={row.rosterIndex} />
            <span className="nm">
              {row.name}
              <small>{progressCaption(metric, row)}</small>
            </span>
            <span className={row.progress >= 1 ? "bar hit" : "bar"}>
              <i style={{ width: `${Math.min((row.progress / scale) * 100, 100).toFixed(1)}%` }} />
              <b style={{ left: `${targetPosition.toFixed(1)}%` }} />
            </span>
            <span className="val">{row.display}</span>
          </li>
        ))}
      </ol>
    </>
  );
}
