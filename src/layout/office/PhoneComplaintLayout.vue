<template>
  <div style="padding: 0 10px">
    <n-card title="查询条件" style="margin-top: 10px">
      <n-space item-style="display: flex; align-item: center;">
        <n-input v-model:value="findComplaints.complaintsNo" style="width: 160px" type="text" placeholder="请输入投诉ID" />
        <n-select clearable v-model:value="findComplaints.type" placeholder="请选择投诉类型" style="width:160px"
          :options="typeOption" />
        <n-select clearable v-model:value="findComplaints.status" placeholder="请选择投诉状态" style="width:160px"
          :options="statusOption" />
        <n-button type="primary" @click="findData">
          <template #icon>
            <n-icon>
              <search-icon />
            </n-icon>
          </template>
          查询
        </n-button>
        <n-button @click="resetData">
          <template #icon>
            <n-icon>
              <arrow-clockwise-icon />
            </n-icon>
          </template>
          重置
        </n-button>
      </n-space>
    </n-card>

    <n-spin :show="phoneComplaintLoading">
      <n-card title="投诉建议" style="margin-top: 10px;padding: 0; margin-bottom: 10px;">
        <template #header-extra>
          <n-space>
            <n-button @click="openModal('add')" type="primary">
              <template #icon>
                <n-icon>
                  <add-icon />
                </n-icon>
              </template>
              投诉
            </n-button>
          </n-space>
        </template>
        <n-table style="margin-top: 10px" striped>
          <thead>
            <tr>
              <th>投诉ID</th>
              <th>投诉类型</th>
              <th>房屋</th>
              <th>投诉人</th>
              <th>投诉人电话</th>
              <th>投诉状态</th>
              <th>处理人</th>
              <th>处理人电话</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in phoneComplaintData" :key="index">
              <td>
                <n-ellipsis style="max-width: 100px">
                  {{ item.complaintsNo }}
                </n-ellipsis>
              </td>
              <td>
                {{ typeOption[item.type].label }}
              </td>
              <td>
                <n-ellipsis style="max-width: 100px">
                  {{ item.buildingNo + "栋" + item.housesNo + "室" }}
                </n-ellipsis>
              </td>
              <td>
                {{ item.complainantsName }}
              </td>
              <td>
                <n-ellipsis style="max-width: 100px">
                  {{ item.phone }}
                </n-ellipsis>
              </td>
              <td>{{ statusOption[item.status].label }}</td>
              <td>{{ item.handler != null ? item.handler.name : '' }}</td>
              <td>
                <n-ellipsis style="max-width: 100px">
                  {{ item.handler != null ? item.handler.phone : '' }}
                </n-ellipsis>
              </td>
              <td>
                {{ item.phoneComplaintHandled != null ? item.phoneComplaintHandled.handleTime : '' }}
              </td>
              <td>
                <n-button-group size="large">
                  <n-button @click="openModal('info', item)" size="small">详情</n-button>
                  <n-button @click="openModal('update', item)" size="small">修改</n-button>
                  <n-button @click="deletePhoneComplaint(item.id)" type="error" size="small" strong secondary>删除</n-button>
                </n-button-group>
              </td>
            </tr>
          </tbody>
        </n-table>

        <div v-if="pages > 1" style="display: flex;justify-content: center;align-items: center;margin-top: 24px;">
          <n-pagination @update:page="pageChange" :page-count="pages" />
        </div>

      </n-card>
    </n-spin>

    <!-- 投诉模态框 -->
    <HousingOption :title="phoneComplaintModalType === 'add' ? '添加投诉' :
  phoneComplaintModalType === 'update' ? '修改投诉' :
    phoneComplaintModalType === 'info' ? '查看投诉信息' : '状态未知'" :housing-disabled="housingDisabled"
      :housing-display="housingDisplay" :default-data="housingDefaultData" req-url="/getHouses/"
      :show="phoneComplaintOptionShow" :data="housingInfo">
      <template #content>
        <n-form style="margin-top: 10px" ref="phoneComplaintFormRef" label-placement="top" :label-width="120"
          size="medium" :model="phoneComplaintFormValue" :rules="phoneComplaintRules">
          <n-grid v-if="housingInfo.data != null" cols="1 600:2" x-gap="10">
            <n-grid-item>
              <n-form-item label="投诉人姓名" path="complainantsName">
                <n-input :disabled="housingDisabled" v-model:value="phoneComplaintFormValue.complainantsName"
                  placeholder="请输入投诉人姓名" />
              </n-form-item>
              <n-form-item label="投诉人电话" path="complainantsPhone">
                <n-input :disabled="housingDisabled" v-model:value="phoneComplaintFormValue.complainantsPhone"
                  placeholder="请输入投诉人电话" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item>
              <n-form-item label="投诉类型" path="type">
                <n-select :disabled="housingDisabled" v-model:value="phoneComplaintFormValue.type" clearable
                  placeholder="请选择投诉类型" :options="typeOption" />
              </n-form-item>
            </n-grid-item>
            <n-grid-item span="2">
              <n-form-item label="投诉内容" path="conEnt">
                <n-input :disabled="housingDisabled" v-model:value="phoneComplaintFormValue.conEnt" type="textarea"
                  placeholder="请输入投诉人电话" />
              </n-form-item>
            </n-grid-item>
          </n-grid>
        </n-form>
      </template>
      <template #footer>
        <n-space justify="end">
          <n-button @click="phoneComplaintOptionShow = false">取消</n-button>
          <n-button v-if="!(phoneComplaintModalType === 'info')" :loading="phoneComplaintModalLoading"
            @click="phoneComplaintSubimt" type="primary" attr-type="button">提交</n-button>
        </n-space>
      </template>
    </HousingOption>

  </div>
