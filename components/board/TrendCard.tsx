import type { RangeId, TeamId } from "@/types/board";
import { PREVIOUS_PERIOD } from "@/lib/data/ranges";
import { formatTargetValue, teamKpis } from "@/lib/scoring";
import { trendSeries } from "@/lib/trends";
import { CardHeader } from "@/components/ui/CardHeader";
import { TrendChart } from "@/components/charts/TrendChart";

interface TrendCardProps {
  teamId: TeamId;
  range: RangeId;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function TrendCard({ teamId, range }: TrendCardProps) {
  const { target } = teamKpis(teamId, range);
  const series = trendSeries(teamId, range, target);
  const title = target.unit === "revenue" ? "Revenue" : "Tickets solved";
  const caption = series.kind === "burnup" ? "Burn-up · working days" : range === "today" ? "By hour" : "By day";

  return (
    <section className="card trcard">
      <CardHeader icon="chart" title={title}>
        <span className="muted">{caption}</span>
      </CardHeader>
      <TrendChart series={series} title={title} format={(v) => formatTargetValue(target, v)} />
      <div className="legend">
        {series.kind === "burnup" ? (
          <>
            <span>
              <i className="lg a" />
              Cumulative
            </span>
            <span>
              <i className="lg t" />
              Target pace
            </span>
            <span>
              <i className="lg p" />
              Projection
            </span>
          </>
        ) : (
          <>
            <span>
              <i className="lg b" />
              {title}
            </span>
            <span>
              <i className="lg h" />
              Above target
            </span>
            <span>
              <i className="lg v" />
              {capitalize(PREVIOUS_PERIOD[range])}
            </span>
          </>
        )}
      </div>
    </section>
  );
}
