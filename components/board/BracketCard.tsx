import { DEMO_DERBY } from "@/lib/data/contests";
import { CardHeader } from "@/components/ui/CardHeader";
import { Pill } from "@/components/ui/Pill";
import { ContestBracket } from "./ContestBracket";

export function BracketCard() {
  return (
    <section className="card ccard">
      <CardHeader icon="trophy" title={`${DEMO_DERBY.name} bracket`}>
        <Pill tone="hot">Final · live</Pill>
      </CardHeader>
      <p className="goal">{DEMO_DERBY.goal}</p>
      <div className="hscroll">
        <ContestBracket bracket={DEMO_DERBY} />
      </div>
    </section>
  );
}
