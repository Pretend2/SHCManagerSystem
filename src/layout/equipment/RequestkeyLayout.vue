<template>
    <div style="padding: 0 10px">
        <n-card title="查询条件" style="margin-top: 10px">
            <n-space item-style="display: flex; align-item: center;">
                <n-input type="text" placeholder="请输入名称" />
                <n-select style="width: 180px" placeholder="请选择用户类型" :options="options" />
                <n-input type="text" placeholder="请输入用户手机" />
                <n-input type="text" placeholder="请输入身份证号" />
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


        <n-card title="申请钥匙" style="margin-top: 10px;padding: 0; margin-bottom: 10px;">
            <template #header-extra>
                <n-space>
                    <n-button type="primary">
                        <template #icon>
                            <n-icon>
                                <add-icon />
                            </n-icon>
                        </template>
                        申请
                    </n-button>
                </n-space>
            </template>
            <n-table style="margin: 0" striped>
                <thead>
                    <tr>
                        <th>钥匙申请ID</th>
                        <th>姓名</th>
                        <th>手机号</th>
                        <th>钥匙类型</th>
                        <th>密码</th>
                        <th>身份证号</th>
                        <th>开始时间</th>
                        <th>结束时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="index in 10" :key="index">
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                8189616531451
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                小红
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                18112345678
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                固定密码
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                123321
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                4310123156456462
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                2022-10-10 12:16:15
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                2023-10-10 12:16:15
                            </n-ellipsis>
                        </td>
                        <td style="width: 120px">
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
    name: 'RequestkeyLayout'
}
</script>

<style scoped>

</style>