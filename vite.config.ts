/*
 * @Author: shanzhilin
 * @Date: 2022-10-03 20:22:08
 * @LastEditors: shanzhilin
 * @LastEditTime: 2022-10-18 23:11:38
 */
import react from '@vitejs/plugin-react';
import path from 'path';
import { UserConfig } from 'vite';
import ViteEslint from 'vite-plugin-eslint';
import { AntdResolve, createStyleImportPlugin } from 'vite-plugin-style-import';
import StyleLintPlugin from 'vite-plugin-stylelint';

export default (): UserConfig => {
  return {
    base: './',
    plugins: [
      react(),
      ViteEslint(),
      StyleLintPlugin({ fix: true }),
      createStyleImportPlugin({ resolves: [AntdResolve()] }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          // 配置主题色
          modifyVars: { 'primary-color': '#FF5831' },
          javascriptEnabled: true,
        },
      },
    },
    server: {
      open: true,
      cors: true,
      hmr: {
        overlay: false,
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3301', //API服务器的地址
          changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  };
};
