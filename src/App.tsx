import { useMemo } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MissionLog } from "./components/MissionLog";
import { Hero, type HeroStats } from "./components/Hero";
import { PageLoader } from "./components/PageLoader";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Starfield } from "./components/Starfield";
import { curatedProjects, GITHUB_USER, missions } from "./data/content";
import { useGithubProjects } from "./hooks/useGithubProjects";
import { useSectionNav } from "./hooks/useSectionNav";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

// Counted from the first entry in the mission log
const FIRST_YEAR = Math.min(...missions.map((m) => parseInt(m.period, 10)));

export default function App() {
  const activeId = useSectionNav(SECTION_IDS);
  const github = useGithubProjects(GITHUB_USER, curatedProjects);

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
        Skip to content
      </a>
      <PageLoader />
      <Header sections={SECTIONS} activeId={activeId} />

      <main id="top" tabIndex={-1}>
        <div className="hero-space">
          <Starfield />
          <Hero stats={stats} statsLoading={github.status === "loading" && !!GITHUB_USER} />
        </div>
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
