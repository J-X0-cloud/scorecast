import type { TeamId } from "@/types/board";

export type ActivityKind = "deal" | "meet" | "badge" | "up" | "star";

export interface ActivityTemplate {
  rep: string;
  rosterIndex: number;
  /**
   * Message after the rep's name. `{client}` and `{amount}` are filled in at render time,
   * `**text**` is emphasised.
   */
  text: string;
  amount?: string;
  kind: ActivityKind;
}

export interface ActivityItem {
  id: string;
  team: TeamId;
  rep: string;
  rosterIndex: number;
  text: string;
  amount?: string;
  kind: ActivityKind;
  /** Minutes before the snapshot time. 0 renders as "just now". */
  minutesAgo: number;
}
