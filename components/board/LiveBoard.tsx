"use client";

import { useCallback, useEffect, useState } from "react";
import type { RangeId, TeamId } from "@/types/board";
import { TICKER_MESSAGES } from "@/lib/data/activity";
import { isRangeId } from "@/lib/data/ranges";
import { TEAM_ORDER, isTeamId, metricsFor } from "@/lib/data/teams";
import { BoardControls } from "./BoardControls";
import { BoardView } from "./BoardView";
import { Ticker } from "./Ticker";

/** Seconds each leaderboard metric stays on screen in TV rotation. */
const ROTATION_INTERVAL_MS = 6000;

interface BoardState {
  team: TeamId;
  range: RangeId;
  metric: number;
}

const INITIAL: BoardState = { team: "west", range: "today", metric: 0 };

/** `#east-week` → { team: "east", range: "week" }, so a TV can be pointed at a specific board. */
function stateFromHash(hash: string): Partial<BoardState> {
  const [team = "", range = ""] = hash.replace(/^#/, "").split("-");
  if (!isTeamId(team)) return {};
  return isRangeId(range) ? { team, range } : { team };
}

/** Advance to the next metric; after the last one, move on to the next team. */
function nextRotation(state: BoardState): BoardState {
  if (state.metric < metricsFor(state.team).length - 1) return { ...state, metric: state.metric + 1 };
  const next = TEAM_ORDER[(TEAM_ORDER.indexOf(state.team) + 1) % TEAM_ORDER.length] ?? "west";
  return { ...state, team: next, metric: 0 };
}

export function LiveBoard() {
  const [state, setState] = useState<BoardState>(INITIAL);
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    setState((s) => ({ ...s, ...stateFromHash(window.location.hash) }));
  }, []);

  useEffect(() => {
    try {
      window.history.replaceState(null, "", `#${state.team}-${state.range}`);
    } catch {
      // Some TV browsers block history writes inside kiosk frames; the board still works.
    }
  }, [state.team, state.range]);

  useEffect(() => {
    if (!rotating) return;
    const id = window.setInterval(() => setState(nextRotation), ROTATION_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [rotating]);

  const selectTeam = useCallback((team: TeamId) => {
    setRotating(false);
    setState((s) => ({ ...s, team, metric: 0 }));
  }, []);

  const selectRange = useCallback((range: RangeId) => setState((s) => ({ ...s, range })), []);
  const selectMetric = useCallback((metric: number) => setState((s) => ({ ...s, metric })), []);

  return (
    <>
      <BoardControls
        team={state.team}
        range={state.range}
        rotating={rotating}
        onTeamChange={selectTeam}
        onRangeChange={selectRange}
        onToggleRotation={() => setRotating((r) => !r)}
      />
      <h1 className="sr">Scorecast live TV dashboard demo</h1>
      <BoardView
        teamId={state.team}
        range={state.range}
        metricIndex={state.metric}
        onMetricChange={selectMetric}
      />
      <div className="tkr">
        <Ticker messages={TICKER_MESSAGES[state.team]} />
      </div>
    </>
  );
}
