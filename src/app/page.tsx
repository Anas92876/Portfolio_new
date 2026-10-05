import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Projects } from "@/components/projects";
import { Statement } from "@/components/statement";
import { profile, socials } from "@/data/portfolio";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  sameAs: socials.filter((s) => s.label !== "Email").map((s) => s.href),
};

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Marquee />
        <Projects limit={3} />
        <Statement />
        <Contact />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
