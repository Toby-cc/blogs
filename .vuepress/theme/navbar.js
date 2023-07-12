export default [
  { text: "首页", link: "/", icon: 'T-shouye2' },
  { text: "分类", link: "/categories/js/1/", icon: 'T-fenlei' },
  { text: "标签", link: "/tags/fenxiang/1/", icon: 'T-24gl-tags3' },
  {
    text: "笔记",
    icon: 'T-bianjibijishishouxie',
    children: [
      { text: "ES 新特性", link: "/docs/ECMAScript/" },
      { text: "v-html 指令", link: "/docs/v-html/" },
      { text: "谈谈 window.open()", link: "/docs/windowOpen/" },
      { text: "JS中数组API总结", link: "/docs/arrayAPI/" },
      { text: "资源导航", link: "/docs/resource/" },
      { text: "git 常用命令大全", link: "/docs/git/" },
    ],
  },
]