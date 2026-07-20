// https://github.com/remix-run/react-router-templates/blob/a52084977fc8a4dee41f4e3a5236236af146f777/minimal/vite.config.ts
import { defineConfig } from 'vite';
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { reactRouterDevTools } from 'react-router-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: false,
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [tailwindcss(), reactRouterDevTools(), reactRouter()],
  base: "/"
})
