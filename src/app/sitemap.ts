import type { MetadataRoute } from "next";
import { nav, profile } from "@/data/portfolio";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = nav.map((item) => ({
    url: new URL(item.href, profile.siteUrl).toString(),
    priority: item.href === "/" ? 1 : 0.8,
  }));
  const caseStudies = projects.map((p) => ({
    url: new URL(`/projects/${p.slug}`, profile.siteUrl).toString(),
    priority: 0.6,
  }));
  return [...pages, ...caseStudies];
}
