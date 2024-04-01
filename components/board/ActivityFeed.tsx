"use client";

import { useEffect, useState } from "react";
import type { ActivityItem } from "@/types/activity";
import { ACTIVITY_ICONS } from "@/lib/data/activity";
import { relativeMinutes } from "@/lib/format";
import { Avatar } from "@/components/ui/Avatar";
import { CardHeader } from "@/components/ui/CardHeader";
import { Icon } from "@/components/ui/Icon";
import { LiveDot } from "@/components/ui/LiveDot";
import { RichText } from "@/components/ui/RichText";

interface ActivityFeedProps {
  items: readonly ActivityItem[];
}

/** Minutes the board has been on screen, so "3 min ago" keeps ageing on a wall that never reloads. */
function useMinutesOnScreen(): number {
  const [minutes, setMinutes] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setMinutes((m) => m + 1), 60_000);
    return () => window.clearInterval(id);
  }, []);
  return minutes;
}

function ActivityText({ item }: { item: ActivityItem }) {
  const [before, after] = item.text.split("{amount}");
  return (
    <p>
      <b>{item.rep}</b> <RichText text={before ?? ""} />
      {item.amount && after !== undefined && (
        <>
          <b className="amt">{item.amount}</b>
          <RichText text={after} />
        </>
      )}
    </p>
  );
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  const onScreen = useMinutesOnScreen();

  return (
    <section className="card fcard">
      <CardHeader icon="bell" title="Activity">
        <LiveDot />
      </CardHeader>
      <ul className="feed">
        {items.map((item, i) => (
          <li key={item.id} className={`k-${item.kind}${i === 0 ? " fresh" : ""}`}>
            <Avatar name={item.rep} index={item.rosterIndex} />
            <div>
              <ActivityText item={item} />
              <small>{relativeMinutes(item.minutesAgo + onScreen)}</small>
            </div>
            <span className="fi">
              <Icon name={ACTIVITY_ICONS[item.kind]} />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
