import { FULL_NAME, NAME } from "../data/content";
import { useI18n } from "../i18n/LanguageContext";
import type { UIKey } from "../i18n/ui";

interface FooterProps {
  sections: { id: string; label: UIKey }[];
}

// A quiet closing line: the contact panel above already carries the email and profile links
export function Footer({ sections }: FooterProps) {
  const { t } = useI18n();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {FULL_NAME}
        </p>
        <nav className="footer-nav" aria-label={t("footer.nav")}>
          {sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {t(s.label)}
            </a>
          ))}
        </nav>
        <p>{t("footer.built", { name: NAME })}</p>
      </div>
    </footer>
  );
}
