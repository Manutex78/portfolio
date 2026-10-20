import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger step, in multiples of 80ms */
  delay?: number;
}

// Fades and lifts its content in the first time it scrolls into view
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--delay": `${delay * 80}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

export function SectionTitle({ index, children, center = false }: { index: string; children: ReactNode; center?: boolean }) {
  const ref = useReveal<HTMLHeadingElement>();
  return (
    <h2 ref={ref} className={`section-title reveal${center ? " center" : ""}`}>
      <span>{index}.</span> {children}
    </h2>
  );
}
