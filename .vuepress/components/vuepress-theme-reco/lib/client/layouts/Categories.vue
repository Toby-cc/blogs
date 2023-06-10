<template>
  <Common>
    <div class="categories-container">
      <ul class="category-list" v-if="headerTag === 'categories'">
        <li
          v-for="({ label, length }, index) in categoryList"
          :key="index"
          :class="[
            'category-item',
            {
              active: categoryPosts.currentCategoryValue === convertToPinyin(label),
            },
          ]"
        >
          <RouterLink
            class="category-link"
            :to="`/${categoryPosts.currentCategoryKey}/${convertToPinyin(label)}/1/`"
          >
            <div class="text">{{ label }} <span class="length" :style="`background-color: ${getRandomColorWithOpacity(0.5)}`">{{ length }}</span></div>
          </RouterLink>
        </li>
      </ul>

      <div v-else-if="headerTag === 'tags'" class="headerTag">
        <template v-for="({ label, length }, index) in categoryList" :key="index">
          <RouterLink :to="`/${categoryPosts.currentCategoryKey}/${convertToPinyin(label)}/1/`" class="tags-link">
            <el-button :color="getRandomColorWithOpacity(0.1)" :size="categoryPosts.currentCategoryValue === convertToPinyin(label)?'Search':'small'">
              <div class="text">{{ label }}</div>
            </el-button>
          </RouterLink>
        </template>
      </div>


      <PostList :data="categoryPosts.pages" />

      <Pagation
        v-if="categoryPosts.totalPage > 10"
        :currentPage="categoryPosts.currentPage"
        :total="categoryPosts.totalPage"
        @change="handlePagation"
      />
    </div>
  </Common>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { usePageData } from '@vuepress-reco/vuepress-plugin-page/lib/client/composable'
import { convertToPinyin } from '@vuepress-reco/shared'
import PostList from '../components/PostList.vue'
import Common from '../components/Common/index.vue'
import Pagation from '../components/Pagation.vue'
import { useMagicCard } from '../composables'

export default defineComponent({
  components: { Common, PostList, Pagation },

  setup() {
    const {
      categoryPosts,
      categorySummary
    } = usePageData()
    const router = useRouter()

    const categoryList = computed(() => {
      let list = []
      const currentCategoryKey = categoryPosts.value.currentCategoryKey
      console.log('categoryPosts.value: ', categoryPosts.value);
      console.log('currentCategoryKey: ', currentCategoryKey);
      
      if (currentCategoryKey) {
        const { items = [] } =
        categorySummary[currentCategoryKey]
        
        list = Object.values(items)
      }
      
      return list
    })
    console.log('categoryList: ', categoryList);
    
    const headerTag = computed(()=>{
      return categoryPosts.value.currentCategoryKey
    })

     // 生成随机透明背景色
     const getRandomColorWithOpacity = (opacity) => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };


    const handlePagation = (page) => {
      const {
        currentCategoryKey,
        currentCategoryValue
      } = categoryPosts.value

      router.push(`/${currentCategoryKey}/${currentCategoryValue}/${page}/`)
    }

    const { initMagicCard } = useMagicCard()
    onMounted(() => {
      initMagicCard()
    })

    const route = useRoute()
    watch(route, () => {
      initMagicCard()
    })

    return {
      headerTag,
      categoryList,
      categoryPosts,
      handlePagation,
      convertToPinyin,
      getRandomColorWithOpacity
    }
  },
})
</script>

<style lang="scss" >
.categories-container {
  max-width: 760px;
}
.headerTag {
  margin: 1.5rem 0;
  .text {
    color: #000;
  }
}
.dark .headerTag {
  .el-button {
    border: 1px solid #ffffff41;
  }
  .text {
    color: #ffffff;
  }
} 
.category-link {
  .length {
    padding: 2px 5px;
    border-radius: 5px;
  }
}
.tags-link {
  margin-right: 1rem;
  margin-bottom: 1rem;
}
</style>
