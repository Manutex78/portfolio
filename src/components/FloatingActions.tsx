import { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { useI18n } from "../i18n/LanguageContext";

// Theme toggle pinned to the corner; once the hero scrolls away an arrow appears above it.
// The arrow is a #top link, so useSectionNav gives it the same glide as the navbar.
export function FloatingActions() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="floating-actions">
      <a
        className={`icon-btn scroll-top${pastHero ? " visible" : ""}`}
        href="#top"
        aria-label={t("header.backToTop")}
        aria-hidden={!pastHero}
        tabIndex={pastHero ? undefined : -1}
      >
        <i className="fa-solid fa-arrow-up" aria-hidden="true" />
      </a>
      <button
        className="icon-btn theme-btn"
        type="button"
        onClick={toggle}
        aria-label={theme === "dark" ? t("header.themeToLight") : t("header.themeToDark")}
      >
        <i className={`fa-solid ${theme === "dark" ? "fa-moon" : "fa-sun"}`} aria-hidden="true" />
      </button>
    </div>
  );
}
