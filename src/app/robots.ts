import { siteConfig } from "@/config/seo.config";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/login/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}