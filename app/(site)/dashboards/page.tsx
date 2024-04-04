import type { Metadata } from "next";
import { BOARD_TEMPLATES, DASHBOARD_HIGHLIGHTS, WIDGET_LIBRARY } from "@/lib/data/dashboards";
import { TV_MODE_POINTS } from "@/lib/data/home";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { EmbeddedBoard } from "@/components/board/EmbeddedBoard";
import { CtaBand } from "@/components/marketing/CtaBand";
import { Highlights } from "@/components/marketing/Highlights";
import { Kicker, SectionHeading } from "@/components/marketing/Kicker";
import { PlaylistMock } from "@/components/marketing/PlaylistMock";
import { TemplatePreview } from "@/components/marketing/TemplatePreview";
import { TickList } from "@/components/marketing/TickList";

export const metadata: Metadata = {
  title: "TV dashboards & widget library",
  description:
    "Live TV dashboards for sales and support: podium leaderboards, target gauges, burn-ups, heatmaps and auto-rotating screen playlists.",
};

export default function DashboardsPage() {
  return (
    <>
      <section className="hero sub">
        <div className="wrap">
          <div className="hero-t narrow">
            <span className="eyebrow">
              <Icon name="tv" />
              TV dashboards
            </span>
            <h1>
              Dashboards built for the wall, <em>not</em> the meeting room.
            </h1>
            <p className="lede">
              Big type, high contrast and motion that means something. Every Scorecast board is designed to be read from
              across the room in two seconds, then updates itself all day.
            </p>
            <div className="hero-b">
              <ButtonLink href="/demo" size="lg" icon="play">
                Open the live demo
              </ButtonLink>
              <ButtonLink href="/pricing" variant="ghost" size="lg">
                See pricing
              </ButtonLink>
            </div>
          </div>
          <div className="tv wide">
            <EmbeddedBoard teamId="support" range="week" />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SectionHeading icon="grid" kicker="Templates" title="Start from a board that already works.">
            Each template ships with sensible KPIs, targets and layout for its team. Swap the data source and it&apos;s
            yours.
          </SectionHeading>
          <div className="tpls">
            {BOARD_TEMPLATES.map((template) => (
              <article className="tpl" key={template.name}>
                <div className="tpl-v">
                  <TemplatePreview preview={template.preview} />
                </div>
                <div className="tpl-t">
                  <h3>
                    <Icon name={template.icon} />
                    {template.name}
                  </h3>
                  <p>{template.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap split">
          <div>
            <Kicker icon="cast">TV mode</Kicker>
            <h2>One private link per screen. Playlists that rotate on their own.</h2>
            <p>
              Set up a screen once and forget it. Each TV gets its own link, theme and playlist, and Scorecast reconnects
              by itself after power cuts or Wi-Fi drops.
            </p>
            <TickList items={TV_MODE_POINTS} />
          </div>
          <div className="split-v">
            <PlaylistMock />
          </div>
        </div>
      </section>

      <section className="sec" id="widgets">
        <div className="wrap">
          <SectionHeading icon="chart" kicker="Widget library" title="Twelve widgets, each drawn for distance reading.">
            Drag them onto a 12-column grid. Everything is vector, so a board looks as sharp on a 4K wall as it does on
            a phone.
          </SectionHeading>
          <ul className="widgets">
            {WIDGET_LIBRARY.map((widget) => (
              <li key={widget.name}>
                <Icon name={widget.icon} />
                <b>{widget.name}</b>
                <small>{widget.description}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Highlights items={DASHBOARD_HIGHLIGHTS} />

      <CtaBand
        title="See your own numbers on a board."
        body="Connect one source during the trial and we'll help you build the first board on a 30-minute call."
      />
    </>
  );
}
