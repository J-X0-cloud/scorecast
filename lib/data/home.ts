import type { IconName } from "@/components/ui/icons";

export const HERO_POINTS = ["Free for viewers & TV screens", "Live in under an hour", "No BI team required"] as const;

export const HOW_IT_WORKS: readonly { title: string; body: string }[] = [
  {
    title: "Connect",
    body: "Authorize your CRM, dialer and helpdesk. Scorecast backfills 13 months of history and matches people across tools by email.",
  },
  {
    title: "Define",
    body: "Start with 60+ ready-made KPIs or write your own with a formula editor that feels like a spreadsheet, filters included.",
  },
  {
    title: "Broadcast",
    body: "Pick a template, set targets, and cast it to the office TV, the team channel and everyone's phone at once.",
  },
];

export const MOBILE_POINTS = [
  "Personal target ring and pacing on the home screen",
  "Win notifications posted to Slack or Microsoft Teams",
  "Private coaching goals only the rep and their manager see",
] as const;

export interface TeamSegment {
  title: string;
  icon: IconName;
  summary: string;
  points: readonly string[];
  variant: "sales" | "support";
}

export const TEAM_SEGMENTS: readonly TeamSegment[] = [
  {
    title: "Sales",
    icon: "phone",
    summary: "Inside sales, SDR pods, field teams and call-center sales floors.",
    points: [
      "Revenue, pipeline created, calls, talk time and meetings booked",
      "Rep-vs-target progress with daily pacing",
      "Deal-closed celebrations with walk-up sounds",
      "Bracket and race contests on any KPI",
    ],
    variant: "sales",
  },
  {
    title: "Support",
    icon: "headset",
    summary: "Customer support, success and contact-center service teams.",
    points: [
      "Tickets solved, CSAT, first-response and resolution time",
      "Queue depth and SLA risk, refreshed by the second",
      "Recognition for five-star ratings, not just volume",
      "Balanced scorecards so speed never beats quality",
    ],
    variant: "support",
  },
];

/** Team progress rings used in the "Targets vs actual" feature card and the sales segment. */
export const TARGET_RINGS: readonly { label: string; progress: number; color: string; caption: string }[] = [
  { label: "Revenue", progress: 0.82, color: "var(--flame)", caption: "$49.2k / $60k" },
  { label: "Meetings", progress: 0.64, color: "var(--gold)", caption: "23 / 36" },
  { label: "Calls", progress: 0.97, color: "var(--mint)", caption: "543 / 560" },
];

export const ALERT_POINTS = [
  "Custom sounds and animations per rule",
  "Quiet hours and per-screen mute",
  "Slack, Microsoft Teams, email and mobile push",
] as const;

export const TV_MODE_POINTS = [
  "Works on smart TVs, streaming sticks, mini PCs and spare laptops",
  "Rotate boards on a timer, or pin one during a contest final",
  "Night mode dims screens after hours automatically",
  "Screen links are revocable and never expose admin settings",
] as const;
