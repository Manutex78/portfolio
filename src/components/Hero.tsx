import { useEffect, useMemo, useState } from "react";
import { AVAILABILITY, FULL_NAME, NAME, ROTATING_WORDS, skills, TIME_ZONE } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useI18n } from "../i18n/LanguageContext";

export interface HeroStats {
  projects: number;
  technologies: number;
  yearsInIt: number;
}

// Cycles "APIs" → "databases" → "server logic"; with reduced motion, lists them all instead
function RotatingWord() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const { l, locale } = useI18n();
  // Only changes with the language, not on every rotation tick
  const [words, list] = useMemo(() => {
    const words = ROTATING_WORDS.map(l);
    return [words, new Intl.ListFormat(locale, { type: "conjunction" }).format(words)] as const;
  }, [l, locale]);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % ROTATING_WORDS.length), 2600);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  if (reducedMotion) return <span className="accent-text">{list}</span>;

  return (
    <>
      <span className="rotating-word" aria-hidden="true">
        <span key={`${locale}-${index}`} className="accent-text">
          {words[index]}
        </span>
      </span>
      <span className="visually-hidden">{list}</span>
    </>
  );
}

// Counts up to `to` with an ease-out; with reduced motion, shows the number straight away
function CountUp({ to }: { to: number }) {
  const reducedMotion = useReducedMotion();
  const [n, setN] = useState(reducedMotion ? to : 0);

  useEffect(() => {
    if (reducedMotion) {
      setN(to);
      return;
    }
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const p = Math.min((now - start) / 900, 1);
      setN(Math.round(to * (1 - (1 - p) ** 3)));
      if (p < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [to, reducedMotion]);

  return <>{n}</>;
}

// The main skill groups (back-end, then databases) make up the "stack" field
const STACK = skills.slice(0, 2).flatMap((s) => s.items);

// A JSON value with the same colours an editor would give it
function Value({ value }: { value: string | boolean | string[] }) {
  if (typeof value === "boolean") return <span className="tok-bool">{String(value)}</span>;
  if (typeof value === "string") return <span className="tok-str">"{value}"</span>;
  return (
    <>
      [
      {value.map((v, i) => (
        <span key={v}>
          <span className="tok-str">"{v}"</span>
          {i < value.length - 1 && ", "}
        </span>
      ))}
      ]
    </>
  );
}

// "Who I am" as an API response: the one code flourish on the page.
// Decorative for screen readers, since the copy beside it says the same thing.
function ResponseCard() {
  const fields: [string, string | boolean | string[]][] = [
    ["name", FULL_NAME],
    ["role", "back-end developer"],
    ["stack", STACK],
    ["timezone", TIME_ZONE],
    ["available", !!AVAILABILITY],
  ];

  return (
    <figure className="response-card" aria-hidden="true">
      <figcaption className="response-head">
        <span className="method method--get">GET</span>
        <span className="response-path">/api/me</span>
        <span className="response-status">200 OK</span>
      </figcaption>
      <pre>
        <code>
          {"{\n"}
          {fields.map(([key, value], i) => (
            <span key={key}>
              {"  "}
              <span className="tok-key">"{key}"</span>: <Value value={value} />
              {i < fields.length - 1 ? ",\n" : "\n"}
            </span>
          ))}
          {"}"}
        </code>
      </pre>
    </figure>
  );
}

interface HeroProps {
  /** null hides the stats row unless it's still loading */
  stats: HeroStats | null;
  statsLoading: boolean;
}

export function Hero({ stats, statsLoading }: HeroProps) {
  const { t, l } = useI18n();
  const statItems = [
    { label: t("hero.statProjects"), value: stats?.projects },
    { label: t("hero.statTech"), value: stats?.technologies },
    { label: t("hero.statYears"), value: stats?.yearsInIt, suffix: "+" },
  ];

  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        {AVAILABILITY && (
          <p className="status-pill">
            <span className="status-dot" aria-hidden="true" />
            {l(AVAILABILITY)}
          </p>
        )}
        <h1 id="hero-title">
          {t("hero.greeting")} <span className="hero-name">{NAME}</span>.
        </h1>
        <p className="hero-sub">
          {t("hero.sub")} <RotatingWord />
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#projects">
            {t("hero.ctaWork")} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </a>
          <a className="btn btn-ghost" href="#contact">
            {t("hero.ctaContact")}
          </a>
        </div>

        {(stats || statsLoading) && (
          <dl className="hero-stats">
            {statItems.map(({ label, value, suffix }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>
                  {value === undefined ? (
                    <span className="stat-skeleton" aria-label={t("hero.loading")} />
                  ) : (
                    <>
                      <CountUp to={value} />
                      {suffix}
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="hero-art">
        <ResponseCard />
      </div>
    </section>
  );
}
