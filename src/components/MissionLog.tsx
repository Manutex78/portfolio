import { missions } from "../data/content";
import { useI18n } from "../i18n/LanguageContext";

const KIND = {
  education: { icon: "fa-solid fa-graduation-cap", label: "journey.education" },
  work: { icon: "fa-solid fa-briefcase", label: "journey.work" },
} as const;

// Education and work, newest first: years on the left, details on the right
// (entries without an end year are tagged as ongoing)
export function MissionLog() {
  const { t, l } = useI18n();

  return (
    <section className="section section--split container" id="journey" tabIndex={-1}>
      <div className="section-head">
        <h2 className="section-title">{t("journey.title")}</h2>
      </div>

      <ol className="timeline">
        {missions.map((m) => {
          const current = m.end === undefined;
          return (
            <li key={`${m.kind}-${m.start}`} className={`mission${current ? " mission--current" : ""}`}>
              <p className="mission-period">
                {m.start}–{m.end ?? t("journey.now")}
              </p>
              <div>
                <h3>{l(m.title)}</h3>
                <p className="mission-org">
                  {l(m.org)}
                  <span className="mission-kind">
                    <i className={KIND[m.kind].icon} aria-hidden="true" />
                    {t(KIND[m.kind].label)}
                  </span>
                  {current && <span className="tag">{t("journey.current")}</span>}
                </p>
                <p className="mission-desc">{l(m.description)}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
