<template>
  <router-view v-slot="{ Component }">
    <transition name="aside-right" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
</script>
<script>
export default {
  name: 'RepairMain'
}
</script>

<style scoped>
/* 路由动画 */
@import url(../../assets/style/page-animation.css);
</style>