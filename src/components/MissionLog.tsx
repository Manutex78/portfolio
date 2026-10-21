import { missions } from "../data/content";
import { useI18n } from "../i18n/LanguageContext";
import { Reveal, SectionTitle } from "./Reveal";

const KIND = {
  education: { icon: "fa-solid fa-graduation-cap", label: "journey.education" },
  work: { icon: "fa-solid fa-briefcase", label: "journey.work" },
} as const;

// Education and work as a trajectory: each stop is a planet on the line,
// and the ones still in progress glow
export function MissionLog() {
  const { t, l } = useI18n();

  return (
    <section className="section container" id="journey" tabIndex={-1}>
      <SectionTitle index="02">{t("journey.title")}</SectionTitle>
      <ol className="timeline">
        {missions.map((m, i) => {
          const current = m.end === undefined;
          return (
            <li key={`${m.kind}-${m.start}`} className={`mission${current ? " mission--current" : ""}`}>
              <span className="mission-node" aria-hidden="true" />
              <Reveal className="mission-card" delay={i}>
                <div className="mission-head">
                  <span className="mission-period">
                    {m.start} — {m.end ?? t("journey.now")}
                  </span>
                  <span className={`mission-kind mission-kind--${m.kind}`}>
                    <i className={KIND[m.kind].icon} aria-hidden="true" /> {t(KIND[m.kind].label)}
                  </span>
                  {current && <span className="mission-live">{t("journey.current")}</span>}
                </div>
                <h3>{l(m.title)}</h3>
                <p className="mission-org">{l(m.org)}</p>
                <p className="mission-desc">{l(m.description)}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
