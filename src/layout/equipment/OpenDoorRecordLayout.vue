<template>
    <div style="padding: 0 10px">
        <n-card title="查询条件" style="margin-top: 10px">
            <template #header-extra>
                <n-space>
                    <n-button @click="more = !more" quaternary type="primary">{{moreText}}</n-button>
                </n-space>
            </template>
            <n-space item-style="display: flex; align-item: center;">
                <n-input type="text" placeholder="请输入用户名称" />
                <n-select style="width: 180px" placeholder="请选择开门方式" :options="options" />
                <n-input type="text" placeholder="请输入用户手机" />
                <n-select v-if="more" style="width: 180px" placeholder="请选择用户类型" :options="options" />
                <n-input v-if="more" type="text" placeholder="请输入设备名称" />
                <n-input v-if="more" type="text" placeholder="请输入设备编码" />
                <n-button type="primary">
                    <template #icon>
                        <n-icon>
                            <search-icon />
                        </n-icon>
                    </template>
                    查询
                </n-button>
                <n-button>
                    <template #icon>
                        <n-icon>
                            <arrow-clockwise-icon />
                        </n-icon>
                    </template>
                    重置
                </n-button>
            </n-space>
        </n-card>

        <n-table style="margin-top: 10px" striped>
            <thead>
                <tr>
                    <th>设备编码</th>
                    <th>用户名称</th>
                    <th>开门方式</th>
                    <th>身份证</th>
                    <th>开门时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="index in 10" :key="index">
                    <td>
                        <n-ellipsis style="max-width: 160px">
                            822022101328561549
                        </n-ellipsis>
                    </td>
                    <td>
                        <n-ellipsis style="max-width: 160px">
                            演示物业（误删）
                        </n-ellipsis>
                    </td>
                    <td>
                        <n-ellipsis style="max-width: 160px">
                            钥匙开门
                        </n-ellipsis>
                    </td>
                    <td>
                        <n-ellipsis style="max-width: 160px">
                            4310255550365413654
                        </n-ellipsis>
                    </td>
                    <td>
                        <n-ellipsis style="max-width: 160px">
                            2022-10-13 16:52:35
                        </n-ellipsis>
                    </td>
                    <td style="width: 80px">
                        <n-button-group size="large">
                            <n-button size="small">详情</n-button>
                        </n-button-group>
                    </td>
                </tr>
            </tbody>
        </n-table>


        <div style="display: flex;justify-content: center;align-items: center;margin: 10px 0;">
            <n-pagination :page-count="100" />
        </div>

    </div>
</template>

<script setup>
// 引入 vue
import { ref, computed } from 'vue'
// 引入 naive-ui 组件
import {
    NCard, NSpace, NInput, NButton, NTable,
    NIcon, NPagination, NButtonGroup,
    NEllipsis, NSelect
} from 'naive-ui'
// 引入图标 
import {
    Add16Regular as AddIcon,
    Edit16Regular as EditIcon,
    Delete16Regular as DeleteIcon,
    Search16Regular as SearchIcon,
    ArrowClockwise16Regular as ArrowClockwiseIcon,
    CaretDown12Filled as CaretDownIcon,
} from '@vicons/fluent'

// 查询数据
const more = ref(false);
const moreText = computed(() => {
    return more.value ? '隐藏' : '更多'
})
// 测试数据
const options = [
    {
        label: "Everybody's Got Something to Hide Except Me and My Monkey",
        value: 'song0',
        disabled: true
    },
    {
        label: '全部',
        value: 'song1'
    },
    {
        label: 'Norwegian Wood',
        value: 'song2'
    },
    {
        label: "You Won't See",
        value: 'song3',
        disabled: true
    },
    {
        label: 'Nowhere Man',
        value: 'song4'
    },
    {
        label: 'Think For Yourself',
        value: 'song5'
    },
    {
        label: 'The Word',
        value: 'song6'
    },
    {
        label: 'Michelle',
        value: 'song7',
        disabled: true
    },
    {
        label: 'What goes on',
        value: 'song8'
    },
    {
        label: 'Girl',
        value: 'song9'
    },
    {
        label: "I'm looking through you",
        value: 'song10'
    },
    {
        label: 'In My Life',
        value: 'song11'
    },
    {
        label: 'Wait',
        value: 'song12'
    }
]

</script>
<script>
export default {
    name: 'OpenDoorRecordLayout'
}
</script>

<style scoped>

</style>