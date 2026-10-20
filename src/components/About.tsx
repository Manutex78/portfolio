import { AVAILABILITY, SPOKEN_LANGUAGES } from "../data/content";
import { Reveal, SectionTitle } from "./Reveal";

const facts = [
  { icon: "fa-solid fa-crosshairs", label: "Focus", value: "TypeScript & React" },
  { icon: "fa-solid fa-layer-group", label: "Builds", value: "Web apps, games, 3D/VR, Python tools" },
  { icon: "fa-solid fa-graduation-cap", label: "Studying", value: "Web Information Systems @ ESMAD" },
  { icon: "fa-solid fa-language", label: "Speaks", value: SPOKEN_LANGUAGES.join(" & ") },
  ...(AVAILABILITY ? [{ icon: "fa-solid fa-satellite-dish", label: "Status", value: AVAILABILITY }] : []),
];

export function About() {
  return (
    <section className="section container" id="about" tabIndex={-1}>
      <SectionTitle index="01">About me</SectionTitle>
      <div className="about-grid">
        <Reveal className="about-text">
          <p>
            Hello! I'm a self-driven developer who likes learning by building: most of my projects started as a
            tool I wanted for myself and grew from there. I'm currently studying Web Information Systems &amp;
            Technologies at ESMAD, after a vocational course in IT and an internship diagnosing and repairing hardware and software.
          </p>
          <p>
            I'm comfortable across the stack — full-stack web apps with Vue, Node and MySQL, browser games and 3D/VR
            scenes, and Python desktop apps and scripts. Right now I'm focused on <strong>strongly-typed code with TypeScript</strong> and{" "}
            <strong>component-driven UIs in React</strong> — this site is built with both.
          </p>
          <p>I'm open to internships, freelance work and collaborations.</p>
        </Reveal>

        <Reveal className="about-card" delay={1}>
          <div className="avatar" aria-hidden="true">
            <span>M</span>
          </div>
          <dl className="facts">
            {facts.map(({ icon, label, value }) => (
              <div key={label}>
                <dt>
                  <i className={icon} aria-hidden="true" /> {label}
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
