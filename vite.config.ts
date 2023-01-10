import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { generateModifyVars } from './build/generate/generateModifyVars';
import viteSvgIcons from 'vite-plugin-svg-icons';
import { resolve } from 'path';

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir);
}
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    viteSvgIcons({
      // Specify the icon folder to be cached
      iconDirs: [resolve(process.cwd(), 'src/assets/icons/svg')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  server: {
    open: true,
    https: false,
    host: true,
    port: 8080,
  },
  resolve: {
    alias: {
      '/@': pathResolve('src'),
    },
  },

  optimizeDeps: {
    // include: ['vuedraggable', 'quill']
  },

  css: {
    preprocessorOptions: {
      less: {
        modifyVars: generateModifyVars(),
        javascriptEnabled: true,
      },
    },
  },

  build: {
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'ant-design-vue': 'ANTDESIGN',
        },
      },
    },
  },
});
