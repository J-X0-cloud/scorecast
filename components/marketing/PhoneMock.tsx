import { HERO_NOTIFICATION } from "@/lib/data/notifications";
import { rankReps } from "@/lib/scoring";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressRing } from "@/components/charts/ProgressRing";
import { Toast } from "./Toast";

/** The rep's home screen in the mobile app: personal ring, top of the leaderboard, latest win. */
export function PhoneMock() {
  const top = rankReps("west", "today", 0).slice(0, 4);

  return (
    <div className="phone">
      <div className="ph-s">
        <div className="ph-bar">
          <span>2:47</span>
          <i />
          <span>5G</span>
        </div>
        <div className="ph-h">
          <small>Sales · West</small>
          <b>Today</b>
        </div>
        <ProgressRing progress={0.8} size={120} stroke={13} label="80%" className="ring big" />
        <p className="ph-c">$48,240 of $60,000</p>
        <ol className="ph-lb">
          {top.map((row, i) => (
            <li key={row.name}>
              <span className="rk">{i + 1}</span>
              <Avatar name={row.name} index={row.rosterIndex} size="sm" />
              <span>{row.name}</span>
              <b>{row.display}</b>
            </li>
          ))}
        </ol>
        <Toast {...HERO_NOTIFICATION} className="ph-t" />
      </div>
    </div>
  );
}
