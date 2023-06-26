---
title: 从零开始的 Vuepress2.X (五)
date: 2023/3/24
lastUpdated: true
description: 
  name: （五）部署 VuePress
  detailShow: true
editLink: false
tags:
  - Vuepress2.X
categories:
  - 前端
prev:
  text: 使用阿里巴巴图标
  link: /vuepress_4/
permalink: /vuepress_5/
---

<el-collapse>
  <el-collapse-item class="catalogue">
      <template #title>
        <span>目录</span>
        <SvgIcon name="T-a-22" :size="20"/>
      </template>
    <div class="catalogue-content">
      <SvgIcon name="T-jiantou_xiangyouliangci" :size="20"/><RouterLink to="/vuepress_1/">(1) 搭建Vuepress项目</RouterLink><br/>
      <SvgIcon name="T-jiantou_xiangyouliangci" :size="20"/><RouterLink to="/vuepress_2/">(2) 使用社区主题和插件</RouterLink><br/>
      <SvgIcon name="T-jiantou_xiangyouliangci" :size="20"/><RouterLink to="/vuepress_3/">(3) 使用 Element-Plus 组件库</RouterLink><br/>
      <SvgIcon name="T-jiantou_xiangyouliangci" :size="20"/><RouterLink to="/vuepress_4/">(4) 使用阿里巴巴图标</RouterLink><br/>
      <SvgIcon name="T-dangqianweizhi" :size="20"/><RouterLink to="/vuepress_5/">(5) 部署 VuePress</RouterLink><br/>
    </div>
  </el-collapse-item>
</el-collapse>

::: tip 前言
当我们在本地把博客弄好后，就可以去部署了<SvgIcon name="T-caidai" :size="20"/><br/>
[VuePress](https://v2.vuepress.vuejs.org/zh/guide/deployment.html)中有多种部署选择<br/>
这里我们就借助gitee来实现
:::

## 部署到gitee

### 新增仓库

我们在gitee上面新建一个仓库，用于存放我们的博客。

<el-image class="imageBorder" src="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/202303231859686.png/compress50" lazy />

这里有两点需要注意：
- 仓库名称建议与个人空间地址保持一致，这样就可以就可以通过个人[空间地址.http://gitee.io]的形式访问了。
- 仓库私有或者共有根据个人情况而定。
<el-image class="imageBorder" src="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/202303240908792.png/compress50" lazy />

仓库创建成功后如下图：
<el-image class="imageBorder" src="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/202303231910805.png/compress50" lazy />

### 推送到gitee
仓库建好后，就需要将我们本地的博客推送到仓库。

- (1) 打包博客
执行打包指令
> npm run build

<el-image class="imageBorder" src="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/202303231916409.png/compress50" lazy />

- (2) 推送到仓库
```git
git init 
git add .
git commit -m "初始化"
git remote add origin https://gitee.com/Toby_c/docs.git
git push -u origin "master"
```

这样代码就推到了仓库中了
<el-image class="imageBorder" src="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/202303231934602.png/compress50" lazy />

### 部署
在仓库页面点击服务菜单，选择 Gitee Pages 选项：
<el-image class="imageBorder" src="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/202303231935538.png/compress50" lazy />

选择部署分支和部署目录：
- 默认的构建输出目录是 .vuepress/dist
- 所以部署目录选择根目录下 .vuepress/dist 文件夹。
<el-image class="imageBorder" src="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/202303241023683.png/compress50" lazy />

部署好后就会出现一个我们的博客地址了
<el-image class="imageBorder" src="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/202303241049119.png/compress50" lazy />