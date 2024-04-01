import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { NavLinks } from "./NavLinks";

export function Header() {
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="wrap nav">
          <Logo />
          <nav className="nav-links" aria-label="Main">
            <NavLinks />
          </nav>
          <div className="nav-cta">
            <a className="signin" href="#">
              Sign in
            </a>
            <ButtonLink href="/demo" variant="ghost" size="sm" icon="play">
              Live demo
            </ButtonLink>
            <ButtonLink href="/pricing" size="sm">
              Start free trial
            </ButtonLink>
          </div>
          <details className="mnav">
            <summary aria-label="Menu">
              <Icon name="menu" />
            </summary>
            <div className="mnav-p">
              <NavLinks />
              <Link href="/demo">Live demo</Link>
              <a href="#">Sign in</a>
              <ButtonLink href="/pricing">Start free trial</ButtonLink>
            </div>
          </details>
        </div>
      </header>
    </>
  );
}
