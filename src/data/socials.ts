import { GITHUB_USER, INSTAGRAM_USER, LINKEDIN_URL, WHATSAPP_NUMBER } from "./content";

// Profile links shared by the contact section and the footer; a null setting in content.ts drops its link
export const SOCIALS = [
  GITHUB_USER && { label: "GitHub", icon: "fa-github", href: `https://github.com/${GITHUB_USER}` },
  LINKEDIN_URL && { label: "LinkedIn", icon: "fa-linkedin", href: LINKEDIN_URL },
  INSTAGRAM_USER && { label: "Instagram", icon: "fa-instagram", href: `https://www.instagram.com/${INSTAGRAM_USER}/` },
  WHATSAPP_NUMBER && { label: "WhatsApp", icon: "fa-whatsapp", href: `https://wa.me/${WHATSAPP_NUMBER}` },
].filter((s) => !!s);
