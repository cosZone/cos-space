// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      // 允许在 Tailwind 的语法基础上编写嵌套的 CSS 声明
      nesting: true,
    }),
  ],
  devToolbar: {
    enabled: true,
  },
});
