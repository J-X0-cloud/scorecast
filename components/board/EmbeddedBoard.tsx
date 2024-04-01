import type { RangeId, TeamId } from "@/types/board";
import { TICKER_MESSAGES } from "@/lib/data/activity";
import { BoardHeader } from "./BoardHeader";
import { BoardView } from "./BoardView";
import { Ticker } from "./Ticker";

/** A full board framed for the marketing pages (inside the `.tv` bezel). */
export function EmbeddedBoard({ teamId, range }: { teamId: TeamId; range: RangeId }) {
  return (
    <div className="board embed">
      <BoardHeader teamId={teamId} range={range} />
      <BoardView teamId={teamId} range={range} />
      <Ticker messages={TICKER_MESSAGES[teamId]} />
    </div>
  );
}
