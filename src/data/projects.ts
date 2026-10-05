// Your projects. Each entry powers a card on the homepage AND a full case-study page at /projects/<slug>.
// Optional fields can be left out — anything missing is simply hidden on the site.

export type Project = {
  /** URL id → /projects/<slug>. Lowercase, dashes only. */
  slug: string;
  title: string;
  /** One-line hook shown under the title. */
  tagline: string;
  /** 1–2 sentence summary for the homepage card. */
  summary: string;
  category: string;
  year?: string;
  duration?: string;
  role?: string;
  team?: string;
  status?: "Live" | "In development" | "Archived";
  /** Hue (0–360) used to tint generated previews when no images are provided. */
  hue: number;
  /** Optional cover screenshot in /public, e.g. "/projects/nazemly/cover.png". */
  cover?: string;
  /** Horizontal part of the cover to keep when a taller slot crops it: 0 = left edge, 100 = right edge. Defaults to 50. */
  coverFocus?: number;
  /** Optional extra screenshots for the gallery. */
  gallery?: { src: string; caption: string }[];
  links: { live?: string; source?: string };
  /** Headline numbers — real figures only. 2–4 work best; leave empty to hide. */
  metrics: { value: string; label: string }[];
  /** Short tech list for cards. */
  stack: string[];
  overview: string[];
  challenge: string[];
  solution: string[];
  features: { title: string; description: string }[];
  architecture: { group: string; items: string[] }[];
  architectureNotes: string[];
  results: string[];
  learnings: string[];
};

