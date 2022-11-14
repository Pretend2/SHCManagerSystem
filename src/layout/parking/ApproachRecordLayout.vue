<template>
    <div style="padding: 0 10px">
        <n-card title="查询条件" style="margin-top: 10px">
            <n-space item-style="display: flex; align-item: center;">
                <n-select style="width: 180px" placeholder="请选择车辆状态" :options="options" />
                <n-input type="text" placeholder="请输入车牌号" />
                <n-input type="text" placeholder="请输入进出场ID" />
                <n-date-picker v-model:value="dataRange" type="daterange" clearable />
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


        <n-table style="margin-top: 10px" striped>
            <thead>
                <tr>
                    <th>进出场ID</th>
                    <th>车辆状态</th>
                    <th>车牌号</th>
                    <th>进场时间</th>
                    <th>出场时间</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="index in 10" :key="index">
                    <td>
                        <n-ellipsis style="max-width: 100px">
                            10
                        </n-ellipsis>
                    </td>
                    <td>
                        进场完成
                    </td>
                    <td>
                        01002
                    </td>
                    <td>
                        2022-09-19 10:20:11
                    </td>
                    <td>
                        2022-09-26 11:21:59
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
import { ref } from 'vue'
// 引入 naive-ui 组件
import {
    NCard, NSpace, NInput, NButton, NTable,
    NIcon, NPagination, NButtonGroup,
    NEllipsis, NSelect, NDatePicker
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
// 时间数据
const dataRange = ref([Date.now(), Date.now()]) // 时间

</script>
<script>
export default {
    name: 'ApproachRecordLayout'
}
</script>

<style scoped>

</style>