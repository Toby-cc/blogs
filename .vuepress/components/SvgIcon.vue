<!-- .vuepress/components/SvgIcon.vue -->
<template>
  <!-- 饿了么图标 -->
  <i 
    v-if="isShowIconSvg" 
    :class="'el-icon T-icon '+ getIconName" 
    :style="setIconSvgStyle"
    >
		<component :is="getIconName" />
	</i>
  <!-- 阿里图标 -->
  <svg 
    v-else-if="isShowIconFont" 
    :class="'icon T-icon '+ getIconName" 
    :style="setIconSvgStyle" 
    aria-hidden="true"
    >
    <use :xlink:href="'#'+getIconName"/>
  </svg>
  <!-- Xicons 图标 -->
  <component
    v-else
    class="xicon-icon T-icon"
    :style="setIconSvgStyle"
    :is="icons[getIconName]"
  />
</template>

<script lang='ts' setup>
/**
 * 说明：
 * T-icon 统一的图标类名，方便批量管理
 * getIconName 图标名称
 * setIconSvgStyle 图标样式
 * 使用： <SvgIcon name="ele-Delete"/>
 */
import { computed } from 'vue';
import * as icons from '@vicons/carbon'

const props = defineProps({
  // svg 图标组件名字
  name: {
    type:String,
    required:true
  },
  // svg 大小
  size: {
    type: Number||String,
    default: () => 14,
  },
  // svg 颜色
  color: {
    type: String,
  },
})


// 获取 icon 图标名称
const getIconName = computed(() => {
  return props?.name;
});
// 用于判断 element plus 自带 svg 图标的显示、隐藏
const isShowIconSvg = computed(() => {
  return props?.name?.startsWith('ele-');
});
// 用于判断 阿里图标库 自己图标的显示、隐藏, T：自己的图标库前缀
const isShowIconFont = computed(() => {
  return props?.name?.startsWith('T-');
});
// 设置图标样式
const setIconSvgStyle = computed(() => {
  const style =  `
      font-size: ${props.size}px;
      color: ${props.color};
      width: ${props.size}px;
      height: ${props.size}px;
    `;
  return style
});

</script>

<style>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.T-icon {
  vertical-align: middle;
}
</style>


