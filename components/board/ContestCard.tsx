import type { TeamId } from "@/types/board";
import { RACES } from "@/lib/data/contests";
import { BracketCard } from "./BracketCard";
import { ContestRace } from "./ContestRace";

/** Each team runs one contest at a time: East is mid-bracket, West and Support are racing. */
export function ContestCard({ teamId }: { teamId: TeamId }) {
  const race = RACES[teamId];
  return race ? <ContestRace contest={race} /> : <BracketCard />;
}
