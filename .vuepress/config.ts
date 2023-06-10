import theme from "./theme";
import plugins from "./plugins";
import head from './head/index'
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)
export default {
  base: '/blogs/',
  title: "Toby的学习基地",
  description: "这是Toby的个人博客",
  theme,
  plugins,
  head,
  alias: {
    '@': path.resolve(__dirname, './'),
  },
};
