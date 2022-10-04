import react from '@vitejs/plugin-react';
import path from 'path';
import {UserConfig } from 'vite';
import ViteEslint from 'vite-plugin-eslint'
import { AntdResolve,createStyleImportPlugin } from 'vite-plugin-style-import';
import StyleLintPlugin from 'vite-plugin-stylelint'

export default (): UserConfig => {
  return {
    base: './',
    plugins: [
      react(),
      ViteEslint(),
      StyleLintPlugin({fix:true}),
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
    },
  };
};