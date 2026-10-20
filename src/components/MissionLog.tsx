import { missions } from "../data/content";
import { Reveal, SectionTitle } from "./Reveal";

const KIND = {
  education: { icon: "fa-solid fa-graduation-cap", label: "Education" },
  work: { icon: "fa-solid fa-briefcase", label: "Work" },
};

// Education and work as a trajectory: each stop is a planet on the line,
// and the ones still in progress glow
export function MissionLog() {
  return (
    <section className="section container" id="journey" tabIndex={-1}>
      <SectionTitle index="02">Mission log</SectionTitle>
      <ol className="timeline">
        {missions.map((m, i) => (
          <li key={`${m.org}-${m.period}`} className={`mission${m.current ? " mission--current" : ""}`}>
            <span className="mission-node" aria-hidden="true" />
            <Reveal className="mission-card" delay={i}>
              <div className="mission-head">
                <span className="mission-period">{m.period}</span>
                <span className={`mission-kind mission-kind--${m.kind}`}>
                  <i className={KIND[m.kind].icon} aria-hidden="true" /> {KIND[m.kind].label}
                </span>
                {m.current && <span className="mission-live">In orbit</span>}
              </div>
              <h3>{m.title}</h3>
              <p className="mission-org">{m.org}</p>
              <p className="mission-desc">{m.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
