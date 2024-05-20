---
title: 关于
date: 2023/2/22
lastUpdated: true
editLink: false
NoPageCard: true
sticky: 1
tags:
  - 个人
permalink: /konwMe/
hideComments: true
pageClass: konwMe
---
<meteor></meteor>
<el-card class="konwMe-card" shadow="hover">
  <template #header>
    <div class="card-header">
      <div class="card-header_images card-header_size">
        <div class="card-header_images1 card-header_size"></div>
        <div class="card-header_images2 card-header_size"></div>
      </div>
      <div class="card-header_content">
        <span class="header_name">Toby</span>
        <span style="margin:0 10px">|</span>
        <span>广东·四会</span>
        <div>Hi！我叫Toby。我在这里写写日常，记录平日积累进行总结。</div>
        <div>
          欢迎各位访问
          <SvgIcon name="T-kaixin" :size="30"/>
          也希望各位大佬，对本博客的完善提出建议，在此感谢。
          <SvgIcon name="T-xin1" :size="20"/>
        </div>
      </div>
    </div>
  </template>
  <div>
    <!-- 关于我 -->
    <el-divider content-position="left" class="konwMe-divider"><SvgIcon name="T-shouye1" :size="30"/>关于我</el-divider>
      <div class="card-content">
        <div>● enmmmm 怎么说呢？其实一开始是写java的，后来因为热爱，所以成为了前端。</div>
        <div>● 目前在 广州 任职 前端开发工程师</div>
        <div>● 我很平庸的，只求今天的自己比昨天优秀就满足了。</div>
      </div>
    <!-- 关于本站 -->
    <el-divider content-position="left" class="konwMe-divider"><SvgIcon name="T-shezhi" :size="25"/>关于本站</el-divider>
      <div class="card-content">
        <div>● 有时候解决了一些问题，可是过后就忘记了。</div>
        <div>● 为了避免下次遇到的时候不用浪费时间，所以就想写个博客加深一点记忆。</div>
        <div>● 平时也会看一下，有些东西每隔一段时间再看一下就会有不一样的理解。</div>
        <div>● 偶尔也会想随便写点东西，记录自己的生活。</div>
        <div>● 同时也希望通过本站搭建与各位大佬沟通的桥梁，大家一起沟通学习，共同进步。</div>
      </div>
  </div>
</el-card>

<script setup>
import {ref,reactive,onMounted,getCurrentInstance} from "vue";

const { proxy } = getCurrentInstance()

</script>

<style lang="scss">
  .page-container.konwMe {
    margin-bottom: 0;
    background: url(https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/202303201032562.jpg/compress75);
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 100%;
  }
  .page-title {
    text-align: center;
  }
  .page-container.konwMe footer  .xicon-container.meta-item-label{
    color: #fff
  }
  .konwMe-card {
    overflow: visible;
    margin-top: 20px;
    border-radius: 10px;
    backdrop-filter: blur(5px);
    background-color: rgba(255,255,255, 0.075);
    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
    border: 2px rgba(255,255,255,0.4) solid;
    border-bottom: 2px rgba(40,40,40,0.35) solid;
    border-right: 2px rgba(40,40,40,0.35) solid;
    .el-card__header {
      padding: 5px 20px;
      border-bottom: none;
    }
    .card-header {
      display:flex;
      .card-header_size {
        width:80px;
        height:80px;
      }
      .card-header_images1 {
        display: block;
        background:url(https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/202303201032564.png/compress50);
        background-size: auto 100%;
      }
      .card-header_images2 {
        display:none;
        background:url(https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/202303201032561.png/compress50);
        background-size: 100% 100%;
      }
      .card-header_images {
        position: absolute;
        top: -20px;
        transition: all 1.2s;
        &:hover {
          transform: rotate(720deg);
          .card-header_images1 {
            display: none;
          }
          .card-header_images2 {
            display: block;
          }
        }
      }
      .card-header_content {
        margin-left: 6em;
        color: #000;
        .icon {
          vertical-align: middle;
        }
      }
      .header_name {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .card-content {
      color: #fff;
      text-shadow: 0 0 2px #5D67E8;
    }
  }
  .konwMe-divider .el-divider__text {
    border-radius: 30px;
    background: linear-gradient(145deg, #ffffff, #e6e6e6);
    box-shadow:  5px 5px 10px #666666,0 0 10px #ffffff;
    .T-icon {
      vertical-align: bottom;
      margin-right: 5px;
    }
  }
</style>
