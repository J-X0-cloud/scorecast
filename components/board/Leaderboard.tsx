"use client";

import { useMemo, useState } from "react";
import type { RangeId, TeamId } from "@/types/board";
import { metricsFor } from "@/lib/data/teams";
import { rankReps } from "@/lib/scoring";
import { CardHeader } from "@/components/ui/CardHeader";
import { LeaderboardRanks } from "./LeaderboardRanks";

interface LeaderboardProps {
  teamId: TeamId;
  range: RangeId;
  /** Controlled metric (TV rotation drives it on the live board). Omit to let the tabs own it. */
  metricIndex?: number;
  onMetricChange?: (index: number) => void;
}

export function Leaderboard({ teamId, range, metricIndex, onMetricChange }: LeaderboardProps) {
  const [localIndex, setLocalIndex] = useState(0);
  const active = metricIndex ?? localIndex;
  const metrics = metricsFor(teamId);
  const metric = metrics[active] ?? metrics[0]!;

  const rows = useMemo(() => rankReps(teamId, range, active), [teamId, range, active]);

  function select(index: number) {
    setLocalIndex(index);
    onMetricChange?.(index);
  }

  return (
    <section className="card lbcard">
      <CardHeader icon="trophy" title="Leaderboard">
        <div className="mtabs" role="group" aria-label="Leaderboard metric">
          {metrics.map((m, i) => (
            <button
              key={m.key}
              type="button"
              className={i === active ? "mt on" : "mt"}
              aria-pressed={i === active}
              onClick={() => select(i)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </CardHeader>
      <div className="lb">
        <LeaderboardRanks metric={metric} rows={rows} />
      </div>
    </section>
  );
}
