<template>
    <div style="padding: 0 10px">
        <n-card title="查询条件" style="margin-top: 10px">
            <n-space item-style="display: flex; align-item: center;">
                <n-input type="text" placeholder="请输入报修ID" />
                <n-input type="text" placeholder="请输入报修人" />
                <n-input type="text" placeholder="请输入报修电话" />
                <n-select style="width: 180px" placeholder="请选择报修类型" :options="options" />
                <n-select style="width: 180px" placeholder="请选择报修转态" :options="options" />
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
                    <th>报修ID</th>
                    <th>位置</th>
                    <th>报修类型</th>
                    <th>报修人</th>
                    <th>联系方式</th>
                    <th>预约时间</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="index in 10" :key="index">
                    <td>
                        <n-ellipsis style="max-width: 160px">
                            822022101243101538
                        </n-ellipsis>
                    </td>
                    <td>
                        <n-ellipsis style="max-width: 160px">
                            1栋0单元1室
                        </n-ellipsis>
                    </td>
                    <td>
                        <n-ellipsis style="max-width: 100px">
                            水管坏了
                        </n-ellipsis>
                    </td>
                    <td>
                        <n-ellipsis style="max-width: 100px">
                            Gerins
                        </n-ellipsis>
                    </td>
                    <td>
                        <n-ellipsis style="max-width: 100px">
                            18297864556
                        </n-ellipsis>
                    </td>
                    <td>
                        <n-ellipsis style="max-width: 160px">
                            2022-10-12 21:40:40
                        </n-ellipsis>
                    </td>
                    <td>
                        <n-ellipsis style="max-width: 100px">
                            办理完成
                        </n-ellipsis>
                    </td>
                    <td>
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

</script>
<script>
export default {
    name: 'RepairHasBeenDoneLayout'
}
</script>

<style scoped>

</style>