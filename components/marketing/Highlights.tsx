import type { Highlight } from "@/lib/data/dashboards";
import { Icon } from "@/components/ui/Icon";

interface HighlightsProps {
  items: readonly Highlight[];
  tone?: "dark" | "alt";
}

/** Three-up band of icon + heading + paragraph. */
export function Highlights({ items, tone = "dark" }: HighlightsProps) {
  return (
    <section className={tone === "dark" ? "sec dark-sec" : "sec alt"}>
      <div className="wrap three">
        {items.map((item) => (
          <div key={item.title}>
            <Icon name={item.icon} className="big-ic" />
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
