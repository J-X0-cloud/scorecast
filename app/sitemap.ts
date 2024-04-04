import type { MetadataRoute } from "next";
import { MAIN_NAV, SITE_URL } from "@/lib/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return MAIN_NAV.map((link) => ({
    url: `${SITE_URL}${link.href === "/" ? "" : link.href}`,
    changeFrequency: "monthly",
    priority: link.href === "/" ? 1 : 0.7,
  }));
}
