import react from '@astrojs/react';
import { siteConfig } from './src/constants/site-config';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import svgr from 'vite-plugin-svgr';
import umami from '@yeskunall/astro-umami';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
  integrations: [
    react(),
    icon({
      include: {
        gg: ['*'],
        'fa6-regular': ['*'],
        'fa6-solid': ['*'],
        ri: ['*'],
      },
    }),
    umami({
      id: '8c54da69-94b0-417e-ad3b-0b737dc28937',
      endpointUrl: 'https://stats.cosine.ren',
      hostUrl: 'https://stats.cosine.ren',
    }),
  ],
  devToolbar: {
    enabled: true,
  },
  vite: {
    plugins: [svgr(), tailwindcss()],
  },
  trailingSlash: 'never',
});
