import type { IconName } from "@/components/ui/icons";

export interface BoardTemplate {
  name: string;
  description: string;
  icon: IconName;
  preview: "sales-floor" | "support-desk" | "month-end" | "contact-center";
}

export const BOARD_TEMPLATES: readonly BoardTemplate[] = [
  {
    name: "Sales floor",
    description: "Podium leaderboard, revenue vs target and a live deal feed. The classic wall board.",
    icon: "users",
    preview: "sales-floor",
  },
  {
    name: "Support desk",
    description: "Queue depth, CSAT and first-response pacing with SLA-risk highlights.",
    icon: "headset",
    preview: "support-desk",
  },
  {
    name: "Month-end tracker",
    description: "Team burn-up against target with a projected landing point.",
    icon: "target",
    preview: "month-end",
  },
  {
    name: "Contact-center pulse",
    description: "Calls by hour and weekday to staff the peaks and spot the dead zones.",
    icon: "phone",
    preview: "contact-center",
  },
];

export interface WidgetType {
  name: string;
  icon: IconName;
  description: string;
}

export const WIDGET_LIBRARY: readonly WidgetType[] = [
  { name: "Number", icon: "sigma", description: "Big figure with delta and target" },
  { name: "Leaderboard", icon: "users", description: "Ranked list or podium" },
  { name: "Speedometer", icon: "target", description: "Semicircle target gauge" },
  { name: "Progress ring", icon: "rotate", description: "Per-rep or team rings" },
  { name: "Bar & line", icon: "chart", description: "Hourly, daily, monthly trends" },
  { name: "Burn-up", icon: "flag", description: "Cumulative vs target pace" },
  { name: "Race track", icon: "flame", description: "Contest lanes with avatars" },
  { name: "Bracket", icon: "trophy", description: "Head-to-head rounds" },
  { name: "Activity feed", icon: "bell", description: "Wins as they happen" },
  { name: "Ticker", icon: "bolt", description: "Scrolling headline strip" },
  { name: "Countdown", icon: "clock", description: "To the end of a contest or month" },
  { name: "Table", icon: "grid", description: "Sortable with sparklines" },
];

export interface PlaylistSlide {
  title: string;
  icon: IconName;
  duration: string;
}

export const LOBBY_PLAYLIST = {
  screen: "Lobby TV · Level 3",
  summary: "Rotating 5 boards · 2m 25s loop",
  slides: [
    { title: "Sales floor leaderboard", icon: "users", duration: "45s" },
    { title: "Team target vs actual", icon: "target", duration: "30s" },
    { title: "Demo Derby bracket", icon: "trophy", duration: "30s" },
    { title: "Support queue health", icon: "headset", duration: "20s" },
    { title: "Wins of the week", icon: "star", duration: "20s" },
  ] satisfies PlaylistSlide[],
};

export const HEATMAP_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
export const HEATMAP_HOURS = ["8", "9", "10", "11", "12", "1", "2", "3", "4", "5"] as const;

export interface Highlight {
  icon: IconName;
  title: string;
  body: string;
}

export const DASHBOARD_HIGHLIGHTS: readonly Highlight[] = [
  {
    icon: "bolt",
    title: "Seconds, not overnight",
    body: "Webhook sources stream straight to the board. No nightly extract, no refresh button, no stale Monday numbers on Wednesday.",
  },
  {
    icon: "lock",
    title: "Right data, right screen",
    body: "Row-level filters per board mean the lobby TV shows team totals while the pod screen shows names and individual targets.",
  },
  {
    icon: "sun",
    title: "Readable in any room",
    body: "Dark and bright themes, colour-blind-safe status colours and a minimum on-screen type size enforced by the editor.",
  },
];

export const CONTEST_PRINCIPLES: readonly Highlight[] = [
  {
    icon: "shield",
    title: "Fair by design",
    body: "Rank on progress to each person's own target, so a new hire and a ten-year veteran can both top the board.",
  },
  {
    icon: "users",
    title: "Balanced scorecards",
    body: "Weight quality alongside volume: CSAT beside tickets, show rate beside meetings booked.",
  },
  {
    icon: "lock",
    title: "Private where it matters",
    body: "Coaching goals and performance plans stay between the rep and their manager, never on a TV.",
  },
];
