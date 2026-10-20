// ---- Edit your content here ----

export const NAME = "Manuel";
export const FULL_NAME = "Manuel Teixeira";
export const EMAIL = "manutex782006@gmail.com";

// Your GitHub username. When set, public repos are pulled in automatically
// and merged with the hand-written projects below.
export const GITHUB_USER = "Manutex78";

// Shown in the hero status pill; set to "" to hide it
export const AVAILABILITY = "Open to internships & freelance";

// The hero headline cycles through these: "I build things for the …"
export const PLATFORMS = ["web", "desktop", "mobile"];

export interface SkillGroup {
  title: string;
  icon: string;
  items: string[];
  /** Projects (by title) where these skills show up */
  usedIn?: string[];
  learning?: boolean;
}

// Grouped from what the projects below actually use
export const skills: SkillGroup[] = [
  {
    title: "Languages",
    icon: "fa-solid fa-code",
    items: ["JavaScript", "TypeScript", "Python", "HTML", "CSS", "SQL"],
  },
  {
    title: "Front-end",
    icon: "fa-solid fa-layer-group",
    items: ["Vue 3", "Pinia", "Vue Router", "React", "Bootstrap", "Chart.js"],
    usedIn: ["Modo", "TeachMe", "BinBlast"],
  },
  {
    title: "Back-end & data",
    icon: "fa-solid fa-server",
    items: ["Node.js", "Express", "Sequelize", "MySQL", "Faker"],
    usedIn: ["Modo"],
  },
  {
    title: "Graphics, games & XR",
    icon: "fa-solid fa-cube",
    items: ["Three.js", "WebGL", "Canvas API", "A-Frame", "AR.js", "ML5.js"],
    usedIn: ["3D Snowman", "BinBlast", "TeachMe"],
  },
  {
    title: "Python desktop & scripts",
    icon: "fa-brands fa-python",
    items: ["customtkinter", "Tkinter", "Pillow", "Tesseract OCR"],
    usedIn: ["GameON!"],
  },
  {
    title: "Tools",
    icon: "fa-solid fa-screwdriver-wrench",
    items: ["Git", "GitHub", "VS Code", "Vite", "npm", "Vitest", "Vercel", "Microsoft Office", "Google Workspace"],
  },
  { title: "Hardware", icon: "fa-solid fa-microchip", items: ["PC assembly", "Diagnostics", "Repair & maintenance"] },
  { title: "Currently learning", icon: "fa-solid fa-user-astronaut", items: ["TypeScript", "React", "Flutter", "Dart"], learning: true },
];

export const SPOKEN_LANGUAGES = ["Portuguese", "English"];

export interface Mission {
  period: string;
  title: string;
  org: string;
  kind: "education" | "work";
  description: string;
  /** Still going: the node glows */
  current?: boolean;
}

// The "Mission log" timeline, newest first
export const missions: Mission[] = [
  {
    period: "2025 — Now",
    title: "Store Operator (part-time)",
    org: "Pingo Doce",
    kind: "work",
    description:
      "Customer service, fresh-produce quality control and FIFO stock rotation, goods receiving and in-store price updates, following HACCP food-safety rules — alongside my degree.",
    current: true,
  },
  {
    period: "2024 — Now",
    title: "BSc in Web Information Systems & Technologies",
    org: "ESMAD — Escola Superior de Media Artes e Design",
    kind: "education",
    description: "Bachelor's degree in technologies and information systems for the web.",
    current: true,
  },
  {
    period: "2023 — 2024",
    title: "Professional Internship",
    org: "Teklit",
    kind: "work",
    description:
      "Diagnosed and repaired hardware and software on computers, phones, tablets, TVs and consoles; advised customers on equipment and services; logged repairs and kept customers updated on their status.",
  },
  {
    period: "2021 — 2024",
    title: "IT Management Technician",
    org: "Escola Profissional de Campanhã",
    kind: "education",
    description: "Three-year vocational course in IT for business management.",
  },
];

