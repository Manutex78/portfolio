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
  Git: "git",
  GitHub: "github",
  "VS Code": "vscode",
  npm: "npm",
  Vitest: "vitest",
  Vercel: "vercel",
} as const;

export type Tech = keyof typeof LOGOS;
