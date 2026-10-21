import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LOCALE, type Lang, type Text } from "./types";
import { ui, type UIKey } from "./ui";

const STORAGE_KEY = "lang";

// A saved choice wins; otherwise follow the browser (any Portuguese → PT)
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "pt") return saved;
  } catch {
    // Storage can be blocked; fall through to the browser language
  }
  return navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

const LanguageContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void } | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The choice still applies for this visit
    }
  }, []);

  // Keep the document itself in the chosen language: screen readers, the tab title and search snippets
  useEffect(() => {
    document.documentElement.lang = LOCALE[lang];
    document.title = ui[lang]["meta.title"];
    document.querySelector('meta[name="description"]')?.setAttribute("content", ui[lang]["meta.description"]);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

const fill = (template: string, vars?: Record<string, string | number>) =>
  vars ? template.replace(/\{(\w+)\}/g, (match, name) => String(vars[name] ?? match)) : template;

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  const { lang, setLang } = ctx;

  return useMemo(() => {
    const dict = ui[lang];
    return {
      lang,
      setLang,
      locale: LOCALE[lang],
      /** Interface copy by key, with {placeholders} filled in */
      t: (key: UIKey, vars?: Record<string, string | number>) => fill(dict[key], vars),
      /** Content copy: plain strings pass through, localized ones pick the current language */
      l: (text: Text) => (typeof text === "string" ? text : text[lang]),
    };
  }, [lang, setLang]);
}
