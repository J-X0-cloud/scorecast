import type { Metadata } from "next";
import Link from "next/link";
import { ACHIEVEMENTS, RACES } from "@/lib/data/contests";
import { PRODUCT_FAQ } from "@/lib/data/faq";
import { HERO_POINTS, HOW_IT_WORKS, MOBILE_POINTS, TEAM_SEGMENTS } from "@/lib/data/home";
import { FEATURE_NOTIFICATIONS, HERO_NOTIFICATION } from "@/lib/data/notifications";
import { CONNECTORS, CONTACT_EMAIL } from "@/lib/data/site";
import { SALES_METRICS } from "@/lib/data/teams";
import { TESTIMONIALS } from "@/lib/data/testimonials";
import { rankReps } from "@/lib/scoring";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { LiveDot } from "@/components/ui/LiveDot";
import { ContestRace } from "@/components/board/ContestRace";
import { EmbeddedBoard } from "@/components/board/EmbeddedBoard";
import { KpiTiles } from "@/components/board/KpiTiles";
import { LeaderboardRanks } from "@/components/board/LeaderboardRanks";
import { AchievementBadge } from "@/components/marketing/AchievementBadge";
import { CtaBand } from "@/components/marketing/CtaBand";
import { FaqList } from "@/components/marketing/FaqList";
import { FormulaMock } from "@/components/marketing/FormulaMock";
import { Kicker, SectionHeading } from "@/components/marketing/Kicker";
import { PaceBar } from "@/components/marketing/PaceBar";
import { PhoneMock } from "@/components/marketing/PhoneMock";
import { TargetRings } from "@/components/marketing/TargetRings";
import { TickList } from "@/components/marketing/TickList";
import { Toast } from "@/components/marketing/Toast";
import { ToastStack } from "@/components/marketing/ToastStack";

export const metadata: Metadata = {
  title: { absolute: "Scorecast | Live KPI dashboards & TV leaderboards for sales and support" },
};

const century = ACHIEVEMENTS.find((a) => a.name === "Century")!;
const westRace = RACES.west!;

