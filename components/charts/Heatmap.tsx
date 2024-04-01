import type { CSSProperties } from "react";

interface HeatmapProps {
  rows: readonly string[];
  columns: readonly string[];
  /** rows × columns intensities, 0–1. */
  values: readonly (readonly number[])[];
}

export function Heatmap({ rows, columns, values }: HeatmapProps) {
  return (
    <div className="heat">
      <span />
      {columns.map((c) => (
        <span key={c} className="hh">
          {c}
        </span>
      ))}
      {rows.map((row, r) => (
        <HeatmapRow key={row} label={row} values={values[r] ?? []} />
      ))}
    </div>
  );
}

function HeatmapRow({ label, values }: { label: string; values: readonly number[] }) {
  return (
    <>
      <span className="hml">{label}</span>
      {values.map((v, i) => (
        <i key={i} style={{ "--o": v.toFixed(2) } as CSSProperties} />
      ))}
    </>
  );
}
