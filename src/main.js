import { createApp } from 'vue'
import App from './App.vue'

// 引入路由配置
import router from "./router"

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

// 创建 app 对象
let app = createApp(App)

// 定义全局变量
app.provide('global',{
    api: '/api',
    pageSize: 10
})

// 使用插件
app.use(router)
// 挂载组件
app.mount('#app')
