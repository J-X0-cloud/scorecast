"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

interface TickerProps {
  messages: readonly string[];
}

/**
 * Scrolling headline strip along the bottom of a board. The sequence is rendered twice so the
 * CSS marquee loops seamlessly; hovering pauses it for anyone reading at a desk.
 */
export function Ticker({ messages }: TickerProps) {
  const [paused, setPaused] = useState(false);
  const loop = [...messages, ...messages];

  return (
    <div
      className={paused ? "ticker paused" : "ticker"}
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="tk-in">
        {loop.map((message, i) => (
          <span key={i}>
            <Icon name="bolt" />
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
