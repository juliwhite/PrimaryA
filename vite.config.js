import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) =>{

  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  return {
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL),
  },
}
});