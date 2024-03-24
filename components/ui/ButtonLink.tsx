import type { ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Icon } from "./Icon";
import type { IconName } from "./icons";

type Variant = "primary" | "ghost" | "ghost-l" | "dark";
type Size = "sm" | "md" | "lg";

interface ButtonLinkProps {
  href: string;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ href, variant = "primary", size = "md", icon, className, children }: ButtonLinkProps) {
  const classes = clsx("btn", `btn-${variant}`, size !== "md" && `btn-${size}`, className);
  const content = (
    <>
      {icon && <Icon name={icon} />}
      {children}
    </>
  );

  // Mail links and in-page anchors are plain anchors; routes go through the router.
  if (href.startsWith("mailto:") || href.startsWith("#")) {
    return (
      <a className={classes} href={href}>
        {content}
      </a>
    );
  }
  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}
