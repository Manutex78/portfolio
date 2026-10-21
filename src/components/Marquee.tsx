import { LOGOS, type Tech } from "../data/logos";

const ITEMS = Object.keys(LOGOS) as Tech[];

// A yellow ticker of the stack between the hero and About. Decorative: the Skills section lists the same names.
// The list is rendered twice so the loop can wrap seamlessly at -50%.
export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy}>
            {ITEMS.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
