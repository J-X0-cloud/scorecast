import type {
  BoardSnapshot,
  KpiTile,
  LeaderboardRow,
  MetricDefinition,
  Pacing,
  RangeId,
  RepReading,
  TeamId,
  TeamTarget,
} from "@/types/board";
import { ELAPSED, HOURS_PER_DAY, PERIOD_LENGTH } from "@/lib/data/ranges";
import { REP_READINGS, SPARKLINES, TEAM_EXTRAS } from "@/lib/data/snapshot";
import { TEAMS, metricsFor } from "@/lib/data/teams";
import { formatValue, mins, money, num, percentOf } from "@/lib/format";

function readings(teamId: TeamId, metric: MetricDefinition, range: RangeId): readonly RepReading[] {
  const series = REP_READINGS[teamId][metric.key]?.[range];
  if (!series) {
    throw new Error(`No readings for ${teamId}/${metric.key}/${range}`);
  }
  return series;
}

function metricAt(teamId: TeamId, metricIndex: number): MetricDefinition {
  const metric = metricsFor(teamId)[metricIndex];
  if (!metric) throw new RangeError(`Team ${teamId} has no metric #${metricIndex}`);
  return metric;
}

/**
 * Target for one rep over the range. Cumulative metrics scale with the length of the period;
 * rate metrics (CSAT, first response) keep the same threshold whatever the range.
 */
export function repTarget(metric: MetricDefinition, range: RangeId): number {
  return metric.cumulative ? metric.dailyTarget * PERIOD_LENGTH[range] : metric.dailyTarget;
}

/**
 * Progress towards the rep's own target. For lower-is-better metrics the ratio is inverted,
 * so beating a 4-minute response target always reads as > 100%.
 */
export function repProgress(metric: MetricDefinition, value: number, target: number): number {
  if (metric.cumulative || metric.higherIsBetter) return value / target;
  return target / value;
}

/** Leaderboard rows for one team, range and metric, best first. */
export function rankReps(teamId: TeamId, range: RangeId, metricIndex: number): LeaderboardRow[] {
  const metric = metricAt(teamId, metricIndex);
  const target = repTarget(metric, range);
  const reps = TEAMS[teamId].reps;

  const rows = readings(teamId, metric, range).map(([value, delta], rosterIndex): LeaderboardRow => ({
    name: reps[rosterIndex] ?? `Rep ${rosterIndex + 1}`,
    rosterIndex,
    value,
    display: formatValue(metric.format, value),
    progress: repProgress(metric, value, target),
    target,
    delta,
  }));

  return rows.sort((a, b) => (metric.higherIsBetter ? b.value - a.value : a.value - b.value));
}

/** Scale for the progress bars: the best rep, or the target line, plus 8% headroom. */
export function leaderboardScale(rows: readonly LeaderboardRow[]): number {
  return Math.max(...rows.map((r) => r.progress), 1) * 1.08;
}

const sum = (rows: readonly LeaderboardRow[]) => rows.reduce((total, r) => total + r.value, 0);

/** The four KPI tiles across the top of a board, plus the team target they roll up into. */
export function teamKpis(teamId: TeamId, range: RangeId): { tiles: KpiTile[]; target: TeamTarget } {
  const team = TEAMS[teamId];
  const extras = TEAM_EXTRAS[teamId][range];
  const sparks = SPARKLINES[teamId][range];
  const headcount = team.reps.length;
  const perRepDaily = metricAt(teamId, 0).dailyTarget;
  const [primary, second, third] = metricsFor(teamId).map((_, i) => rankReps(teamId, range, i));
  if (!primary || !second || !third) throw new Error(`Incomplete metric set for ${teamId}`);

  if (team.kind === "sales") {
    const revenue = sum(primary);
    const revenueTarget = perRepDaily * headcount * PERIOD_LENGTH[range];
    return {
      target: { actual: revenue, target: revenueTarget, unit: "revenue" },
      tiles: [
        {
          label: "Revenue closed",
          value: money(revenue),
          sub: `${percentOf(revenue, revenueTarget)} of ${money(revenueTarget)} target`,
          ring: revenue / revenueTarget,
          icon: "target",
        },
        { label: "Calls made", value: num(sum(second)), delta: extras.deltas.calls, spark: sparks.calls, icon: "phone" },
        {
          label: "Meetings booked",
          value: num(sum(third)),
          delta: extras.deltas.meet,
          spark: sparks.meet,
          icon: "calendar",
        },
        {
          label: "Win rate",
          value: `${(extras.winRate ?? 0).toFixed(1)}%`,
          delta: extras.deltas.win,
          unit: " pts",
          spark: sparks.win,
          icon: "trophy",
        },
      ],
    };
  }

  const solved = sum(primary);
  const solvedTarget = perRepDaily * headcount * PERIOD_LENGTH[range];
  const csat = sum(second) / headcount;
  const responseTimes = third.map((r) => r.value).sort((a, b) => a - b);
  const medianResponse = responseTimes[Math.floor(responseTimes.length / 2)] ?? 0;

  return {
    target: { actual: solved, target: solvedTarget, unit: "tickets" },
    tiles: [
      {
        label: "Tickets solved",
        value: num(solved),
        sub: `${percentOf(solved, solvedTarget)} of ${num(solvedTarget)} target`,
        ring: solved / solvedTarget,
        icon: "check",
      },
      {
        label: "CSAT",
        value: `${csat.toFixed(1)}%`,
        delta: extras.deltas.csat,
        unit: " pts",
        spark: sparks.csat,
        icon: "star",
      },
      {
        label: "Median first response",
        value: mins(medianResponse),
        delta: extras.deltas.frt,
        invert: true,
        spark: sparks.frt,
        icon: "clock",
      },
      {
        label: "Open backlog",
        value: num(extras.backlog ?? 0),
        delta: extras.deltas.backlog,
        invert: true,
        spark: sparks.backlog,
        icon: "headset",
      },
    ],
  };
}

/**
 * Straight-line pacing: where the team lands if it keeps the current rate, and what it
 * needs per remaining hour (today) or day (week, month) to hit the target.
 */
export function pacing({ actual, target }: TeamTarget, range: RangeId): Pacing {
  const elapsed = ELAPSED[range];
  const length = PERIOD_LENGTH[range];
  const projected = ((actual / elapsed) * length) / target;
  const remaining = Math.max(target - actual, 0);
  const unitsLeft = (length - elapsed) * (range === "today" ? HOURS_PER_DAY : 1);

  return {
    progress: actual / target,
    projected,
    remaining,
    perUnit: range === "today" ? "hr" : "day",
    needPerUnit: unitsLeft > 0 ? remaining / unitsLeft : 0,
    onPace: projected >= 1,
  };
}

export function formatTargetValue(target: TeamTarget, value: number): string {
  return target.unit === "revenue" ? money(value) : num(value);
}

/** Everything a board needs for one team and range. Served by `GET /api/boards/[team]`. */
export function getBoardSnapshot(teamId: TeamId, range: RangeId, now = new Date()): BoardSnapshot {
  const { tiles, target } = teamKpis(teamId, range);
  return {
    team: TEAMS[teamId],
    range,
    kpis: tiles,
    target,
    pacing: pacing(target, range),
    leaderboards: metricsFor(teamId).map((metric, i) => ({ metric, rows: rankReps(teamId, range, i) })),
    generatedAt: now.toISOString(),
  };
}
