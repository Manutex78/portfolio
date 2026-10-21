import { useMemo } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Marquee } from "./components/Marquee";
import { MissionLog } from "./components/MissionLog";
import { Hero, type HeroStats } from "./components/Hero";
import { PageLoader } from "./components/PageLoader";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Starfield } from "./components/Starfield";
import { curatedProjects, GITHUB_USER, missions } from "./data/content";
import { useGithubProjects } from "./hooks/useGithubProjects";
import { useSectionNav } from "./hooks/useSectionNav";
import { useI18n } from "./i18n/LanguageContext";
import type { UIKey } from "./i18n/ui";

const SECTIONS: { id: string; label: UIKey }[] = [
  { id: "about", label: "nav.about" },
  { id: "journey", label: "nav.journey" },
  { id: "skills", label: "nav.skills" },
  { id: "projects", label: "nav.projects" },
  { id: "contact", label: "nav.contact" },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

// Counted from the first entry in the mission log
const FIRST_YEAR = Math.min(...missions.map((m) => m.start));

export default function App() {
  const activeId = useSectionNav(SECTION_IDS);
  const github = useGithubProjects(GITHUB_USER, curatedProjects);
  const { t } = useI18n();

  const stats = useMemo<HeroStats | null>(() => {
    if (github.status === "loading") return null;
    return {
      projects: github.projects.length,
      technologies: new Set(github.projects.flatMap((p) => p.tech)).size,
      yearsInIt: new Date().getFullYear() - FIRST_YEAR,
    };
  }, [github.status, github.projects]);

  return (
    <>
      <a className="skip-link" href="#about">
        {t("skip")}
      </a>
      <PageLoader />
      <Header sections={SECTIONS} activeId={activeId} />

      <main id="top" tabIndex={-1}>
        <div className="hero-space">
          <Starfield />
          <Hero stats={stats} statsLoading={github.status === "loading" && !!GITHUB_USER} />
        </div>
        <Marquee />
        <About />
        <MissionLog />
        <Skills />
        <Projects projects={github.projects} status={github.status} error={github.error} retry={github.retry} />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
