import { defineConfig } from 'dumi';

export default defineConfig({
  title: '@1money/js-sdk',
  outputPath: 'dist',
  publicPath: '/',
  history: { type: 'hash' },
  resolve: {
    atomDirs: [
      { type: 'docs', dir: 'src' },
    ]
  },
  themeConfig: {
    logo: 'https://omnidoor.org/img/logo.png',
    name: '@1money/js-sdk',
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
