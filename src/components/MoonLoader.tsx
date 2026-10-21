import { useEffect, useRef, useState } from "react";
import { moonPath, phaseIndex } from "../lib/moon";
import { useI18n } from "../i18n/LanguageContext";
import { MOON_PHASES } from "../i18n/ui";
import { useReducedMotion } from "../hooks/useReducedMotion";

const R = 45;
const CYCLE_MS = 2400;

interface MoonLoaderProps {
  size?: number;
  label: string;
  /** Show the current phase name under the label */
  showPhase?: boolean;
}

// A moon cycling through its phases
export function MoonLoader({ size = 64, label, showPhase = false }: MoonLoaderProps) {
  const litRef = useRef<SVGPathElement>(null);
  const [phase, setPhase] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const { t } = useI18n();

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    let last = -1;

    const tick = (now: number) => {
      let p = ((now - start) % CYCLE_MS) / CYCLE_MS;
      // With reduced motion, step through the 8 named phases instead of gliding
      if (reducedMotion) p = Math.floor(p * 8) / 8;
      litRef.current?.setAttribute("d", moonPath(p, R));
      const index = phaseIndex(p);
      if (showPhase && index !== last) {
        last = index;
        setPhase(index);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, showPhase]);

  return (
    <div className="moon-loader" role="status">
      <svg viewBox="-50 -50 100 100" width={size} height={size} aria-hidden="true">
        <circle className="moon-dark" r={R} />
        <path className="moon-lit" ref={litRef} />
        <circle className="moon-crater" cx="-14" cy="-12" r="7" />
        <circle className="moon-crater" cx="16" cy="10" r="9" />
        <circle className="moon-crater" cx="-6" cy="22" r="4" />
      </svg>
      <p className="loader-label">{label}</p>
      {showPhase && (
        <p className="loader-phase" aria-hidden="true">
          {phase !== null && t(MOON_PHASES[phase])}
        </p>
      )}
    </div>
  );
}
