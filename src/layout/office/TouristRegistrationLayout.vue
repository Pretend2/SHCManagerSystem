<template>
  <div style="padding: 0 10px">
    <n-card title="访客信息" style="margin-top: 10px">
      <n-space item-style="display: flex; align-item: center;">
        <n-input v-model:value="findData.name" type="text" placeholder="请填写来访人姓名" clearable />
        <n-input v-model:value="findData.phone" type="text" placeholder="请填写来访人联系方式" clearable />
        <n-date-picker v-model:value="findData.dataRange" type="datetimerange" clearable />
        <n-button @click="findTouRegData" type="primary">
          <template #icon>
            <n-icon>
              <search-icon />
            </n-icon>
          </template>
          查询
        </n-button>
        <n-button @click="resetTouReg">
          <template #icon>
            <n-icon>
              <arrow-clockwise-icon />
            </n-icon>
          </template>
          重置
        </n-button>
      </n-space>
    </n-card>

    <n-spin :show="touRegLoading">
      <n-card title="公告信息" style="margin-top: 10px;padding: 0; margin-bottom: 10px;">
        <template #header-extra>
          <n-space>
            <n-button @click="openTouRegModal" type="primary">
              <template #icon>
                <n-icon>
                  <add-icon />
                </n-icon>
              </template>
              登记
            </n-button>
          </n-space>
        </template>
        <n-table style="margin-top: 10px" striped>
          <thead>
            <tr>
              <th>访客ID</th>
              <th>访客姓名/性别</th>
              <th>访客联系方式</th>
              <th>业主姓名</th>
              <th>来访事由/类型</th>
              <th>车牌号</th>
              <th>创建时间</th>
              <th>来访/离开时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in touRegData" :key="index">
              <td>
                <n-ellipsis style="max-width: 80px">
                  {{ item.visitorsNo }}
                </n-ellipsis>
              </td>
              <td>
                <n-ellipsis style="max-width: 80px">
                  {{ item.name }}/{{ item.gender === 1 ? '男' : '女' }}
                </n-ellipsis>
              </td>
              <td>{{ item.phone }}</td>
              <td>{{ item.owner.name }}</td>
              <td>
                <n-ellipsis style="max-width: 80px">
                  {{ item.reason }}({{ item.type === 0 ? '白事' : '喜事' }})
                </n-ellipsis>
              </td>
              <td>
                {{ item.carNo }}
              </td>
              <td>
                <n-ellipsis style="max-width: 80px">
                  {{ item.createTime }}
                </n-ellipsis>
              </td>
              <td>
                <n-ellipsis style="max-width: 80px">
                  {{ item.visitingTime }}/{{ item.leaveTime }}
                </n-ellipsis>
              </td>
              <td v-html="new Date(item.leaveTime).getTime() >= new Date().getTime() ?
              '<span style=\'color:green\'>已生效</span>' : '<span style=\'color:red\'>已失效</span>'"></td>
              <td>
                <n-button-group size="large">
                  <n-button size="small">修改</n-button>
                  <n-button type="error" size="small" strong secondary>删除</n-button>
                </n-button-group>
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-card>

      <n-modal :auto-focus="false" v-model:show="showTouRegModal" class="custom-card" preset="card" style="width: 600px"
        title="访客登记" transform-origin="center" size="huge" :bordered="false"
        :segmented="{ content: 'soft', footer: 'soft' }">
        <!-- :model="touRegValue" :rules="touRegRules" -->
        <n-form ref="touRegFormRef" label-placement="left" :label-width="75" size="medium">
          <n-grid cols="1">
            <n-grid-item>
              <n-form-item label="访客姓名">
                <n-input placeholder="请输入访客姓名" />
              </n-form-item>
              <n-form-item label="访客性别">
                <n-select placeholder="请选择性别" style="width: 180px" :options="touRegGender" clearable />
              </n-form-item>
              <n-form-item label="联系方式">
                <n-input placeholder="请输入联系方式" />
              </n-form-item>
              <n-form-item label="车牌号">
                <n-input placeholder="请输入车牌号" />
              </n-form-item>
              <n-form-item label="时间">
                <n-date-picker type="datetimerange" clearable />
              </n-form-item>
              <n-form-item label="目标业主">
                <n-select placeholder="请选择目标业主" clearable />
              </n-form-item>
              <n-form-item label="事由类型">
                <n-select placeholder="请选择事由类型" clearable />
              </n-form-item>
              <n-form-item label="拜访事由">
                <n-input placeholder="请输入拜访事由" type="textarea"/>
              </n-form-item>
            </n-grid-item>
          </n-grid>
        </n-form>
        <template #footer>
          <n-space justify="end">
            <n-button @click="showTouRegModal = false">取消</n-button>
            <n-button @click="rouRegSubmit" type="primary" attr-type="button">提交</n-button>
          </n-space>
        </template>
      </n-modal>

      <div v-if="pages > 1"
        style="display: flex;justify-content: center;align-items: center;margin-top: 10px;margin-bottom: 10px;">
        <n-pagination @update:page="touRegPageChange" :page-count="pages" />
      </div>
    </n-spin>


  </div>
