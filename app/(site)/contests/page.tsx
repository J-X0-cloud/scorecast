import type { Metadata } from "next";
import { ACHIEVEMENTS, CONTEST_FORMATS, DEMO_DERBY, RACES } from "@/lib/data/contests";
import { CONTEST_PRINCIPLES } from "@/lib/data/dashboards";
import { ALERT_POINTS } from "@/lib/data/home";
import { ALERT_NOTIFICATIONS } from "@/lib/data/notifications";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CardHeader } from "@/components/ui/CardHeader";
import { Icon } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Pill";
import { ContestBracket } from "@/components/board/ContestBracket";
import { ContestRace } from "@/components/board/ContestRace";
import { AchievementBadge } from "@/components/marketing/AchievementBadge";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Highlights } from "@/components/marketing/Highlights";
import { Kicker, SectionHeading } from "@/components/marketing/Kicker";
import { RewardShelf } from "@/components/marketing/RewardShelf";
import { TickList } from "@/components/marketing/TickList";
import { ToastStack } from "@/components/marketing/ToastStack";

export const metadata: Metadata = {
  title: "Contests, achievements & win alerts",
  description:
    "Gamified sales and support contests: brackets, team races, sprints, achievement badges, rewards and real-time win notifications on every screen.",
};

export default function ContestsPage() {
  return (
    <>
      <section className="hero sub">
        <div className="wrap">
          <div className="hero-t narrow">
            <span className="eyebrow">
              <Icon name="flame" />
              Contests &amp; recognition
            </span>
            <h1>
              Friendly competition, <em>fairly</em> refereed.
            </h1>
            <p className="lede">
              Brackets, races and sprints that run themselves off live data. Scorecast keeps score, handles tie-breaks
              and throws the confetti, so managers can coach instead of updating spreadsheets.
            </p>
            <div className="hero-b">
              <ButtonLink href="/pricing" size="lg">
                Start a 14-day trial
              </ButtonLink>
              <ButtonLink href="/demo" variant="ghost" size="lg" icon="play">
                See a contest live
              </ButtonLink>
            </div>
          </div>
          <div className="board bracket-board">
            <div className="card">
              <CardHeader icon="trophy" title={`${DEMO_DERBY.name} · Sales · East`}>
                <Pill tone="hot">Final · live</Pill>
              </CardHeader>
              <p className="goal">
                Head-to-head on meetings booked, one round per week. Ties go to the higher show rate.
              </p>
              <div className="hscroll">
                <ContestBracket bracket={DEMO_DERBY} big />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHeading icon="grid" kicker="Contest formats" title="Four formats cover almost every campaign.">
            Pick a format, a KPI, the people and a prize. Scorecast builds the board, schedules the rounds and announces
            the winners.
          </SectionHeading>
          <div className="fmts">
            {CONTEST_FORMATS.map((format) => (
              <article className="fmt" key={format.name}>
                <Icon name={format.icon} />
                <h3>{format.name}</h3>
                <p>{format.description}</p>
              </article>
            ))}
          </div>
          <div className="two race-two">
            {[RACES.west, RACES.support].map(
              (race) =>
                race && (
                  <div className="board" key={race.name}>
                    <ContestRace contest={race} big />
                  </div>
                ),
            )}
          </div>
        </div>
      </section>

      <section className="sec alt" id="badges">
        <div className="wrap">
          <SectionHeading icon="star" kicker="Achievements" title="Badges for the moments worth a high five.">
            Automatic, rules-based and visible on every profile. Build your own in seconds from any KPI and threshold.
          </SectionHeading>
          <div className="badges">
            {ACHIEVEMENTS.map((achievement) => (
              <AchievementBadge key={achievement.name} achievement={achievement} />
            ))}
          </div>
        </div>
      </section>

      <section className="sec dark-sec" id="alerts">
        <div className="wrap split">
          <div>
            <Kicker icon="sound">Instant notifications</Kicker>
            <h2>Every win gets its moment on the big screen.</h2>
            <p>
              Set a rule once: deal over $5,000, a five-star rating, a new personal best. Scorecast pops it on every TV
              with the rep&apos;s chosen walk-up sound and posts it to the team channel at the same time.
            </p>
            <TickList items={ALERT_POINTS} />
          </div>
          <ToastStack items={ALERT_NOTIFICATIONS} className="split-v toasts big" />
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <div>
            <Kicker icon="gift">Rewards</Kicker>
            <h2>Points that turn into things people actually want.</h2>
            <p>
              Contest wins and badges earn points. Admins stock the reward shelf with perks that fit the culture, and
              approve redemptions from one queue.
            </p>
          </div>
          <div className="split-v">
            <RewardShelf />
          </div>
        </div>
      </section>

      <Highlights items={CONTEST_PRINCIPLES} tone="alt" />

      <CtaBand
        title="Launch your first contest on Monday."
        body="Pick a template, set the prize and let the board run it. Every plan includes unlimited contests."
      />
    </>
  );
}
