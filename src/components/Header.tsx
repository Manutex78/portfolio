import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PLANETS, usePlanet, type Planet } from "../hooks/usePlanet";
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

// One swatch per planet accent; hovering shows the planet's name
function PlanetSwitch({ planet, onChange }: { planet: Planet; onChange: (p: Planet) => void }) {
  const { t } = useI18n();
  return (
    <div className="planet-switch" role="group" aria-label={t("header.planet")}>
      {PLANETS.map((p) => (
        <button
          key={p}
          type="button"
          className={`planet-swatch planet-swatch--${p}`}
          aria-pressed={planet === p}
          aria-label={t(`planet.${p}`)}
          data-tip={t(`planet.${p}`)}
          onClick={() => onChange(p)}
        />
      ))}
    </div>
  );
}

// Colour and language live behind one button so the bar only carries navigation
function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const { planet, setPlanet } = usePlanet();
  const { t } = useI18n();
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on Escape or a click anywhere outside the panel
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className="settings" ref={rootRef}>
      <button
        className="icon-btn settings-btn"
        type="button"
        aria-label={t("header.settings")}
        aria-expanded={open}
        aria-controls="settings-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <i className="fa-solid fa-sliders" aria-hidden="true" />
      </button>
      <div className={`settings-panel${open ? " open" : ""}`} id="settings-panel" role="group" aria-label={t("header.settings")}>
        <div className="settings-row">
          <span className="settings-label">{t("header.planet")}</span>
          <PlanetSwitch planet={planet} onChange={setPlanet} />
        </div>
        <div className="settings-row">
          <span className="settings-label">{t("header.language")}</span>
          <LanguageSwitch />
        </div>
      </div>
    </div>
  );
}

export function Header({ sections, activeId }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang } = useI18n();
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Slide the underline to the active link (labels change width with the language)
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

  // Reading progress bar + a more solid navbar once the page has scrolled.
  // The bar is updated directly so scrolling doesn't re-render the header.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      setScrolled(window.scrollY > 24);
    };
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
    <>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <a className="brand" href="#top">
          <span className="brand-prompt" aria-hidden="true">
            &gt;_
          </span>
          <span>
            manuel<span className="brand-dot">.</span>dev
          </span>
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
          <SettingsMenu />
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
    </>
  );
}
