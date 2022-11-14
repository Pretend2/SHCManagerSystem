<template>
    
    <div style="padding: 10px">
        <n-card title="剩余车位">
            <n-table style="margin: 0" striped>
                <thead>
                    <tr>
                        <th>总车位数</th>
                        <th>剩余车位数</th>
                        <th>采集时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                5位
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                5位
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                2022-10-13 15:26:38
                            </n-ellipsis>
                        </td>
                        <td>
                            <n-button-group size="large">
                                <n-button size="small">刷新</n-button>
                            </n-button-group>
                        </td>
                    </tr>
                </tbody>
            </n-table>

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

</script>
<script>
export default {
    name: 'RemainingParkingSpacesLayout'
}
</script>

<style scoped>

</style>