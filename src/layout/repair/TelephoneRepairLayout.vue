<template>
    <div style="padding: 0 10px">
        <n-card title="查询条件" style="margin-top: 10px">
            <n-space item-style="display: flex; align-item: center;">
                <n-input type="text" placeholder="请输入报修ID" />
                <n-input type="text" placeholder="请输入报修人" />
                <n-input type="text" placeholder="请输入报修电话" />
                <n-select style="width: 180px" placeholder="请选择报修类型" :options="options" />
                <n-select style="width: 180px" placeholder="请选择报修状态" :options="options" />
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

        <n-card title="报修信息" style="margin-top: 10px;padding: 0; margin-bottom: 10px;">
            <template #header-extra>
                <n-space>
                    <n-button type="primary">
                        <template #icon>
                            <n-icon>
                                <add-icon />
                            </n-icon>
                        </template>
                        登记
                    </n-button>
                </n-space>
            </template>
            <n-table style="margin: 0" striped>
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
                            <n-ellipsis style="max-width: 100px">
                                822022101328561549
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                演示物业（误删）
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                维修
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                李白
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                13859726555
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                2022-10-13 16:52:35
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                未派单
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
    name: 'TelephoneRepairLayout'
}
</script>

<style scoped>

</style>