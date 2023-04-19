import { defineConfig } from 'dumi';
const path = require('path');

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'ant-design-ext',
  },
  proxy: {
    '/itsm/api/v1': {
      target: 'http://10.199.140.150',
      changeOrigin: true,
    },
    '/api': {
      target: 'http://localhost:25889',
      changeOrigin: true,
    },
  },
  alias: {
    '@formDesign': path.resolve(__dirname, 'src/FormDesign/FormDesignEdit'),
  },
});
