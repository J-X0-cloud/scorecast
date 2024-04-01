import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/icons";

export function Kicker({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <span className="kick">
      <Icon name={icon} />
      {children}
    </span>
  );
}

interface SectionHeadingProps {
  icon?: IconName;
  kicker?: string;
  title: string;
  children?: ReactNode;
}

/** Centered section intro: kicker, heading and an optional lede paragraph. */
export function SectionHeading({ icon, kicker, title, children }: SectionHeadingProps) {
  return (
    <div className="sec-h">
      {icon && kicker && <Kicker icon={icon}>{kicker}</Kicker>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