</template>

<script setup>

// 引入 vue
import { ref, inject, computed } from 'vue'
// 引入 naive-ui 组件
import {
  NCard, NSpace, NInput, NButton, NTable,
  NIcon, NPagination, NButtonGroup, NGrid,
  NEllipsis, NSelect, NDatePicker, useMessage,
  useDialog, NSpin, NForm, NFormItem, NModal,
  NGridItem
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

import { formatDate, mergeObject } from '../../util/BaseUtil'

const global = inject('global')

// 获取消息对象
const message = useMessage()
// 获取弹框对象
const dialog = useDialog()

// #region 数据查询
const findData = ref({
  name: null,
  phone: null,
  dataRange: null,
  visitingTime: computed(() => {
    if (findData.value.dataRange != null) {
      return formatDate(new Date(findData.value.dataRange[0]))
    }
    return null
  }),
  leaveTime: computed(() => {
    if (findData.value.dataRange != null) {
      return formatDate(new Date(findData.value.dataRange[1]))
    }
    return null
  })
})

/**
 * 查询访客登记信息
 */
const findTouRegData = () => {
  touRegPageChange(1)
}

/**
 * 重置查询数据
 */
const resetTouReg = () => {
  findData.value.name = null
  findData.value.phone = null
  findData.value.dataRange = null
}
// #endregion

// #region 加载访客登记信息
const touRegData = ref([]) // 访客登记信息数据
const pageNo = ref(1) // 当前页码
const pages = ref(1) // 总页数
const touRegLoading = ref(false) // 加载中
/**
 * 加载访客登记信息
 */
const loadTouRegData = (more) => {
  const params = {
    page: 1,
    size: global.pageSize
  }
  mergeObject(params, more, ['dataRange'])
  touRegLoading.value = true
  axios({
    method: 'get',
    url: global.api + '/getAllVisitorRecords',
    params
  }).then(res => {
    pageNo.value = res.data.pageNo // 设置当前页码
    pages.value = res.data.pages // 设置总页数
    touRegData.value = res.data.list // 设置访客登记数据
  }).catch(err => {
    message.error('加载访客信息出现异常！' + err)
  }).finally(() => {
    touRegLoading.value = false
  })
}
loadTouRegData()

/**
 * 页码发生变化时触发
 * @param {页码} page 
 */
const touRegPageChange = (page) => {
  const more = {
    page,
  }
  mergeObject(more, findData.value)
  loadTouRegData(more)
}

// #endregion

// #region 访客模态框

const showTouRegModal = ref(false) // 显示模态框

// 性别数据
const touRegGender = ['女', '男'].map((k, v) => ({
  label: k,
  value: v
}))

/**
 * 访客数据
 */
const touRegValue = () => {

}

/**
 * 访客数据校验
 */
const touRegRules = () => {

}

/**
 * 打开模态框
 */
const openTouRegModal = () => {
  showTouRegModal.value = true
}

/**
 * 提交按钮
 */
const rouRegSubmit = () => {

}

console.log(touRegGender);

// #endregion

</script>
<script>
export default {
  name: 'TouristRegistrationLayout'
}
</script>

<style scoped>

</style>