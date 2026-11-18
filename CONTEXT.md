# Project context

Personal portfolio for Manuel Teixeira, a back-end-focused web developer and student of Web Technologies and Development at FMAD (UTP). It's a single page in three colours (cream, navy, orange), in English and Portuguese.

_Last updated: 2026-11-12_

## Stack

- React 19 + TypeScript 5.8 (strict, `noUnused*` on), built with Vite 6
- Plain CSS in one file: [src/styles.css](src/styles.css)
- Font Awesome 6 (npm) for icons; Google Fonts: IBM Plex Sans (text) and IBM Plex Mono (code, dates, tech names)
- No router, no state library, no test setup

```sh
npm run dev        # dev server
npm run build      # tsc -b && vite build -> dist/
npm run typecheck  # tsc -b
npm run preview
```

`vite.config.ts` sets `base: "./"`, so the build also works from a subfolder (for example GitHub Pages).

## Layout

```
index.html              Applies the saved theme before paint (no flash)
src/main.tsx            Mounts <App> inside <LanguageProvider>
src/App.tsx             Section list + page composition
src/components/         One file per section/widget
src/data/content.ts     ALL editable content: name, links, skills, missions, projects
src/data/logos.ts       Tech name → logo file in public/logos (a typo is a type error); shown via components/TechLogo.tsx
src/data/socials.ts     Social links built from content.ts (a null setting hides its link)
src/hooks/              useTheme, useGithubProjects, useSectionNav
src/i18n/               LanguageContext (t / l helpers), ui.ts (interface copy), types
src/lib/                github.ts (fetch + merge repos), scroll.ts
public/logos, public/projects   Tech and project images
```

Page order: Header → Hero → About → MissionLog ("Experience") → Skills → Projects → Contact → Footer → FloatingActions.

## How things work

**Look.** Four colours, set at the top of `styles.css`: cream `#F8F0E5` (page), navy `#082052` (text), orange `#F3701E` (featured and active things) and a mid blue `#6F95DD` (`--blue`) between the first two. The blue fills the hero panel behind the API card, the year labels, tags and icon tiles; `--tint` (a wash of it over the page colour) fills the Skills band and the project cards. Text on blue is always navy. Muted text, rules and panels are `color-mix` blends of the page and text colours. The `.invert` class swaps page and text for one block (the hero's API panel, the featured project, the contact panel). Text on orange is always navy; orange is not used for small text on cream because the contrast is too low. The hero shows the profile as a JSON API response (`ApiCard` in `Hero.tsx`), built from `content.ts`. About, Experience and Skills use a two-column layout with a sticky heading on the left (`.section--split`).

**Content.** Edit [src/data/content.ts](src/data/content.ts). Translated copy is written as `{ en, pt }` (`Localized`); copy that's the same in both languages is a plain string (`Text`). Interface strings live in [src/i18n/ui.ts](src/i18n/ui.ts) and are read with `t("key", vars)`. Content goes through `l(text)`.

**Language.** Defaults to `en`, and a choice saved in `localStorage.lang` wins. The provider also keeps `<html lang>`, the tab title and the meta description in sync.

**Theme.** Light (cream page) is the default; dark is the same palette swapped (navy page, cream text). It's stored as `data-theme` on `<html>` and in `localStorage`. The inline script in `index.html` applies it before React loads, and `useTheme` reads that initial value.

**Header.** A fixed bar with the nav links (an orange rule slides under the active one), the PT/EN switch and a mobile menu.

**Floating actions.** A theme toggle sits in the bottom corner. A back-to-top arrow appears once `.hero` scrolls out of view.

**Projects.** `useGithubProjects` fetches every public repo of `GITHUB_USER` (`Manutex78`) through the unauthenticated GitHub API (60 requests an hour), plus any `"owner/name"` repos listed in the curated projects. Responses are cached in `sessionStorage` for 10 minutes. `mergeProjects` keeps the hand-written copy for curated projects, takes the links and stats from GitHub, adds uncurated repos automatically and leaves out `hiddenRepos`. If the API fails, the curated projects are shown with a retry button.

**Skills.** A grid of cards, one per group; the main (back-end) group is navy and two columns wide. Each tech is a cream chip with its Devicon logo and name (`TechLogo`); the learning group is dashed. A group's `usedIn` list is shown as "Used in …". There is no games/3D group.

**Contact.** A "send an email" link, a copy-address button, the social links, and the current local time in `TIME_ZONE` (Europe/Lisbon).

**Accessibility.** There's a skip link, `aria-pressed` / `aria-expanded` on toggles, Escape and outside-click closing, and `prefers-reduced-motion` handling in the CSS.

## Recent history

| Commit | Change |
|---|---|
| `e5532c3` | First commit |
| `f8385ae` | tsconfig includes the new components and data files |
| `7e79d57` | Planet accent colours; local time in Contact |
| `00fc29c` | Display settings moved into a popover; floating actions added |
| `d703fb1` | Settings menu finished; theme toggle and back-to-top moved to the floating actions |
| `14cd2ec` | Footer and contact gain the shared social links; photo frame in the hero |

## Open items / gotchas

- **No photo yet.** `PHOTO = "photo.jpg"` but `public/photo.jpg` doesn't exist. Once the file is added, it appears as a round portrait under the About heading; until then nothing is shown in its place.
- The page column is `--page-max` (1480px) with `--gutter` side margins, and the root font size grows slightly with the window, so wide screens are filled. The hero is a full-screen grid: name, role and CTAs on the left, the API panel on the right, the main stack (with logos) along the foot.
- `WHATSAPP_NUMBER` is `null`, so that button is hidden.
- `tsconfig.tsbuildinfo` is committed. It's a build artefact and could go in `.gitignore`.
- `conversation-2026-10-23-203119.txt` at the root is empty and untracked.
- There are no tests. `npm run typecheck` is the only automated check.
