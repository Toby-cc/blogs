<template>
  <div id="waterfall">
    <div
      class="item"
      v-for="(item, index) in items"
      :key="index"
      :style="{ height: item + 'px'}"
      draggable="true"
      @dragstart="onDragStart(index, $event)"
      @dragover.prevent
      @drop="onDrop(index, $event)"
    >
      {{ item }} + {{ index }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const items = ref([
  100,120,80,85,110,100,100,150,100,180,100,120,80,85,110,100,100,150,100,
  80,100,120,80,185,110,100,100,150,100,80,100,120,80,85,210,100,100,150,100,80
]);


let dragIndex = null;
let dragWidth = null;

const onDragStart = (index, event) => {
  dragIndex = index;
  dragWidth = event.target.offsetWidth; // 保存原始宽度
  event.dataTransfer.setData("text/plain", index);
  event.dataTransfer.effectAllowed = "move";
  event.target.style.width = `${dragWidth}px`; // 拖拽时保持原始宽度
};

const onDrop = (index, event) => {
  const targetIndex = index;
  const sourceIndex = dragIndex;
  // const data = event.dataTransfer.getData("text/plain");

  if (sourceIndex === targetIndex) {
    return;
  }

  const newItem = items.value[sourceIndex];
  items.value.splice(sourceIndex, 1); // 先从数组中移除该项
  items.value.splice(targetIndex, 0, newItem); // 再插入到目标位置

  event.target.style.width = `${dragWidth}px`; // 还原宽度
  dragIndex = null;
  // 可以根据需要进行其他处理，比如触发更新操作
};
</script>

<style lang='scss' scoped>
#waterfall {
  column-count: 3; /* 设置三列布局 */
  column-gap: 10px; /* 设置元素间距为20像素 */
}

#waterfall div {
  flex-basis: calc(33.33% - 10px); /* 每个子元素宽度为 1/3，减去间距 */
  margin-bottom: 20px;
  border: 1px solid #000;
  break-inside: avoid;
}

</style>
