import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useMoonPhase } from "../hooks/useMoonPhase";
import { useTheme } from "../hooks/useTheme";
import { MoonIcon } from "./MoonIcon";

interface HeaderProps {
  sections: { id: string; label: string }[];
  activeId: string | null;
}

export function Header({ sections, activeId }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const moon = useMoonPhase();
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Slide the underline to the active link
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
  }, [activeId]);

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
        <a className="brand" href="#top" title={`Tonight's moon: ${moon.name}`}>
          <MoonIcon phase={moon.phase} size={20} className="brand-moon" />
          <span>
            manuel<span className="brand-dot">.</span>dev
          </span>
        </a>

        <nav className={`nav${menuOpen ? " open" : ""}`} id="nav" ref={navRef} aria-label="Main navigation">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeId === id ? "active" : undefined}
              aria-current={activeId === id ? "true" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <span className="nav-indicator" ref={indicatorRef} aria-hidden="true" />
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn theme-btn"
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <i className={`fa-solid ${theme === "dark" ? "fa-moon" : "fa-sun"}`} aria-hidden="true" />
          </button>
          <button
            className="icon-btn menu-btn"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
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
