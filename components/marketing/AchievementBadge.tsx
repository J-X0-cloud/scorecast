import type { Achievement } from "@/types/contest";
import { ICON_PATHS } from "@/components/ui/icons";

interface AchievementBadgeProps {
  achievement: Achievement;
  /** Override the caption, e.g. "Dana R. · 100 calls" when showing who earned it. */
  caption?: string;
}

/** Hexagonal achievement badge with the icon drawn inside the inner hex. */
export function AchievementBadge({ achievement, caption }: AchievementBadgeProps) {
  const { name, description, icon, from, to, locked } = achievement;
  const gradientId = `badge-${name.toLowerCase().replace(/[^a-z]+/g, "-")}`;

  return (
    <div className={locked ? "badge locked" : "badge"}>
      <svg viewBox="0 0 100 110" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={from} />
            <stop offset="1" stopColor={to} />
          </linearGradient>
        </defs>
        <path d="M50 4l42 24v54L50 106 8 82V28z" fill={`url(#${gradientId})`} />
        <path
          d="M50 14l33 19v44L50 96 17 77V33z"
          fill="none"
          stroke="#fff"
          strokeOpacity=".45"
          strokeWidth={2}
        />
        <g
          transform="translate(29 34) scale(1.75)"
          fill="none"
          stroke="#fff"
          strokeWidth={1.9}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ICON_PATHS[icon]}
        </g>
      </svg>
      <b>{name}</b>
      <small>{caption ?? description}</small>
    </div>
  );
}
