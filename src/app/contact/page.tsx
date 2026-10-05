import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { profile } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
};

export default function ContactPage() {
  return (
    <main id="main" className="flex min-h-dvh flex-col justify-center pt-12">
      <Contact headingAs="h1" />
    </main>
  );
}
