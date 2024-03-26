export interface PricingTier {
  name: string;
  /** USD per tracked user per month, billed annually. `null` = custom quote. */
  price: number | null;
  description: string;
  featured: boolean;
  features: readonly string[];
}

export const PRICING_TIERS: readonly PricingTier[] = [
  {
    name: "Team",
    price: 12,
    description: "For a single team getting its first boards on the wall.",
    featured: false,
    features: [
      "Up to 25 tracked users",
      "Unlimited dashboards & TV screens",
      "8 connectors",
      "Leaderboards, targets & rings",
      "Win notifications to Slack or Teams",
      "Email support",
    ],
  },
  {
    name: "Floor",
    price: 19,
    description: "For sales and support floors running contests every month.",
    featured: true,
    features: [
      "Everything in Team",
      "Unlimited connectors & REST API",
      "Contests, brackets & achievements",
      "Reward shelf with points",
      "Custom KPI formula editor",
      "Screen playlists & night mode",
      "Live chat support",
    ],
  },
  {
    name: "Arena",
    price: null,
    description: "For multi-site contact centers and larger sales orgs.",
    featured: false,
    features: [
      "Everything in Floor",
      "SSO & SCIM provisioning",
      "Row-level data permissions",
      "Data residency options",
      "Dedicated success manager",
      "Onboarding & board design sessions",
    ],
  },
];

/** Feature comparison: [feature, Team, Floor, Arena]. */
export const PLAN_COMPARISON: readonly (readonly [string, string, string, string])[] = [
  ["Tracked users", "Up to 25", "Unlimited", "Unlimited"],
  ["Viewers & TV screens", "Free, unlimited", "Free, unlimited", "Free, unlimited"],
  ["Connectors", "8", "Unlimited", "Unlimited"],
  ["Data refresh", "1 minute", "Real time", "Real time"],
  ["History", "13 months", "3 years", "Unlimited"],
  ["Contests & brackets", "—", "Unlimited", "Unlimited"],
  ["Achievements & rewards", "—", "✓", "✓"],
  ["Custom KPIs", "10", "Unlimited", "Unlimited"],
  ["Mobile app", "✓", "✓", "✓"],
  ["SSO / SCIM", "—", "—", "✓"],
  ["Support", "Email", "Live chat", "Dedicated manager"],
];
