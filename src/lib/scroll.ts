export const NAV_OFFSET = 100; // room for the floating navbar

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

let frame = 0;
let cancelCurrent: (() => void) | null = null;

// Glides the page to y; any wheel/touch/key input from the user cancels it
export function animateScrollTo(y: number, onDone: () => void) {
  cancelCurrent?.();
  const startY = window.scrollY;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const distance = Math.max(0, Math.min(y, maxY)) - startY;
  const duration = Math.min(1100, 450 + Math.abs(distance) * 0.25);
  const start = performance.now();

  const events = ["wheel", "touchstart", "keydown"] as const;
  const finish = () => {
    cancelAnimationFrame(frame);
    events.forEach((e) => window.removeEventListener(e, finish));
    cancelCurrent = null;
    onDone();
  };
  events.forEach((e) => window.addEventListener(e, finish, { passive: true }));
  cancelCurrent = finish;

  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo({ top: startY + distance * easeInOutCubic(t), behavior: "instant" });
    if (t < 1) frame = requestAnimationFrame(step);
    else finish();
  };
  frame = requestAnimationFrame(step);
}
