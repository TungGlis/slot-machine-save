import { URL, fileURLToPath } from 'node:url'

import viteChecker from 'vite-plugin-checker'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { getDevCopyPlugin, getProdCopyPlugin } from './src/vbWebEngine/dev-tools/assets-utils'
import { liveReload } from './src/vbWebEngine/dev-tools/plugin-live-reload'


const sharedConfig = defineConfig({
  base: '',
  root: './src',
  publicDir: '../assets/public',
  plugins: [vue(),],

  resolve: {
    alias: {
      '@g': fileURLToPath(new URL('./src/game', import.meta.url)),
      '@w': fileURLToPath(new URL('./src/web', import.meta.url)),
      '@vb': fileURLToPath(new URL('./src/vbWebEngine', import.meta.url)),
      '@a': fileURLToPath(new URL('./assets', import.meta.url)),
    }
  },

  server: {
    strictPort: true,
    // unfortunately, we cannot use hot reload right not
    hmr: false
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    target: 'es2015',
    minify: 'terser',
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
      }
    }
  },

  preview: {
    port: 4173
  }
});


// development macro defines
const devMacros = {
  DEV: true,
  DEBUG: true,
  STANDALONE: true,
};
// production macro defines
const prodMacros = {
  DEV: false,
  DEBUG: true,
  STANDALONE: true,
}


// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  // conditional config
  console.log("[Vite Config]", command, mode, ssrBuild);

  if (mode == 'development') {
    sharedConfig.define = devMacros;
    // plugins for dev server
    const checkerPlugin = viteChecker({ vueTsc: true });
    // host game assets for dev
    const copyPlugin = getDevCopyPlugin('./assets/game-dev/*', './assets/lang/*/game.json');
    // watch json file changes and perform full page reload
    const reloadPlugin = liveReload(
      // since module hot reload is buggy we can only use it for now
      ['./src/**/*', './assets/game-dev/**/*', './assets/lang/*/game.json'],
      { root: process.cwd() }
    );
    sharedConfig.plugins.push(checkerPlugin, copyPlugin, reloadPlugin);
  }

  else if (mode == 'production') {
    sharedConfig.build.sourcemap = false;
    // copy game assets for production build
    const copyPlugin = getProdCopyPlugin('./assets/game-dev/*', './assets/lang/*/game.json');
    if (command == 'build') {
      sharedConfig.plugins.push(copyPlugin);
    }
    // https://terser.org/docs/api-reference#minify-options-structure
    // terser minify options, including macro defines
    sharedConfig.build.terserOptions = {
      ecma: 2015,
      compress: {
        global_defs: prodMacros
      },
      format: {
        comments: false
      }
    };
  }

  return sharedConfig;
});