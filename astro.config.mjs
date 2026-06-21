import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://akbarhlubis.github.io',
  vite: {
    build: {
      target: 'esnext',
    },
  },
});
