import { useCallback, useState } from "react";

// The accent colour comes from a planet; Venus (yellow) is the default
export const PLANETS = ["mercury", "earth", "venus", "mars"] as const;
export type Planet = (typeof PLANETS)[number];

const isPlanet = (value: unknown): value is Planet => PLANETS.includes(value as Planet);

// index.html applies the saved planet before paint; this keeps React in sync with it
export function usePlanet() {
  const [planet, setPlanetState] = useState<Planet>(() => {
    const saved = document.documentElement.dataset.planet;
    return isPlanet(saved) ? saved : "venus";
  });

  const setPlanet = useCallback((next: Planet) => {
    setPlanetState(next);
    document.documentElement.dataset.planet = next;
    try {
      localStorage.setItem("planet", next);
    } catch {
      // Storage can be blocked (private mode); the colour still applies for this visit
    }
  }, []);

  return { planet, setPlanet };
}
