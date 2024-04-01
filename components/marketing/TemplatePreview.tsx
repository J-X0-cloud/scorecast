import type { BoardTemplate } from "@/lib/data/dashboards";
import { HEATMAP_DAYS, HEATMAP_HOURS } from "@/lib/data/dashboards";
import { INBOUND_CALL_HEATMAP } from "@/lib/data/snapshot";
import { SALES_METRICS } from "@/lib/data/teams";
import { rankReps } from "@/lib/scoring";
import { CardHeader } from "@/components/ui/CardHeader";
import { Heatmap } from "@/components/charts/Heatmap";
import { KpiTiles } from "@/components/board/KpiTiles";
import { LeaderboardRanks } from "@/components/board/LeaderboardRanks";
import { TrendCard } from "@/components/board/TrendCard";

/** Live preview rendered inside each template card on the dashboards page. */
export function TemplatePreview({ preview }: { preview: BoardTemplate["preview"] }) {
  switch (preview) {
    case "sales-floor":
      return (
        <div className="board mini-lb">
          <LeaderboardRanks metric={SALES_METRICS[0]!} rows={rankReps("east", "week", 0)} limit={5} />
        </div>
      );
    case "support-desk":
      return (
        <div className="board">
          <KpiTiles teamId="support" range="week" />
        </div>
      );
    case "month-end":
      return (
        <div className="board">
          <TrendCard teamId="west" range="month" />
        </div>
      );
    case "contact-center":
      return (
        <div className="board heat-w">
          <div className="card">
            <CardHeader icon="phone" title="Inbound calls · this week" />
            <Heatmap rows={HEATMAP_DAYS} columns={HEATMAP_HOURS} values={INBOUND_CALL_HEATMAP} />
          </div>
        </div>
      );
  }
}
