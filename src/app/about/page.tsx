import type { Metadata } from "next";
import { About } from "@/components/about";
import { Testimonials } from "@/components/testimonials";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "About",
  description: profile.intro,
};

export default function AboutPage() {
  return (
    <main id="main" className="pt-12">
      <About headingAs="h1" />
      <Testimonials />
    </main>
  );
}
