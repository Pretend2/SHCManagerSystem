<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN" :theme="dark ? darkTheme : null" :theme-overrides="myTheme">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-message-provider>
          <router-view></router-view>
        </n-message-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
    <n-global-style />
  </n-config-provider>
</template>

<script setup>
import { ref, provide, inject, watch } from 'vue'

import {
  NConfigProvider, NMessageProvider, darkTheme, NButton,
  NGlobalStyle, NLoadingBarProvider, zhCN, dateZhCN, NDialogProvider
} from 'naive-ui'

// 引入自定义主题
import myTheme from './theme.js'

// 引入路由
import { useRouter } from "vue-router";
import axios from 'axios';

// 接收全局变量
const global = inject('global');

let darkTemp = localStorage.getItem("dark") // 持久化

if (darkTemp == null) {
  localStorage.setItem("dark", false)
}

const dark = ref(JSON.parse(darkTemp))
// 向后代组件传递数据
provide('dark', dark)
// 监听器 dark 值发生变化时触发
watch(dark, (newValue, oldValue) => {
  localStorage.setItem("dark", dark.value)  // 持久化
})

// 获取路由对象
const router = useRouter()

// 前置守卫
router.beforeEach((to, from, next) => {
  let path = null
  // 设置网页标题
  document.title = to.meta.title
  if (to.name === "login") {
    localStorage.removeItem("user")
  } else {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) {
      path = '/login'
    } else {
      axios({
        url: global.api + '/checkToken',
        headers: { token: user.token }
      }).then(res => {
        if (!res.data) {
          path = '/login'
        }
      })
    }
  }
  next(path)
});

/* 
// 获取路由实例
const router = useRouter();
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  //loadingBar.start();
  next();
});

router.afterEach(() => {
  //loadingBar.finish();
}); */

</script>
<script>
export default {
  name: 'App',
}

</script>

<style>

</style>
