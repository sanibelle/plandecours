import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { plugin } from 'postcss';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    types: resolve(__dirname, './types'), // Use absolute path
    components: resolve(__dirname, './components'), // Use absolute path
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  plugins: ['~/plugins/opentelemetry'],
  i18n: {
    strategy: 'prefix_except_default',
    customRoutes: 'page',
    defaultLocale: 'fr',
    locales: [{ code: 'fr', iso: 'fr-CA', name: 'Français', file: 'fr.json' }],
    detectBrowserLanguage: {
      useCookie: true,
    },
  },
  modules: ['@nuxtjs/i18n', '@pinia/nuxt'],
});
