<template>
  <div style="padding: 0 10px">
    <n-card title="查询条件" style="margin-top: 10px">
      <n-space item-style="display: flex; align-item: center;">
        <n-input type="text" placeholder="请输入业主名称" />
        <n-input type="text" placeholder="请输入业主身份证" />
        <n-select placeholder="请选择状态" style="width:160px" :options="options" />
        <n-input type="text" placeholder="请输入业主手机" />
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
          <th>绑定ID</th>
          <th>业主ID</th>
          <th>小区ID</th>
          <th>小区名称</th>
          <th>关联业主</th>
          <th>身份证</th>
          <th>手机号</th>
          <th>状态</th>
          <th>申请时间</th>
          <th>手机端类型</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="index in 10" :key="index">
          <td>
            <n-ellipsis style="max-width: 100px">
              982022101186886227
            </n-ellipsis>
          </td>
          <td>
            <n-ellipsis style="max-width: 100px">
              772022101112626047
            </n-ellipsis>
            </td>
          <td>
            <n-ellipsis style="max-width: 100px">
            2022090665021542
            </n-ellipsis>
          </td>
          <td>演示物业（误删）</td>
          <td>陈东海</td>
          <td>
            <n-ellipsis style="max-width: 100px">
              450722199009112230
            </n-ellipsis>
          </td>
          <td>18039306931</td>
          <td>审核成功</td>
          <td>2022-10-11</td>
          <td>微信小程序</td>
          <td>
            <n-button-group size="large">
              <n-button size="small">解绑</n-button>
              <n-button type="error" size="small" strong secondary>删除</n-button>
            </n-button-group>
          </td>
        </tr>
      </tbody>
    </n-table>

    <div style="display: flex;justify-content: center;align-items: center;margin-top: 10px;margin-bottom: 10px;">
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
  NIcon, NPagination, NButtonGroup, NSelect,
  NEllipsis
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
  name: 'BindTheOwnerLayout'
}
</script>

<style>

</style>