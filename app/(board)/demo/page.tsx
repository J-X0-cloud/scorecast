import type { Metadata } from "next";
import { LiveBoard } from "@/components/board/LiveBoard";

export const metadata: Metadata = {
  title: "Live TV dashboard demo | Scorecast",
  description:
    "Interactive Scorecast TV dashboard: switch teams, date ranges and leaderboard metrics on a live sales and support board.",
};

export default function DemoPage() {
  return (
    <main id="main" className="board full">
      <LiveBoard />
    </main>
  );
}