export const projects: Project[] = [
  {
    slug: "robotric",
    title: "Robotric",
    tagline: "A premium, motion-driven landing page for a technology company.",
    summary:
      "A modern, interactive corporate landing page built around visual storytelling, scroll-driven sections, smooth animations and a clear path to conversion.",
    category: "Corporate Landing Page",
    role: "Software Engineer",
    hue: 145,
    cover: "/projects/robotric/cover.png",
    coverFocus: 40,
    links: {},
    metrics: [],
    stack: ["Next.js", "React", "Tailwind CSS", "GSAP", "Framer Motion"],
    overview: [
      "A modern, interactive landing page designed and developed for Robotric, a technology company specializing in digital solutions and software development.",
      "The project focuses on creating a premium digital presence through strong visual storytelling, scroll-based interactions, smooth animations and a clear user journey.",
    ],
    challenge: [],
    solution: [],
    features: [
      { title: "Modern corporate experience", description: "A premium web presence that reflects a technology company." },
      { title: "Scroll-driven sections", description: "Interactive sections that unfold as visitors scroll." },
      { title: "Smooth animations", description: "Motion built with GSAP and Framer Motion." },
      { title: "Responsive design", description: "A consistent experience across phones, tablets and desktops." },
      { title: "Performance-focused", description: "Animations and media implemented with performance in mind." },
      { title: "Conversion-focused", description: "Clear service presentation and calls to action." },
    ],
    architecture: [
      { group: "Frontend", items: ["Next.js", "React", "Tailwind CSS"] },
      { group: "Motion", items: ["GSAP", "Framer Motion"] },
    ],
    architectureNotes: [],
    results: [],
    learnings: [],
  },
  {
    slug: "robotric-dashboard",
    title: "Robotric Dashboard",
    tagline: "One role-based platform running a robotics education center — from first lead to final certificate.",
    summary:
      "A role-based management platform for a robotics education center in Aleppo, covering students, trainers, reception, management, engineering and clients — in English and Arabic (RTL).",
    category: "Management Platform",
    role: "Software Engineer",
    hue: 160,
    cover: "/projects/robotric-dashboard/cover.png",
    coverFocus: 30,
    links: {},
    metrics: [
      { value: "7", label: "Role-based dashboards" },
      { value: "~480", label: "API endpoints rebuilt" },
      { value: "38", label: "Backend domain modules" },
      { value: "~47k", label: "Lines of TypeScript" },
    ],
    stack: ["React", "TypeScript", "Express 5", "PostgreSQL", "Drizzle ORM", "Vercel"],
    overview: [
      "Robotric Dashboard runs the day-to-day of a robotics education center in Aleppo. It handles courses, groups, sessions, attendance, evaluations, certificates, payments, transport, competitions, inventory and internal projects — for every role in the organization.",
      "Each user — student, trainer, reception, learning lead, engineer, operations or client — gets their own dashboard, sidebar and pages, all in one app with a shared component system and full English / Arabic support.",
    ],
    challenge: [
      "One center, seven very different kinds of users: students following courses, trainers running sessions, reception managing leads and enrollments, management planning content, engineers tracking projects, operations handling competitions and inventory, and clients following their projects.",
      "On top of that, the production backend was a legacy JavaScript / MongoDB service that existing web and mobile apps depended on — it had to be modernized without breaking them.",
    ],
    solution: [
      "A single React app with role-based routing, organized by feature (features/<role>/<module>), where every role gets a dashboard tailored to its work on top of a shared UI kit.",
      "The backend was rewritten in TypeScript on PostgreSQL. All routes and response shapes stayed the same — about 480 endpoints rebuilt — so the existing web and mobile apps kept working without changes.",
    ],
    features: [
      { title: "Student", description: "Courses and modules, tasks, quizzes, projects, evaluations, downloadable PDF certificates, payments, subscriptions and a WRO mission planner." },
      { title: "Trainer", description: "Weekly schedule, groups, sessions, attendance, tasks, student projects, evaluations, resources and a task board." },
      { title: "Reception", description: "Leads CRM with contact history, enrollments, subscriptions, users, schedule, session requests and reports, transport and job applications." },
      { title: "Learning lead (CLO)", description: "Courses, groups, sessions, trainers, evaluation criteria, attendance, training content and subscription plans." },
      { title: "CTO / Engineer", description: "Internal projects, tasks, deadlines, work-hour tracking and transport management." },
      { title: "Operations / Admin", description: "Competitions and teams, inventory, orders, projects, posts and the admin panel." },
      { title: "Client portal", description: "Project status and service requests for the center's clients." },
      { title: "Shared tools", description: "Task builder and Kanban boards, personal tasks and work hours, posts, KPIs and charts, calendars, and PDF viewing and generation." },
      { title: "Bilingual", description: "Full English and Arabic translations with i18next, including right-to-left layout." },
    ],
    architecture: [
      {
        group: "Dashboard",
        items: ["React 18", "TypeScript", "Vite 7", "Tailwind CSS 4", "TanStack Query", "Axios", "React Router 7", "Framer Motion", "i18next"],
      },
      {
        group: "API",
        items: ["Node.js", "Express 5", "TypeScript (strict)", "PostgreSQL (Supabase)", "Drizzle ORM", "Zod", "JWT", "Puppeteer", "Resend", "Pino"],
      },
      { group: "Testing & hosting", items: ["Vitest", "Supertest", "PGlite", "Supabase Storage", "Vercel"] },
    ],
    architectureNotes: [
      "Two frontends on one domain: a Next.js public site (marketing pages, blog, certificate checker, login) is the front door and forwards dashboard paths to the separate Vite dashboard app, so both share one login session.",
      "The API is split into 38 domain modules — auth, courses, groups, enrollments, sessions, attendance, quizzes, evaluations, certificates, receipts, subscriptions, transport, competitions, inventory, leads and more — with versioned Drizzle migrations.",
      "Security: JWT auth, bcrypt password hashing, Helmet, rate limiting, CORS and Zod validation on every request.",
      "PDF receipts and certificates are generated on the server with Puppeteer and serverless Chromium; tests run against an in-memory Postgres (PGlite).",
      "The dashboard is about 210 components and pages and roughly 47k lines of TypeScript, built on a custom navy-and-green design system.",
    ],
    results: [
      "Migrated a production backend from MongoDB to PostgreSQL, rebuilding about 480 API endpoints with no breaking changes for existing web and mobile clients.",
      "Designed 7 role-based dashboards in one app on a shared component system.",
      "Built PDF certificates and receipts, a CRM pipeline for leads, a transport and trip management system, and a WRO robotics competition mission planner.",
      "Full Arabic / English support, including RTL.",
    ],
    learnings: [],
  },
  {
    slug: "zayro",
    title: "Zayro",
    tagline: "An online store for clothing and accessories.",
    summary:
      "An e-commerce store for a clothing and accessories shop, with online shopping, cash-on-delivery ordering and an admin dashboard.",
    category: "E-commerce",
    hue: 250,
    cover: "/projects/zayro/cover.png",
    coverFocus: 30,
    links: {},
    metrics: [],
    stack: ["E-commerce", "Dashboard"],
    overview: [
      "Zayro is an e-commerce website for a clothing and accessories shop. Customers browse and order online, and the shop manages everything from a dashboard.",
    ],
    challenge: [],
    solution: [],
    features: [
      { title: "Online shopping", description: "Customers browse clothing and accessories and place orders online." },
      { title: "Cash on delivery", description: "Orders are paid in cash on delivery." },
      { title: "Admin dashboard", description: "A dashboard for managing the store." },
    ],
    architecture: [],
    architectureNotes: [],
    results: [],
    learnings: [],
  },
  {
    slug: "khawam",
    title: "Khawam",
    tagline: "Thousands of industrial tools, turned into a fast and usable digital catalog.",
    summary:
      "A large-scale product catalog for an INGCO tools and equipment distributor — 2,573 products organized into a structured, searchable, responsive experience.",
    category: "Product Catalog",
    role: "Software Engineer",
    hue: 70,
    cover: "/projects/khawam/cover.png",
    coverFocus: 100,
    links: {},
    metrics: [
      { value: "2,573", label: "Product records" },
      { value: "2,539", label: "Product images matched" },
      { value: "6", label: "Main categories" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Static generation"],
    overview: [
      "Khawam imports and distributes INGCO tools and equipment. The project turned a very large product inventory into a structured, visually organized digital catalog customers can browse easily on desktop and mobile.",
      "Unlike a small marketing website, it meant handling a large amount of real commercial data — thousands of products and thousands of assets — and turning it into a usable customer-facing experience.",
    ],
    challenge: [
      "The hard part wasn't making it look good — it was organizing thousands of products so the catalog stays fast, clear and easy to navigate.",
      "The product data came from a CSV of thousands of records, and the images had to be matched to their products: product identifiers, names, categories, missing images and keeping presentation consistent.",
    ],
    solution: [
      "The product data was handled systematically rather than by hand-building pages: the CSV became structured catalog data, and every product page is generated from it.",
      "Customers move from category → product listing → product details. Of 2,573 products, 2,539 were matched with PNG images, and the 34 without images are still presented consistently.",
    ],
    features: [
      { title: "Category navigation", description: "Products organized into 6 main categories with a clear hierarchy." },
      { title: "Product listings", description: "Consistent product cards and responsive grids built for browsing." },
      { title: "Product pages", description: "Individual product information generated from structured data." },
      { title: "Data integration", description: "CSV product records and image assets matched into one dataset." },
      { title: "Mobile-friendly", description: "Comfortable browsing of a large catalog on phones as well as desktop." },
      { title: "Lightweight", description: "Static generation and careful image loading keep a huge catalog fast." },
    ],
    architecture: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Modern CSS"] },
      { group: "Data", items: ["CSV product dataset", "Structured product data", "Image asset matching"] },
      { group: "Delivery", items: ["Static generation", "Responsive images"] },
    ],
    architectureNotes: [
      "The catalog is a modern static website — designed to handle a large inventory without becoming an unnecessarily heavy application.",
      "Performance work focused on large numbers of product images, image loading, static generation, asset organization and avoiding unnecessary JavaScript.",
    ],
    results: [],
    learnings: [],
  },
  {
    slug: "hamsho",
    title: "Hamsho",
    tagline: "A modern digital presence for an established industrial company.",
    summary:
      "A corporate website for a metal and construction company in Aleppo, founded in 2005 — visual-first, responsive and built to communicate real industrial capability.",
    category: "Corporate Website",
    role: "Software Engineer",
    hue: 150,
    cover: "/projects/hamsho/cover.png",
    coverFocus: 100,
    links: {},
    metrics: [
      { value: "2005", label: "Company founded" },
      { value: "Aleppo", label: "Based in, Syria" },
    ],
    stack: ["Next.js", "React", "TypeScript", "Motion"],
    overview: [
      "Hamsho specializes in metalwork, construction-related services and industrial solutions. The goal was a modern digital presence that communicates the company's experience and capabilities and presents its services and work professionally.",
      "I worked on the development and implementation of the website: the frontend architecture, responsive interface, visual presentation, animations and interactions, and performance.",
    ],
    challenge: [
      "Represent an established industrial business without making it look outdated — or like a generic corporate template.",
      "The site had to communicate the company's long history, its industrial and construction capabilities, its services and completed work, with a strong and trustworthy visual identity.",
    ],
    solution: [
      "A visual-first approach instead of walls of text: a strong hero, vertical video, clear service presentation and project showcases, with modern scroll-based interactions.",
      "The design aims for industrial, premium and confident — supporting the company's real-world identity rather than hiding it behind futuristic effects.",
    ],
    features: [
      { title: "Visual hero", description: "A strong opening that sets an industrial, premium tone." },
      { title: "Vertical video", description: "Video content that shows the work itself." },
      { title: "Services", description: "Clear presentation of the company's services and capabilities." },
      { title: "Projects", description: "Completed work presented as proof of experience." },
      { title: "Scroll interactions", description: "Modern motion that guides visitors through the story." },
      { title: "Contact paths", description: "Clear inquiry routes on every device." },
    ],
    architecture: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Modern CSS"] },
      { group: "Experience", items: ["Responsive layouts", "Motion & scroll interactions"] },
      { group: "Performance", items: ["Optimized images", "Optimized video"] },
    ],
    architectureNotes: [
      "Because the site carries large visual assets and video, performance was a core concern — media and images are optimized so the experience stays fast.",
    ],
    results: [],
    learnings: [],
  },
  {
    slug: "nazemly",
    title: "Nazemly",
    tagline: "Clinic management SaaS for Syria and the Arabic market.",
    summary:
      "A clinic management platform that replaces paper records and manual workflows with one centralized system for clinic owners, doctors and receptionists.",
    category: "SaaS Platform",
    role: "Software Engineer",
    hue: 255,
    cover: "/projects/nazemly/cover.png",
    coverFocus: 100,
    links: {},
    metrics: [
      { value: "3", label: "Roles — owner, doctor, receptionist" },
      { value: "RTL", label: "Arabic-first interface" },
      { value: "SaaS", label: "Built for daily clinic operations" },
    ],
    stack: ["SaaS", "Dashboards", "RTL", "WhatsApp reminders"],
    overview: [
      "Nazemly is a clinic management SaaS platform designed for medical clinics in Syria and the Arabic-speaking market. It brings patients, appointments, records, invoices and reporting together in a single web-based platform.",
      "It's a product, not just a website — an operational system designed for clinics to use every day. I worked on it as a Software Engineer, contributing to the design and development of the platform, its user experience, dashboards, workflows and technical implementation.",
    ],
    challenge: [
      "Many small and medium-sized clinics still depend on paper records, WhatsApp messages, manual appointment tracking and disconnected processes.",
      "Owners have little visibility into what's happening in their clinic, and staff lose time moving information between paper, phones and spreadsheets.",
    ],
    solution: [
      "One centralized digital system: clinic problems → digital workflow → centralized management → better organization and visibility.",
      "Each role sees what it needs — receptionists manage the schedule, doctors work with patient history and clinical information, and owners monitor the whole clinic from a dashboard — in an Arabic-first interface built around the realities of local clinics.",
    ],
    features: [
      { title: "Patients & medical records", description: "Patient management with medical records, history and clinical information." },
      { title: "Appointments", description: "Scheduling and managing appointments across the clinic." },
      { title: "Invoices & finance", description: "Invoices and financial records in the same system as the visits they belong to." },
      { title: "Reports & statistics", description: "Clinic reports and statistics, plus an owner dashboard for monitoring activity." },
      { title: "Role-based access", description: "Separate access for clinic owners, doctors and receptionists." },
      { title: "Dental chart", description: "An odontogram for dental clinics." },
      { title: "WhatsApp reminders", description: "Appointment reminders sent over WhatsApp, where patients already are." },
      { title: "Arabic-first, RTL", description: "A right-to-left interface designed for Arabic from the start." },
    ],
    architecture: [],
    architectureNotes: [],
    results: [],
    learnings: [],
  },
  {
    slug: "effect-media",
    title: "Effect Media",
    tagline: "We create impact — a motion-driven site for a media and advertising company.",
    summary:
      "A website for a media and advertising company, translating a visual brand into an interactive, GSAP-driven experience across services, packages and work.",
    category: "Creative Agency",
    role: "Software Engineer",
    hue: 275,
    cover: "/projects/effect-media/cover.png",
    coverFocus: 50,
    links: {},
    metrics: [
      { value: "11", label: "Services presented" },
      { value: "6", label: "Site sections" },
      { value: "GSAP", label: "Motion & scroll" },
    ],
    stack: ["GSAP", "Scroll interactions", "Responsive design"],
    overview: [
      "Effect Media provides integrated advertising and media solutions, helping businesses turn ideas into professional visual content and stronger digital identities.",
      "I worked on the development and implementation of the website — the frontend experience, responsive interface, visual presentation and interactive motion, including the GSAP animations and scroll-based interactions.",
    ],
    challenge: [
      "Translate a visual, creative brand into an interactive digital experience — not a traditional, static corporate website.",
      "The site had to present a wide range of services and packages clearly while still feeling creative, confident and marketing-focused.",
    ],
    solution: [
      "The experience is built around the idea behind the brand: \"We create impact.\" Strong typography, visual composition, motion and transitions carry the message.",
      "The structure takes visitors from understanding the brand → discovering services → exploring packages → taking action, across Home, About, Services, Packages, Work and Contact.",
    ],
    features: [
      { title: "Motion-driven storytelling", description: "GSAP animations treated as part of the brand's communication, not decoration." },
      { title: "Scroll interactions", description: "Sections that move and reveal as visitors scroll." },
      { title: "Services", description: "Video production, editing, motion graphics, photography, marketing, design and more." },
      { title: "Packages", description: "Service packages presented clearly to help visitors choose." },
      { title: "Work", description: "A portfolio section showcasing the company's output." },
      { title: "Responsive", description: "The same impact on phones as on large screens." },
    ],
    architecture: [],
    architectureNotes: [],
    results: [],
    learnings: [],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
