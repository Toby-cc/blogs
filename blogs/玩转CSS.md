---
title: 玩转CSS
date: 2023/3/1
description: 
  name: 好看的网站千篇一律，有趣的CSS万里挑一
  detailShow: true
labelImage: 'https://img-blog.csdnimg.cn/e4e6a3b163d6445381f3af8f113f2cca.gif'
lastUpdated: true
editLink: false
tags:
  - 分享
categories:
  - CSS
permalink: /css/
---

::: tip 
1. CSS 世界博大精深,用纯CSS也可以绘制很多有趣的东西<SvgIcon name="T-biaoqing-xingfen-emjoy" :size="25"/><br>
2. 今天就记录下一些实用、有趣又好玩的CSS资源网站😘
3. 我们一起搞起来。💕
4. 玩转CSS3,嗨翻WEB前端! GO GO GO
:::

## CSS 学习
  <el-button type="primary" text v-for="item in basicsList" :key="item.url" @click="skip(item)">
    {{item.name}}<SvgIcon name="T-fenxiang" :size="20"/>
  </el-button>

## CSS 还能这么玩
  <el-button type="primary" text v-for="item in styleList" :key="item.url" @click="skip(item)">
    {{item.name}}<SvgIcon name="T-fenxiang" :size="20"/>
  </el-button>

## CSS 动画
  <el-button type="primary" text v-for="item in cartoonList" :key="item.url" @click="skip(item)">
    {{item.name}}<SvgIcon name="T-fenxiang" :size="20"/>
  </el-button>

## CSS 小游戏
  <el-button type="primary" text v-for="item in playList" :key="item.url" @click="skip(item)">
    {{item.name}}<SvgIcon name="T-fenxiang" :size="20"/>
  </el-button>

<script setup>
import {ref,reactive} from "vue";
// CSS 学习
const basicsList = reactive([
  {name:'CSS 灵感 (很强，很猛，很霸气)',url:'https://chokcoco.github.io/CSS-Inspiration/#/'},
  {name:'学UI，找灵感，看这里',url:'https://www.awwwards.com/sites/zero-impact'},
  {name:'学习CSS布局',url:'https://zh.learnlayout.com/'},
  {name:'CSS 在线小抄',url:'https://htmlcheatsheet.com/css/'},
  {name:'CSS 记不住来这里',url:'https://cssreference.io/'},
  {name:'CSS 学习专栏',url:'https://web.dev/learn/css/box-model/'},
  {name:'w3schools',url:'https://www.w3schools.com/css/default.asp'},
])
// CSS 还能这么玩
const styleList = reactive([
  {name:'毛玻璃效果',url:'https://glassgenerator.netlify.app/'},
  {name:'制作一个很突出的盒子',url:'https://neumorphism.io/#e0e0e0'},
  {name:'加个蒙版滤镜',url:'https://www.cssfiltergenerator.com/'},
  {name:'喜欢画画吗',url:'https://www.pixelartcss.com/'},
  {name:'只是背景图啦',url:'https://coolbackgrounds.io/'},
  {name:'条纹背景图',url:'https://stripesgenerator.com/'},
  {name:'纯 CSS 实现的组件 ',url:'https://csslayout.io/'},
  {name:'不会网格布局来这里看看',url:'https://grid.layoutit.com/'},
  {name:'CSS 折叠面板',url:'https://accordionslider.com/'},
  {name:'生成不规则的矩形',url:'https://9elements.github.io/fancy-border-radius/'},
  {name:'生成不同的网页分隔符',url:'https://wweb.dev/resources/css-separator-generator'},
])
// CSS 动画
const cartoonList = reactive([
  {name:'CSS 三维变换动画',url:'https://animxyz.com/'},
  {name:'CSS 动画集',url:'https://animate.style/'},
  {name:'适合做专场动画的 CSS 动效',url:'https://www.minimamente.com/project/magic/'},
  {name:'CSS 鼠标悬浮动画',url:'https://ianlunn.github.io/Hover/'},
  {name:'CSS 动画集',url:'https://animista.net/play/basic/shadow-drop-2'},
  {name:'为内心强大而心灵脆弱的人制作动画',url:'https://tholman.com/obnoxious/'},
  {name:'CSS 抖动特效',url:'https://elrumordelaluz.github.io/csshake/'},
])
// CSS 小游戏
const playList = reactive([
  {name:'Coding Fantasy',url:'https://codingfantasy.com/games'},
  {name:'代码战争',url:'https://codecombat.com/'},
  {name:'给萝卜浇水',url:'https://cssgridgarden.com/'},
  {name:'塔防游戏',url:'http://www.flexboxdefense.com/'},
  {name:'CSS 做饭',url:'https://flukeout.github.io/'},
  {name:'送小青蛙回家',url:'https://flexboxfroggy.com/'},
  {name:'井字棋游戏',url:'https://codepen.io/alvaromontoro/pen/BexWOw'},
  {name:'避开墙壁逃跑',url:'http://victordarras.fr/cssgame/'},
])

const skip = (e)=> {
  window.open(e.url)
}
</script>

<style lang="scss" scoped>
  .el-button {
    display: block;
    margin-left: 5px;
    margin-bottom:10px;
    :deep(.T-fenxiang) {
      margin-left: 10px
    }
  }
</style>