import { useEffect, useMemo, useState } from "react";
import { AVAILABILITY, FULL_NAME, NAME, PHOTO, ROTATING_WORDS } from "../data/content";
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

// Framed picture that lifts off its accent backing on hover; a placeholder until PHOTO exists
function PhotoFrame() {
  const { t } = useI18n();
  const [missing, setMissing] = useState(false);

  return (
    <figure className="photo-frame">
      <span className="photo-backing" aria-hidden="true" />
      <span className="photo-card">
        {missing ? (
          <span className="photo-placeholder">
            <i className="fa-solid fa-camera" aria-hidden="true" />
            {t("hero.photoPlaceholder")}
          </span>
        ) : (
          <img src={PHOTO} alt={FULL_NAME} onError={() => setMissing(true)} />
        )}
        <span className="photo-tag" aria-hidden="true">
          {NAME}
        </span>
      </span>
      <span className="photo-corner photo-corner--tl" aria-hidden="true" />
      <span className="photo-corner photo-corner--br" aria-hidden="true" />
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
          {t("hero.greeting")} <span className="name-gradient">{NAME}</span>.
        </h1>
        <p className="hero-sub">
          {t("hero.sub")} <RotatingWord />
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#projects">
            <i className="fa-solid fa-rocket" aria-hidden="true" /> {t("hero.ctaWork")}
          </a>
          <a className="btn btn-ghost" href="#contact">
            <i className="fa-solid fa-satellite-dish" aria-hidden="true" /> {t("hero.ctaContact")}
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
        <PhotoFrame />
      </div>

      <a className="scroll-cue" href="#about" aria-label={t("hero.scroll")}>
        <span />
      </a>
    </section>
  );
}
