import { useEffect, useState } from "react";
import { AVAILABILITY, NAME, PLATFORMS } from "../data/content";
import { useMoonPhase } from "../hooks/useMoonPhase";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { MoonIcon } from "./MoonIcon";

export interface HeroStats {
  projects: number;
  technologies: number;
  yearsInIt: number;
}

const platformList = new Intl.ListFormat("en", { type: "conjunction" }).format(PLATFORMS);

// Cycles "web" → "desktop" → "mobile"; with reduced motion, lists them all instead
function RotatingWord() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % PLATFORMS.length), 2600);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  if (reducedMotion) return <span className="accent-text">{platformList}</span>;

  return (
    <>
      <span className="rotating-word" aria-hidden="true">
        <span key={index} className="accent-text">
          {PLATFORMS[index]}
        </span>
      </span>
      <span className="visually-hidden">{platformList}</span>
    </>
  );
}

interface HeroProps {
  /** null hides the stats row unless it's still loading */
  stats: HeroStats | null;
  statsLoading: boolean;
}

export function Hero({ stats, statsLoading }: HeroProps) {
  const moon = useMoonPhase();
  const statItems = [
    { label: "Projects", value: stats?.projects },
    { label: "Technologies used", value: stats?.technologies },
    { label: "Years in IT", value: stats && `${stats.yearsInIt}+` },
  ];

  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy">
        {AVAILABILITY && (
          <p className="status-pill">
            <span className="status-dot" aria-hidden="true" />
            {AVAILABILITY}
          </p>
        )}
        <h1 id="hero-title">
          Hi, I'm <span className="name-gradient">{NAME}</span>.
        </h1>
        <p className="hero-sub">
          I build things for the <RotatingWord />.
        </p>
        <p className="hero-text">
          I'm a developer who enjoys turning ideas into working things — from full-stack web apps and browser
          games to 3D and VR scenes and Python desktop apps. Currently sharpening my TypeScript and React skills.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#projects">
            <i className="fa-solid fa-rocket" aria-hidden="true" /> Explore my work
          </a>
          <a className="btn btn-ghost" href="#contact">
            <i className="fa-solid fa-satellite-dish" aria-hidden="true" /> Open a channel
          </a>
        </div>

        {(stats || statsLoading) && (
          <dl className="hero-stats">
            {statItems.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value ?? <span className="stat-skeleton" aria-label="Loading" />}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* To use your picture, put it in /public and replace .photo-empty with
          <img src="your-photo.jpg" alt="Manuel" /> */}
      <div className="hero-art">
        <div className="photo-frame">
          <div className="photo-glow" aria-hidden="true" />
          <div className="orbit-track" aria-hidden="true">
            <span className="orbit-moon">
              <MoonIcon phase={moon.phase} size={30} craters />
            </span>
          </div>
          <div className="orbit-track orbit-track--inner" aria-hidden="true">
            <span className="orbit-planet" />
          </div>
          <div className="photo-empty" aria-hidden="true">
            <i className="fa-solid fa-user-astronaut" />
            <span>Your photo here</span>
          </div>
        </div>
      </div>

      <a className="scroll-cue" href="#about" aria-label="Scroll to About">
        <span />
      </a>
    </section>
  );
}
