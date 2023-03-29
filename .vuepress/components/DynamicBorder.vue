<template>
  <div class="skulls" :class="className">
    <slot/>
  </div>
</template>

<script lang='ts' setup>

defineProps({
  className:{
    type:String,
    default: "",
  },
})
</script>

<style lang='scss' scoped>
.skulls {
  position: relative;
  width: 100%;
  height: auto;
  margin: auto;
  border: 28px solid;
  border-image: url(../public/images/heartMoves.svg);
  border-image-slice: 32;
  border-image-repeat: round;
  padding-bottom: 10px;
}
</style>