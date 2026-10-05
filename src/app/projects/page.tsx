import type { Metadata } from "next";
import { Projects } from "@/components/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies of large-scale products I've designed, engineered and shipped.",
};

export default function ProjectsPage() {
  return (
    <main id="main" className="pt-12">
      <Projects headingAs="h1" />
    </main>
  );
}
