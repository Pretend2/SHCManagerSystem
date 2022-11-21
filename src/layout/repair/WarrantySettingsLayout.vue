<template>
    <div style="padding: 0 10px">
        <n-card title="查询条件" style="margin-top: 10px">
            <n-space item-style="display: flex; align-item: center;">
                <n-input v-model="findWS.repairName" type="text" placeholder="请输入类型名称" />
                <n-select v-model:value="findWS.single" style="width: 180px" placeholder="请选择派单方式"
                    :options="singleOption" clearable />
                <n-input v-model:value="findWS.type" type="text" placeholder="请输入派单类型" />
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

        <n-spin :show="wSLoading">
            <n-card title="报修设置" style="margin-top: 10px;padding: 0; margin-bottom: 10px;">
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
                            <th>类型名称</th>
                            <th>报修设置类型</th>
                            <th>派单方式</th>
                            <th>派单类型</th>
                            <th>公共区域</th>
                            <th>是否回访</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in wSData" :key="index">
                            <td>
                                <n-ellipsis style="max-width: 100px">
                                    {{item.repairName}}
                                </n-ellipsis>
                            </td>
                            <td>
                                {{typeOption[item.type].label}}
                            </td>
                            <td>
                                {{singleOption[item.single].label}}
                            </td>
                            <td>
                                <n-ellipsis style="max-width: 100px">
                                    {{item.repairTypeNo}}
                                </n-ellipsis>
                            </td>
                            <td>
                                {{item.isPublic === 0 ? '是' : '不是'}}
                            </td>
                            <td>
                                <n-ellipsis style="max-width: 100px">
                                    {{item.isReturn === 0 ? '回访' : '不回访'}}
                                </n-ellipsis>
                            </td>
                            <td>
                                <n-ellipsis style="max-width: 100px">
                                    {{item.masterWorker.createTime}}
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
        </n-spin>

    </div>
</template>

<script setup>

// 引入 vue
import { ref, inject } from 'vue'
// 引入 naive-ui 组件
import {
    NCard, NSpace, NInput, NButton, NTable,
    NIcon, NPagination, NButtonGroup, useDialog,
    NEllipsis, NSelect, NDatePicker, useMessage,
    NSpin, NForm, NFormItem, NGrid, NGridItem,
    NModal
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

import axios from 'axios'

import { mergeObject, formatDate, createId } from '../../util/BaseUtil'
import QueryString from 'qs'
// 读取全局变量
const global = inject('global')
// 获取消息对象
const message = useMessage()
// 获取弹框对象
const dialog = useDialog()

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

// #region 查询数据
const singleOption = ['轮训', '指派', '抢单'].map((k, v) => ({
    label: k,
    value: v
})) // 派单方式

const typeOption = ['保洁单', '维修单'].map((k, v) => ({
    label: k,
    value: v
})) // 报修类型


const findWS = ref({
    repairName: null,
    single: null,
    type: null,
})
// #endregion

// #region 数据加载
const pageNo = ref(1) // 当前页码
const pages = ref(1) // 总页数

const wSLoading = ref(false); // 加载中
const wSData = ref([]) // 报修设置数据

function loadWSData(more) {
    const params = {
        page: 1,
        size: global.pageSize
    }
    mergeObject(params, more)
    wSLoading.value = true
    axios({
        method: 'get',
        url: global.api + '/getRepairSettings',
        params
    }).then(res => {
        pageNo.value = res.data.pageNum
        pages.value = res.data.pages
        wSData.value = res.data.list
    }).catch(err => {
        message.error('报修设置数据加载异常！' + err)
    }).finally(() => {
        wSLoading.value = false
    })
}
loadWSData() // 加载数据
// #endreguion

</script>

<script>
export default {
    name: 'WarrantySettingsLayout'
}
</script>

<style scoped>

</style>