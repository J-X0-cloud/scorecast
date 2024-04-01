import { TARGET_RINGS } from "@/lib/data/home";
import { ProgressRing } from "@/components/charts/ProgressRing";

export function TargetRings() {
  return (
    <div className="mrings">
      {TARGET_RINGS.map((ring) => (
        <div key={ring.label}>
          <ProgressRing progress={ring.progress} size={96} stroke={11} color={ring.color} />
          <b>{ring.label}</b>
          <small>{ring.caption}</small>
        </div>
      ))}
    </div>
  );
}
