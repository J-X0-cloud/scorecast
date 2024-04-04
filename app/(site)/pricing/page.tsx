import type { Metadata } from "next";
import { BILLING_FAQ } from "@/lib/data/faq";
import { PLAN_COMPARISON, PRICING_TIERS, type PricingTier } from "@/lib/data/pricing";
import { CONTACT_EMAIL } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { CtaBand } from "@/components/marketing/CtaBand";
import { FaqList } from "@/components/marketing/FaqList";
import { Kicker } from "@/components/marketing/Kicker";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Scorecast pricing: pay per tracked user, with unlimited dashboards, viewers and TV screens on every plan. 14-day free trial.",
};

function TierCard({ tier }: { tier: PricingTier }) {
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Scorecast ${tier.name}`)}`;
  return (
    <article className={tier.featured ? "tier hot" : "tier"}>
      {tier.featured && <span className="flag">Most popular</span>}
      <h3>{tier.name}</h3>
      <p>{tier.description}</p>
      {tier.price !== null ? (
        <div className="price">
          <b>${tier.price}</b>
          <span>
            per tracked user / month
            <br />
            billed annually
          </span>
        </div>
      ) : (
        <div className="price">
          <b>Custom</b>
          <span>
            volume pricing
            <br />
            from 100 tracked users
          </span>
        </div>
      )}
      <ButtonLink href={mailto} variant={tier.featured ? "primary" : "dark"}>
        {tier.price === null ? "Talk to sales" : "Start 14-day trial"}
      </ButtonLink>
      <ul>
        {tier.features.map((feature) => (
          <li key={feature}>
            <Icon name="check" />
            {feature}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function PricingPage() {
  return (
    <>
      <section className="hero sub short">
        <div className="wrap">
          <div className="hero-t narrow center">
            <span className="eyebrow">
              <Icon name="tv" />
              Pricing
            </span>
            <h1>
              Pay for the players. <em>The crowd</em> watches free.
            </h1>
            <p className="lede">
              Simple per-user pricing for the people on the board. Unlimited dashboards, viewers and TV screens on every
              plan.
            </p>
          </div>
        </div>
      </section>

      <section className="sec tiers-sec">
        <div className="wrap">
          <div className="tiers">
            {PRICING_TIERS.map((tier) => (
              <TierCard key={tier.name} tier={tier} />
            ))}
          </div>
          <p className="fine">
            Prices in USD. Minimum 5 tracked users. All plans include SOC 2 Type II hosting, encrypted connectors and a
            99.9% uptime SLA.
          </p>
        </div>
      </section>

      <section className="sec alt">
        <div className="wrap">
          <div className="sec-h">
            <h2>Compare plans</h2>
          </div>
          <div className="tbl-w">
            <table className="cmp">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr">Feature</span>
                  </th>
                  <th scope="col">Team</th>
                  <th scope="col" className="hl">
                    Floor
                  </th>
                  <th scope="col">Arena</th>
                </tr>
              </thead>
              <tbody>
                {PLAN_COMPARISON.map(([feature, team, floor, arena]) => (
                  <tr key={feature}>
                    <th scope="row">{feature}</th>
                    <td>{team}</td>
                    <td className="hl">{floor}</td>
                    <td>{arena}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap faq-w">
          <div>
            <Kicker icon="bell">Billing FAQ</Kicker>
            <h2>Straight answers about the bill.</h2>
            <p>
              Need a quote or a security review? Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </div>
          <FaqList items={BILLING_FAQ} />
        </div>
      </section>

      <CtaBand
        title="Start with one team and one TV."
        body="Most customers begin with a single floor, then roll Scorecast out once the rest of the building notices."
      />
    </>
  );
}
