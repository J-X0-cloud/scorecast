import { formatDelta, isGoodDelta } from "@/lib/format";

interface DeltaChipProps {
  value: number;
  unit?: string;
  /** Lower is better for this metric, so a drop is shown as good news. */
  invert?: boolean;
}

export function DeltaChip({ value, unit = "%", invert = false }: DeltaChipProps) {
  return <span className={`dl ${isGoodDelta(value, invert) ? "up" : "down"}`}>{formatDelta(value, unit)}</span>;
}
