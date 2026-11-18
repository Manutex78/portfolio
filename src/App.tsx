import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { FloatingActions } from "./components/FloatingActions";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { MissionLog } from "./components/MissionLog";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { curatedProjects, GITHUB_USER } from "./data/content";
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

export default function App() {
  const activeId = useSectionNav(SECTION_IDS);
  const github = useGithubProjects(GITHUB_USER, curatedProjects);
  const { t } = useI18n();

  return (
    <>
      <a className="skip-link" href="#about">
        {t("skip")}
      </a>
      <Header sections={SECTIONS} activeId={activeId} />

      <main id="top" tabIndex={-1}>
        <Hero />
        <About />
        <MissionLog />
        <Skills />
        <Projects projects={github.projects} status={github.status} error={github.error} retry={github.retry} />
        <Contact />
      </main>

      <Footer sections={SECTIONS} />
      <FloatingActions />
    </>
  );
}
