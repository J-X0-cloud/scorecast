import type { CSSProperties } from "react";
import clsx from "clsx";
import { avatarColor, initials } from "@/lib/people";

interface AvatarProps {
  name: string;
  /** Roster position; picks a stable colour from the avatar palette. */
  index: number;
  size?: "sm" | "xl";
}

export function Avatar({ name, index, size }: AvatarProps) {
  return (
    <span className={clsx("av", size)} style={{ "--c": avatarColor(index) } as CSSProperties}>
      {initials(name)}
    </span>
  );
}
