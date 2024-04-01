"use client";

import { useState } from "react";
import type { Bracket, BracketMatch } from "@/types/contest";
import { TEAMS } from "@/lib/data/teams";
import { firstName } from "@/lib/people";
import { Avatar } from "@/components/ui/Avatar";
import { Crown } from "@/components/ui/Crown";
import { Icon } from "@/components/ui/Icon";

interface ContestBracketProps {
  bracket: Bracket;
  /** Full-size layout with full names and a champion column. */
  big?: boolean;
}

interface MatchCardProps {
  match: BracketMatch;
  seeds: readonly string[];
  roster: readonly string[];
  fullNames: boolean;
  live?: boolean;
  traced: number | null;
  onTrace: (seed: number | null) => void;
}

function MatchCard({ match, seeds, roster, fullNames, live = false, traced, onTrace }: MatchCardProps) {
  const leader = match[0][1] >= match[1][1] ? 0 : 1;

  return (
    <div className={live ? "match live" : "match"}>
      {match.map(([seed, score], side) => {
        const name = seeds[seed] ?? "";
        const classes = ["m-row"];
        if (side === leader) classes.push(live ? "lead" : "win");
        if (traced === seed) classes.push("trace");
        return (
          <div
            key={seed}
            className={classes.join(" ")}
            tabIndex={0}
            onMouseEnter={() => onTrace(seed)}
            onMouseLeave={() => onTrace(null)}
            onFocus={() => onTrace(seed)}
            onBlur={() => onTrace(null)}
          >
            <Avatar name={name} index={roster.indexOf(name)} size="sm" />
            <span>{fullNames ? name : firstName(name)}</span>
            <b>{score}</b>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Single-elimination bracket. Hovering or focusing a player traces their run through the rounds,
 * which is how people read a bracket on the wall ("how did Kenji get to the final?").
 */
export function ContestBracket({ bracket, big = false }: ContestBracketProps) {
  const [traced, setTraced] = useState<number | null>(null);
  const shared = { seeds: bracket.seeds, roster: TEAMS[bracket.team].reps, fullNames: big, traced, onTrace: setTraced };

  // Quarterfinals are drawn as two stacked pairs so the connectors line up with the semifinals.
  const quarterPairs = [bracket.quarterfinals.slice(0, 2), bracket.quarterfinals.slice(2, 4)];

  return (
    <div className={big ? "bracket big" : "bracket"}>
      <div className="rnd">
        <h4>Quarterfinals</h4>
        {quarterPairs.map((pair, i) => (
          <div className="pair" key={i}>
            {pair.map((match, j) => (
              <MatchCard key={j} match={match} {...shared} />
            ))}
          </div>
        ))}
      </div>
      <div className="rnd">
        <h4>Semifinals</h4>
        <div className="pair">
          {bracket.semifinals.map((match, i) => (
            <MatchCard key={i} match={match} {...shared} />
          ))}
        </div>
      </div>
      <div className="rnd">
        <h4>
          Final <span className="livetag">Live</span>
        </h4>
        <div className="solo">
          <MatchCard match={bracket.final} live {...shared} />
        </div>
      </div>
      {big && (
        <div className="rnd champ-col">
          <h4>Champion</h4>
          <div className="solo">
            <div className="champ">
              <Crown />
              <span className="tbd">?</span>
              <b>To be decided</b>
              <small>Final ends {bracket.endsAt}</small>
              <em>
                <Icon name="gift" />
                Prize: {bracket.prize}
              </em>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
