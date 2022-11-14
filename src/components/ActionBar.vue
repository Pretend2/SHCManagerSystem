<template>
    <n-grid cols="1" item-responsive>
        <n-grid-item>
            <!-- ActionBar 容器 -->
            <n-el tag="div" class="action-bar">
                <!-- Menu 按钮容器 -->
                <div class="menu-btn" v-if="menuEnable">
                    <!-- Menu 按钮 -->
                    <n-button @click="menuClick" style="width:var(--height-medium);height:var(--height-medium);" quaternary circle>
                        <!-- Menu 图片插槽 -->
                        <template #icon>
                            <n-icon>
                                <menu-icon v-show="menuStatus" />
                                <menu-un-icon v-show="!menuStatus" />
                            </n-icon>
                        </template>
                    </n-button>
                </div>
                <!-- title 容器 -->
                <div class="title-box" :style="!menuEnable ? 'padding-left: 16px' : ''">
                    <!-- 面包屑标题 -->
                    <n-breadcrumb>
                        <n-breadcrumb-item :key="index" v-for="(item,index) in title">
                            <n-dropdown :options="item.list">
                                <div class="trigger">
                                    {{item.lable}}
                                </div>
                            </n-dropdown>
                        </n-breadcrumb-item>
                    </n-breadcrumb>
                </div>
                <!-- 其他功能容器 -->
                <div class="action-other">
                    <!-- 插槽 -->
                    <slot></slot>
                </div>
            </n-el>
        </n-grid-item>
    </n-grid>
</template>

<script setup>
// 引入 vue
import { ref, toRefs } from 'vue'
// 引入naive ui组件
import {
    NGrid,NGridItem,NEl,NDivider,NIcon,NButton,NBreadcrumb,
    NBreadcrumbItem,NDropdown,
} from 'naive-ui'

// 引入 vicon 组件
import {
    MenuFoldOutlined as MenuIcon,
    MenuUnfoldOutlined as MenuUnIcon,
} from '@vicons/antd'

// props 参数
const props = defineProps({
    title: { // 接收标题参数
        type: Array, // 参数类型为 Array 类型
        default: [{
            lable: '标题',
            list: [
                {
                    label: "子标题一",
                    key: 1
                },
                {
                    label: "子标题二",
                    key: 2
                }
            ]
        }] // 默认值
    },
    menuStatus: { // 接收菜单按钮状态参数
        type: Boolean, // 参数类型为 Boolean 类型
        default: true // 默认值
    },
    menuEnable: { // 接收菜单按钮状态参数
        type: Boolean, // 参数类型为 Boolean 类型
        default: true // 默认值
    },
})

// 接收响应式数据
const { title, menuStatus, menuEnable } = toRefs(props);

// 自定义事件
const emits = defineEmits(['menuClick'])
// Menu 按钮点击事件
const menuClick = () => {
    emits('menuClick')
}

// Menu 按钮相关操作

</script>

<!-- 定义组件名称 -->
<script>
export default {
    name: "ActionBar"
}
</script>

<style scoped>
.action-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: var(--height-large);
    background-color: var(--card-color);
    border-bottom: 1px solid var(--divider-color);
}

.menu-btn {
    width: var(--height-large);
    height: var(--height-large);
    display: flex;
    justify-content: center;
    align-items: center;
}

.trigger {
  padding: 4px;
  margin: -4px;
  border-radius: inherit;
}

.title-box {
    max-width: 320px;
}

.action-other {
    box-sizing: border-box;
    padding-right: 16px;
    flex: 1;
    display: flex;
    justify-content: right;
    align-items: center;
}
</style>