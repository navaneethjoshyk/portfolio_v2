import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

// Static export still generates a static robots.txt from this file, but
// Next requires routes under output: "export" to be explicitly marked
// static (it otherwise assumes metadata routes might be dynamic).
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
