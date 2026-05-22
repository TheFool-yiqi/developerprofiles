import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/developerprofiles/",
  plugins: [react(), tailwindcss()],
  server: {
    // 5173 常落在 Windows Hyper-V 保留端口段（5141–5240），会触发 EACCES
    host: "127.0.0.1",
    port: 3000,
    strictPort: false,
  },
  preview: {
    host: "127.0.0.1",
    port: 3001,
    strictPort: false,
  },
});
