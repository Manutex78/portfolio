import { useEffect, useState } from "react";
import { EMAIL, GITHUB_USER } from "../data/content";
import { useI18n } from "../i18n/LanguageContext";
import { Reveal, SectionTitle } from "./Reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      // Clipboard can be blocked; fall back to the mail app
      location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section className="section container" id="contact" tabIndex={-1}>
      <SectionTitle index="05" center>
        {t("contact.title")}
      </SectionTitle>
      <Reveal className="contact-card">
        <p className="contact-lead">{t("contact.lead")}</p>
        <p className="contact-text">{t("contact.text")}</p>

        <div className="contact-actions">
          <a className="btn btn-primary" href={`mailto:${EMAIL}`}>
            <i className="fa-solid fa-paper-plane" aria-hidden="true" /> {t("contact.hello")}
          </a>
          <button type="button" className="btn btn-ghost copy-btn" onClick={copyEmail} title={t("contact.copyLabel")}>
            <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`} aria-hidden="true" />
            <span aria-live="polite">{copied ? t("contact.copied") : EMAIL}</span>
          </button>
        </div>

        <div className="socials">
          {GITHUB_USER && (
            <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github" aria-hidden="true" /> GitHub
            </a>
          )}
          <a href={`mailto:${EMAIL}`}>
            <i className="fa-solid fa-envelope" aria-hidden="true" /> Email
          </a>
        </div>
      </Reveal>
    </section>
  );
}
