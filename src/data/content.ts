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
// Six groups fill the 2 × 3 grid.
export const skills: SkillGroup[] = [
  {
    title: { en: "Back-end & data", pt: "Back-end e dados" },
    icon: "fa-solid fa-server",
    items: ["Node.js", "Express", "Sequelize", "MySQL", "Python"],
    usedIn: ["Modo", "GameON!"],
    main: true,
  },
  {
    title: { en: "Languages", pt: "Linguagens" },
    icon: "fa-solid fa-code",
    items: ["JavaScript", "TypeScript", "Python", "HTML", "CSS"],
  },
  {
    title: "Front-end",
    icon: "fa-solid fa-layer-group",
    items: ["Vue 3", "React", "Bootstrap", "Chart.js"],
    usedIn: ["Modo", "TeachMe", "BinBlast"],
  },
  {
    title: { en: "Graphics, games & XR", pt: "Gráficos, jogos e XR" },
    icon: "fa-solid fa-cube",
    items: ["Three.js", "A-Frame"],
    usedIn: ["3D Snowman", "BinBlast", "TeachMe"],
  },
  {
    title: { en: "Tools", pt: "Ferramentas" },
    icon: "fa-solid fa-screwdriver-wrench",
    items: ["Git", "GitHub", "VS Code", "Vite", "npm", "Vitest", "Vercel"],
  },
  {
    title: { en: "Currently learning", pt: "A aprender" },
    icon: "fa-solid fa-user-astronaut",
    items: ["TypeScript", "React", "Flutter", "Dart"],
    learning: true,
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
    start: 2025,
    title: { en: "Store Operator (part-time)", pt: "Operador de Loja (part-time)" },
    org: "Pingo Doce",
    kind: "work",
    description: {
      en: "Part-time role alongside my degree: customer service, quality control of fresh produce, FIFO stock rotation, goods receiving and in-store price updates, in compliance with HACCP food-safety standards.",
      pt: "Funções a tempo parcial, em paralelo com a licenciatura: atendimento ao cliente, controlo de qualidade de frescos, rotação de stock (FIFO), receção de mercadorias e atualização de preços em loja, em cumprimento das normas de segurança alimentar HACCP.",
    },
  },
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
      en: "Diagnosed and repaired hardware and software on computers, phones, tablets, TVs and consoles; advised customers on equipment and services; logged repairs and kept customers updated on their status.",
      pt: "Diagnóstico e reparação de hardware e software em computadores, telemóveis, tablets, televisões e consolas; aconselhamento a clientes na venda de equipamentos e serviços; registo de reparações e acompanhamento do seu estado junto dos clientes.",
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
}

// Curated details for repos you want to present in a specific way: the real
// project name instead of the repo name, its logo and a proper description.
// Repos without an entry here still show up automatically.
export const curatedProjects: Project[] = [
  {
    repo: "PII-Modo",
    title: "Modo",
    description: {
      en: "A sustainable habit tracker with a full back-end: a REST API in Node.js and Express, Sequelize models over a MySQL schema, and a Python generator that seeds the database with realistic data. A Vue front-end with charts and avatar decorations sits on top. Built with two colleagues.",
      pt: "Um gestor de hábitos sustentáveis com back-end completo: API REST em Node.js e Express, modelos Sequelize sobre um esquema MySQL e um gerador em Python que preenche a base de dados com dados realistas. Por cima, um front-end em Vue com gráficos e decorações de avatar. Desenvolvido com dois colegas.",
    },
    icon: "fa-solid fa-seedling",
    logo: "projects/modo.png",
    logoBg: "#d4f1e2",
    tech: ["Node.js", "Express", "Sequelize", "MySQL", "Python", "Vue 3"],
    category: "fullstack",
    featured: true,
  },
  {
    repo: "GrupoMML/ProjetoAED",
    title: "GameON!",
    description: {
      en: "A desktop game library manager inspired by Steam and Epic Games, with sign-up and login, role-based permissions, user and game management, comments and notifications stored in files. Built with Miguel Machado and Linda Glahy.",
      pt: "Um gestor de bibliotecas de jogos para desktop, inspirado na Steam e na Epic Games, com registo e login, permissões por nível de utilizador, gestão de utilizadores e jogos, comentários e notificações guardados em ficheiros. Desenvolvido com Miguel Machado e Linda Glahy.",
    },
    icon: "fa-solid fa-gamepad",
    logo: "projects/gameon.png",
    logoBg: "#1f1f23",
    tech: ["Python", "customtkinter", "Pillow"],
    category: "desktop",
  },
  {
    repo: "Miguyy/compg-BinBlast",
    title: "BinBlast",
    description: {
      en: "An educational game about recycling in which the player launches waste from a cannon into the correct bin: paper, glass, plastic or batteries. It can be controlled with the keyboard or with hand gestures tracked through the webcam. Built with Miguel Machado.",
      pt: "Um jogo educativo sobre reciclagem em que o jogador lança resíduos de um canhão para o ecoponto correto: papel, vidro, plástico ou pilhas. Pode ser controlado com o teclado ou com gestos das mãos detetados pela webcam. Desenvolvido com Miguel Machado.",
    },
    icon: "fa-solid fa-recycle",
    logo: "projects/binblast.png",
    logoBg: "#fff1d6",
    tech: ["JavaScript", "Canvas", "ML5.js", "Bootstrap"],
    category: "games",
  },
  {
    repo: "GrupoMML/Projecto-I",
    title: "TeachMe",
    description: {
      en: "A tutoring platform connecting teachers and students, with tutor search by subject, quizzes, a leaderboard and mutual ratings. Each user has a customisable duck avatar for minigames, and lessons can take place in a virtual reality classroom. Group project.",
      pt: "Uma plataforma de explicações que liga professores e alunos, com pesquisa de explicadores por disciplina, quizzes, uma tabela de classificação e avaliações mútuas. Cada utilizador tem um avatar de pato personalizável para minijogos, e as aulas podem decorrer numa sala de realidade virtual. Projeto de grupo.",
    },
    icon: "fa-solid fa-chalkboard-user",
    logo: "projects/teachme.png",
    logoBg: "#fff1de",
    tech: ["JavaScript", "Bootstrap", "A-Frame", "AR.js"],
    category: "web",
  },
  {
    repo: "GrupoMML/Campus-Compass",
    title: "Campus Compass",
    description: {
      en: "A website that helps students choose a Portuguese university, with universities browsable by region, a national ranking for comparison and a vocational test. Group project.",
      pt: "Um site que ajuda os estudantes a escolher uma universidade portuguesa, com universidades organizadas por região, um ranking nacional para comparação e um teste vocacional. Projeto de grupo.",
    },
    icon: "fa-solid fa-compass",
    logo: "projects/campus-compass.png",
    logoBg: "#e6ebf7",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "web",
  },
  {
    repo: "snowman-cg",
    title: "3D Snowman",
    description: {
      en: "An interactive 3D scene built with Three.js. Pressing M makes the snowman melt into a puddle as his hat falls, and Space throws snowballs. It includes falling snow, moving clouds and dynamic shadows.",
      pt: "Uma cena 3D interativa desenvolvida com Three.js. A tecla M faz o boneco de neve derreter numa poça enquanto o chapéu cai, e a barra de espaço lança bolas de neve. Inclui neve a cair, nuvens em movimento e sombras dinâmicas.",
    },
    icon: "fa-solid fa-snowman",
    tech: ["Three.js", "JavaScript", "WebGL"],
    category: "games",
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
