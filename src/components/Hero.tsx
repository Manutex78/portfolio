import { Fragment } from "react";
import { AVAILABILITY, FULL_NAME, skills } from "../data/content";
import { SOCIALS } from "../data/socials";
import { useI18n } from "../i18n/LanguageContext";
import { TechLogo } from "./TechLogo";

type JsonValue = string | boolean | string[];

const API_PATH = `/api/developers/${FULL_NAME.toLowerCase().replace(/\s+/g, "-")}`;

function JsonLeaf({ value }: { value: string | boolean }) {
  return typeof value === "string" ? <>"{value}"</> : <span className="json-literal">{String(value)}</span>;
}

// The profile written out as the response of a REST endpoint: the kind of thing this developer builds
function ApiCard() {
  const { t } = useI18n();
  const profile: [string, JsonValue][] = [
    ["name", FULL_NAME],
    ["role", t("hero.role")],
    ["stack", skills.find((s) => s.main)?.items ?? []],
    ["studying", t("fact.studyingValue")],
    ["location", "Portugal"],
    ["languages", ["pt", "en"]],
    ["available", AVAILABILITY !== null],
  ];

  return (
    <figure className="api-card invert" aria-label={t("hero.panelLabel")}>
      <p className="api-request">
        <span className="api-method">GET</span>
        <span className="api-path">{API_PATH}</span>
      </p>
      <p className="api-status">
        <strong>200 OK</strong>
        <span>application/json</span>
      </p>
      <pre>
        <code>
          {"{\n"}
          {profile.map(([key, value], i) => (
            <Fragment key={key}>
              {"  "}
              <span className="json-key">"{key}"</span>
              {": "}
              {Array.isArray(value) ? (
                // Short lists stay on one line; longer ones get a line per item
                <>
                  [{value.length > 3 && "\n    "}
                  {value.map((item, j) => (
                    <Fragment key={item}>
                      <JsonLeaf value={item} />
                      {j < value.length - 1 && (value.length > 3 ? ",\n    " : ", ")}
                    </Fragment>
                  ))}
                  {value.length > 3 && "\n  "}]
                </>
              ) : (
                <JsonLeaf value={value} />
              )}
              {i < profile.length - 1 && ","}
              {"\n"}
            </Fragment>
          ))}
          {"}"}
        </code>
      </pre>
    </figure>
  );
}

export function Hero() {
  const { t, l } = useI18n();
  const stack = skills.find((s) => s.main)?.items ?? [];

  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        {AVAILABILITY && (
          <p className="availability">
            <span className="availability-dot" aria-hidden="true" />
            {l(AVAILABILITY)}
          </p>
        )}
        <h1 id="hero-title">{FULL_NAME}</h1>
        <p className="hero-role">{t("hero.role")}</p>
        <p className="hero-lead">{t("hero.lead")}</p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#projects">
            {t("hero.ctaWork")}
          </a>
          <a className="btn btn-ghost" href="#contact">
            {t("hero.ctaContact")}
          </a>
          {SOCIALS.slice(0, 2).map((s) => (
            <a key={s.label} className="icon-btn" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
              <i className={`fa-brands ${s.icon}`} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <ApiCard />

      {/* The stack to be hired for, across the foot of the hero */}
      <div className="hero-stack">
        <h2>{t("hero.stack")}</h2>
        <ul>
          {stack.map((tech) => (
            <li key={tech}>
              <TechLogo tech={tech} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
