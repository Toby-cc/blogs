<template>
  <MagicCard class="post-item-container MagicCard">
    <el-card shadow="never" class="post-item-card" :class="{'post-item-card__top':data.frontmatter.sticky}"> 
      <template #header>
        <div class="title">
          <RouterLink :to="data.path">{{ data.title }}</RouterLink>
        </div>
        <div style="margin: 0.5rem 0;">
          <PageInfo :page-data="data" :hide-views="solution==='valine'"/>
        </div>
      </template>
      <div class="card_content">
        <p align="center">
        <img width="500" :src="data.frontmatter.labelImage"/>
        </p>
        <blockquote class="blockquote" v-if="description.name">
          {{ description.name }}
          <SvgIcon :name="description.detailIcon" :size="description.detailIconSize" v-if="description.detailIcon"/>
        </blockquote>
      </div>
      <div class="title" style="float: right;">
        <RouterLink :to="data.path"><span class="linkButton">{{`>> 查看详情 <<`}}</span></RouterLink>
      </div>
    </el-card>
  </MagicCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useComment } from '@vuepress-reco/vuepress-plugin-comments/lib/client/composables'
import PageInfo from './PageInfo.vue'

const port = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
const { solution } = useComment()
const description = computed(
  () => port.data.frontmatter.description || {}
)
</script>

<style lang='scss'>
.MagicCard.post-item-container {
  padding: 0;
  .post-item-card {
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0);
    .el-card__header,.el-card__body {
      padding: 0;
    }
    .linkButton {
      font-size: 14px;
      color: rgb(93 103 232 );
    }
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

  .card_content .blockquote{
      background-color: rgb(241, 241, 241);
  }
}
.dark .card_content .blockquote{
  background-color: rgb(32 32 34) !important;
}
</style>

