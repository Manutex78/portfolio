import { LOGOS, type Tech } from "../data/logos";

// A technology's logo next to its name. The logos keep their own colours, so the
// chip is cream in both themes: several of them are black and vanish on navy
export function TechLogo({ tech }: { tech: Tech }) {
  return (
    <>
      <img src={`logos/${LOGOS[tech]}.svg`} alt="" width={24} height={24} loading="lazy" />
      {tech}
    </>
  );
}
