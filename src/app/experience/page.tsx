import type { Metadata } from "next";
import { Experience } from "@/components/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Where I've worked, what I've built and where I studied.",
};

export default function ExperiencePage() {
  return (
    <main id="main" className="pt-12">
      <Experience headingAs="h1" />
    </main>
  );
}
