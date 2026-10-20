import { useDeferredValue, useMemo, useState } from "react";
import type { Project } from "../data/content";
import type { LoadStatus } from "../hooks/useGithubProjects";
import { MoonLoader } from "./MoonLoader";
import { ProjectCard } from "./ProjectCard";
import { SectionTitle } from "./Reveal";

type SortKey = "updated" | "stars" | "name";

const SORTERS: Record<SortKey, (a: Project, b: Project) => number> = {
  updated: (a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""),
  stars: (a, b) => (b.stars ?? 0) - (a.stars ?? 0),
  name: (a, b) => a.title.localeCompare(b.title),
};

const PAGE_SIZE = 9;
// Search, filters and sorting only earn their space once there's a lot to sift through
const TOOLBAR_MIN = 6;

interface ProjectsProps {
  projects: Project[];
  status: LoadStatus;
  error?: string;
  retry: () => void;
}

export function Projects({ projects, status, error, retry }: ProjectsProps) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("updated");
  const [showAll, setShowAll] = useState(false);
  // Typing stays responsive while the grid re-filters
  const deferredQuery = useDeferredValue(query);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
    return [["All", projects.length] as const, ...counts];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return projects
      .filter((p) => category === "All" || p.category === category)
      .filter((p) => !q || [p.title, p.description, ...p.tech].some((s) => s.toLowerCase().includes(q)))
      // Featured projects always lead, then the chosen order
      .sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || SORTERS[sort](a, b));
  }, [projects, category, deferredQuery, sort]);

  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const loading = status === "loading" && projects.length === 0;

  return (
    <section className="section container" id="projects" tabIndex={-1}>
      <SectionTitle index="04">Projects</SectionTitle>

      {projects.length >= TOOLBAR_MIN && (
        <div className="projects-toolbar">
          <div className="filters" role="toolbar" aria-label="Filter projects by category">
            {categories.map(([name, count]) => (
              <button
                key={name}
                type="button"
                className={`filter-btn${category === name ? " active" : ""}`}
                aria-pressed={category === name}
                onClick={() => {
                  setCategory(name);
                  setShowAll(false);
                }}
              >
                {name} <span className="filter-count">{count}</span>
              </button>
            ))}
          </div>

          <div className="toolbar-controls">
            <label className="search">
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
              <span className="visually-hidden">Search projects</span>
              <input
                type="search"
                placeholder="Search projects…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowAll(false);
                }}
              />
            </label>
            <label className="sort">
              <span className="visually-hidden">Sort projects</span>
              <i className="fa-solid fa-arrow-down-wide-short" aria-hidden="true" />
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                <option value="updated">Recently updated</option>
                <option value="stars">Most stars</option>
                <option value="name">A–Z</option>
              </select>
            </label>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="notice" role="alert">
          <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
          <span>Couldn't reach GitHub{error ? ` (${error})` : ""}. {projects.length ? "Showing curated projects only." : ""}</span>
          <button type="button" className="link-btn" onClick={retry}>
            Try again
          </button>
        </div>
      )}

      {loading ? (
        <div className="projects-loading">
          <MoonLoader size={48} label="Scanning the sky for repos…" />
          <div className="projects-grid" aria-hidden="true">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="project-card skeleton-card">
                <span className="skeleton skeleton-icon" />
                <span className="skeleton skeleton-line w-60" />
                <span className="skeleton skeleton-line" />
                <span className="skeleton skeleton-line w-80" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {projects.length >= TOOLBAR_MIN && (
            <p className="results-count" aria-live="polite">
              {filtered.length === 0
                ? ""
                : `Showing ${visible.length} of ${filtered.length} project${filtered.length === 1 ? "" : "s"}`}
            </p>
          )}

          {filtered.length > 0 ? (
            <div className="projects-grid">
              {visible.map((p) => (
                <ProjectCard key={p.repo ?? p.title} project={p} />
              ))}
            </div>
          ) : (
            status !== "error" && (
              <div className="empty-state">
                <i className="fa-solid fa-meteor" aria-hidden="true" />
                <p>{projects.length ? "No projects match that search." : "No projects to show yet."}</p>
                {(query || category !== "All") && (
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => {
                      setQuery("");
                      setCategory("All");
                    }}
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )
          )}

          {filtered.length > PAGE_SIZE && (
            <div className="show-more">
              <button type="button" className="btn btn-ghost" onClick={() => setShowAll((s) => !s)}>
                {showAll ? "Show fewer" : `Show all ${filtered.length}`}
                <i className={`fa-solid ${showAll ? "fa-chevron-up" : "fa-chevron-down"}`} aria-hidden="true" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
