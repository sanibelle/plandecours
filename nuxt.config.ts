import { resolve } from 'path';

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
});
