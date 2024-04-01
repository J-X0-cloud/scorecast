import { CONTACT_EMAIL } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

interface CtaBandProps {
  title?: string;
  body?: string;
}

export function CtaBand({
  title = "Put your numbers on the wall this week.",
  body = "Connect a CRM or helpdesk, pick a template and cast it to any screen. Most teams have their first board live before lunch.",
}: CtaBandProps) {
  return (
    <section className="cta-band">
      <div className="wrap">
        <div className="cta-in">
          <div>
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
          <div className="cta-b">
            <ButtonLink href="/pricing" size="lg">
              Start a 14-day trial
            </ButtonLink>
            <ButtonLink href={`mailto:${CONTACT_EMAIL}`} variant="ghost-l" size="lg">
              Book a walkthrough
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
