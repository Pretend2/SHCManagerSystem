<template>
    <div style="padding: 0 10px">
        <n-card title="查询条件" style="margin-top: 10px">
            <n-space item-style="display: flex; align-item: center;">
                <n-input type="text" placeholder="请输入门禁编码" />
                <n-input type="text" placeholder="请输入设备ID" />
                <n-input type="text" placeholder="请输入门禁名称" />
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


        <n-card title="门禁信息" style="margin-top: 10px;padding: 0; margin-bottom: 10px;">
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
                        <th>门禁编码</th>
                        <th>门禁名称</th>
                        <th>门禁位置</th>
                        <th>方向</th>
                        <th>状态</th>
                        <th>心跳时间</th>
                        <th>门禁协议</th>
                        <th>时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="index in 10" :key="index">
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                1212
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                121212
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                nh
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                进场
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                设备离线
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                2022-09-21 09:59:07
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                宇泛协议
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                2022-09-21 09:59:07
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-button-group size="large">
                                <n-button size="small">开门</n-button>
                                <n-button size="small">修改</n-button>
                                <n-button type="warning" size="small" strong secondary>重启</n-button>
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
    name: 'AccessControlEquipmentLayout'
}
</script>

<style scoped>

</style>