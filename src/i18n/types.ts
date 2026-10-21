export type Lang = "en" | "pt";

/** BCP 47 locale per language, for <html lang> and Intl formatters */
export const LOCALE: Record<Lang, string> = { en: "en", pt: "pt-PT" };

/** A piece of copy in both languages */
export type Localized = Record<Lang, string>;

/** Copy that's the same in both languages (tech names, project names) or translated */
export type Text = string | Localized;
