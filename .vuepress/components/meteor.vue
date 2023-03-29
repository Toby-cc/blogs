<template>
  <div class="meteor">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script lang='ts' setup>
</script>

<style lang='scss' scoped>
.meteor {
  pointer-events: none;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  // 绝对定位
  width: 100%;
  height: 100vh;
  // 宽高100% vh是视窗百分比高度,1vh是1%
}
.meteor span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1),
    0 0 0 8px rgba(255, 255, 255, 0.1), 0 0 20px rgba(255, 0, 0, 0.5);
  opacity: 0;
}
.meteor span::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateX(0);
  // 位置偏移 x轴,用于调整光点位置
  width: 200px;
  height: 1px;
  background: linear-gradient(90deg, #ff000017, transparent);
  // 创建一个表示两种或多种颜色线性渐变的图片
}
 
@for $i from 0 through 185 {
  .meteor span:nth-child(#{$i}) {
    // random() 随机数 700相当于700以内的随机整数
    top: #{random(300)}px;
    // 因为同时设置left  和 right的话，left的权重比较高，此时right不生效。所以把left设置为initial，恢复为默认的样式，此时再设置right的值就会生效了。
    right: #{random(700)}px;
    left: initial;
    animation: animate #{random(2) + random()}s linear #{random(5)- random()}s infinite;
    background: rgb(random(255), random(255), random(255));
  }
}
 
@keyframes animate {
  0% {
    transform: rotate(315deg) translateX(-100px);
    // 旋转加偏移
    opacity: 1;
    // 透明度 值为0-1
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: rotate(315deg) translateX(-1000px);
    opacity: 0;
  }
}
</style>