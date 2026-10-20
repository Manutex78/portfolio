import { useEffect, useState } from "react";
import { EMAIL, GITHUB_USER } from "../data/content";
import { Reveal, SectionTitle } from "./Reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);

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
        Get in touch
      </SectionTitle>
      <Reveal className="contact-card">
        <p className="contact-lead">Have a project in mind?</p>
        <p className="contact-text">
          Whether you have a question, a project idea or just want to say hi, my inbox is open — I'll get back to
          you as soon as I can.
        </p>

        <div className="contact-actions">
          <a className="btn btn-primary" href={`mailto:${EMAIL}`}>
            <i className="fa-solid fa-paper-plane" aria-hidden="true" /> Say hello
          </a>
          <button type="button" className="btn btn-ghost copy-btn" onClick={copyEmail}>
            <i className={`fa-solid ${copied ? "fa-check" : "fa-copy"}`} aria-hidden="true" />
            <span aria-live="polite">{copied ? "Copied!" : EMAIL}</span>
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
