import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger step, in multiples of 60ms */
  delay?: number;
}

// Fades its content in the first time it scrolls into view
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--delay": `${delay * 60}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

// "01 / about" in mono above the heading, then a hairline to the right
export function SectionTitle({ index, children, center = false }: { index: string; children: ReactNode; center?: boolean }) {
  const ref = useReveal<HTMLHeadingElement>();
  return (
    <h2 ref={ref} className={`section-title reveal${center ? " center" : ""}`}>
      <span className="section-index">{index}</span>
      {children}
    </h2>
  );
}
