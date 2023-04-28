<template>
  <el-button round @click="initialize()" style="margin-bottom: 20px;">重置</el-button>
  <div class="container" id="container">
    <!-- 顶部图片 -->
    <canvas 
      id="canvas" 
      @mousedown="handleMouseDown" 
      @mousemove="handleMouseMove" 
      @mouseup="handleMouseUp" 
      @mouseout="handleMouseOut"

      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleMouseUp"
      @touchcancel="handleMouseOut"
    />
    <!-- 底部图片 -->
    <img :src="baseImg">
  </div>
</template>

<script setup>
import { onMounted, reactive,defineProps, ref } from 'vue';

const props = defineProps({
  topImg: {
    type:String,
    default:'https://w.wallhaven.cc/full/yx/wallhaven-yxeww7.jpg'
  },
  baseImg: {
    type:String,
    default:'https://w.wallhaven.cc/full/zy/wallhaven-zygeko.jpg'
  },
})

const data = reactive({
  isMouseDown: false,
  lastLoc: { x: 0, y: 0 },
  curLoc: { x: 0, y: 0 },
  canvasWidth: 0,
  canvasHeight: 0,
  threshold: 0.65 // 添加一个阈值属性
});

let ctx;

onMounted(() => {
  const divElement = document.getElementById('container');

  let width = divElement.getBoundingClientRect().width


  const img = new Image();
  img.crossOrigin = 'anonymous'; 
  img.src = props.baseImg;
  img.onload = function () {
    data.canvasWidth = width;
    data.canvasHeight = width/(img.width/img.height);
    initialize()
  };
});

const initialize =()=> {
  const canvas = document.getElementById('canvas')
  canvas.width = data.canvasWidth;
  canvas.height = data.canvasHeight;
  ctx = canvas.getContext('2d');
  drawCover(props.topImg);
}

const drawCover = (imgSrc)=> {
  const img = new Image();
  img.crossOrigin = 'anonymous'; 
  img.src = imgSrc;
  img.onload = function () {
    ctx.drawImage(img, 0, 0, data.canvasWidth, data.canvasHeight);
  };
}

const handleMouseDown = (e)=> {
  e.preventDefault();
  data.isMouseDown = true;
  data.lastLoc = windowToCanvas(e.clientX, e.clientY);
}
const handleTouchStart = (e)=> {
  e.preventDefault();
  data.isMouseDown = true;
  const touch = e.touches[0];
  data.lastLoc = windowToCanvas(touch.clientX, touch.clientY);
}

const handleMouseMove = (e)=> {
  e.preventDefault();
  if (data.isMouseDown) {
    data.curLoc = windowToCanvas(e.clientX, e.clientY);
    
    // 绘制圆形裁剪区域
    ctx.save();
    ctx.beginPath();
    ctx.arc(data.curLoc.x, data.curLoc.y, 20, 0, Math.PI * 2, false);
    ctx.clip();
    
    // 清空画布
    ctx.clearRect(0, 0, data.canvasWidth, data.canvasHeight);
    
    ctx.restore();
  }
}
const handleTouchMove = (e)=> {
  e.preventDefault();
  if (data.isMouseDown) {
    const touch = e.touches[0];
    data.curLoc = windowToCanvas(touch.clientX, touch.clientY);
    
    // 绘制圆形裁剪区域
    ctx.save();
    ctx.beginPath();
    ctx.arc(data.curLoc.x, data.curLoc.y, 20, 0, Math.PI * 2, false);
    ctx.clip();
    
    // 清空画布
    ctx.clearRect(0, 0, data.canvasWidth, data.canvasHeight);
    
    ctx.restore();
  }
}

const handleMouseUp = (e)=> {
  e.preventDefault();
  data.isMouseDown = false;
  
  // 计算已经刮出的面积
  const imageData = ctx.getImageData(0, 0, data.canvasWidth, data.canvasHeight);
  const pixels = imageData.data;
  let count = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 0) {
      count++;
    }
  }
  const area = count / (data.canvasWidth * data.canvasHeight);
  
  // 如果被刮出的面积大于阈值，重新绘制底部全图
  if (area > data.threshold) {
    ctx.clearRect(0, 0, data.canvasWidth, data.canvasHeight);
  }
}

const handleMouseOut = (e)=> {
  e.preventDefault();
  if (data.isMouseDown) {
    data.isMouseDown = false;
  }
}

const windowToCanvas = (x, y)=> {
  const canvas = document.getElementById('canvas')
  const bbox = canvas.getBoundingClientRect();
  return {
    x: Math.round(x - bbox.left),
    y: Math.round(y - bbox.top)
  };
}

</script>

<style scoped>
.container {
  position: relative;
  margin: 0 auto;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
