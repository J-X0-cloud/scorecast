import type { IconName } from "@/components/ui/icons";
import type { TeamId } from "@/types/board";

export interface Squad {
  name: string;
  score: number;
  /** Roster index of the squad captain, shown as the runner on the track. */
  captain: number;
}

export interface RaceContest {
  team: TeamId;
  name: string;
  goal: string;
  target: number;
  timeLeft: string;
  squads: Squad[];
}

/** One side of a bracket match: [index into the bracket seed list, score]. */
export type BracketEntry = readonly [seed: number, score: number];
export type BracketMatch = readonly [BracketEntry, BracketEntry];

export interface Bracket {
  team: TeamId;
  name: string;
  goal: string;
  seeds: readonly string[];
  quarterfinals: readonly BracketMatch[];
  semifinals: readonly BracketMatch[];
  final: BracketMatch;
  prize: string;
  endsAt: string;
}

export interface Achievement {
  name: string;
  description: string;
  icon: IconName;
  from: string;
  to: string;
  locked?: boolean;
}

export interface ContestFormat {
  name: string;
  icon: IconName;
  description: string;
}

export interface Reward {
  name: string;
  icon: IconName;
  cost: string;
}
