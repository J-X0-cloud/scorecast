import Link from "next/link";

/** The Scorecast gauge mark. Also exported as `public/favicon.svg`. */
export function LogoMark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="11" fill="#ff5a2c" />
      <path
        d="M9.5 27.5a12 12 0 0 1 21 0"
        fill="none"
        stroke="#fff"
        strokeOpacity=".35"
        strokeWidth={3.4}
        strokeLinecap="round"
      />
      <path d="M9.5 27.5a12 12 0 0 1 14.6-13.9" fill="none" stroke="#fff" strokeWidth={3.4} strokeLinecap="round" />
      <path d="M20 27.5l7.5-9.5" stroke="#15111f" strokeWidth={3} strokeLinecap="round" />
      <circle cx="20" cy="27.5" r="3.2" fill="#15111f" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Scorecast home">
      <LogoMark />
      <span>
        Score<b>cast</b>
      </span>
    </Link>
  );
}
