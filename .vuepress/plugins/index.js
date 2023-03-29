import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { palettePlugin } from '@vuepress/plugin-palette'
import { getDirname,path } from '@vuepress/utils'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

const __dirname = getDirname(import.meta.url)

export default [
  registerComponentsPlugin({
    // 配置项
    componentsDir: path.resolve(__dirname, './components'),
  }),
  palettePlugin({ preset: 'css' }),
  // docsearchPlugin({
  //   appId: 'UA137390IZ',
  //   apiKey: '72487884e0f6c1d5eed81ba38510a147',
  //   indexName: 'vuepressSearch',
  //   placeholder: '请输入内容',
  //   searchParameters: {
  //     facetFilters: ['tags:v2'],
  //   },
  //   locales: {
  //     '/':{
  //       placeholder: '搜索文档',
  //       translations: {
  //         button: {
  //           buttonText: '搜索文档',
  //           buttonAriaLabel: '搜索文档',
  //         },
  //         modal: {
  //           searchBox: {
  //             resetButtonTitle: '清除查询条件',
  //             resetButtonAriaLabel: '清除查询条件',
  //             cancelButtonText: '取消',
  //             cancelButtonAriaLabel: '取消',
  //           },
  //           startScreen: {
  //             recentSearchesTitle: '搜索历史',
  //             noRecentSearchesText: '没有搜索历史',
  //             saveRecentSearchButtonTitle: '保存至搜索历史',
  //             removeRecentSearchButtonTitle: '从搜索历史中移除',
  //             favoriteSearchesTitle: '收藏',
  //             removeFavoriteSearchButtonTitle: '从收藏中移除',
  //           },
  //           errorScreen: {
  //             titleText: '无法获取结果',
  //             helpText: '你可能需要检查你的网络连接',
  //           },
  //           footer: {
  //             selectText: '选择',
  //             navigateText: '切换',
  //             closeText: '关闭',
  //             searchByText: '搜索提供者',
  //           },
  //           noResultsScreen: {
  //             noResultsText: '无法找到相关结果',
  //             suggestedQueryText: '你可以尝试查询',
  //             reportMissingResultsText: '你认为该查询应该有结果？',
  //             reportMissingResultsLinkText: '点击反馈',
  //           },
  //         },
  //       },
  //     },
  //   }
  // }),
]