<template>
  <main class="page-container" :class="pageClass">
    <div :class="{'page-card':!frontmatter.NoPageCard}">
      <h1 v-if="!!title" class="page-title">{{ title }}</h1>
      <PageInfo :page-data="pageData" />
      
      <div class="theme-reco-default-content">
        <p v-if="frontmatter.description?.detailShow" class="blockquote">
          {{ frontmatter.description?.name }}
          <SvgIcon :name="frontmatter.description?.detailIcon" :size="frontmatter.description?.detailIconSize" v-if="frontmatter.description?.detailIcon"/>
        </p>
        <p align="center" v-if="!frontmatter.isLabelImage">
          <img width="500" :src="frontmatter.labelImage"/>
        </p>
        <Password v-if="!pagePasswordPass" @pass="handlePass" />
        <Content v-else />
      </div>
      <PageMeta />
      <PageNav />

      <Comments :hide-comments="shouldHideComments" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePageData } from '@vuepress/client'
import { useComment } from '@vuepress-reco/vuepress-plugin-comments/lib/client/composables'
import PageInfo from '../PageInfo.vue'
import PageNav from '../PageNav.vue'
import PageMeta from '../PageMeta.vue'
import Password from '../PagePassword/index.vue'
import { usePassword } from './hook'

const pageData = usePageData()
const { options } = useComment()
const { pagePasswordPass, handlePass } = usePassword()

const title = computed(
  () => pageData?.value?.frontmatter?.title
    || pageData?.value?.title
    || ''
)
const frontmatter = computed(
  () => pageData?.value?.frontmatter || {}
)
const pageClass = computed(
  () => pageData?.value?.frontmatter?.pageClass|| ''
)

// 是否显示评论
const shouldHideComments = computed(() => {
  const { hideComments: hideCommentsInSinglePage } = pageData?.value?.frontmatter
  const { hideComments: hideCommentsInAllPage } = options.value

  return hideCommentsInSinglePage === true
    || (hideCommentsInSinglePage !== false && hideCommentsInAllPage === true)
})
</script>

<stype lang="scss" scoped>
.page-card {
  margin: auto;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  max-width: 1024px;
  padding-top: 1rem;
  padding-left: 0;
}
.page-title {
  text-align: center;
}
</stype>
