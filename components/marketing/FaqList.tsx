import type { FaqItem } from "@/lib/data/faq";

export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div>
      {items.map((item) => (
        <details className="faq" key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
