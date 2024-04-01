"use client";

import { useEffect, useRef, useState } from "react";
import type { Pacing, TeamTarget } from "@/types/board";
import { money, num } from "@/lib/format";
import { clamp, polar } from "@/lib/geometry";
import { CardHeader } from "@/components/ui/CardHeader";
import { Pill } from "@/components/ui/Pill";

/** The arc runs from 0% to 125% of target, so over-achievement stays visible. */
const ARC_MAX = 1.25;
const CX = 130;
const CY = 130;
const ARC_PATH = "M26 130a104 104 0 0 1 208 0";
const ANIMATION_MS = 700;

interface TargetGaugeProps {
  target: TeamTarget;
  pacing: Pacing;
  /** "today", "this week", "this month". */
  rangeLabel: string;
  /** Unique per board instance: several gauges can share a page. */
  gradientId: string;
}

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/**
 * Animates the arc between values when the team or range changes, so a board switching on the
 * wall reads as movement rather than a flash. Skipped when the viewer prefers reduced motion.
 */
function useAnimatedValue(value: number): number {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    const start = from.current;
    if (start === value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = value;
      setShown(value);
      return;
    }
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - t0) / ANIMATION_MS, 1);
      const next = start + (value - start) * easeOutCubic(t);
      from.current = next;
      setShown(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return shown;
}

const TICKS = Array.from({ length: 26 }, (_, i) => {
  const angle = Math.PI * (1 - i / 25);
  const inner = polar(CX, CY, i % 5 ? 118 : 114, angle);
  const outer = polar(CX, CY, 122, angle);
  return { x1: inner.x.toFixed(1), y1: inner.y.toFixed(1), x2: outer.x.toFixed(1), y2: outer.y.toFixed(1) };
});

export function TargetGauge({ target, pacing, rangeLabel, gradientId }: TargetGaugeProps) {
  const progress = useAnimatedValue(pacing.progress);
  const format = target.unit === "revenue" ? money : num;

  const filled = (clamp(progress, 0, ARC_MAX) / ARC_MAX) * 100;
  const projectedMarker = polar(CX, CY, 104, Math.PI * (1 - clamp(pacing.projected, 0, ARC_MAX) / ARC_MAX));
  const hundredAngle = Math.PI * (1 - 1 / ARC_MAX);
  const tickIn = polar(CX, CY, 90, hundredAngle);
  const tickOut = polar(CX, CY, 124, hundredAngle);
  const percent = Math.round(pacing.progress * 100);

  return (
    <section className="card tcard">
      <CardHeader icon="target" title={`Team target · ${rangeLabel}`}>
        <Pill tone={pacing.onPace ? "good" : "warn"}>{pacing.onPace ? "on pace" : "behind pace"}</Pill>
      </CardHeader>

      <svg className="gauge" viewBox="0 0 260 150" role="img" aria-label={`${percent}% of target`}>
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1">
            <stop offset="0" stopColor="#ff5a2c" />
            <stop offset=".6" stopColor="#ffc23a" />
            <stop offset="1" stopColor="#27d69c" />
          </linearGradient>
        </defs>
        <g stroke="var(--tick)" strokeWidth={1.5}>
          {TICKS.map((t, i) => (
            <line key={i} {...t} />
          ))}
        </g>
        <path d={ARC_PATH} fill="none" stroke="var(--track)" strokeWidth={18} strokeLinecap="round" />
        <path
          d={ARC_PATH}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={18}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${filled.toFixed(1)} 100`}
        />
        <line
          x1={tickIn.x.toFixed(1)}
          y1={tickIn.y.toFixed(1)}
          x2={tickOut.x.toFixed(1)}
          y2={tickOut.y.toFixed(1)}
          stroke="var(--fg)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <text x={(tickOut.x + 4).toFixed(1)} y={(tickOut.y - 2).toFixed(1)} className="g-t">
          100%
        </text>
        <circle
          cx={projectedMarker.x.toFixed(1)}
          cy={projectedMarker.y.toFixed(1)}
          r={7}
          fill="none"
          stroke="var(--fg)"
          strokeWidth={2.5}
          strokeDasharray="3 3"
        />
        <text x="130" y="112" textAnchor="middle" className="g-big">
          {Math.round(progress * 100)}%
        </text>
        <text x="130" y="134" textAnchor="middle" className="g-sm">
          of target
        </text>
      </svg>

      <div className="tstats">
        <div>
          <small>Actual</small>
          <b>{format(target.actual)}</b>
        </div>
        <div>
          <small>Target</small>
          <b>{format(target.target)}</b>
        </div>
        <div>
          <small>Projected</small>
          <b>{Math.round(pacing.projected * 100)}%</b>
        </div>
        <div>
          <small>Need / {pacing.perUnit}</small>
          <b>{format(pacing.needPerUnit)}</b>
        </div>
      </div>
    </section>
  );
}
