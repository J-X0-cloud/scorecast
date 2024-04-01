import { toPoints } from "@/lib/geometry";

interface SparklineProps {
  /** Values normalised to 0–100. */
  values: readonly number[];
  color?: string;
  width?: number;
  height?: number;
}

export function Sparkline({ values, color = "var(--mint)", width = 120, height = 34 }: SparklineProps) {
  if (values.length < 2) return null;

  const step = width / (values.length - 1);
  const points = values.map((v, i) => ({ x: i * step, y: height - 3 - (v / 100) * (height - 6) }));
  const line = toPoints(points);
  const last = points[points.length - 1]!;

  return (
    <svg className="spark" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <polygon points={`0,${height} ${line} ${width},${height}`} fill={color} opacity=".14" />
      <polyline
        points={line}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={last.x.toFixed(1)} cy={last.y.toFixed(1)} r={2.6} fill={color} />
    </svg>
  );
}
