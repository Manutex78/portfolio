import { useEffect, useState } from "react";
import { EMAIL, TIME_ZONE } from "../data/content";
import { SOCIALS } from "../data/socials";
import { useI18n } from "../i18n/LanguageContext";
import { Rich } from "../i18n/Rich";
import { Reveal, SectionTitle } from "./Reveal";

// The time in Portugal, ticking over on the minute
function LocalTime() {
  const { t, locale } = useI18n();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setNow(new Date());
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    };
    timer = setTimeout(tick, 60_000 - (Date.now() % 60_000));
    return () => clearTimeout(timer);
  }, []);

  const time = new Intl.DateTimeFormat(locale, { timeZone: TIME_ZONE, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(now);
  return (
    <p className="local-time">
      <i className="fa-regular fa-clock" aria-hidden="true" />
      <span>
        <Rich text={t("contact.time", { time })} />
      </span>
    </p>
  );
}

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
        <LocalTime />

        <div className="contact-actions">
          <button type="button" className="btn btn-ghost copy-btn" onClick={copyEmail} title={t("contact.copyLabel")}>
            <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`} aria-hidden="true" />
            <span aria-live="polite">{copied ? t("contact.copied") : EMAIL}</span>
          </button>
        </div>

        <div className="socials">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
              <i className={`fa-brands ${s.icon}`} aria-hidden="true" /> {s.label}
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
