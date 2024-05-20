---
title: 从零开始的 Vuepress2.X (三)
date: 2023/3/22
lastUpdated: true
description: 
  name: （三）使用 Element-Plus 组件库
  detailShow: true
editLink: false
tags:
  - Vuepress2.X
categories:
  - Vue
prev:
  text: 使用社区主题和插件
  link: /vuepress_2/
next:
  text: 使用阿里巴巴图标
  link: /vuepress_4/
permalink: /vuepress_3/
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
      <SvgIcon name="T-dangqianweizhi" :size="20"/><RouterLink to="/vuepress_3/">(3) 使用 Element-Plus 组件库</RouterLink><br/>
      <SvgIcon name="T-jiantou_xiangyouliangci" :size="20"/><RouterLink to="/vuepress_4/">(4) 使用阿里巴巴图标</RouterLink><br/>
      <SvgIcon name="T-jiantou_xiangyouliangci" :size="20"/><RouterLink to="/vuepress_5/">(5) 部署 VuePress</RouterLink><br/>
    </div>
  </el-collapse-item>
</el-collapse>

::: tip 前言
vuepress支持vue语句，那怎么少的了vue的组件库呢<br/>
下面我们就引入 Element Plus 来丰富我们的博客
:::

## 1、使用 Element Plus

### 1.1 安装 Element Plus
:::: code-group
::: code-group-item PNPM
  ```bash
  pnpm install element-plus
  ```
:::
::: code-group-item YARN
  ```bash
  yarn add element-plus
  ```
:::
::: code-group-item NPM
  ```bash
  npm install element-plus --save
  ```
:::
::::

### 1.2 引入 Element Plus
在 client 中引入
```js
// .vuepress/client.ts
import { defineClientConfig  } from '@vuepress/client'// 导入组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const icons = ElementPlusIconsVue as any;

export default defineClientConfig ({
  enhance({ app }){
    // 引入element图标
    Object.keys(icons).forEach(key => {
        app.component(key, icons[key])
    })
    // 挂载 element plus
    app.use(ElementPlus)
  },
  ...
})
```
之后我们就可以直接使用了
```bash
---
title: test2
date: 2023/3/1
tags:
  - css
categories:
  - 测试组件
---

<el-button>我是按钮</el-button>

```

<p align="center">
<img width="500" class="imageBorder" src="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/202303231639978.png/compress50"/>
</p>