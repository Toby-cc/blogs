<template>
  <Common>
    <!-- <section class="page-404-wrapper">
      <div class="content">
        <h1>404</h1>
        <p>Oops! Page does not exist.</p>
        <div class="xicon-container" @click="goHome">Go Home</div>
      </div>
      <img src="../assets/taken.svg" />
    </section> -->
    <div class="content404">
      <!-- <h1>404</h1> -->
      <SvgIcon name="T-yepian" :size="200"/>
      <p>曾经有个页面摆在你面前你没有珍惜，直到它404了……</p>
      <el-button type="primary" color="#626aef" size="large" @click="goHome"><SvgIcon name="T-shouye2" :size="20" color="#fff"/> Go Home</el-button>
    </div>
    <div class="transform">
      <div class="rail">
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="stamp four">4</div>
      <div class="stamp zero">0</div>
      <div class="world">
        <div class="forward">
          <div class="box">
            <div class="wall"></div>
            <div class="wall"></div>
            <div class="wall"></div>
            <div class="wall"></div>
            <div class="wall"></div>
            <div class="wall"></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </Common>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useRouteLocale, withBase } from '@vuepress/client';
import Common from '../components/Common/index.vue'
import { useThemeLocaleData } from '../composables';

const router = useRouter()
const routeLocale = useRouteLocale()
console.log('routeLocale: ', routeLocale);
const themeLocal = useThemeLocaleData()
console.log('themeLocal: ', themeLocal);

const goHome = () => {
  router.push(themeLocal.value.home || routeLocale.value)
}
</script>

<style lang='scss' scoped>

.content404 {
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  text-align: center;
  color: #000;
  z-index: 1;
  h1 {
    font-size: 8rem!important;
    line-height: 1!important;
  }
  :deep(.T-shouye2) {
    margin-right: 0.5rem;
  }
}
.transform {
  height: 90vh;
  overflow: hidden;
  display: flex;
  font-family: 'Anton', sans-serif;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  opacity: 0.2;
  div {
    transform-style: preserve-3d;
  }
}

$wallSize: 13rem;

.rail {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotateX(-30deg) rotateY(-30deg);
  .stamp {
    position: absolute;
    width: $wallSize;
    height: $wallSize;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(20, 20, 20, 1);
    color: #fff;
    font-size: 7rem;
    @for $i from 1 through 20 {
      &:nth-child(#{$i}) {
        animation: stampSlide 20 * 2000ms ($i * -2000) - 300ms linear infinite;
      }
    }
  }
}
@keyframes stampSlide {
  0% {
    transform: rotateX(90deg) rotateZ(-90deg) translateZ(-$wallSize) translateY(130px);
  }
  100% {
    transform: rotateX(90deg) rotateZ(-90deg) translateZ(-$wallSize) translateY(130 - 200 * 20px);
  }
}
.world {
  transform: rotateX(0deg) rotateY(0deg);
  .forward {
    position: absolute;
    animation: slide 2000ms linear infinite;
  }
  .box {
    width: $wallSize;
    height: $wallSize;
    transform-origin: 100% 100%;
    animation: roll 2000ms cubic-bezier(1.000, 0.010, 1.000, 1.000) infinite;
    .wall {
      position: absolute;
      width: $wallSize;
      height: $wallSize;
      background: rgba(10, 10, 10, 0.8);
      border: 1px solid rgba(250, 250, 250, 1);
      box-sizing: border-box;
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 7rem;
      }
      &:nth-child(1) {
        transform: translateZ(calc($wallSize / 2));
      }
      &:nth-child(2) {
        transform: rotateX(180deg) translateZ(calc($wallSize / 2));
      }
      &:nth-child(3) {
        transform: rotateX(90deg) translateZ(calc($wallSize / 2));
        &::before {
          transform: rotateX(180deg) rotateZ(90deg) translateZ(-1px);
          animation: zeroFour 4000ms -2000ms linear infinite;
        }
      }
      &:nth-child(4) {
        transform: rotateX(-90deg) translateZ(calc($wallSize / 2));
        &::before {
          transform: rotateX(180deg) rotateZ(-90deg) translateZ(-1px);
          animation: zeroFour 4000ms -2000ms linear infinite;
        }
      }
      &:nth-child(5) {
        transform: rotateY(90deg) translateZ(calc($wallSize / 2));
        &::before {
          transform: rotateX(180deg) translateZ(-1px);
          animation: zeroFour 4000ms linear infinite;
        }
      }
      &:nth-child(6) {
        transform: rotateY(-90deg) translateZ(calc($wallSize / 2));
        &::before {
          transform: rotateX(180deg) rotateZ(180deg) translateZ(-1px);
          animation: zeroFour 4000ms linear infinite;
        }
      }
    }
  }
}

@keyframes zeroFour {
  0% {
    content: '4';
  }
  100% {
    content: '0';
  }
}

@keyframes roll {
  0% {
    transform: rotateZ(0deg);
  }
  85% {
    transform: rotateZ(90deg);
  }
  87% {
    transform: rotateZ(88deg);
  }
  90% {
    transform: rotateZ(90deg);
  }
  100% {
    transform: rotateZ(90deg);
  }
}

@keyframes slide {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-$wallSize);
  }
}
</style>

