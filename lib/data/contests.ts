import type { Achievement, Bracket, ContestFormat, RaceContest, Reward } from "@/types/contest";
import type { TeamId } from "@/types/board";

export const RACES: Partial<Record<TeamId, RaceContest>> = {
  west: {
    team: "west",
    name: "Spring Sprint",
    goal: "First squad to 120 meetings",
    target: 120,
    timeLeft: "2d 06h left",
    squads: [
      { name: "Falcons", score: 104, captain: 0 },
      { name: "Comets", score: 97, captain: 3 },
      { name: "Riptide", score: 88, captain: 5 },
      { name: "Summit", score: 71, captain: 1 },
    ],
  },
  support: {
    team: "support",
    name: "Five-Star Cup",
    goal: "First pod to 400 five-star ratings",
    target: 400,
    timeLeft: "2d 06h left",
    squads: [
      { name: "Pod Aurora", score: 352, captain: 2 },
      { name: "Pod Harbor", score: 331, captain: 4 },
      { name: "Pod Juniper", score: 296, captain: 6 },
      { name: "Pod Quill", score: 268, captain: 7 },
    ],
  },
};

export const DEMO_DERBY: Bracket = {
  team: "east",
  name: "Demo Derby",
  goal: "Head-to-head on meetings booked, one round a week",
  seeds: ["Grace L.", "Kenji O.", "Andre P.", "Ivy J.", "Mia C.", "Noah F.", "Rafael D.", "Hannah S."],
  quarterfinals: [
    [
      [0, 38],
      [5, 29],
    ],
    [
      [2, 31],
      [7, 33],
    ],
    [
      [4, 36],
      [6, 34],
    ],
    [
      [1, 27],
      [3, 22],
    ],
  ],
  semifinals: [
    [
      [0, 14],
      [7, 11],
    ],
    [
      [4, 9],
      [1, 12],
    ],
  ],
  final: [
    [0, 6],
    [1, 5],
  ],
  prize: "a paid Friday afternoon off",
  endsAt: "Friday 5:00 PM",
};

export const CONTEST_FORMATS: readonly ContestFormat[] = [
  {
    name: "Bracket",
    icon: "trophy",
    description: "Head-to-head rounds on any KPI, seeded automatically from last month's results.",
  },
  { name: "Team race", icon: "flag", description: "Squads race to a shared finish line. Great for cross-pod rivalries." },
  {
    name: "Sprint",
    icon: "bolt",
    description: "A one-hour or one-day burst on a single KPI, with a countdown on every screen.",
  },
  {
    name: "Personal best",
    icon: "target",
    description: "Everyone competes against their own record, so new hires can win too.",
  },
];

export const ACHIEVEMENTS: readonly Achievement[] = [
  { name: "First blood", description: "First deal of the day", icon: "flame", from: "#ff7a50", to: "#e2441a" },
  { name: "Century", description: "100 calls in a day", icon: "phone", from: "#ffc23a", to: "#f08a00" },
  { name: "Closer", description: "5 deals in a week", icon: "trophy", from: "#9b7bff", to: "#5b3fd6" },
  { name: "On a roll", description: "5-day booking streak", icon: "bolt", from: "#ff5fa2", to: "#c22a6e" },
  { name: "Five-star", description: "10 perfect ratings", icon: "star", from: "#27d69c", to: "#0f9a6c" },
  { name: "Clean queue", description: "Priority queue at zero", icon: "shield", from: "#4cc3ff", to: "#1776c9" },
  { name: "Speed demon", description: "10 replies under 2 min", icon: "clock", from: "#b9dd4f", to: "#6f9a12" },
  { name: "Hall of fame", description: "Win 3 contests", icon: "gift", from: "#8a8497", to: "#57516a", locked: true },
];

export const REWARDS: readonly Reward[] = [
  { name: "Late start Monday", icon: "coffee", cost: "1,200 pts" },
  { name: "Pick the team playlist", icon: "music", cost: "300 pts" },
  { name: "$25 lunch credit", icon: "gift", cost: "800 pts" },
  { name: "Paid Friday afternoon off", icon: "sun", cost: "2,500 pts" },
];

export const REWARD_BALANCE = { rep: "Priya N.", points: "2,940 pts" };
