import type { Badge, Category, Project } from "../data/content";

export interface GithubRepo {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  homepage: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

const LANGUAGE_CATEGORY: Record<string, Category> = { Dart: "mobile", Kotlin: "mobile", Swift: "mobile", Python: "python" };

const LANGUAGE_ICON: Record<string, string> = {
  Dart: "fa-solid fa-mobile-screen",
  Python: "fa-brands fa-python",
  TypeScript: "fa-solid fa-code",
  JavaScript: "fa-brands fa-js",
  HTML: "fa-brands fa-html5",
  CSS: "fa-brands fa-css3-alt",
  Java: "fa-brands fa-java",
  Rust: "fa-brands fa-rust",
  Shell: "fa-solid fa-terminal",
};

// GitHub's own language colors, for the dot on each project card
export const LANGUAGE_COLOR: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  Dart: "#00b4ab",
  HTML: "#e34c26",
  CSS: "#663399",
  Java: "#b07219",
  Kotlin: "#a97bff",
  Swift: "#f05138",
  Rust: "#dea584",
  Shell: "#89e051",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00add8",
};

const prettyName = (name: string) => name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function repoToProject(repo: GithubRepo): Project {
  const tech = [repo.language, ...(repo.topics ?? []).slice(0, 3)].filter((t): t is string => !!t);
  return {
    icon: (repo.language && LANGUAGE_ICON[repo.language]) || "fa-solid fa-rocket",
    title: prettyName(repo.name),
    repo: repo.name,
    github: repo.html_url,
    // Empty shows a translated "no description yet" on the card
    description: repo.description || "",
    tech,
    category: (repo.language && LANGUAGE_CATEGORY[repo.language]) || "web",
    demo: repo.homepage || "",
    language: repo.language ?? undefined,
    stars: repo.stargazers_count,
    updatedAt: repo.pushed_at,
    badges: [repo.fork && "Fork", repo.archived && "Archived"].filter((b): b is Badge => !!b),
  };
}

// The message is a code ("rate-limit" or the HTTP status); the UI turns it into words
const apiError = (res: Response) => new Error(res.status === 403 ? "rate-limit" : String(res.status));

// Every public repo, forks and archived ones included; follows pages past 100.
// `extra` adds repos that live elsewhere ("owner/name"), like an organization's
// or a teammate's; one that can't be loaded is skipped rather than failing the rest.
export async function fetchRepos(user: string, signal: AbortSignal, extra: string[] = []) {
  const repos: GithubRepo[] = [];
  for (let page = 1; ; page++) {
    const res = await fetch(
      `https://api.github.com/users/${user}/repos?type=owner&sort=pushed&per_page=100&page=${page}`,
      { signal }
    );
    if (!res.ok) throw apiError(res);
    const batch: GithubRepo[] = await res.json();
    repos.push(...batch);
    if (batch.length < 100) break;
  }

  const others = await Promise.allSettled(
    extra.map(async (fullName) => {
      const res = await fetch(`https://api.github.com/repos/${fullName}`, { signal });
      if (!res.ok) throw apiError(res);
      return (await res.json()) as GithubRepo;
    })
  );
  others.forEach((r) => r.status === "fulfilled" && repos.push(r.value));
  return repos;
}

// "owner/name" matches a repo exactly; a bare name matches one of your own
const matchesRepo = (ref: string, r: GithubRepo) =>
  (ref.includes("/") ? r.full_name : r.name).toLowerCase() === ref.toLowerCase();

// Keeps the hand-written copy of curated projects, but takes live links and stats from GitHub
// Repos outside your account are named "owner/name", so they can link before GitHub answers
export const withRepoLinks = (projects: Project[]): Project[] =>
  projects.map((p) => ({ ...p, github: p.github ?? (p.repo?.includes("/") ? `https://github.com/${p.repo}` : undefined) }));

export function mergeProjects(curated: Project[], repos: GithubRepo[], hidden: string[] = []): Project[] {
  const merged = withRepoLinks(curated);
  const isHidden = (name: string) => hidden.some((h) => h.toLowerCase() === name.toLowerCase());
  for (const r of repos) {
    if (isHidden(r.name)) continue;
    const match = merged.find((p) => p.repo && matchesRepo(p.repo, r));
    if (match) {
      match.github = r.html_url;
      match.stars = r.stargazers_count;
      match.demo ||= r.homepage || "";
      match.updatedAt = r.pushed_at;
      match.language ??= r.language ?? undefined;
    } else {
      merged.push(repoToProject(r));
    }
  }
  return merged;
}

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 24 * 3600],
  ["month", 30 * 24 * 3600],
  ["week", 7 * 24 * 3600],
  ["day", 24 * 3600],
  ["hour", 3600],
  ["minute", 60],
];

// One formatter per locale, built on first use: every project card calls timeAgo
const formatters = new Map<string, Intl.RelativeTimeFormat>();

export function timeAgo(iso: string, locale: string) {
  let rtf = formatters.get(locale);
  if (!rtf) formatters.set(locale, (rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" })));
  const seconds = (new Date(iso).getTime() - Date.now()) / 1000;
  for (const [unit, size] of UNITS) {
    // Truncate so 21 months reads "last year", not "2 years ago"
    if (Math.abs(seconds) >= size) return rtf.format(Math.trunc(seconds / size), unit);
  }
  return rtf.format(0, "minute");
}
