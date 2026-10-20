const PHASE_NAMES = [
  "New moon", "Waxing crescent", "First quarter", "Waxing gibbous",
  "Full moon", "Waning gibbous", "Last quarter", "Waning crescent",
];

// Lit area of a moon of radius r at phase p (0 = new, 0.5 = full, 1 = new again).
// Outer edge is a half circle on the lit side; the terminator is a half ellipse.
export function moonPath(p: number, r: number) {
  const k = Math.cos(2 * Math.PI * p);
  const rx = Math.abs(k) * r;
  const waxing = p < 0.5;
  const outer = waxing ? 1 : 0;
  const term = waxing ? (k > 0 ? 0 : 1) : (k > 0 ? 1 : 0);
  return `M0 ${-r} A${r} ${r} 0 0 ${outer} 0 ${r} A${rx} ${r} 0 0 ${term} 0 ${-r}Z`;
}

export const phaseName = (p: number) => PHASE_NAMES[Math.round(p * 8) % 8];

// ---- The real moon ----

const SYNODIC_DAYS = 29.530588853; // average new moon to new moon
const DAY_MS = 86_400_000;
// A known new moon (2000-01-06 18:14 UTC) to count lunations from
const REFERENCE_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

export interface MoonPhase {
  /** 0 = new, 0.5 = full, 1 = new again */
  phase: number;
  /** Lit fraction of the disc, 0–1 */
  illumination: number;
  name: string;
  daysToFull: number;
}

// Mean lunar cycle: accurate to within a day or so, plenty for naming tonight's moon
export function moonPhaseAt(date: Date): MoonPhase {
  const days = (date.getTime() - REFERENCE_NEW_MOON) / DAY_MS;
  const phase = (((days / SYNODIC_DAYS) % 1) + 1) % 1;
  const age = phase * SYNODIC_DAYS;
  const illumination = (1 - Math.cos(2 * Math.PI * phase)) / 2;

  // The four principal phases are moments, so give each about a day either side;
  // the rest of the cycle belongs to the crescents and gibbouses in between
  const near = (target: number) => Math.abs(age - target * SYNODIC_DAYS) < 1;
  let name: string;
  if (near(0) || near(1)) name = "New moon";
  else if (near(0.25)) name = "First quarter";
  else if (near(0.5)) name = "Full moon";
  else if (near(0.75)) name = "Last quarter";
  else name = PHASE_NAMES[1 + 2 * Math.floor(phase * 4)];

  const daysToFull = ((0.5 - phase + 1) % 1) * SYNODIC_DAYS;
  return { phase, illumination, name, daysToFull };
}
