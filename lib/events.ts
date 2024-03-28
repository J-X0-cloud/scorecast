import { z } from "zod";
import type { ActivityKind } from "@/types/activity";
import type { TeamId } from "@/types/board";

/**
 * Activity events pushed by connectors (CRM webhooks, dialers, helpdesks) or by customers
 * through the REST API. Each accepted event can raise a win notification on every screen
 * showing the team's board.
 */
export const activityEventSchema = z.object({
  id: z.string().min(1).max(128).optional(),
  team: z.enum(["west", "east", "support"]),
  rep: z.string().trim().min(2).max(80),
  type: z.enum(["deal_closed", "meeting_booked", "badge_unlocked", "rank_changed", "rating_received"]),
  amount: z.number().nonnegative().max(100_000_000).optional(),
  client: z.string().trim().max(120).optional(),
  detail: z.string().trim().max(200).optional(),
  occurredAt: z.string().datetime({ offset: true }).optional(),
  source: z.string().trim().max(40).default("api"),
});

export type ActivityEventInput = z.input<typeof activityEventSchema>;
export type ActivityEvent = z.output<typeof activityEventSchema>;

export interface StoredEvent extends ActivityEvent {
  id: string;
  kind: ActivityKind;
  receivedAt: string;
  /** True when the event matches a notification rule and should pop up on screens. */
  notify: boolean;
}

const KIND_BY_TYPE: Record<ActivityEvent["type"], ActivityKind> = {
  deal_closed: "deal",
  meeting_booked: "meet",
  badge_unlocked: "badge",
  rank_changed: "up",
  rating_received: "star",
};

/** Default notification rules: deals over $5,000, every badge, every five-star rating. */
export const DEAL_ALERT_THRESHOLD = 5000;

export function shouldNotify(event: ActivityEvent): boolean {
  switch (event.type) {
    case "deal_closed":
      return (event.amount ?? 0) >= DEAL_ALERT_THRESHOLD;
    case "badge_unlocked":
    case "rating_received":
      return true;
    default:
      return false;
  }
}

export interface EventStore {
  append(event: StoredEvent): Promise<void>;
  recent(team: TeamId, limit: number): Promise<StoredEvent[]>;
  has(id: string): Promise<boolean>;
}

/**
 * Process-local ring buffer. Production deployments swap this for the Redis-backed store that
 * also fans events out to connected screens; the interface is the same.
 */
class MemoryEventStore implements EventStore {
  private readonly events: StoredEvent[] = [];
  constructor(private readonly capacity = 500) {}

  async append(event: StoredEvent) {
    this.events.unshift(event);
    this.events.length = Math.min(this.events.length, this.capacity);
  }

  async recent(team: TeamId, limit: number) {
    return this.events.filter((e) => e.team === team).slice(0, limit);
  }

  async has(id: string) {
    return this.events.some((e) => e.id === id);
  }
}

export const eventStore: EventStore = new MemoryEventStore();

export function toStoredEvent(event: ActivityEvent, now = new Date()): StoredEvent {
  return {
    ...event,
    id: event.id ?? crypto.randomUUID(),
    kind: KIND_BY_TYPE[event.type],
    receivedAt: now.toISOString(),
    notify: shouldNotify(event),
  };
}
