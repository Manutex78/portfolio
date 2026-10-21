import { useDeferredValue, useMemo, useState } from "react";
import type { Category, Project } from "../data/content";
import type { LoadStatus } from "../hooks/useGithubProjects";
import { useI18n } from "../i18n/LanguageContext";
import type { UIKey } from "../i18n/ui";
import { MoonLoader } from "./MoonLoader";
import { ProjectCard } from "./ProjectCard";
import { SectionTitle } from "./Reveal";

type SortKey = "updated" | "stars" | "name";

const SORTERS: Record<SortKey, (a: Project, b: Project) => number> = {
  updated: (a, b) => (b.updatedAt ?? "").localeCompare(a.updatedAt ?? ""),
  stars: (a, b) => (b.stars ?? 0) - (a.stars ?? 0),
  name: (a, b) => a.title.localeCompare(b.title),
};

const SORT_LABELS: Record<SortKey, UIKey> = {
  updated: "projects.sortUpdated",
  stars: "projects.sortStars",
  name: "projects.sortName",
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
  const { t, l } = useI18n();
  const [category, setCategory] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("updated");
  const [showAll, setShowAll] = useState(false);
  // Typing stays responsive while the grid re-filters
  const deferredQuery = useDeferredValue(query);

  const categories = useMemo(() => {
    const counts = new Map<Category, number>();
    projects.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
    return [["all", projects.length] as const, ...counts];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return projects
      .filter((p) => category === "all" || p.category === category)
      .filter((p) => !q || [p.title, l(p.description), ...p.tech].some((s) => s.toLowerCase().includes(q)))
      // Featured projects always lead, then the chosen order
      .sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || SORTERS[sort](a, b));
  }, [projects, category, deferredQuery, sort, l]);

  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const loading = status === "loading" && projects.length === 0;
  const errorText = error === "rate-limit" ? t("projects.rateLimit") : t("projects.httpError", { status: error ?? "?" });

  return (
    <section className="section container" id="projects" tabIndex={-1}>
      <SectionTitle index="04">{t("projects.title")}</SectionTitle>

      {projects.length >= TOOLBAR_MIN && (
        <div className="projects-toolbar">
          <div className="filters" role="toolbar" aria-label={t("projects.filterLabel")}>
            {categories.map(([key, count]) => (
              <button
                key={key}
                type="button"
                className={`filter-btn${category === key ? " active" : ""}`}
                aria-pressed={category === key}
                onClick={() => {
                  setCategory(key);
                  setShowAll(false);
                }}
              >
                {t(`category.${key}`)} <span className="filter-count">{count}</span>
              </button>
            ))}
          </div>

          <div className="toolbar-controls">
            <label className="search">
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
              <span className="visually-hidden">{t("projects.searchLabel")}</span>
              <input
                type="search"
                placeholder={t("projects.search")}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowAll(false);
                }}
              />
            </label>
            <label className="sort">
              <span className="visually-hidden">{t("projects.sortLabel")}</span>
              <i className="fa-solid fa-arrow-down-wide-short" aria-hidden="true" />
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                  <option key={key} value={key}>
                    {t(SORT_LABELS[key])}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="notice" role="alert">
          <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
          <span>
            {t("projects.error", { error: errorText })} {projects.length > 0 && t("projects.curatedOnly")}
          </span>
          <button type="button" className="link-btn" onClick={retry}>
            {t("projects.retry")}
          </button>
        </div>
      )}

      {loading ? (
        <div className="projects-loading">
          <MoonLoader size={48} label={t("projects.scanning")} />
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
              {filtered.length > 0 && t("projects.showing", { shown: visible.length, total: filtered.length })}
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
                <p>{projects.length ? t("projects.noMatch") : t("projects.noneYet")}</p>
                {(query || category !== "all") && (
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => {
                      setQuery("");
                      setCategory("all");
                    }}
                  >
                    {t("projects.clear")}
                  </button>
                )}
              </div>
            )
          )}

          {filtered.length > PAGE_SIZE && (
            <div className="show-more">
              <button type="button" className="btn btn-ghost" onClick={() => setShowAll((s) => !s)}>
                {showAll ? t("projects.showFewer") : t("projects.showAll", { n: filtered.length })}
                <i className={`fa-solid ${showAll ? "fa-chevron-up" : "fa-chevron-down"}`} aria-hidden="true" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
