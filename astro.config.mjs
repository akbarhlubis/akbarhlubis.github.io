import { defineConfig } from 'astro/config';
import astroRobots from 'astro-robots';

// https://astro.build/config

export default defineConfig({
  output: 'server',
  adapter: {
    name: '@astrojs/node',
    options: {
      mode: 'standalone',
    },
  },
  integrations: [astroRobots()],
  vite: {
    build: {
      target: 'esnext',
    },
  },
});