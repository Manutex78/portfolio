import { useEffect, useState } from "react";
import { MoonLoader } from "./MoonLoader";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useI18n } from "../i18n/LanguageContext";

type Stage = "shown" | "leaving" | "gone";

export function PageLoader() {
  const [stage, setStage] = useState<Stage>("shown");
  const reducedMotion = useReducedMotion();
  const { t } = useI18n();

  useEffect(() => {
    // Let at least half a lunar cycle play so the loader doesn't just flash
    const minShown = reducedMotion ? 0 : 1200;
    const started = performance.now();
    let timer = 0;
    const done = () => {
      timer = window.setTimeout(() => setStage("leaving"), Math.max(0, minShown - (performance.now() - started)));
    };
    if (document.readyState === "complete") done();
    else window.addEventListener("load", done, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", done);
    };
  }, [reducedMotion]);

  useEffect(() => {
    document.body.classList.toggle("is-loading", stage === "shown");
    if (stage !== "leaving") return;
    // Matches the fade-out transition in CSS
    const timer = window.setTimeout(() => setStage("gone"), 500);
    return () => clearTimeout(timer);
  }, [stage]);

  if (stage === "gone") return null;

  return (
    <div className={`page-loader${stage === "leaving" ? " done" : ""}`} aria-live="polite">
      <MoonLoader size={96} label={t("loader.page")} showPhase />
    </div>
  );
}
