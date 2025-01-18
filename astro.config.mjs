// @ts-check
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { siteConfig } from './src/constants/site-config';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import svgr from 'vite-plugin-svgr';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
  integrations: [
    react(),
    tailwind({
      // 允许在 Tailwind 的语法基础上编写嵌套的 CSS 声明
      nesting: true,
      applyBaseStyles: false,
    }),
    icon({
      include: {
        gg: ['*'],
        'fa6-brands': ['*'],
        'fa6-regular': ['*'],
        'fa6-solid': ['*'],
      },
    }),
  ],
  devToolbar: {
    enabled: true,
  },
  vite: {
    plugins: [svgr()],
  },
  trailingSlash: 'never',
});
