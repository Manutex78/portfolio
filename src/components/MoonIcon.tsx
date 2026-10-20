import { moonPath } from "../lib/moon";

const R = 45;

interface MoonIconProps {
  /** 0 = new, 0.5 = full, 1 = new again */
  phase: number;
  size?: number;
  craters?: boolean;
  className?: string;
}

// A still moon drawn at a given phase (the animated version is MoonLoader)
export function MoonIcon({ phase, size = 18, craters = false, className = "" }: MoonIconProps) {
  return (
    <svg className={`moon-icon ${className}`} viewBox="-50 -50 100 100" width={size} height={size} aria-hidden="true">
      <circle className="moon-dark" r={R} />
      <path className="moon-lit" d={moonPath(phase, R)} />
      {craters && (
        <>
          <circle className="moon-crater" cx="-14" cy="-12" r="7" />
          <circle className="moon-crater" cx="16" cy="10" r="9" />
          <circle className="moon-crater" cx="-6" cy="22" r="4" />
        </>
      )}
    </svg>
  );
}
