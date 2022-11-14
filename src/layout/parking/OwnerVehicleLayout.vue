<template>
    <div style="padding: 0 10px">
        <n-card title="查询条件" style="margin-top: 10px">
            <n-space item-style="display: flex; align-item: center;">
                <n-input type="text" placeholder="请输入车牌号" />
                <n-input type="text" placeholder="请输入车位编号" />
                <n-select style="width: 180px" placeholder="请选择车位状态" :options="options" />
                <n-select style="width: 180px" placeholder="请选择车辆类型" :options="options" />
                <n-button type="primary">
                    <template #icon>
                        <n-icon>
                            <search-icon />
                        </n-icon>
                    </template>
                    查询
                </n-button>
                <n-button type="primary">
                    <template #icon>
                        <n-icon>
                            <arrow-clockwise-icon />
                        </n-icon>
                    </template>
                    重置
                </n-button>
            </n-space>
        </n-card>


        <n-card title="车辆信息" style="margin-top: 10px;padding: 0; margin-bottom: 10px;">
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
                        <th>车牌号</th>
                        <th>房屋号</th>
                        <th>车辆品牌</th>
                        <th>车辆类型</th>
                        <th>颜色</th>
                        <th>业主</th>
                        <th>车位</th>
                        <th>起租时间</th>
                        <th>截止时间</th>
                        <th>状态</th>
                        <th>操作</th>
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
                            <n-ellipsis style="max-width: 100px">
                                1栋0单元1室/1栋1单元109室
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                01
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                家用小汽车
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                01
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                lisi(16602905643)
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                车位已释放
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                2022-10-05 00:00:00
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                2022-10-21 00:00:00
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                到期
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-button-group size="large">
                                <n-button v-if="index % 4 == 0" size="small">释放</n-button>
                                <n-button v-else type="warning" size="small">续租</n-button>
                                <n-button size="small">费用</n-button>
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
    name: 'OwnerVehicleLayout'
}
</script>

<style scoped>

</style>