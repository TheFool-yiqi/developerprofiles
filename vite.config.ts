import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE || "/developerprofiles/";

  return {
    base,
    plugins: [react(), tailwindcss()],
    server: {
      host: "127.0.0.1",
      port: 3000,
      strictPort: false,
    },
    preview: {
      host: "127.0.0.1",
      port: 3001,
      strictPort: false,
    },
  };
});
