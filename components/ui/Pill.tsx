import type { ReactNode } from "react";

interface PillProps {
  tone: "good" | "warn" | "hot";
  children: ReactNode;
}

export function Pill({ tone, children }: PillProps) {
  return <span className={`pill ${tone}`}>{children}</span>;
}
