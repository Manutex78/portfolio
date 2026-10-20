import { useEffect, useRef, useState } from "react";
import { animateScrollTo, NAV_OFFSET } from "../lib/scroll";

// Tracks which section is on screen, and makes every in-page link
// (navbar, brand, hero buttons) glide to its target instead of jumping.
export function useSectionNav(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  // While an animated scroll runs, keep the clicked link active
  const locked = useRef(false);

  useEffect(() => {
    // The active section is the last one whose top has passed 40% of the viewport
    const update = () => {
      if (locked.current) return;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of ids) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActiveId(atBottom ? ids[ids.length - 1] : current);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      const target = id && document.getElementById(id);
      if (!id || !target) return;
      e.preventDefault();

      const isSection = ids.includes(id);
      locked.current = isSection;
      setActiveId(isSection ? id : null);
      const y = id === "top" ? 0 : target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;

      animateScrollTo(y, () => {
        locked.current = false;
        update();
        history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
        // Move keyboard focus along with the scroll
        target.focus({ preventScroll: true });
        // A short "you've arrived" flourish on the section heading
        const title = target.querySelector(".section-title");
        if (title) {
          title.classList.remove("arrived");
          void (title as HTMLElement).offsetWidth; // restart the animation
          title.classList.add("arrived");
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, [ids]);

  return activeId;
}
