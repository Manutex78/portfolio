import { useState } from "react";
import { AVAILABILITY, FULL_NAME, NAME, PHOTO } from "../data/content";
import { useI18n } from "../i18n/LanguageContext";
import { Rich } from "../i18n/Rich";
import { Reveal, SectionTitle } from "./Reveal";

// Your picture from PHOTO; the initial stands in until the file exists
function Avatar() {
  const [missing, setMissing] = useState(false);
  return (
    <span className="avatar">
      {missing ? <span aria-hidden="true">{NAME[0]}</span> : <img src={PHOTO} alt={FULL_NAME} onError={() => setMissing(true)} />}
    </span>
  );
}

export function About() {
  const { t, l } = useI18n();

  const facts = [
    { icon: "fa-solid fa-server", label: t("fact.focus"), value: t("fact.focusValue") },
    { icon: "fa-solid fa-code", label: t("fact.builds"), value: t("fact.buildsValue") },
    { icon: "fa-solid fa-graduation-cap", label: t("fact.studying"), value: t("fact.studyingValue") },
    { icon: "fa-solid fa-language", label: t("fact.speaks"), value: t("fact.speaksValue") },
    ...(AVAILABILITY ? [{ icon: "fa-solid fa-circle-check", label: t("fact.status"), value: l(AVAILABILITY) }] : []),
  ];

  return (
    <section className="section container" id="about" tabIndex={-1}>
      <SectionTitle index="01">{t("about.title")}</SectionTitle>
      <div className="about-grid">
        <Reveal className="about-text">
          <p>
            <Rich text={t("about.p1")} />
          </p>
          <p>
            <Rich text={t("about.p2")} />
          </p>
          <p>{t("about.p3")}</p>
        </Reveal>

        <Reveal className="about-card" delay={1}>
          <div className="about-id">
            <Avatar />
            <div>
              <p className="about-name">{FULL_NAME}</p>
              <p className="about-role">{t("about.role")}</p>
            </div>
          </div>
          <dl className="facts">
            {facts.map(({ icon, label, value }) => (
              <div key={icon}>
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
