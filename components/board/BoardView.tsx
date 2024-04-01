import type { RangeId, TeamId } from "@/types/board";
import { activityFeed } from "@/lib/data/activity";
import { rangeLabel } from "@/lib/data/ranges";
import { pacing, teamKpis } from "@/lib/scoring";
import { ActivityFeed } from "./ActivityFeed";
import { ContestCard } from "./ContestCard";
import { KpiTiles } from "./KpiTiles";
import { Leaderboard } from "./Leaderboard";
import { TargetGauge } from "./TargetGauge";
import { TrendCard } from "./TrendCard";

interface BoardViewProps {
  teamId: TeamId;
  range: RangeId;
  metricIndex?: number;
  onMetricChange?: (index: number) => void;
}

/**
 * The standard three-column wall board: KPI strip, leaderboard, target + trend, contest + feed.
 * Used by the live demo and by every embedded preview on the marketing pages.
 */
export function BoardView({ teamId, range, metricIndex, onMetricChange }: BoardViewProps) {
  const { target } = teamKpis(teamId, range);

  return (
    <div className="view bgrid" data-team={teamId} data-range={range}>
      <KpiTiles teamId={teamId} range={range} />
      <div className="col l">
        <Leaderboard teamId={teamId} range={range} metricIndex={metricIndex} onMetricChange={onMetricChange} />
      </div>
      <div className="col m">
        <TargetGauge
          target={target}
          pacing={pacing(target, range)}
          rangeLabel={rangeLabel(range).toLowerCase()}
          gradientId={`gg-${teamId}-${range}`}
        />
        <TrendCard teamId={teamId} range={range} />
      </div>
      <div className="col r">
        <ContestCard teamId={teamId} />
        <ActivityFeed items={activityFeed(teamId, 5)} />
      </div>
    </div>
  );
}
