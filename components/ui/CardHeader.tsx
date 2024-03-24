import type { ReactNode } from "react";
import { Icon } from "./Icon";
import type { IconName } from "./icons";

interface CardHeaderProps {
  icon: IconName;
  title: ReactNode;
  children?: ReactNode;
}

/** Uppercase card title with an optional right-hand slot (pill, tabs, caption). */
export function CardHeader({ icon, title, children }: CardHeaderProps) {
  return (
    <div className="card-h">
      <h3>
        <Icon name={icon} />
        {title}
      </h3>
      {children}
    </div>
  );
}
