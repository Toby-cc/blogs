<template>
  <el-card shadow="hover" class="post-item-card post-item-container" :class="{'post-item-card__top':data.frontmatter.sticky}"> 
    <template #header>
      <div class="title">
        <RouterLink :to="data.path">{{ data.title }}</RouterLink>
      </div>
      <div style="margin: 0.5rem 0;">
        <PageInfo :page-data="data" :hide-valine-views="true"> </PageInfo>
      </div>
    </template>
    <div class="card_content">
      <p align="center" v-if="data.frontmatter.labelImage">
      <img width="500" :src="data.frontmatter.labelImage"/>
      </p>
      <p class="blockquote" v-if="description.name">
        {{ description.name }}
        <SvgIcon :name="description.detailIcon" :size="description.detailIconSize" v-if="description.detailIcon"/>
      </p>
    </div>
    <div class="title" style="float: right;">
      <RouterLink :to="data.path"><span class="linkButton">{{`>> 查看详情 <<`}}</span></RouterLink>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import PageInfo from './PageInfo.vue'

const port = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
const description = computed(
  () => port.data.frontmatter.description || {}
)
</script>

<style lang='scss'>
.post-item-card {
  padding: 1rem;
  .el-card__header,.el-card__body {
    padding: 0;
  }
  .linkButton {
    font-size: 14px;
    color: rgb(93 103 232 );
  }
  // .card_content {
  //   margin-top: 1rem;
  //   padding: 1rem;
  //   background-color: rgb(249 250 251 / var(--tw-bg-opacity));
  //   border-left: 5px solid rgb(93 103 232 / var(--tw-border-opacity));;
  // }
}
.post-item-card__top {
  position: relative;
  &::before {
    content: "TOP";
    width: 60px;
    height: 16px;
    line-height: 16px;
    position: absolute;
    top: -1px;
    right: 0;
    font-size: .8rem;
    color: #fff;
    letter-spacing: 2px;
    text-align: center;
    background-color: #ff5722;
    opacity: .85;
    transform: translateX(16px) translateY(9px) rotate(45deg);
  }
}
</style>

