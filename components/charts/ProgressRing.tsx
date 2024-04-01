import type { CSSProperties } from "react";
import { clamp } from "@/lib/geometry";

interface ProgressRingProps {
  /** 0–1; values above 1 render as a full ring but keep their label. */
  progress: number;
  size?: number;
  stroke?: number;
  color?: string;
  label?: string;
  className?: string;
}

export function ProgressRing({
  progress,
  size = 64,
  stroke = 8,
  color = "var(--flame)",
  label,
  className = "ring",
}: ProgressRingProps) {
  const radius = (size - stroke) / 2;
  const c = size / 2;
  const shown = clamp(progress, 0, 1) * 100;

  return (
    <div className={className} style={{ "--s": `${size}px` } as CSSProperties}>
      <svg viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={c} cy={c} r={radius} fill="none" stroke="var(--track)" strokeWidth={stroke} />
        <circle
          cx={c}
          cy={c}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${shown.toFixed(1)} 100`}
          transform={`rotate(-90 ${c} ${c})`}
        />
      </svg>
      <b>{label ?? `${Math.round(progress * 100)}%`}</b>
    </div>
  );
}
