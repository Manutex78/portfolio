import { skills } from "../data/content";
import { Reveal, SectionTitle } from "./Reveal";

export function Skills() {
  return (
    <section className="section container" id="skills" tabIndex={-1}>
      <SectionTitle index="03">Skills</SectionTitle>
      <div className="skills-grid">
        {skills.map(({ title, icon, items, usedIn, learning }, i) => (
          <Reveal key={title} className={`skill-card${learning ? " skill-card--learning" : ""}`} delay={i}>
            <h3>
              <span className="skill-icon">
                <i className={icon} aria-hidden="true" />
              </span>
              {title}
            </h3>
            <ul className="tags">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {usedIn && (
              <p className="used-in">
                <i className="fa-solid fa-rocket" aria-hidden="true" /> Used in {usedIn.join(", ")}
              </p>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
