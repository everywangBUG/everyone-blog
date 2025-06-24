import { defineConfig } from 'vitepress'
import nav from './nav'
import sidebar from './sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "everyone-blog",
  description: "everyone-blog",
  srcDir: "../everyone-blog/docs",
  base: '/everyone-blog/',
  themeConfig: {
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/everywangBUG' }
    ]
  }
})
