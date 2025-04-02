import { defineConfig, loadEnv } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) =>{

  // Load environment variables
  const env = loadEnv(mode, process.cwd());

  return {
    root: 'src',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'src/index.html'),
          addActivity: path.resolve(__dirname, 'src/add-activity.html'),
          category: path.resolve(__dirname, 'src/category.html'),
          login: path.resolve(__dirname, 'src/login.html'),
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL),
    },
  }
});