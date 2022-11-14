<template>
  <div style="padding: 0 10px">
    <n-card title="查询条件" style="margin-top: 10px">
      <n-space item-style="display: flex; align-item: center;">
        <n-input type="text" placeholder="请输入车牌号" />
        <n-input type="text" placeholder="请输入车辆品牌" />
        <n-input type="text" placeholder="请输入申请人姓名" />
        <n-select style="width: 180px" placeholder="请选择状态" :options="options" />
        <n-input type="text" placeholder="请输入申请人电话" />
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


    <n-card title="车位申请信息" style="margin-top: 10px;padding: 0; margin-bottom: 10px;">
      <template #header-extra>
        <n-space>
          <n-button type="primary">
            <template #icon>
              <n-icon>
                <add-icon />
              </n-icon>
            </template>
            申请车位
          </n-button>
        </n-space>
      </template>
      <n-table style="margin: 0" striped>
        <thead>
          <tr>
            <th>申请ID</th>
            <th>车牌号</th>
            <th>汽车品牌</th>
            <th>车辆类型</th>
            <th>颜色</th>
            <th>起租时间</th>
            <th>结租时间</th>
            <th>申请人</th>
            <th>审核结果</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in 10" :key="index">
            <td>
              <n-ellipsis style="max-width: 100px">
                102022101111331219
              </n-ellipsis>
            </td>
            <td>
              <n-ellipsis style="max-width: 100px">
                苏G2344
              </n-ellipsis>
            </td>
            <td>
              <n-ellipsis style="max-width: 100px">
                奔驰
              </n-ellipsis>
            </td>
            <td>
              <n-ellipsis style="max-width: 100px">
                家用小汽车
              </n-ellipsis>
            </td>
            <td>
              <n-ellipsis style="max-width: 100px">
                白色
              </n-ellipsis>
            </td>
            <td>
              <n-ellipsis style="max-width: 100px">
                2022-09-26 15:50:14
              </n-ellipsis>
            </td>
            <td>
              <n-ellipsis style="max-width: 100px">
                2023-08-25 14:45:14
              </n-ellipsis>
            </td>
            <td>
              <n-ellipsis style="max-width: 100px">
                张三
              </n-ellipsis>
            </td>
            <td>
              <n-ellipsis style="max-width: 100px">
                <n-tag type="info">
                  待缴费
                </n-tag>
              </n-ellipsis>
            </td>
            <td>
              <n-button-group size="large">
                <n-button type="error" size="small">删除</n-button>
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
  NEllipsis, NSelect, NTag
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
  name: 'ParkingSpaceApplicationLayout'
}
</script>

<style scoped>

</style>