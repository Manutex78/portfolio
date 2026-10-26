// ---- Edit your content here ----
// Text that differs between languages is written as { en: "…", pt: "…" };
// names that stay the same (tech, projects) are plain strings.

import type { Localized, Text } from "../i18n/types";
import type { Tech } from "./logos";

export const NAME = "Manuel";
export const FULL_NAME = "Manuel Teixeira";
export const EMAIL = "manutex782006@gmail.com";

// Your GitHub username. When set, public repos are pulled in automatically
// and merged with the hand-written projects below.
export const GITHUB_USER = "Manutex78";

// Shown in the contact section; set to null to hide it
export const LINKEDIN_URL: string | null = "https://www.linkedin.com/in/manutex/";

// Instagram username (without the @); set to null to hide the button
export const INSTAGRAM_USER: string | null = "_7manu8_";

// WhatsApp number in international format, digits only (e.g. "351912345678"); set to null to hide the button
export const WHATSAPP_NUMBER: string | null = null;

// Your picture for the hero frame: put the file in /public. Until it exists, the frame shows a placeholder
export const PHOTO = "/photo.jpg";

// The contact section shows the current time here, so people know when you're awake
export const TIME_ZONE = "Europe/Lisbon";

// Shown in the hero status pill; set to null to hide it
export const AVAILABILITY: Localized | null = {
  // U+2011 non-breaking hyphens keep "back-end" on one line in the narrow pill
  en: "Available for back‑end internships & freelance",
  pt: "Disponível para estágios e freelance em back‑end",
};

// The hero headline cycles through these: "Back-end developer focused on …"
export const ROTATING_WORDS: Text[] = [
  "APIs",
  { en: "databases", pt: "bases de dados" },
  { en: "server logic", pt: "lógica de servidor" },
];

export interface SkillGroup {
  title: Text;
  icon: string;
  /** Shown as logos; names come from src/data/logos.ts */
  items: Tech[];
  /** Projects (by title) where these skills show up */
  usedIn?: string[];
  /** Shown first and highlighted: what you most want to be hired for */
  main?: boolean;
  learning?: boolean;
}

// Grouped from what the projects below actually use; back-end leads.
// Four groups fill the 2 × 2 grid.
export const skills: SkillGroup[] = [
  {
    title: { en: "Back-end & APIs", pt: "Back-end e APIs" },
    icon: "fa-solid fa-server",
    items: ["Node.js", "Express"],
    usedIn: ["Modo"],
    main: true,
  },
  {
    title: { en: "Databases & ORM", pt: "Bases de dados e ORM" },
    icon: "fa-solid fa-database",
    items: ["MySQL", "Sequelize"],
    usedIn: ["Modo"],
  },
  {
    title: { en: "Languages", pt: "Linguagens" },
    icon: "fa-solid fa-code",
    items: ["JavaScript", "TypeScript", "Python"],
    usedIn: ["Modo", "GameON!"],
  },
  {
    title: { en: "Tools & testing", pt: "Ferramentas e testes" },
    icon: "fa-solid fa-screwdriver-wrench",
    items: ["Git", "GitHub", "npm", "Vitest", "VS Code", "Vercel"],
  },
];

export interface Mission {
  start: number;
  /** Leave out while it's still going: shows "Now" and the node glows */
  end?: number;
  title: Localized;
  org: Text;
  kind: "education" | "work";
  description: Localized;
}

// The "Mission log" timeline, newest first
export const missions: Mission[] = [
  {
    start: 2024,
    title: { en: "BSc in Web Technologies and Development", pt: "Licenciatura em Tecnologias e Desenvolvimento Web" },
    org: { en: "FMAD (formerly ESMAD) · UTP", pt: "FMAD (antiga ESMAD) · UTP" },
    kind: "education",
    description: {
      en: "Bachelor's degree in web technologies and development, currently in progress.",
      pt: "Licenciatura em tecnologias e desenvolvimento web, atualmente em curso.",
    },
  },
  {
    start: 2023,
    end: 2024,
    title: { en: "Professional Internship", pt: "Estágio Profissional" },
    org: "Teklit",
    kind: "work",
    description: {
      en: "Diagnosed and fixed hardware and software faults, troubleshooting systems methodically and keeping a record of every repair and its status.",
      pt: "Diagnóstico e resolução de avarias de hardware e software, com uma abordagem metódica à resolução de problemas e registo de cada reparação e do seu estado.",
    },
  },
  {
    start: 2021,
    end: 2024,
    title: { en: "IT Management Technician", pt: "Técnico de Informática de Gestão" },
    org: "Escola Profissional de Campanhã",
    kind: "education",
    description: {
      en: "Three-year vocational course in IT for business management.",
      pt: "Curso profissional de três anos em informática de gestão.",
    },
  },
];

