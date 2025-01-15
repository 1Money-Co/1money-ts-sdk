import { defineConfig } from 'dumi';

export default defineConfig({
  title: '@1money/ts-sdk',
  outputPath: 'dist',
  publicPath: '/1money-ts-sdk/',
  history: { type: 'hash' },
  resolve: {
    atomDirs: [
      { type: 'docs', dir: 'src' },
    ]
  },
  favicons: [
    '/1money-ts-sdk/favicon.ico',
  ],
  themeConfig: {
    logo: '/1money-ts-sdk/logo.png',
    name: '@1money/ts-sdk',
    editLink: false,
    nav: [
      { title: 'Docs', link: '/docs' }
    ],
    footer: `<footer>1Money Co ©1money.com</footer>`,
    prefersColor: { default: 'auto' },
  },
  styles: [`.dumi-default-header-left { width: auto !important; margin-right: 16px; }`],
  exportStatic: {
    extraRoutePaths: ['/']
  }
});
