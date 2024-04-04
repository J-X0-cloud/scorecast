import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/data/site";
import "../globals.css";

/**
 * Root layout for full-screen boards. No marketing chrome: this is what a TV or a
 * kiosk browser loads, so the board owns the whole viewport.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#15111f",
};

export default function BoardLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="demo">{children}</body>
    </html>
  );
}
