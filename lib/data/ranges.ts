import type { RangeId, RangeOption } from "@/types/board";

export const RANGES: readonly RangeOption[] = [
  { id: "today", label: "Today" },
  { id: "week", label: "This week" },
  { id: "month", label: "This month" },
];

/** Working units elapsed at snapshot time: share of today, days into the week, days into the month. */
export const ELAPSED: Record<RangeId, number> = { today: 0.68, week: 3.68, month: 16.4 };

/** Working units in a full period. */
export const PERIOD_LENGTH: Record<RangeId, number> = { today: 1, week: 5, month: 22 };

/** What deltas are compared against. */
export const PREVIOUS_PERIOD: Record<RangeId, string> = {
  today: "yesterday",
  week: "last week",
  month: "last month",
};

/** A working day is ten one-hour slots (8 AM–6 PM); pacing "per hour" uses these. */
export const HOURS_PER_DAY = 10;

export const HOUR_SLOTS = ["8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p"] as const;
export const WEEKDAY_SLOTS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;

/** Hours elapsed today and working days elapsed this week, for the bar charts. */
export const SLOTS_ELAPSED: Record<Exclude<RangeId, "month">, number> = { today: 6.8, week: 3.68 };

export function isRangeId(value: string): value is RangeId {
  return value === "today" || value === "week" || value === "month";
}

export function rangeLabel(id: RangeId): string {
  return RANGES.find((r) => r.id === id)?.label ?? id;
}
