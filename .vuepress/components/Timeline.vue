<template>
  <div>
    <h2>Timeline</h2>
    <ul>
      <li v-for="post in posts" :key="post.key">
        <h3>{{ post.title }}</h3>
        <p>{{ post.date }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
// import { useAllPosts } from '@vuepress/plugin-blog/lib/client';

export default {
  name: 'Timeline',
  // setup() {
  //   const { posts } = useAllPosts();
  //   return { posts };
  // },
};
</script>
