import type { RangeId, TeamId, TeamTarget } from "@/types/board";
import { ELAPSED, HOUR_SLOTS, PERIOD_LENGTH, SLOTS_ELAPSED, WEEKDAY_SLOTS } from "@/lib/data/ranges";
import { TREND_WEIGHTS } from "@/lib/data/snapshot";

export interface BurnUpSeries {
  kind: "burnup";
  /** Cumulative actual by working day; the last point sits at the current (fractional) day. */
  points: { day: number; value: number }[];
  days: number;
  elapsed: number;
  target: number;
  projectedTotal: number;
}

export interface SlotBarsSeries {
  kind: "bars";
  granularity: "hour" | "day";
  labels: readonly string[];
  values: number[];
  previous: number[];
  perSlotTarget: number;
  /** Slots elapsed, fractional: the slot containing "now" is still filling up. */
  elapsed: number;
}

export type TrendSeries = BurnUpSeries | SlotBarsSeries;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function burnUp(teamId: TeamId, { actual, target }: TeamTarget): BurnUpSeries {
  const days = PERIOD_LENGTH.month;
  const elapsed = ELAPSED.month;
  const weights = TREND_WEIGHTS[teamId].month.weights;
  const fullDays = Math.floor(elapsed);
  const partial = elapsed - fullDays;

  // Distribute the month-to-date total over the completed days plus today's partial day.
  const total =
    weights.slice(0, fullDays).reduce((a, b) => a + b, 0) + (weights[fullDays] ?? 1) * partial;

  const points = [{ day: 0, value: 0 }];
  let running = 0;
  for (let day = 0; day < fullDays; day++) {
    running += ((weights[day] ?? 1) / total) * actual;
    points.push({ day: day + 1, value: running });
  }
  points.push({ day: elapsed, value: actual });

  return { kind: "burnup", points, days, elapsed, target, projectedTotal: (actual / elapsed) * days };
}

function slotBars(teamId: TeamId, range: "today" | "week", { actual, target }: TeamTarget): SlotBarsSeries {
  const labels = range === "today" ? HOUR_SLOTS : WEEKDAY_SLOTS;
  const elapsed = SLOTS_ELAPSED[range];
  const { weights, previous = [] } = TREND_WEIGHTS[teamId][range];

  const filled = labels.map((_, i) => (weights[i] ?? 1) * clamp01(elapsed - i));
  const total = filled.reduce((a, b) => a + b, 0);
  const pace = actual / elapsed;

  return {
    kind: "bars",
    granularity: range === "today" ? "hour" : "day",
    labels,
    values: filled.map((f) => (total > 0 ? (actual * f) / total : 0)),
    previous: labels.map((_, i) => pace * (previous[i] ?? 1)),
    perSlotTarget: target / labels.length,
    elapsed,
  };
}

/** Hourly bars for today, daily bars for the week, a burn-up for the month. */
export function trendSeries(teamId: TeamId, range: RangeId, target: TeamTarget): TrendSeries {
  return range === "month" ? burnUp(teamId, target) : slotBars(teamId, range, target);
}
