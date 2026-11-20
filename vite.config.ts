import { defineConfig } from 'vitest/config';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // base: базовый путь, по которому сайт будет развёрнут.
  // './' → относительные URL ассетов → сайт работает из любой папки
  base: './',
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  // server: настройки dev-сервера (команда `vite`).
  server: {
    open: false, // автоматически открыть браузер
    port: 5173, // порт dev-сервера
    strictPort: true,
  },
  // build: настройки production-сборки (команда `vite build`).
  build: {
    outDir: 'dist', // куда складывать результат
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'coverage'],
    globals: false,
    restoreMocks: true,
    clearMocks: true,
  },
});
