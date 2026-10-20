import { FULL_NAME } from "../data/content";
import { useMoonPhase } from "../hooks/useMoonPhase";
import { MoonIcon } from "./MoonIcon";

function untilFull(days: number) {
  const n = Math.round(days);
  return n <= 1 ? "full tomorrow" : `full in ${n} days`;
}

export function Footer() {
  const moon = useMoonPhase();
  const lit = Math.round(moon.illumination * 100);
  const isFull = moon.name === "Full moon";

  return (
    <footer className="site-footer">
      <p className="tonight">
        <MoonIcon phase={moon.phase} size={22} craters />
        <span>
          Tonight's moon: <strong>{moon.name}</strong> · {lit}% lit
          {!isFull && ` · ${untilFull(moon.daysToFull)}`}
        </span>
      </p>
      <p>
        Designed &amp; built by {FULL_NAME} with React · {new Date().getFullYear()}
      </p>
      <a className="back-to-top" href="#top">
        <i className="fa-solid fa-arrow-up" aria-hidden="true" /> Back to top
      </a>
    </footer>
  );
}