function FeatureTiles() {
  return (
    <div className="feat">
      <article className="fcard-m wide">
        <div className="fc-t">
          <Kicker icon="tv">TV-mode leaderboards</Kicker>
          <h3>A leaderboard people glance at forty times a day.</h3>
          <p>
            Podium, rank changes and progress-to-target on every rep, sized for a 65-inch screen across the room. Cast a
            board to any TV with a private link, no login on the device.
          </p>
          <Link className="more" href="/dashboards">
            See TV dashboards <Icon name="arrow" />
          </Link>
        </div>
        <div className="fc-v dark board">
          <div className="mini-lb">
            <LeaderboardRanks metric={SALES_METRICS[0]!} rows={rankReps("west", "today", 0)} limit={6} />
          </div>
        </div>
      </article>

      <article className="fcard-m">
        <div className="fc-t">
          <Kicker icon="target">Targets vs actual</Kicker>
          <h3>Every number has a finish line.</h3>
          <p>
            Daily, weekly and monthly targets per rep and per team, with pacing that tells you at 11 AM whether today is
            on track.
          </p>
        </div>
        <div className="fc-v rings-v">
          <TargetRings />
          <PaceBar />
        </div>
      </article>

      <article className="fcard-m">
        <div className="fc-t">
          <Kicker icon="flame">Gamified contests</Kicker>
          <h3>Races, brackets and sprints the team actually cares about.</h3>
          <p>
            Launch a contest in two minutes from a template, pick the KPI and the prize, and let the board do the trash
            talk.
          </p>
          <Link className="more" href="/contests">
            Explore contests <Icon name="arrow" />
          </Link>
        </div>
        <div className="fc-v dark board">
          <ContestRace contest={westRace} />
        </div>
      </article>

      <article className="fcard-m wide rev">
        <div className="fc-t">
          <Kicker icon="bell">Real-time notifications</Kicker>
          <h3>Celebrate the win while it&apos;s still warm.</h3>
          <p>
            Closed deals, five-star ratings and personal bests pop up on the TV with the rep&apos;s own walk-up sound,
            and post to Slack or Microsoft Teams at the same moment.
          </p>
          <Link className="more" href="/contests#alerts">
            How alerts work <Icon name="arrow" />
          </Link>
        </div>
        <ToastStack items={FEATURE_NOTIFICATIONS} className="fc-v toasts" />
      </article>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="hero-t">
            <span className="eyebrow">
              <LiveDot />
              KPI dashboards for sales &amp; support teams
            </span>
            <h1>
              Put the <em>scoreboard</em> where everyone can see it.
            </h1>
            <p className="lede">
              Scorecast turns CRM, phone and helpdesk data into live TV leaderboards, targets and contests, so every rep
              knows the score before they pick up the next call.
            </p>
            <div className="hero-b">
              <ButtonLink href="/pricing" size="lg">
                Start a 14-day trial
              </ButtonLink>
              <ButtonLink href="/demo" variant="ghost" size="lg" icon="play">
                Open live board
              </ButtonLink>
            </div>
            <ul className="hero-p">
              {HERO_POINTS.map((point) => (
                <li key={point}>
                  <Icon name="check" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-v">
            <div className="tv">
              <EmbeddedBoard teamId="west" range="today" />
            </div>
            <div className="tv-stand" />
            <Toast {...HERO_NOTIFICATION} className="float f1" />
            <div className="float f2 badge-pop">
              <AchievementBadge achievement={century} caption="Dana R. · 100 calls" />
            </div>
          </div>
        </div>
      </section>

      <section className="connect" id="connect">
        <div className="wrap">
          <p>Pulls live numbers from the tools your team already works in</p>
          <ul className="conn">
            {CONNECTORS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHeading icon="grid" kicker="What's on the board" title="Four things every sales and support floor needs on the wall.">
            Scorecast is deliberately narrow: live numbers, clear targets, friendly competition and instant recognition.
            No 40-tab BI suite to learn.
          </SectionHeading>
          <FeatureTiles />
        </div>
      </section>

      <section className="sec alt" id="how">
        <div className="wrap split">
          <div>
            <Kicker icon="sigma">How it works</Kicker>
            <h2>From raw activity to a live board in three steps.</h2>
            <ol className="steps">
              {HOW_IT_WORKS.map((step) => (
                <li key={step.title}>
                  <b>{step.title}</b>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="split-v">
            <FormulaMock />
          </div>
        </div>
      </section>

      <section className="sec dark-sec">
        <div className="wrap split">
          <div className="split-v">
            <PhoneMock />
          </div>
          <div>
            <Kicker icon="mobile">Wall &amp; pocket</Kicker>
            <h2>The same scoreboard on the TV, in Slack and on every phone.</h2>
            <p>
              Remote and hybrid reps see exactly what the office sees. The mobile app shows personal progress, the live
              leaderboard and contest standings, with push alerts when someone passes you.
            </p>
            <TickList items={MOBILE_POINTS} />
            <ButtonLink href="/demo">Try the live board</ButtonLink>
          </div>
        </div>
      </section>

      <section className="sec" id="teams">
        <div className="wrap">
          <SectionHeading
            icon="users"
            kicker="Built for two kinds of floor"
            title="Sales teams chase targets. Support teams protect them."
          />
          <div className="two">
            {TEAM_SEGMENTS.map((segment) => (
              <article key={segment.title} className={segment.variant === "support" ? "team-c sup" : "team-c"}>
                <h3>
                  <Icon name={segment.icon} />
                  {segment.title}
                </h3>
                <p>{segment.summary}</p>
                <ul>
                  {segment.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {segment.variant === "sales" ? (
                  <div className="team-v">
                    <TargetRings />
                  </div>
                ) : (
                  <div className="team-v board">
                    <KpiTiles teamId="support" range="today" />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap quote-w">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className={t.size === "sm" ? "quote sm" : "quote"}>
              <blockquote>&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption>
                <Avatar name={t.name} index={t.avatarIndex} />
                <div>
                  <b>{t.name}</b>
                  <small>{t.role}</small>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="wrap faq-w">
          <div>
            <Kicker icon="bell">FAQ</Kicker>
            <h2>Questions teams ask before the first board goes up.</h2>
            <p>
              Something else? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and a real person replies
              the same day.
            </p>
          </div>
          <FaqList items={PRODUCT_FAQ} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
