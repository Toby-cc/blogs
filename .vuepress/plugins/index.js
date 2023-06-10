import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { palettePlugin } from '@vuepress/plugin-palette'
import { getDirname,path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default [
  registerComponentsPlugin({
    // 配置项
    componentsDir: path.resolve(__dirname, './components'),
  }),
  palettePlugin({ preset: 'css' }),
]