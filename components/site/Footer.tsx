import Link from "next/link";
import { CONTACT_EMAIL, FOOTER_COLUMNS, LEGAL_LINKS, type NavLink } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";

function FooterLink({ link }: { link: NavLink }) {
  if (link.href.startsWith("/")) return <Link href={link.href}>{link.label}</Link>;
  return <a href={link.href}>{link.label}</a>;
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot">
          <div className="foot-brand">
            <Logo />
            <p>
              Live KPI dashboards, leaderboards and contests for sales and support teams. Put the scoreboard where
              everyone can see it.
            </p>
            <ButtonLink href={`mailto:${CONTACT_EMAIL}`} size="sm">
              Book a walkthrough
            </ButtonLink>
          </div>
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>&copy; 2026 Scorecast, Inc. All rights reserved.</span>
          <span className="status">All systems operational</span>
          <span>
            {LEGAL_LINKS.map((link, i) => (
              <span key={link.label}>
                {i > 0 && <> &nbsp;·&nbsp; </>}
                <a href={link.href}>{link.label}</a>
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
