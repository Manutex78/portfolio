import { skills } from "../data/content";
import { LOGOS } from "../data/logos";
import { useI18n } from "../i18n/LanguageContext";
import { Reveal, SectionTitle } from "./Reveal";

export function Skills() {
  const { t, l } = useI18n();

  return (
    <section className="section container" id="skills" tabIndex={-1}>
      <SectionTitle index="03">{t("skills.title")}</SectionTitle>
      <div className="skills-grid">
        {skills.map(({ title, icon, items, main, learning }, i) => (
          <Reveal
            key={icon}
            className={`skill-card${main ? " skill-card--main" : ""}${learning ? " skill-card--learning" : ""}`}
            delay={i}
          >
            <h3>
              <i className={`skill-icon ${icon}`} aria-hidden="true" />
              {l(title)}
              {main && <span className="main-tag">{t("skills.main")}</span>}
            </h3>
            <ul className="tech-list">
              {items.map((tech) => (
                <li key={tech}>
                  <img src={`logos/${LOGOS[tech]}.svg`} alt="" width={18} height={18} loading="lazy" />
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
