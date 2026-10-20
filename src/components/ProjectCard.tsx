import { memo } from "react";
import type { Project } from "../data/content";
import { LANGUAGE_COLOR, timeAgo } from "../lib/github";

export const ProjectCard = memo(function ProjectCard({ project: p }: { project: Project }) {
  const href = p.demo || p.github;
  const languageColor = p.language && LANGUAGE_COLOR[p.language];

  return (
    <article className={`project-card${p.featured ? " project-card--featured" : ""}`}>
      <div className="project-top">
        <span className={`project-icon${p.logo ? " project-icon--logo" : ""}`} style={p.logoBg ? { background: p.logoBg } : undefined}>
          {p.logo ? <img src={p.logo} alt="" width={30} height={30} /> : <i className={p.icon} aria-hidden="true" />}
        </span>
        <div className="project-links">
          {p.github && (
            <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} on GitHub`}>
              <i className="fa-brands fa-github" aria-hidden="true" />
            </a>
          )}
          {p.demo && (
            <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live site`}>
              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <h3>
        {/* The title link stretches over the whole card (see .stretched-link) */}
        {href ? (
          <a className="stretched-link" href={href} target="_blank" rel="noopener noreferrer">
            {p.title}
          </a>
        ) : (
          p.title
        )}
        {p.featured && <span className="featured-tag">Featured</span>}
      </h3>
      <p className="project-desc">{p.description}</p>

      {p.tech.length > 0 && (
        <ul className="project-tech">
          {p.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}

      <div className="project-meta">
        {p.language && (
          <span>
            <span className="lang-dot" style={{ background: languageColor || "var(--muted)" }} aria-hidden="true" />
            {p.language}
          </span>
        )}
        {!!p.stars && (
          <span className="stars">
            <i className="fa-solid fa-star" aria-hidden="true" /> {p.stars}
          </span>
        )}
        {p.badges?.map((b) => (
          <span key={b} className="badge">
            <i className={b === "Fork" ? "fa-solid fa-code-fork" : "fa-solid fa-box-archive"} aria-hidden="true" /> {b}
          </span>
        ))}
        {p.updatedAt && <span className="updated">Updated {timeAgo(p.updatedAt)}</span>}
      </div>
    </article>
  );
});
