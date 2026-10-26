import { FULL_NAME, NAME } from "../data/content";
import { SOCIALS } from "../data/socials";
import { useI18n } from "../i18n/LanguageContext";
import type { UIKey } from "../i18n/ui";

interface FooterProps {
  sections: { id: string; label: UIKey }[];
}

export function Footer({ sections }: FooterProps) {
  const { t } = useI18n();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-intro">
            <p className="footer-name">{FULL_NAME}</p>
            <p className="footer-tagline">{t("footer.tagline")}</p>
            <a className="btn btn-ghost" href="#contact">
              {t("hero.ctaContact")} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </a>
          </div>

          <nav className="footer-col" aria-labelledby="footer-explore">
            <h2 className="footer-heading" id="footer-explore">
              {t("footer.explore")}
            </h2>
            <ul>
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>{t(s.label)}</a>
                </li>
              ))}
            </ul>
          </nav>

          {SOCIALS.length > 0 && (
            <div className="footer-col">
              <h2 className="footer-heading">{t("footer.elsewhere")}</h2>
              <ul>
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      <i className={`fa-brands ${s.icon}`} aria-hidden="true" /> {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-inner">
          <span>© {new Date().getFullYear()} {FULL_NAME}</span>
          <span>{t("footer.built", { name: NAME })}</span>
        </p>
      </div>
    </footer>
  );
}
