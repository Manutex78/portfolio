import { useId } from "react";

// Hand-drawn style full moon: ink outlines and hatching on a yellow disc, lit from the upper right
export function SketchMoon({ className = "" }: { className?: string }) {
  const id = useId();
  const ref = (name: string) => `url(#${id}${name})`;

  return (
    <svg className={`sketch-moon ${className}`} viewBox="-50 -50 100 100" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}fill`} cx="0.62" cy="0.34" r="0.78">
          <stop offset="0" stopColor="#fff3cf" />
          <stop offset="0.45" stopColor="#ffd27a" />
          <stop offset="1" stopColor="#e9a93d" />
        </radialGradient>
        <pattern id={`${id}hatch`} width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
          <path d="M0 0V2.4" stroke="currentColor" strokeWidth="0.39" />
        </pattern>
        <pattern id={`${id}cross`} width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(40)">
          <path d="M0 0V2.4M0 0H2.4" stroke="currentColor" strokeWidth="0.39" />
        </pattern>
        {/* Crescents along the shadowed lower-left edge: a wide hatched one and a narrow cross-hatched one */}
        <mask id={`${id}shade`}>
          <circle r="44" fill="#fff" />
          <circle cx="9" cy="-9" r="43" fill="#000" />
        </mask>
        <mask id={`${id}deep`}>
          <circle r="44" fill="#fff" />
          <circle cx="5" cy="-5" r="46" fill="#000" />
        </mask>
        {/* Thickens the outline on the shadow side, tapering to nothing on the lit side */}
        <mask id={`${id}rim`}>
          <rect x="-50" y="-50" width="100" height="100" fill="#fff" />
          <circle cx="0.6" cy="-0.6" r="44" fill="#000" />
        </mask>
      </defs>

      <circle r="44" fill={ref("fill")} />
      <circle r="44" fill={ref("hatch")} mask={ref("shade")} opacity="0.7" />
      <circle r="44" fill={ref("cross")} mask={ref("deep")} opacity="0.8" />

      {/* Contour strokes that follow the curve of the sphere */}
      <g fill="none" stroke="currentColor" strokeWidth="0.56" strokeLinecap="round" opacity="0.55">
        <path d="M-40 4Q-38 16-32 24" />
        <path d="M-38 18Q-28 30-12 36" />
        <path d="M-30 26Q-18 36 0 40" />
        <path d="M-8 40Q6 42 16 39" />
        <path d="M22 34Q29 29 34 22" />
      </g>

      {/* Craters: a rim with a shadowed hollow inside, offset away from the light */}
      <g stroke="currentColor" strokeLinecap="round">
        <ellipse cx="-14" cy="10" rx="10" ry="9" fill="#f6c25e" strokeWidth="0.91" />
        <ellipse cx="-15.5" cy="8.6" rx="7" ry="6.3" fill={ref("cross")} strokeWidth="0.63" />
        <ellipse cx="15" cy="10" rx="12.5" ry="10.5" fill="#f6c25e" strokeWidth="0.98" />
        <ellipse cx="13.2" cy="8.4" rx="9" ry="7.4" fill={ref("hatch")} strokeWidth="0.7" />
        <ellipse cx="-23" cy="-15" rx="7.5" ry="5.8" fill="#ffe2a0" strokeWidth="0.77" />
        <ellipse cx="-24" cy="-16" rx="5" ry="3.8" fill={ref("hatch")} strokeWidth="0.49" />
        <ellipse cx="0" cy="-19" rx="5" ry="2.8" fill={ref("hatch")} strokeWidth="0.63" />
        <ellipse cx="17" cy="-25" rx="3.6" ry="2.4" fill={ref("hatch")} strokeWidth="0.56" />
        <circle cx="7" cy="-6" r="4" fill="#ffe8b0" strokeWidth="0.63" />
        <circle cx="6.4" cy="-6.6" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="27" cy="-8" r="2.4" fill="none" strokeWidth="0.56" />
        <ellipse cx="-3" cy="31" rx="5" ry="2.8" fill={ref("hatch")} strokeWidth="0.63" />
        <circle cx="8" cy="29" r="1.6" fill="none" strokeWidth="0.49" />
        <circle cx="31" cy="15" r="1.4" fill="none" strokeWidth="0.49" />
      </g>

      <circle r="44" fill="none" stroke="currentColor" strokeWidth="0.98" />
      <circle cx="-0.8" cy="0.8" r="44.6" fill="currentColor" mask={ref("rim")} />
    </svg>
  );
}
