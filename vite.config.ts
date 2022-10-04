import react from '@vitejs/plugin-react';
import path from 'path';
import {UserConfig } from 'vite';
import { AntdResolve,createStyleImportPlugin } from 'vite-plugin-style-import';

export default (): UserConfig => {
  return {
    base: './',
    plugins: [
      react(),
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