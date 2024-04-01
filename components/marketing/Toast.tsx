import { Avatar } from "@/components/ui/Avatar";
import { Icon } from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/icons";
import { RichText } from "@/components/ui/RichText";

export interface ToastProps {
  rep: string;
  rosterIndex: number;
  text: string;
  amount?: string;
  icon?: IconName;
  className?: string;
}

/** Win notification as it pops up on the TV and in Slack. */
export function Toast({ rep, rosterIndex, text, amount, icon = "check", className }: ToastProps) {
  return (
    <div className={className ? `toast ${className}` : "toast"}>
      <Avatar name={rep} index={rosterIndex} />
      <div>
        <small>
          <Icon name={icon} /> just now
        </small>
        <p>
          <b>{rep}</b> <RichText text={text} /> {amount && <b className="amt">{amount}</b>}
        </p>
      </div>
    </div>
  );
}
