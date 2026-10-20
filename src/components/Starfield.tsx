import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Star {
  x: number;
  y: number;
  size: number;
  cross: boolean;
  speed: number;
  offset: number;
}

const readStarColor = () => getComputedStyle(document.documentElement).getPropertyValue("--star").trim();

// Flat, pixel-style stars behind the hero that twinkle, plus the occasional shooting star
export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let stars: Star[] = [];
    let shooting: { x: number; y: number; life: number } | null = null;
    let w = 0;
    let h = 0;
    let frame = 0;
    let color = readStarColor();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round((w * h) / 5000) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() < 0.85 ? 1 : 2,
        cross: Math.random() < 0.03,
        speed: 0.5 + Math.random() * 1.5,
        offset: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      for (const s of stars) {
        ctx.globalAlpha = reducedMotion ? 0.7 : 0.35 + 0.65 * Math.abs(Math.sin((t / 1000) * s.speed + s.offset));
        const x = Math.round(s.x);
        const y = Math.round(s.y);
        if (s.cross) {
          // Four-point "sparkle" star
          ctx.fillRect(x - 3, y, 7, 1);
          ctx.fillRect(x, y - 3, 1, 7);
        } else {
          ctx.fillRect(x, y, s.size, s.size);
        }
      }

      if (!reducedMotion) {
        if (!shooting && Math.random() < 0.004) {
          shooting = { x: Math.random() * w * 0.8, y: Math.random() * h * 0.4, life: 0 };
        }
        if (shooting) {
          shooting.life += 1;
          const len = 80, vx = 7, vy = 3;
          const hx = shooting.x + shooting.life * vx;
          const hy = shooting.y + shooting.life * vy;
          const grad = ctx.createLinearGradient(hx, hy, hx - len, hy - (len * vy) / vx);
          grad.addColorStop(0, color);
          grad.addColorStop(1, "transparent");
          ctx.globalAlpha = Math.max(0, 1 - shooting.life / 45);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(hx, hy);
          ctx.lineTo(hx - len, hy - (len * vy) / vx);
          ctx.stroke();
          if (shooting.life > 45) shooting = null;
        }
        frame = requestAnimationFrame(draw);
      }
      ctx.globalAlpha = 1;
    };

    resize();
    // The hero's height changes with fonts and viewport width, so watch the canvas itself
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw(0);
    });
    resizeObserver.observe(canvas);

    // Pick up the new star color when the theme flips
    const themeObserver = new MutationObserver(() => {
      color = readStarColor();
      if (reducedMotion) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
    };
  }, [reducedMotion]);

  return <canvas className="starfield" ref={canvasRef} aria-hidden="true" />;
}
