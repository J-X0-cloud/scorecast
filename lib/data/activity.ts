import type { ActivityItem, ActivityKind, ActivityTemplate } from "@/types/activity";
import type { TeamId } from "@/types/board";
import type { IconName } from "@/components/ui/icons";
import { CLIENTS } from "./teams";
import { FEED_MINUTES } from "./snapshot";

const FEED_TEMPLATES: Record<TeamId, readonly ActivityTemplate[]> = {
  west: [
    { rep: "Priya N.", rosterIndex: 0, text: "closed {client} — {amount}", amount: "$12,400", kind: "deal" },
    { rep: "Marcus T.", rosterIndex: 1, text: "booked a demo with {client}", kind: "meet" },
    { rep: "Dana R.", rosterIndex: 2, text: "unlocked **Century** — 100 calls today", kind: "badge" },
    { rep: "Owen K.", rosterIndex: 3, text: "moved up to #4 on revenue", kind: "up" },
    { rep: "Sofia M.", rosterIndex: 4, text: "closed {client} — {amount}", amount: "$6,850", kind: "deal" },
    { rep: "Jamal W.", rosterIndex: 5, text: "booked a demo with {client}", kind: "meet" },
    { rep: "Lena H.", rosterIndex: 6, text: "started a 5-day booking streak", kind: "badge" },
  ],
  east: [
    { rep: "Grace L.", rosterIndex: 0, text: "closed {client} — {amount}", amount: "$18,200", kind: "deal" },
    { rep: "Kenji O.", rosterIndex: 5, text: "won semifinal 12–9 in Demo Derby", kind: "badge" },
    { rep: "Andre P.", rosterIndex: 1, text: "booked a demo with {client}", kind: "meet" },
    { rep: "Mia C.", rosterIndex: 2, text: "closed {client} — {amount}", amount: "$4,300", kind: "deal" },
    { rep: "Hannah S.", rosterIndex: 4, text: "moved up to #3 on calls", kind: "up" },
    { rep: "Ivy J.", rosterIndex: 7, text: "unlocked **First blood** — first deal of the day", kind: "badge" },
    { rep: "Noah F.", rosterIndex: 6, text: "booked a demo with {client}", kind: "meet" },
  ],
  support: [
    { rep: "Tessa G.", rosterIndex: 0, text: "cleared the priority queue", kind: "badge" },
    { rep: "Luis A.", rosterIndex: 1, text: "got a 5-star rating from {client}", kind: "star" },
    { rep: "Amara E.", rosterIndex: 2, text: "solved her 30th ticket today", kind: "deal" },
    { rep: "Ben Y.", rosterIndex: 3, text: "unlocked **Speed demon** — 10 replies under 2 min", kind: "badge" },
    { rep: "Chloe V.", rosterIndex: 4, text: "got a 5-star rating from {client}", kind: "star" },
    { rep: "Devin Q.", rosterIndex: 5, text: "moved up to #2 on CSAT", kind: "up" },
    { rep: "Nadia K.", rosterIndex: 6, text: "closed an escalation for {client}", kind: "deal" },
  ],
};

export const ACTIVITY_ICONS: Record<ActivityKind, IconName> = {
  deal: "check",
  meet: "calendar",
  badge: "star",
  up: "arrow",
  star: "star",
};

/** Resolve the team's feed templates into dated items, newest first. */
export function activityFeed(team: TeamId, limit = 6): ActivityItem[] {
  const minutes = FEED_MINUTES[team];
  return FEED_TEMPLATES[team].slice(0, limit).map((tpl, k) => {
    const client = CLIENTS[(k * 3 + team.length) % CLIENTS.length] ?? CLIENTS[0];
    return {
      id: `${team}-${k}`,
      team,
      rep: tpl.rep,
      rosterIndex: tpl.rosterIndex,
      text: tpl.text.replace("{client}", client),
      amount: tpl.amount,
      kind: tpl.kind,
      minutesAgo: k === 0 ? 0 : (minutes[k] ?? k),
    };
  });
}

export const TICKER_MESSAGES: Record<TeamId, readonly string[]> = {
  west: [
    "Priya N. closed Halvorsen Freight — $12,400",
    "Spring Sprint: Falcons lead by 7",
    "Dana R. unlocked Century",
    "Team is 4% ahead of yesterday's pace",
    "Next contest starts Monday: Summer Stretch",
  ],
  east: [
    "Grace L. closed Northgate Storage — $18,200",
    "Demo Derby final is live: Grace L. vs Kenji O.",
    "Ivy J. unlocked First blood",
    "Hannah S. moved up to #3 on calls",
    "All-hands at 4:30 PM in the lounge",
  ],
  support: [
    "Tessa G. cleared the priority queue",
    "Five-Star Cup: Pod Aurora leads with 352",
    "Median first response under 4 minutes all day",
    "Luis A. got a 5-star rating from Tidewell Solar",
    "Backlog is down 18 since 9 AM",
  ],
};
