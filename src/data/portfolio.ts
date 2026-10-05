// All site content lives here. Every section of the site reads from this file.

export type Social = {
  label: "GitHub" | "LinkedIn" | "X" | "Email";
  href: string;
  handle: string;
};

export type Experience = {
  /** Leave out when the dates aren't settled — the timeline just hides it. */
  period?: string;
  role: string;
  company: string;
  href?: string;
  location: string;
  summary: string;
  /** Optional highlight shown under the summary, e.g. an award. */
  highlight?: string;
  stack: string[];
};

export const profile = {
  name: "Anas Jihad Al Homsi",
  initials: "AH",
  role: "Software Engineer",
  tagline:
    "Software Engineer building modern web applications, scalable backend systems, SaaS platforms and digital products.",
  intro:
    "I build modern web applications, scalable backend systems, SaaS platforms and digital products — and, when a problem calls for it, the hardware behind them.",
  location: "Damascus, Syria",
  timezone: "Asia/Damascus",
  email: "hello@example.com",
  resume: "/resume.pdf",
  /** Your photo in /public. Used on the About page. */
  photo: "/portrait.jpg",
  available: true,
  availability: "Available for remote opportunities",
  siteUrl: "https://example.com",
};

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/", handle: "@username" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anas92876", handle: "in/anas92876" },
  { label: "Email", href: `mailto:${profile.email}`, handle: profile.email },
];

export const about = {
  /** Scroll-revealed statement. Wrap a word in *asterisks* to highlight it. */
  statement:
    "Performance first, interfaces people *understand,* and motion that earns its place. I build software for *real* users — not software that just happens to work.",
  paragraphs: [
    "I've been building with technology since 2020 — starting with programming, robotics training and freelance work, and growing into professional engineering for companies and organisations.",
    "Today I work across frontend, backend, databases and mobile, down to microcontrollers and sensors when a product needs to touch the physical world. I care about architecture, performance and the details users actually notice.",
  ],
  /** "A few numbers" on the About page. */
  stats: [
    { value: 6, suffix: "+", label: "Years building software, since 2020" },
    { value: 2, suffix: "nd", label: "Place — MAPS Frontend Competition" },
    { value: 113, suffix: " wpm", label: "Typing speed" },
  ],
  now: {
    building: "Web applications and backend systems at Robotric",
    direction: "Software engineering + product development",
  },
  /** "What I bring" cards on the About page. */
  bring: [
    {
      title: "Engineering",
      description: "I care about architecture, maintainability and performance — not just making things work.",
    },
    {
      title: "Product thinking",
      description: "I think about how a product should work for real users, not just how it should look.",
    },
    {
      title: "Design",
      description: "I care about interfaces, interaction, motion and the details users actually notice.",
    },
    {
      title: "Adaptability",
      description: "I work across frontend, backend, mobile, databases and hardware when the problem requires it.",
    },
  ],
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express", "FastAPI", "REST APIs", "Authentication", "API integration", "Backend architecture"],
  },
  { group: "Databases", items: ["PostgreSQL", "MongoDB", "SQL", "Prisma", "Mongoose"] },
  { group: "Mobile", items: ["React Native", "Expo"] },
  {
    group: "Hardware",
    items: ["Arduino", "ESP8266", "Microcontrollers", "Sensors", "Data collection", "Robotics"],
  },
  {
    group: "Design",
    items: ["UI/UX", "Responsive design", "Design systems", "Interactive interfaces", "Motion design"],
  },
  {
    group: "Tools",
    items: ["Git", "GitHub", "Docker", "VS Code", "Claude Code", "Codex", "AI-assisted development"],
  },
];

export const marquee = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "React Native",
  "Tailwind CSS",
  "GSAP",
  "Docker",
  "Arduino",
  "ESP8266",
];

export const experience: Experience[] = [
  {
    period: "Present",
    role: "Developer",
    company: "Robotric",
    location: "Remote · Damascus",
    summary:
      "Developing and improving systems, backend services and web applications for an Aleppo-based software company — working remotely from Damascus.",
    stack: ["Backend", "Web applications", "APIs"],
  },
  {
    role: "Main Developer",
    company: "Womenjeka Organization",
    location: "Syria",
    summary: "Main developer for the organisation, responsible for building and maintaining its software.",
    highlight: "2nd Place — MAPS Frontend Competition",
    stack: ["Frontend", "Web"],
  },
  {
    period: "2020 — Present",
    role: "Freelance Software Engineer",
    company: "Independent",
    location: "Remote",
    summary:
      "Working directly with clients since 2020 — turning requirements into real products, from planning and development through to deployment, across many different technologies.",
    stack: ["Web", "Backend", "Mobile"],
  },
  {
    role: "Robotics & Programming Trainer",
    company: "Independent trainer",
    location: "Syria",
    summary:
      "Teaching programming and robotics hands-on: Arduino and ESP8266, microcontrollers, sensors and data collection, and visual programming with Mixly.",
    stack: ["Arduino", "ESP8266", "Sensors", "Mixly"],
  },
];

export const education: { period: string; title: string; place: string }[] = [];

export const testimonials: { quote: string; name: string; title: string }[] = [];

export const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];
