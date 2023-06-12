export default [
  { text: "首页", link: "/", icon: 'T-shouye2' },
  { text: "分类", link: "/categories/qianduan/1/", icon: 'T-fenlei' },
  { text: "标签", link: "/tags/fenxiang/1/", icon: 'T-24gl-tags3' },
  {
    text: "笔记",
    children: [
      { text: "v-html 指令", link: "/docs/v-html" },
      { text: "谈谈 window.open()", link: "/docs/windowOpen" },
      { text: "git 常用命令大全", link: "/docs/git" },
    ],
  },
]