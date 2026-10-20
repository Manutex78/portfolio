import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the build also works from a subfolder (e.g. GitHub Pages)
export default defineConfig({
  base: "./",
  plugins: [react()],
});
