// @ts-check
import { defineConfig } from 'astro/config';
import svgr from 'vite-plugin-svgr';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      include: ['**/components/*'],
    }),
    tailwind({
      // 允许在 Tailwind 的语法基础上编写嵌套的 CSS 声明
      nesting: true,
      applyBaseStyles: false,
    }),
  ],
  devToolbar: {
    enabled: true,
  },
  vite: {
    plugins: [svgr()],
  },
});
