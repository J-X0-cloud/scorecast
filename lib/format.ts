import type { ValueFormat } from "@/types/board";

const integer = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** $12,400 · $148.2k · $1.25M: compact enough for a TV tile, exact enough for a rep. */
export function money(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 100_000) return `$${(value / 1000).toFixed(1)}k`;
  return `$${integer.format(value)}`;
}

export function num(value: number): string {
  return integer.format(value);
}

export function pct(value: number): string {
  return `${value.toFixed(1)}%`;
}

/** Decimal minutes to "3m 07s". */
export function mins(value: number): string {
  let m = Math.trunc(value);
  let s = Math.round((value - m) * 60);
  if (s === 60) {
    m += 1;
    s = 0;
  }
  return `${m}m ${String(s).padStart(2, "0")}s`;
}

export function formatValue(format: ValueFormat, value: number): string {
  switch (format) {
    case "money":
      return money(value);
    case "percent":
      return pct(value);
    case "duration":
      return mins(value);
    case "number":
      return num(value);
  }
}

/** Signed delta with a true minus sign, e.g. "+4.2%" or "−1.3 pts". */
export function formatDelta(value: number, unit = "%"): string {
  const sign = value >= 0 ? "+" : "−";
  return `${sign}${Math.abs(value).toFixed(1)}${unit}`;
}

export function isGoodDelta(value: number, invert = false): boolean {
  return value >= 0 !== invert;
}

export function percentOf(part: number, whole: number): string {
  return `${Math.round((part / whole) * 100)}%`;
}

export function relativeMinutes(minutes: number): string {
  return minutes <= 0 ? "just now" : `${minutes} min ago`;
}
