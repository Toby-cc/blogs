<template>
  <div 
    class="container" 
    :style="{width:'50%'}"
    ref="container"  
    @touchstart.prevent="onTouchStart"
  >
    <div
      id="root"
      :style="{ cursor: isResizing ? 'ns-resize' : 'unset' }"
      @mousemove.stop="onMouseMove"
      @mouseup.stop="onMouseUp"
      @mouseleave.stop="onMouseUp"
      @touchmove="touchmove"
      @onTouchEnd="onMouseUp"
    >
      <!-- 底图 不用动高 -->
      <el-image
        class="changed-img"
        :src="changedImg"
      />

      <!-- 需改高 -->
      <div id="clip" ref="clip" :style="{ clip: clip }">
        <el-image
          class="origin-img"
          :src="originImg"
        />
      </div>

      <!-- 滑动横条 -->
      <div
        id="bar"
        :style="{ transform: `translate3d(0px, ${barY}px, 0px)` }"
        @mousedown.stop="onMouseDown"
        @touchstart="touMouseDown"
      >
        <div class="bar-line">
          <div class="handle-root">
            <div class="handle-line"></div>
            <div class="handle-button pointer">
              <div></div>
              <div></div>
            </div>
            <div class="handle-line"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, computed } from "vue";

defineProps({
  width:{
    type:String,
    default: "100%",
  },
  changedImg:{
    type:String,
    required:true,
  },
  originImg:{
    type:String,
    required:true,
  }
})

const isResizing = ref(false);
const allow = ref(false);
const barY = ref(0);
const container = ref(null)
const clip = computed(()=>{
  return `rect(auto, auto, ${barY.value}px, auto)`
})

const onTouchStart = (event)=> {
  // 阻止默认事件，禁止页面滚动
  event.preventDefault();
}

const onMouseDown = (e) => {
  allow.value = true;
  isResizing.value = true;
  move(e.clientY);
};
const touMouseDown = (e) => {
  allow.value = true;
  isResizing.value = true;
  move(e.touches[0].clientY);
};

const onMouseMove = (e) => {
  if (allow.value) {
    move(e.clientY);
  }
};
const touchmove = (e) => {
  if (allow.value) {
    move(e.touches[0].clientY);
  }
}

const onMouseUp = () => {
  stop();
  isResizing.value = false;
};
const move = (clientY) => {
  let top =  container?.value?.getBoundingClientRect().top || 0
  barY.value = clientY - top;
};

const stop = () => {
  allow.value = false;
};
</script>

<style lang="scss" scoped>
#root {
  width: 100%;
  height: auto;
  position: relative;
  overflow: hidden;
  user-select: none;
  margin: 100px auto;
}

#root .changed-img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  box-sizing: border-box;
  object-fit: cover;
  object-position: center center;
}

#root #clip {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: auto;
  will-change: clip;
  user-select: none;
  clip: rect(auto, auto, 206px, auto);
}

#root #clip .origin-img {
  display: block;
  width: 100%;
  height: auto;
  max-width: 100%;
  box-sizing: border-box;
  object-fit: cover;
  object-position: center center;
}

#bar {
  position: absolute;
  top: 0px;
  width: 100%;
  height: auto ;
  pointer-events: none;
  transform: translate3d(0px, 206px, 0px);
}
#bar .bar-line {
  position: absolute;
  width: 100%;
  transform: translateY(-50%);
  pointer-events: all;
  height: 56px;
}
.bar-line .handle-root {
  display: flex;
  flex-direction: row;
  place-items: center;
  height: 100%;
  cursor: ns-resize;
  pointer-events: none;
  color: rgb(255, 255, 255);
}
.bar-line .handle-line {
  flex-grow: 1;
  height: 2px;
  width: 100%;
  background-color: currentcolor;
  pointer-events: auto;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 7px;
}
.bar-line .handle-button {
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
  place-content: center;
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border-style: solid;
  border-width: 2px;
  pointer-events: auto;
  backdrop-filter: blur(7px);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 0px 7px;
  transform: rotate(90deg);
}
.bar-line .handle-button div {
  width: 0px;
  height: 0px;
  border-top: 8px solid transparent;
  border-right: 10px solid;
  border-bottom: 8px solid transparent;
}
.bar-line .handle-button div:nth-child(2) {
  transform: rotate(180deg);
}
</style>