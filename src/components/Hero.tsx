import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { AVAILABILITY, NAME, ROTATING_WORDS } from "../data/content";
import { useMoonPhase } from "../hooks/useMoonPhase";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useI18n } from "../i18n/LanguageContext";
import { MoonIcon } from "./MoonIcon";
import { SketchMoon } from "./SketchMoon";

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

// Directions of the stars that burst out when the moon is clicked
const RAYS = Array.from({ length: 10 }, (_, i) => i * 36);

interface HeroProps {
  /** null hides the stats row unless it's still loading */
  stats: HeroStats | null;
  statsLoading: boolean;
}

export function Hero({ stats, statsLoading }: HeroProps) {
  const moon = useMoonPhase();
  const { t, l } = useI18n();
  // Each click on the moon adds a burst of stars, removed once its animation has played
  const [bursts, setBursts] = useState<number[]>([]);
  const [wobbles, setWobbles] = useState(0);
  const statItems = [
    { label: t("hero.statProjects"), value: stats?.projects },
    { label: t("hero.statTech"), value: stats?.technologies },
    { label: t("hero.statYears"), value: stats?.yearsInIt, suffix: "+" },
  ];

  const burst = () => {
    const id = performance.now();
    setBursts((b) => [...b, id]);
    setWobbles((w) => w + 1);
    setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 900);
  };

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

      {/* To use your picture instead, put it in /public and replace <SketchMoon /> with
          <img src="your-photo.jpg" alt="Manuel" /> */}
      <div className="hero-art">
        {/* A little easter egg: clicking the moon makes it wobble and throw off stars */}
        <div className="photo-frame" onClick={burst}>
          <div className="photo-glow" aria-hidden="true" />
          <div className="orbit-track" aria-hidden="true">
            <span className="orbit-moon">
              <MoonIcon phase={moon.phase} size={30} craters />
            </span>
          </div>
          <div className="orbit-track orbit-track--inner" aria-hidden="true">
            <span className="orbit-planet" />
          </div>
          {/* Re-keyed on every click so the wobble restarts */}
          <span key={wobbles} className={`moon-bounce${wobbles ? " boing" : ""}`}>
            <SketchMoon />
          </span>
          {bursts.map((id) => (
            <span key={id} className="moon-burst" aria-hidden="true">
              {RAYS.map((angle, i) => (
                <i key={angle} style={{ "--a": `${angle}deg`, "--d": `${i % 2 ? 150 : 210}px` } as CSSProperties} />
              ))}
            </span>
          ))}
        </div>
      </div>

      <a className="scroll-cue" href="#about" aria-label={t("hero.scroll")}>
        <span />
      </a>
    </section>
  );
}
