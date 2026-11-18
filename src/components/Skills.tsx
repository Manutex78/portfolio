import { useMemo } from "react";
import { skills } from "../data/content";
import { useI18n } from "../i18n/LanguageContext";
import { TechLogo } from "./TechLogo";

export function Skills() {
  const { t, l, locale } = useI18n();
  const listFormat = useMemo(() => new Intl.ListFormat(locale, { type: "conjunction" }), [locale]);

  return (
    <section className="section container" id="skills" tabIndex={-1}>
      <div className="section-head">
        <h2 className="section-title">{t("skills.title")}</h2>
      </div>

      <ul className="skills-grid">
        {skills.map(({ title, icon, items, usedIn, main, learning }) => (
          <li key={icon} className={`skill-group${main ? " skill-group--main invert" : ""}${learning ? " skill-group--learning" : ""}`}>
            <div className="skill-head">
              <h3>{l(title)}</h3>
              {main && <span className="tag tag--accent">{t("skills.main")}</span>}
              {usedIn && <p className="skill-used">{t("skills.usedIn", { projects: listFormat.format(usedIn) })}</p>}
            </div>
            <ul className="tech-list">
              {items.map((tech) => (
                <li key={tech}>
                  <TechLogo tech={tech} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
