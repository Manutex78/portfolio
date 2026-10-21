import { FULL_NAME } from "../data/content";
import { useMoonPhase } from "../hooks/useMoonPhase";
import { useI18n } from "../i18n/LanguageContext";
import { MOON_PHASES } from "../i18n/ui";
import { FULL_MOON } from "../lib/moon";
import { MoonIcon } from "./MoonIcon";

export function Footer() {
  const moon = useMoonPhase();
  const { t } = useI18n();
  const lit = Math.round(moon.illumination * 100);
  const days = Math.round(moon.daysToFull);

  return (
    <footer className="site-footer">
      <p className="tonight">
        <MoonIcon phase={moon.phase} size={22} craters />
        <span>
          {t("footer.tonight")} <strong>{t(MOON_PHASES[moon.index])}</strong> · {t("footer.lit", { n: lit })}
          {moon.index !== FULL_MOON && ` · ${days <= 1 ? t("footer.fullTomorrow") : t("footer.fullIn", { n: days })}`}
        </span>
      </p>
      <p>{t("footer.built", { name: FULL_NAME })} · {new Date().getFullYear()}</p>
      <a className="back-to-top" href="#top">
        <i className="fa-solid fa-arrow-up" aria-hidden="true" /> {t("footer.top")}
      </a>
    </footer>
  );
}
