<template>
    <div style="padding: 0 10px">
        <n-card title="查询条件" style="margin-top: 10px">
            <n-space item-style="display: flex; align-item: center;">
                <n-select style="width: 180px" placeholder="请选择名单类型" :options="options" />
                <n-input type="text" placeholder="请输入车牌号" />
                <n-input type="text" placeholder="请输入名单ID" />
                <n-button type="primary">
                    <template #icon>
                        <n-icon>
                            <search-icon />
                        </n-icon>
                    </template>
                    查询
                </n-button>
            </n-space>
        </n-card>


        <n-card title="黑白名单信息" style="margin-top: 10px;padding: 0; margin-bottom: 10px;">
            <template #header-extra>
                <n-space>
                    <n-button type="primary">
                        <template #icon>
                            <n-icon>
                                <add-icon />
                            </n-icon>
                        </template>
                        添加
                    </n-button>
                </n-space>
            </template>
            <n-table style="margin: 0" striped>
                <thead>
                    <tr>
                        <th>名单ID</th>
                        <th>名单类型</th>
                        <th>停车场</th>
                        <th>车牌号</th>
                        <th>开始时间</th>
                        <th>结束时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="index in 10" :key="index">
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                102022101288006999
                            </n-ellipsis>
                        </td>
                        <td>
                            黑名单
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                1020220927
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                ncfiw
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                2022-10-10 10:27:45
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                2022-10-12 10:25:45
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-button-group size="large">
                                <n-button size="small">修改</n-button>
                                <n-button type="error" size="small" strong secondary>删除</n-button>
                            </n-button-group>
                        </td>
                    </tr>
                </tbody>
            </n-table>

            <div style="display: flex;justify-content: center;align-items: center;margin-top: 24px;">
                <n-pagination :page-count="100" />
            </div>

        </n-card>

    </div>
</template>

<script setup>

// 引入 vue
import { ref } from 'vue'
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
    name: 'BlackAndWhiteListLayout'
}
</script>

<style scoped>

</style>