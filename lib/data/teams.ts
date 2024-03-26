import type { MetricDefinition, Team, TeamId, TeamKind } from "@/types/board";

export const TEAMS: Record<TeamId, Team> = {
  west: {
    id: "west",
    name: "Sales · West",
    kind: "sales",
    screen: "Sales floor · Level 3",
    reps: ["Priya N.", "Marcus T.", "Dana R.", "Owen K.", "Sofia M.", "Jamal W.", "Lena H.", "Theo B."],
  },
  east: {
    id: "east",
    name: "Sales · East",
    kind: "sales",
    screen: "Sales floor · Level 5",
    reps: ["Grace L.", "Andre P.", "Mia C.", "Rafael D.", "Hannah S.", "Kenji O.", "Noah F.", "Ivy J."],
  },
  support: {
    id: "support",
    name: "Support · Tier 1",
    kind: "support",
    screen: "Support pod · Level 2",
    reps: ["Tessa G.", "Luis A.", "Amara E.", "Ben Y.", "Chloe V.", "Devin Q.", "Nadia K.", "Sam I."],
  },
};

/** Rotation order for TV mode. */
export const TEAM_ORDER: readonly TeamId[] = ["west", "east", "support"];

export const SALES_METRICS: readonly MetricDefinition[] = [
  { key: "revenue", label: "Revenue", format: "money", dailyTarget: 7500, cumulative: true, higherIsBetter: true },
  { key: "calls", label: "Calls", format: "number", dailyTarget: 70, cumulative: true, higherIsBetter: true },
  { key: "meetings", label: "Meetings", format: "number", dailyTarget: 4, cumulative: true, higherIsBetter: true },
];

export const SUPPORT_METRICS: readonly MetricDefinition[] = [
  { key: "solved", label: "Tickets solved", format: "number", dailyTarget: 30, cumulative: true, higherIsBetter: true },
  { key: "csat", label: "CSAT", format: "percent", dailyTarget: 95, cumulative: false, higherIsBetter: true },
  { key: "frt", label: "First response", format: "duration", dailyTarget: 4, cumulative: false, higherIsBetter: false },
];

export const METRICS_BY_KIND: Record<TeamKind, readonly MetricDefinition[]> = {
  sales: SALES_METRICS,
  support: SUPPORT_METRICS,
};

export function getTeam(id: TeamId): Team {
  return TEAMS[id];
}

export function isTeamId(value: string): value is TeamId {
  return value in TEAMS;
}

export function metricsFor(teamId: TeamId): readonly MetricDefinition[] {
  return METRICS_BY_KIND[TEAMS[teamId].kind];
}

/** Customer accounts referenced in the activity feed. */
export const CLIENTS = [
  "Halvorsen Freight",
  "Bluebell Dental Group",
  "Oakmont Title Co.",
  "Larkspur Pools",
  "Kestrel & Finch Roofing",
  "Pinecrest Home Care",
  "Tidewell Solar",
  "Copperleaf HVAC",
  "Marigold Vet Clinics",
  "Northgate Storage",
] as const;
