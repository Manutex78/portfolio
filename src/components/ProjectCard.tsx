import { memo } from "react";
import type { Project } from "../data/content";
import { useI18n } from "../i18n/LanguageContext";
import { LANGUAGE_COLOR, timeAgo } from "../lib/github";

// Routes and table relationships, laid out like API docs
function ApiPanel({ project: p }: { project: Project }) {
  const { t } = useI18n();
  return (
    <div className="api-panel">
      {!!p.endpoints?.length && (
        <div>
          <h4 className="panel-label">{t("card.endpoints")}</h4>
          <ul className="endpoints">
            {p.endpoints.map(({ method, path }) => (
              <li key={method + path}>
                <span className={`method method--${method.toLowerCase()}`}>{method}</span>
                <code>{path}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!!p.schema?.length && (
        <div>
          <h4 className="panel-label">{t("card.schema")}</h4>
          <ul className="schema">
            {p.schema.map(({ from, kind, to }) => (
              <li key={from + to}>
                <code>{from}</code>
                <span className="relation">{kind}</span>
                <code>{to}</code>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export const ProjectCard = memo(function ProjectCard({ project: p }: { project: Project }) {
  const { t, l, locale } = useI18n();
  const href = p.demo || p.github;
  const languageColor = p.language && LANGUAGE_COLOR[p.language];
  const description = l(p.description) || t("card.noDescription");
  const hasApi = !!(p.endpoints?.length || p.schema?.length);

  return (
    <article className={`project-card${p.featured ? " project-card--featured" : ""}${hasApi ? " project-card--api" : ""}`}>
      <div className="project-body">
        <div className="project-top">
          <span
            className={`project-icon${p.logo ? " project-icon--logo" : ""}`}
            style={p.logoBg ? { background: p.logoBg } : undefined}
          >
            {p.logo ? <img src={p.logo} alt="" width={24} height={24} /> : <i className={p.icon} aria-hidden="true" />}
          </span>
          <div className="project-links">
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={t("card.onGithub", { title: p.title })}>
                <i className="fa-brands fa-github" aria-hidden="true" />
              </a>
            )}
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label={t("card.liveSite", { title: p.title })}>
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
          {p.featured && <span className="featured-tag">{t("card.featured")}</span>}
        </h3>
        <p className="project-desc">{description}</p>

        {p.tech.length > 0 && (
          <ul className="project-tech">
            {p.tech.map((tech) => (
              <li key={tech}>{tech}</li>
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
              <i className={b === "Fork" ? "fa-solid fa-code-fork" : "fa-solid fa-box-archive"} aria-hidden="true" />{" "}
              {t(`badge.${b}`)}
            </span>
          ))}
          {p.updatedAt && <span className="updated">{t("card.updated", { time: timeAgo(p.updatedAt, locale) })}</span>}
        </div>
      </div>

      {hasApi && <ApiPanel project={p} />}
    </article>
  );
});
