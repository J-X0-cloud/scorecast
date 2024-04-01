import type { RaceContest } from "@/types/contest";
import { TEAMS } from "@/lib/data/teams";
import { Avatar } from "@/components/ui/Avatar";
import { CardHeader } from "@/components/ui/CardHeader";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";

interface ContestRaceProps {
  contest: RaceContest;
  big?: boolean;
}

/** Squads racing to a shared finish line; the captain's avatar is the runner. */
export function ContestRace({ contest, big = false }: ContestRaceProps) {
  const roster = TEAMS[contest.team].reps;

  return (
    <section className={big ? "card ccard big" : "card ccard"}>
      <CardHeader icon="flame" title={contest.name}>
        <Pill tone="hot">{contest.timeLeft}</Pill>
      </CardHeader>
      <p className="goal">{contest.goal}</p>
      {contest.squads.map((squad, i) => {
        const width = `${((squad.score / contest.target) * 100).toFixed(1)}%`;
        return (
          <div className={i === 0 ? "lane lead" : "lane"} key={squad.name}>
            <div className="lane-l">
              <b>{squad.name}</b>
              <small>
                {squad.score} / {contest.target}
              </small>
            </div>
            <div className="track">
              <i style={{ width }} />
              <span className="runner" style={{ left: width }}>
                <Avatar name={roster[squad.captain] ?? squad.name} index={squad.captain} size="sm" />
              </span>
              <span className="finish">
                <Icon name="flag" />
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