export type Category = "fullstack" | "web" | "games" | "desktop" | "mobile" | "python";
export type Badge = "Fork" | "Archived";

export interface Endpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string;
}

/** A relationship between two tables, read left to right: "users 1:n user_tasks" */
export interface Relation {
  from: string;
  kind: "1:1" | "1:n" | "n:m";
  to: string;
}

export interface Project {
  title: string;
  description: Text;
  /** Font Awesome icon, used when there's no logo */
  icon: string;
  /** The project's own logo, from /public (e.g. "projects/modo.png") */
  logo?: string;
  /** Background behind the logo, in the project's brand color */
  logoBg?: string;
  tech: string[];
  /** One of: fullstack, web, games, desktop, mobile, python */
  category: Category;
  /** Repository on GitHub: a bare name for one of yours, or "owner/name" for one in an
   *  organization or a teammate's account. Live links, stars and dates come from it. */
  repo?: string;
  github?: string;
  demo?: string;
  language?: string;
  stars?: number;
  updatedAt?: string;
  badges?: Badge[];
  /** Pinned to the top and shown larger */
  featured?: boolean;
  /** A few representative routes, shown on the card like API docs */
  endpoints?: Endpoint[];
  /** The main table relationships, shown as a small data model */
  schema?: Relation[];
}

// Curated details for repos you want to present in a specific way: the real
// project name instead of the repo name, its logo and a proper description.
// Repos without an entry here still show up automatically.
export const curatedProjects: Project[] = [
  {
    repo: "PII-Modo",
    title: "Modo",
    description: {
      en: "The back-end of a sustainable habit tracker: a REST API in Node.js and Express, Sequelize models and associations over a relational MySQL schema, and a Python generator that seeds the database with realistic data for development and testing. Built with two colleagues.",
      pt: "O back-end de um gestor de hábitos sustentáveis: API REST em Node.js e Express, modelos e associações Sequelize sobre um esquema relacional MySQL e um gerador em Python que preenche a base de dados com dados realistas para desenvolvimento e testes. Desenvolvido com dois colegas.",
    },
    icon: "fa-solid fa-seedling",
    logo: "projects/modo.png",
    logoBg: "#d4f1e2",
    tech: ["Node.js", "Express", "Sequelize", "MySQL", "Python"],
    category: "fullstack",
    featured: true,
    endpoints: [
      { method: "POST", path: "/users/login" },
      { method: "GET", path: "/habits" },
      { method: "GET", path: "/users/:userId/habits/:habitId/tasks" },
      { method: "PATCH", path: "/users/:userId/tasks/:taskId/progress" },
      { method: "POST", path: "/users/:userId/tasks/:taskId/complete" },
      { method: "GET", path: "/tasks/:taskId/impacts" },
    ],
    schema: [
      { from: "users", kind: "1:n", to: "user_tasks" },
      { from: "tasks", kind: "1:n", to: "user_tasks" },
      { from: "habits", kind: "1:n", to: "tasks" },
      { from: "tasks", kind: "1:n", to: "impacts" },
    ],
  },
  {
    repo: "GrupoMML/ProjetoAED",
    title: "GameON!",
    description: {
      en: "Application logic for a game library manager in Python: sign-up and login, role-based access control, user and game management, and comments and notifications persisted to files. Built with Miguel Machado and Linda Glahy.",
      pt: "Lógica aplicacional de um gestor de bibliotecas de jogos em Python: registo e login, controlo de acessos por nível de utilizador, gestão de utilizadores e jogos, e comentários e notificações persistidos em ficheiros. Desenvolvido com Miguel Machado e Linda Glahy.",
    },
    icon: "fa-solid fa-gamepad",
    logo: "projects/gameon.png",
    logoBg: "#1f1f23",
    tech: ["Python", "customtkinter", "Pillow"],
    category: "desktop",
  },
];

// Repos left out of the Projects section: class exercises, forks of other
// people's projects, earlier versions of a project listed above, and
// front-end or graphics work outside the back-end focus
export const hiddenRepos = [
  "AED-REPO",
  "comp-grafica",
  "Web-Technologies-Class",
  "flutter",
  "nosql-databases-labs",
  "pw1-Modo",
  "portfolio",
  "snowman-cg",
];
