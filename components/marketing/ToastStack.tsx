import type { WinNotification } from "@/lib/data/notifications";
import { Toast } from "./Toast";

/** Staggered pile of notifications; the `t2…t4` classes offset each card. */
export function ToastStack({ items, className = "toasts" }: { items: readonly WinNotification[]; className?: string }) {
  return (
    <div className={className}>
      {items.map((n, i) => (
        <Toast key={`${n.rep}-${i}`} {...n} className={i > 0 ? `t${i + 1}` : undefined} />
      ))}
    </div>
  );
}
