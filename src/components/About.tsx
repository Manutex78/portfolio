import { useState } from "react";
import { AVAILABILITY, FULL_NAME, PHOTO } from "../data/content";
import { useI18n } from "../i18n/LanguageContext";
import { Rich } from "../i18n/Rich";

// Shows PHOTO once it has loaded; while the file doesn't exist, nothing takes its place
function Portrait() {
  const [state, setState] = useState<"loading" | "ready" | "missing">("loading");
  if (state === "missing") return null;
  return (
    <img
      className="portrait"
      src={PHOTO}
      alt={FULL_NAME}
      hidden={state !== "ready"}
      onLoad={() => setState("ready")}
      onError={() => setState("missing")}
    />
  );
}

export function About() {
  const { t, l } = useI18n();

  const facts = [
    { label: t("fact.focus"), value: t("fact.focusValue") },
    { label: t("fact.builds"), value: t("fact.buildsValue") },
    { label: t("fact.studying"), value: t("fact.studyingValue") },
    { label: t("fact.speaks"), value: t("fact.speaksValue") },
    ...(AVAILABILITY ? [{ label: t("fact.status"), value: l(AVAILABILITY) }] : []),
  ];

  return (
    <section className="section section--split container" id="about" tabIndex={-1}>
      <div className="section-head">
        <h2 className="section-title">{t("about.title")}</h2>
        <Portrait />
      </div>

      <div>
        <div className="prose">
          <p>
            <Rich text={t("about.p1")} />
          </p>
          <p>
            <Rich text={t("about.p2")} />
          </p>
          <p>{t("about.p3")}</p>
        </div>

        <dl className="facts">
          {facts.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
