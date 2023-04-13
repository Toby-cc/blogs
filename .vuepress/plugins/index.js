import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { palettePlugin } from '@vuepress/plugin-palette'
import { getDirname,path } from '@vuepress/utils'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { pwaPlugin } from '@vuepress/plugin-pwa'

const __dirname = getDirname(import.meta.url)

export default [
  registerComponentsPlugin({
    // 配置项
    componentsDir: path.resolve(__dirname, './components'),
  }),
  palettePlugin({ preset: 'css' }),
  pwaPlugin({ skipWaiting: true }),
  // docsearchPlugin({
  //   appId: 'UA137390IZ',
  //   apiKey: '72487884e0f6c1d5eed81ba38510a147',
  //   indexName: 'vuepressSearch',
  //   placeholder: '请输入内容',
  //   searchParameters: {
  //     facetFilters: ['tags:v2'],
  //   },
]