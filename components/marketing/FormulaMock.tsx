import { DeltaChip } from "@/components/ui/DeltaChip";
import { Icon } from "@/components/ui/Icon";

/** Custom KPI editor: a spreadsheet-style formula over fields from connected sources. */
export function FormulaMock() {
  return (
    <div className="formula">
      <div className="f-h">
        <Icon name="sigma" />
        <b>Custom KPI</b>
        <span className="chip on">Saved</span>
      </div>
      <label>Name</label>
      <div className="f-in">Qualified meeting rate</div>
      <label>Formula</label>
      <div className="f-in code">
        <span className="tok m">meetings_held</span> <span className="op">÷</span>{" "}
        <span className="tok m">meetings_booked</span> <span className="op">×</span> <span className="n">100</span>
      </div>
      <div className="f-row">
        <div>
          <label>Filter</label>
          <div className="f-in">Team is Sales · West</div>
        </div>
        <div>
          <label>Target</label>
          <div className="f-in">≥ 75%</div>
        </div>
      </div>
      <div className="f-prev">
        <span>Preview · this week</span>
        <b>78.4%</b>
        <DeltaChip value={3.1} unit=" pts" />
      </div>
    </div>
  );
}