export interface Project {
  title: string;
  description: string;
  /** Font Awesome icon, used when there's no logo */
  icon: string;
  /** The project's own logo, from /public (e.g. "projects/modo.png") */
  logo?: string;
  /** Background behind the logo, in the project's brand color */
  logoBg?: string;
  tech: string[];
  category: string;
  /** Repository on GitHub: a bare name for one of yours, or "owner/name" for one in an
   *  organization or a teammate's account. Live links, stars and dates come from it. */
  repo?: string;
  github?: string;
  demo?: string;
  language?: string;
  stars?: number;
  updatedAt?: string;
  badges?: string[];
  /** Pinned to the top and shown larger */
  featured?: boolean;
}

// Curated details for repos you want to present in a specific way: the real
// project name instead of the repo name, its logo and a proper description.
// Repos without an entry here still show up automatically.
export const curatedProjects: Project[] = [
  {
    repo: "PII-Modo",
    title: "Modo",
    description:
      "A sustainable habit tracker: create habits, follow your progress in charts and unlock avatar decorations along the way. Built with two colleagues — Vue front-end, Node/Express API and a Python data generator for MySQL.",
    icon: "fa-solid fa-seedling",
    logo: "projects/modo.png",
    logoBg: "#d4f1e2",
    tech: ["Vue 3", "Node.js", "MySQL", "Python"],
    category: "Web",
    featured: true,
  },
  {
    repo: "Miguyy/compg-BinBlast",
    title: "BinBlast",
    description:
      "An educational recycling game: fire rubbish from a cannon into the right bin — paper, glass, plastic or batteries. Play with the keyboard or with hand gestures through your webcam. Built with Miguel Machado.",
    icon: "fa-solid fa-recycle",
    logo: "projects/binblast.png",
    logoBg: "#fff1d6",
    tech: ["JavaScript", "Canvas", "ML5.js", "Bootstrap"],
    category: "Web",
  },
  {
    repo: "GrupoMML/Projecto-I",
    title: "TeachMe",
    description:
      "A tutoring platform that connects teachers and students: find a tutor by subject, take quizzes, climb the leaderboard and rate each other. Every user gets a customisable duck avatar for minigames, and lessons can happen in a virtual reality classroom. Group project.",
    icon: "fa-solid fa-chalkboard-user",
    logo: "projects/teachme.png",
    logoBg: "#fff1de",
    tech: ["JavaScript", "Bootstrap", "A-Frame", "AR.js"],
    category: "Web",
  },
  {
    repo: "GrupoMML/ProjetoAED",
    title: "GameON!",
    description:
      "A desktop game library manager inspired by Steam and Epic Games: a store, your library and favourites, comments and notifications, plus an admin area for managing games and users. Built with Miguel Machado and Linda Glahy.",
    icon: "fa-solid fa-gamepad",
    logo: "projects/gameon.png",
    logoBg: "#1f1f23",
    tech: ["Python", "customtkinter", "Pillow"],
    category: "Desktop",
  },
  {
    repo: "GrupoMML/Campus-Compass",
    title: "Campus Compass",
    description:
      "Helps students find the Portuguese university that suits them best: browse universities by region, compare them in a national ranking and take a vocational test. Group project.",
    icon: "fa-solid fa-compass",
    logo: "projects/campus-compass.png",
    logoBg: "#e6ebf7",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Web",
  },
  {
    repo: "snowman-cg",
    title: "3D Snowman",
    description:
      "An interactive 3D scene: press M to watch the snowman melt into a puddle while his hat falls, or throw snowballs with Space — with falling snow, drifting clouds and dynamic shadows.",
    icon: "fa-solid fa-snowman",
    tech: ["Three.js", "JavaScript", "WebGL"],
    category: "Web",
  },
];

// Repos left out of the Projects section: class exercises, forks of other
// people's projects, and earlier versions of a project listed above
export const hiddenRepos = [
  "AED-REPO",
  "comp-grafica",
  "Web-Technologies-Class",
  "flutter",
  "nosql-databases-labs",
  "pw1-Modo",
];
