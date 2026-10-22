import { FULL_NAME, NAME } from "../data/content";
import { SOCIALS } from "../data/socials";
import { useMoonPhase } from "../hooks/useMoonPhase";
import { useI18n } from "../i18n/LanguageContext";
import { MOON_PHASES, type UIKey } from "../i18n/ui";
import { FULL_MOON } from "../lib/moon";
import { MoonIcon } from "./MoonIcon";

interface FooterProps {
  sections: { id: string; label: UIKey }[];
}

export function Footer({ sections }: FooterProps) {
  const moon = useMoonPhase();
  const { t } = useI18n();
  const lit = Math.round(moon.illumination * 100);
  const days = Math.round(moon.daysToFull);

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-intro">
            <p className="footer-name">{FULL_NAME}</p>
            <p className="footer-tagline">{t("footer.tagline")}</p>
            <a className="btn btn-primary" href="#contact">
              <i className="fa-solid fa-satellite-dish" aria-hidden="true" /> {t("hero.ctaContact")}
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

        <p className="tonight">
          <MoonIcon phase={moon.phase} size={26} craters />
          <span>
            {t("footer.tonight")} <strong>{t(MOON_PHASES[moon.index])}</strong> · {t("footer.lit", { n: lit })}
            {moon.index !== FULL_MOON && ` · ${days <= 1 ? t("footer.fullTomorrow") : t("footer.fullIn", { n: days })}`}
          </span>
        </p>

        {/* Oversized outlined name; fills with the accent on hover */}
        <p className="footer-wordmark" aria-hidden="true">
          {NAME}
        </p>
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
