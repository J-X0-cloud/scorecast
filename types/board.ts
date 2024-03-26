import type { IconName } from "@/components/ui/icons";

export type TeamId = "west" | "east" | "support";
export type TeamKind = "sales" | "support";
export type RangeId = "today" | "week" | "month";

export type SalesMetricKey = "revenue" | "calls" | "meetings";
export type SupportMetricKey = "solved" | "csat" | "frt";
export type MetricKey = SalesMetricKey | SupportMetricKey;

/** How a raw metric value is rendered on a board. */
export type ValueFormat = "money" | "number" | "percent" | "duration";

export interface MetricDefinition {
  key: MetricKey;
  label: string;
  format: ValueFormat;
  /** Per-rep target for one working day (or the fixed threshold for rate metrics). */
  dailyTarget: number;
  /** Cumulative metrics grow through the period; rate metrics (CSAT, response time) do not. */
  cumulative: boolean;
  higherIsBetter: boolean;
}

export interface Team {
  id: TeamId;
  name: string;
  kind: TeamKind;
  /** Where the team's wall screen hangs. Shown in the board header. */
  screen: string;
  reps: readonly string[];
}

export interface RangeOption {
  id: RangeId;
  label: string;
}

/** A rep's raw reading for one metric and range: [value, delta vs the previous period in %]. */
export type RepReading = readonly [value: number, delta: number];

export interface LeaderboardRow {
  name: string;
  /** Position of the rep in the team roster; drives the avatar colour. */
  rosterIndex: number;
  value: number;
  display: string;
  /** Share of the rep's own target reached (1 = on target). */
  progress: number;
  target: number;
  delta: number;
}

export interface KpiTile {
  label: string;
  value: string;
  icon: IconName;
  /** Progress ring (0–1+) shown on the headline tile instead of a sparkline. */
  ring?: number;
  sub?: string;
  delta?: number;
  unit?: string;
  /** Lower is better (response time, backlog): a negative delta is good news. */
  invert?: boolean;
  spark?: readonly number[];
}

export interface TeamTarget {
  actual: number;
  target: number;
  unit: "revenue" | "tickets";
}

export interface Pacing {
  progress: number;
  projected: number;
  remaining: number;
  perUnit: "hr" | "day";
  needPerUnit: number;
  onPace: boolean;
}

export interface BoardSnapshot {
  team: Team;
  range: RangeId;
  kpis: KpiTile[];
  target: TeamTarget;
  pacing: Pacing;
  leaderboards: { metric: MetricDefinition; rows: LeaderboardRow[] }[];
  generatedAt: string;
}
