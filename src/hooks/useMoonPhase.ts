import { useEffect, useState } from "react";
import { moonPhaseAt } from "../lib/moon";

const REFRESH_MS = 30 * 60 * 1000;

// Today's real moon, kept current if the tab stays open overnight
export function useMoonPhase() {
  const [moon, setMoon] = useState(() => moonPhaseAt(new Date()));

  useEffect(() => {
    const timer = setInterval(() => setMoon(moonPhaseAt(new Date())), REFRESH_MS);
    return () => clearInterval(timer);
  }, []);

  return moon;
}
