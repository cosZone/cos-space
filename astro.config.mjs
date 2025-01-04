// @ts-check
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import swup from '@swup/astro';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import svgr from 'vite-plugin-svgr';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      // 允许在 Tailwind 的语法基础上编写嵌套的 CSS 声明
      nesting: true,
      applyBaseStyles: false,
    }),
    swup(),
    icon({
      include: {
        'fa6-brands': ['*'],
        gg: ['*'],
      },
    }),
  ],
  devToolbar: {
    enabled: true,
  },
  vite: {
    plugins: [svgr()],
  },
});
