import type { BurnUpSeries, SlotBarsSeries, TrendSeries } from "@/lib/trends";
import { linearScale, toPoints } from "@/lib/geometry";

const W = 420;
const H = 170;
const PAD = 24;
const BASELINE = H - 22;

interface TrendChartProps {
  series: TrendSeries;
  title: string;
  format: (value: number) => string;
}

export function TrendChart({ series, title, format }: TrendChartProps) {
  return series.kind === "burnup" ? (
    <BurnUp series={series} title={title} />
  ) : (
    <SlotBars series={series} title={title} format={format} />
  );
}

function BurnUp({ series, title }: { series: BurnUpSeries; title: string }) {
  const { points, days, elapsed, target, projectedTotal } = series;
  const x = linearScale([0, days], [PAD, W - PAD]);
  const y = linearScale([0, Math.max(target, projectedTotal) * 1.08], [BASELINE, 18]);

  const line = toPoints(points.map((p) => ({ x: x(p.day), y: y(p.value) })));
  const now = points[points.length - 1]!;
  const area = `${x(0).toFixed(1)},${BASELINE} ${line} ${x(now.day).toFixed(1)},${BASELINE}`;

  return (
    <svg className="trend" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title} burn-up for the month`}>
      <g className="grid">
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line key={f} x1={PAD} x2={W - PAD} y1={y(target * f).toFixed(1)} y2={y(target * f).toFixed(1)} />
        ))}
      </g>
      <line x1={PAD} y1={BASELINE} x2={W - PAD} y2={y(target).toFixed(1)} className="tline" />
      <polygon points={area} className="area" />
      <polyline points={line} className="aline" />
      <line
        x1={x(elapsed).toFixed(1)}
        y1={y(now.value).toFixed(1)}
        x2={x(days).toFixed(1)}
        y2={y(projectedTotal).toFixed(1)}
        className="proj"
      />
      <circle cx={x(elapsed).toFixed(1)} cy={y(now.value).toFixed(1)} r={4.5} className="dot" />
      <g className="ax">
        {[0, 5, 10, 15, 21].map((d) => (
          <text key={d} x={x(d).toFixed(1)} y={H - 6} textAnchor="middle">
            {d + 1}
          </text>
        ))}
      </g>
    </svg>
  );
}

function SlotBars({ series, title, format }: { series: SlotBarsSeries; title: string; format: (v: number) => string }) {
  const { labels, values, previous, perSlotTarget, elapsed, granularity } = series;
  const n = labels.length;
  const band = (W - 2 * PAD) / n;
  const barWidth = band * 0.64;
  const y = linearScale([0, Math.max(...values, ...previous, perSlotTarget) * 1.18], [BASELINE, 18]);
  const targetY = y(perSlotTarget);
  const centre = (i: number) => PAD + i * band + band / 2;

  return (
    <svg className="trend" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${title} by ${granularity}`}>
      <line x1={PAD} x2={W - PAD} y1={targetY.toFixed(1)} y2={targetY.toFixed(1)} className="tline" />
      <text x={W - PAD} y={(targetY - 5).toFixed(1)} textAnchor="end" className="tl-l">
        target {format(perSlotTarget)}
      </text>
      {values.map((value, i) => {
        const bx = (PAD + i * band + band * 0.18).toFixed(1);
        if (value <= 0) {
          // Upcoming slot: dashed outline at target height.
          return (
            <rect
              key={i}
              x={bx}
              y={targetY.toFixed(1)}
              width={barWidth.toFixed(1)}
              height={(BASELINE - targetY).toFixed(1)}
              rx={4}
              className="ghost"
            />
          );
        }
        const classes = ["b", value >= perSlotTarget && "hit", elapsed - i < 1 && "live"].filter(Boolean).join(" ");
        return (
          <rect
            key={i}
            x={bx}
            y={y(value).toFixed(1)}
            width={barWidth.toFixed(1)}
            height={(BASELINE - y(value)).toFixed(1)}
            rx={4}
            className={classes}
          />
        );
      })}
      <polyline points={toPoints(previous.map((v, i) => ({ x: centre(i), y: y(v) })))} className="prev" />
      <g className="ax">
        {labels.map((label, i) => (
          <text key={label} x={centre(i).toFixed(1)} y={H - 6} textAnchor="middle">
            {label}
          </text>
        ))}
      </g>
    </svg>
  );
}
