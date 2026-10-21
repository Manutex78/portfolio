// Tech logos for the skills cards, from Devicon (public/logos/<file>.svg).
// A skill can only use a name listed here, so a typo is a type error.
export const LOGOS = {
  "Node.js": "nodejs",
  Express: "express",
  Sequelize: "sequelize",
  MySQL: "mysql",
  Python: "python",
  JavaScript: "javascript",
  TypeScript: "typescript",
  HTML: "html5",
  CSS: "css3",
  "Vue 3": "vuejs",
  React: "react",
  Bootstrap: "bootstrap",
  "Chart.js": "chartjs",
  "Three.js": "threejs",
  "A-Frame": "aframe",
  Git: "git",
  GitHub: "github",
  "VS Code": "vscode",
  Vite: "vitejs",
  npm: "npm",
  Vitest: "vitest",
  Vercel: "vercel",
  Flutter: "flutter",
  Dart: "dart",
} as const;

export type Tech = keyof typeof LOGOS;