</template>

<script setup>
// 引入 vue
import { ref, reactive, inject } from 'vue'
// 引入 naive-ui 组件
import {
  NCard, NSpace, NInput, NButton, NTable,
  NIcon, NPagination, NButtonGroup,
  NEllipsis, NSelect, NDatePicker, useMessage,
  NSpin, NForm, NFormItem, NGridItem, NGrid, useDialog
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

// 引入 HousingOption
import HousingOption from '../../components/HousingOption.vue'

import axios from 'axios'
import { mergeObject, createId, formatDate } from '../../util/BaseUtil'
import QueryString from 'qs'

// 读取全局变量
const global = inject('global')
// 获取消息对象
const message = useMessage()
const dialog = useDialog()

// #region 查询条件
const findComplaints = ref({
  complaintsNo: null,
  status: null,
  type: null,
})

// 类型数组
const typeOption = ['投诉', '建议', '咨询'].map((k, v) => ({
  label: k,
  value: v,
}))

// 状态数组
const statusOption = ['未处理', '已处理'].map((k, v) => ({
  label: k,
  value: v,
}))

/**
 * 查询数据
 */
const findData = () => {
  pageChange(1)
}

/**
 * 清空查询条件数据
 */
const resetData = () => {
  findComplaints.value = {
    complaintsNo: null,
    status: null,
    type: null,
  }
}
// #endregion

// #region 查询投诉信息
const phoneComplaintData = ref([]) // 电话头数数据
const pageNo = ref(1) // 当前页码
const pages = ref(1) // 总页数
const phoneComplaintLoading = ref(false) // 电话头数加载
const housingDefaultData = reactive({
  building: null,
  housing: null,
})
/**
 * 查询电话投诉信息
 */
function findPhoneComplaint(more) {
  phoneComplaintLoading.value = true
  const params = {
    page: 1,
    size: global.pageSize
  }
  mergeObject(params, more)
  axios({
    method: 'get',
    url: global.api + '/getAllPhoneComplaints',
    params
  }).then(res => {
    // 设置数据
    phoneComplaintData.value = res.data.list
    // 设置当前页码
    pageNo.value = res.data.pageNum
    // 设置总页数
    pages.value = res.data.pages
  }).catch(err => {
    message.error('电话投诉信息加载出现异常！' + err)
  }).finally(() => {
    phoneComplaintLoading.value = false
  })
}

findPhoneComplaint() // 加载列表

/**
 * 页码发生变化时事件
 */
const pageChange = (page) => {
  // 切换页面相关代码
  findPhoneComplaint({
    page,
    complaintsNo: findComplaints.value.complaintsNo,
    status: findComplaints.value.status,
    type: findComplaints.value.type
  })
}

// #endregion

// #region 投诉模态框
const phoneComplaintOptionShow = ref(false) // 显示投诉模态框
const phoneComplaintFormRef = ref(null); // form 表单引用
const phoneComplaintModalType = ref(false) // 模态框类型
const housingInfo = ref({ data: null }) // 房屋信息
const phoneComplaintModalLoading = ref(false) // 提交加载中

const selectPhoneComplainItem = ref(null); // 当前选中的投诉信息

const housingDisplay = ref(true) // 显示房屋选择
const housingDisabled = ref(false) // 禁用房屋选择

// form 表单数据

/** 表达校验信息 */
const phoneComplaintRules = ref({
  type: {
    required: true,
    type: 'number',
    message: "请选择头投诉类型",
    trigger: "blur"
  },
  complainantsName: {
    required: true,
    message: "请输入投诉人姓名",
    trigger: "blur"
  },
  complainantsPhone: {
    required: true,
    message: "请输入投诉人电话",
    trigger: "blur"
  },
  conEnt: {
    required: true,
    message: "请输入投诉内容",
    trigger: "blur"
  }
})
/** 表单数据 */
const phoneComplaintFormValue = ref({
  type: null,
  complainantsPhone: null,
  complainantsName: null,
  conEnt: null
})

/**
 * 提交投诉信息
 */
const phoneComplaintSubimt = (e) => {
  e.preventDefault();
  phoneComplaintFormRef.value?.validate((errors) => {
    if (!errors) {
      // 校验通过
      if (phoneComplaintModalType.value === 'add') { // 添加
        addPhoneComplaint()
      } else if (phoneComplaintModalType.value === 'update') { // 修改
        updatePhoneComplaint()
      }
    } else {
      // 校验不通过
    }
  });
}

/**
 * 添加投诉信息
 */
const addPhoneComplaint = () => {
  if (housingInfo.value.data == null) {
    message.warning('请选择房屋信息！')
  } else {
    phoneComplaintModalLoading.value = true
    const data = {
      buildingNo: housingInfo.value.data.building.buildingNo,
      complaintsNo: createId(),
      createTime: formatDate(new Date()),
      housesNo: housingInfo.value.data.housesNo,
      unitNo: housingInfo.value.data.unit.unitNo,
      status: 0
    }
    mergeObject(phoneComplaintFormValue.value, data)
    axios({
      method: 'post',
      url: global.api + '/addPhoneComplaints',
      data: QueryString.stringify(phoneComplaintFormValue.value)
    }).then(res => {
      if (res.data.success) {
        message.success('提交投诉成功！')
        pageChange(pageNo.value) // 刷新当前数据
      } else {
        message.warning('提交投诉失败！')
      }
    }).catch(err => {
      message.error('提交投诉时出现异常！' + err)
    }).finally(() => {
      phoneComplaintModalLoading.value = false
      phoneComplaintOptionShow.value = false // 关闭模态框
    })
  }
}

/**
 * 修改投诉信息
 */
const updatePhoneComplaint = () => {
  if (housingInfo.value.data == null) {
    message.warning('请选择房屋信息！')
  } else {
    phoneComplaintModalLoading.value = true
    const data = {
      id: selectPhoneComplainItem.value.id,
      buildingNo: housingInfo.value.data.building.id,
      complaintsNo: selectPhoneComplainItem.value.complaintsNo,
      createTime: selectPhoneComplainItem.value.createTime,
      housesNo: housingInfo.value.data.housesNo,
      unitNo: housingInfo.value.data.unit.unitNo,
      status: selectPhoneComplainItem.value.status
    }
    mergeObject(phoneComplaintFormValue.value, data)
    axios({
      method: 'put',
      url: global.api + '/updatePhoneComplaints',
      data: QueryString.stringify(phoneComplaintFormValue.value)
    }).then(res => {
      if (res.data.success) {
        message.success('修改投诉成功！')
        pageChange(pageNo.value) // 刷新当前数据
      } else {
        message.warning('修改投诉失败！')
      }
    }).catch(err => {
      message.error('修改投诉时出现异常！' + err)
    }).finally(() => {
      phoneComplaintModalLoading.value = false
      phoneComplaintOptionShow.value = false // 关闭模态框
    })
  }
}

// 打开模态框
const openModal = (status, item) => {
  // 清空模态框数据
  phoneComplaintFormValue.value = {
    type: null,
    complainantsPhone: null,
    complainantsName: null,
    conEnt: null
  }

  // 模态框模式
  if (status === 'add') {
    housingDisabled.value = false
    housingDefaultData.building = null
    housingDefaultData.housing = null
    housingDisplay.value = true
  } else if (status === 'update' || status === 'info') {
    housingDisabled.value = false
    selectPhoneComplainItem.value = item
    // 填充房屋数据
    housingDefaultData.building = item.buildingNo
    housingDefaultData.housing = item.housesNo
    // 填充投诉信息
    phoneComplaintFormValue.value = {
      type: item.type,
      complainantsPhone: item.complainantsPhone,
      complainantsName: item.complainantsName,
      conEnt: item.conEnt
    }

    if (status === 'info') {
      housingDisplay.value = true
      housingDisabled.value = true
    }

  }

  phoneComplaintOptionShow.value = true
  phoneComplaintModalType.value = status
}

/**
 * 删除投诉信息
 */
const deletePhoneComplaint = (id, name) => {

  dialog.warning({
    title: "请确认您的操作!",
    content: "确认是否删除改投诉信息!",
    positiveText: "确认删除",
    negativeText: "取消",
    onPositiveClick: () => {
      let delLoading = message.loading("正在删除")
      axios({
        method: 'delete',
        url: global.api + '/deletePhoneComplaints/' + id
      }).then(res => {
        if (res.data.success) {
          message.success("删除成功！")
          pageChange(pageNo.value) // 刷新当前数据
        } else {
          message.warning("删除失败！")
        }
      }).catch(err => {
        message.error("删除出现异常！" + err)
      }).finally(() => {
        delLoading.destroy();
        delLoading = null;
      })
    }
  })
}

// #endregion

</script>
<script>
export default {
  name: 'PhoneComplaintLayout'
}
</script>

<style scoped>

</style>