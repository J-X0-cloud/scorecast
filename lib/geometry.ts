/** Small SVG helpers shared by the hand-drawn charts. */

export interface Point {
  x: number;
  y: number;
}

/** Point on a circle, with 0 rad pointing right and angles growing counter-clockwise (SVG y is flipped). */
export function polar(cx: number, cy: number, radius: number, angle: number): Point {
  return { x: cx + radius * Math.cos(angle), y: cy - radius * Math.sin(angle) };
}

/** Linear scale from a data domain onto a pixel range. */
export function linearScale(domain: [number, number], range: [number, number]) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const k = d1 === d0 ? 0 : (r1 - r0) / (d1 - d0);
  return (value: number) => r0 + (value - d0) * k;
}

export const toPoints = (points: readonly Point[]) =>
  points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
