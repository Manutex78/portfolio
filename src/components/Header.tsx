import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/LanguageContext";
import { LOCALE, type Lang } from "../i18n/types";
import type { UIKey } from "../i18n/ui";

interface HeaderProps {
  sections: { id: string; label: UIKey }[];
  activeId: string | null;
}

const LANGS: { code: Lang; label: string; name: string }[] = [
  { code: "pt", label: "PT", name: "Português" },
  { code: "en", label: "EN", name: "English" },
];

function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="lang-switch" role="group" aria-label={t("header.language")}>
      {LANGS.map(({ code, label, name }) => (
        <button
          key={code}
          type="button"
          lang={LOCALE[code]}
          className={lang === code ? "active" : undefined}
          aria-pressed={lang === code}
          aria-label={name}
          onClick={() => setLang(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function Header({ sections, activeId }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang } = useI18n();
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Slide the rule to the active link (labels change width with the language)
  useLayoutEffect(() => {
    const moveIndicator = () => {
      const indicator = indicatorRef.current;
      const link = navRef.current?.querySelector<HTMLAnchorElement>(`a[href="#${activeId}"]`);
      if (!indicator) return;
      indicator.classList.toggle("visible", !!link);
      if (!link) return;
      indicator.style.width = `${link.offsetWidth}px`;
      indicator.style.transform = `translateX(${link.offsetLeft}px)`;
    };
    moveIndicator();
    window.addEventListener("resize", moveIndicator);
    document.fonts?.ready.then(moveIndicator);
    return () => window.removeEventListener("resize", moveIndicator);
  }, [activeId, lang]);

  // The bar gets a bottom rule once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <a className="brand" href="#top">
        manuel<span className="brand-dot">.</span>dev
      </a>

      <nav className={`nav${menuOpen ? " open" : ""}`} id="nav" ref={navRef} aria-label={t("nav.label")}>
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeId === id ? "active" : undefined}
            aria-current={activeId === id ? "true" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {t(label)}
          </a>
        ))}
        <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
      </nav>

      <div className="header-actions">
        <LanguageSwitch />
        <button
          className="icon-btn menu-btn"
          type="button"
          aria-label={menuOpen ? t("header.menuClose") : t("header.menuOpen")}
          aria-expanded={menuOpen}
          aria-controls="nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
