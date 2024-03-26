import type { IconName } from "@/components/ui/icons";

export interface WinNotification {
  rep: string;
  rosterIndex: number;
  text: string;
  amount?: string;
  icon: IconName;
}

export const HERO_NOTIFICATION: WinNotification = {
  rep: "Priya N.",
  rosterIndex: 0,
  text: "closed Halvorsen Freight",
  amount: "$12,400",
  icon: "check",
};

export const FEATURE_NOTIFICATIONS: readonly WinNotification[] = [
  { rep: "Grace L.", rosterIndex: 0, text: "closed Northgate Storage", amount: "$18,200", icon: "check" },
  { rep: "Luis A.", rosterIndex: 1, text: "got a 5-star rating from Tidewell Solar", icon: "star" },
  { rep: "Dana R.", rosterIndex: 2, text: "unlocked **Century**, 100 calls today", icon: "bolt" },
];

export const ALERT_NOTIFICATIONS: readonly WinNotification[] = [
  { rep: "Grace L.", rosterIndex: 0, text: "closed Northgate Storage", amount: "$18,200", icon: "check" },
  { rep: "Kenji O.", rosterIndex: 5, text: "won the semifinal 12–9", icon: "trophy" },
  { rep: "Amara E.", rosterIndex: 2, text: "hit a new personal best: 41 tickets", icon: "star" },
  { rep: "Owen K.", rosterIndex: 3, text: "passed Dana R. for #3 on revenue", icon: "arrow" },
];
