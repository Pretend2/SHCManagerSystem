<template>
  <div style="padding: 0 10px">
    <n-card title="查询条件" style="margin-top: 10px">
      <n-space item-style="display: flex; align-item: center;">
        <n-input v-model:value="announcementFindData.announcementId" style="width: 160px" type="text"
          placeholder="请输入公告ID" />
        <n-select v-model:value="announcementFindData.announcementType" placeholder="请选择公告类型" style="width:160px"
          :options="typeOptions" clearable />
        <n-select v-model:value="announcementFindData.announcementStatus" placeholder="请选择状态" style="width:160px"
          :options="statusOptions" clearable />
        <n-input v-model:value="announcementFindData.announcementTitle" style="width:160px" type="text"
          placeholder="请输入公告标题" />
        <n-date-picker style="width: 360px" v-model:value="announcementFindData.dataRange" type="datetimerange"
          clearable />
        <n-button @click="findAnnouncement" type="primary">
          <template #icon>
            <n-icon>
              <search-icon />
            </n-icon>
          </template>
          查询
        </n-button>
      </n-space>
    </n-card>

    <n-spin :show="announcementLoading">
      <n-card title="公告信息" style="margin-top: 10px;padding: 0; margin-bottom: 10px;">
        <template #header-extra>
          <n-space>
            <n-button @click="openAnnoModal('add')" type="primary">
              <template #icon>
                <n-icon>
                  <add-icon />
                </n-icon>
              </template>
              发布公告
            </n-button>
          </n-space>
        </template>
        <n-table style="margin-top: 10px" striped>
          <thead>
            <tr>
              <th>公告ID</th>
              <th>标题</th>
              <th>公告类型</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody v-if="announcementData.length <= 0">
            <tr>
              <td colspan="7" style="text-align:center;">暂无数据</td>
            </tr>
          </tbody>
          <tbody>
            <tr v-for="(item, index) in announcementData" :key="index">
              <td>
                <n-ellipsis style="max-width: 160px">
                  {{ item.annNo }}
                </n-ellipsis>
              </td>
              <td>
                <n-ellipsis style="max-width: 160px">
                  {{ item.title }}
                </n-ellipsis>
              </td>
              <td>{{ typeOptions[item.type].label }}</td>
              <td>
                {{ item.startTime }}
              </td>
              <td>
                {{ item.endTime }}
              </td>
              <td>{{ statusOptions[item.status].label }}</td>
              <td>
                <n-button-group size="large">
                  <n-button @click="openAnnoModal('info', item)" size="small">详情</n-button>
                  <n-button @click="openAnnoModal('update', item)" size="small">修改</n-button>
                  <n-button @click="deleteAnno(item.id, item.title)" type="error" size="small" strong secondary>删除
                  </n-button>
                </n-button-group>
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-card>

      <div v-if="pages > 1"
        style="display: flex;justify-content: center;align-items: center;margin-top: 10px;margin-bottom: 10px;">
        <n-pagination @update:page="annoPageChange" :page-count="pages" />
      </div>
    </n-spin>

    <!-- 发布公告模态框 -->
    <n-modal :auto-focus="false" v-model:show="showAnnoModal" class="custom-card" preset="card" style="width: 600px"
      :title="(annoModelStatus === 'update' ? '修改' : annoModelStatus === 'add' ? '添加' : '') + '公告' + (annoModelStatus === 'info' ? '详情' : '')" transform-origin="center" size="huge" :bordered="false"
      :segmented="{ content: 'soft', footer: 'soft' }">
      <n-form ref="annoFormRef" label-placement="left" :label-width="120" :model="annoValue" :rules="annoRules"
        size="medium">
        <n-grid cols="1">
          <n-grid-item>
            <n-form-item v-if="info" label="公告ID">
              <n-input :disabled="true" v-model:value="annoValue.annoNo" placeholder="公告ID" />
            </n-form-item>
            <n-form-item label="公告标题" path="title">
              <n-input :disabled="info" v-model:value="annoValue.title" placeholder="请输入公告标题" />
            </n-form-item>
            <n-form-item label="公告类型" path="type">
              <n-select :disabled="info" v-model:value="annoValue.type" placeholder="请选择公告类型" :options="typeOptions"
                clearable />
            </n-form-item>
            <n-form-item label="公告时间" path="annoDateTime">
              <n-date-picker :disabled="info" v-model:value="annoValue.annoDateTime" type="datetimerange" clearable />
            </n-form-item>
            <n-form-item label="公告内容" path="conEnt">
              <n-input :disabled="info" v-model:value="annoValue.conEnt" type="textarea" placeholder="请输入公告内容" />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button :type="info ? 'primary' : ''" @click="showAnnoModal = false">{{info ? '确定' : '取消'}}</n-button>
          <n-button v-if="!info" :loading="annoSubmitLoading" @click="annoSubmit" type="primary" attr-type="button">提交
          </n-button>
        </n-space>
      </template>
    </n-modal>

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

// #region === 公告查询条件 ===
// 公告类型
const typeOptions = ['紧急通知', '普通通知', '疫情通知'].map((k, v) => ({
  label: k,
  value: v
}))
// 状态
const statusOptions = ['待通知', '通知完成'].map((k, v) => ({
  label: k,
  value: v
}))

// 查询数据
const announcementFindData = ref({
  dataRange: null, // 时间
  announcementId: null, // 公告id
  announcementType: null, // 公告类型
  announcementStatus: null, // 公告状态
  announcementTitle: null // 公告标题
})

/**
 * 查询公告信息
 */
function findAnnouncement() {
  const p = {
    annNo: announcementFindData.value.announcementId,
    status: announcementFindData.value.announcementStatus,
    type: announcementFindData.value.announcementType,
    title: announcementFindData.value.announcementTitle
  }
  if (announcementFindData.value.dataRange != null) {
    p.startTime = formatDate(new Date(announcementFindData.value.dataRange[0]))
    p.endTime = formatDate(new Date(announcementFindData.value.dataRange[1]))
  }
  findAnnouncementData(p)
}

// #endregion

// #region === 查询公告信息 ===
// 公告数据
const announcementData = ref([])
// 公告加载
const announcementLoading = ref(false)
// 当前页码
const pageNo = ref(1)
// 总页数
const pages = ref(1)
/**
 * 查询公告信息
 */
function findAnnouncementData(more) {
  announcementLoading.value = true
  const params = {
    page: 1,
    size: global.pageSize
  }
  mergeObject(params, more)
  axios({
    url: global.api + '/getAllAppAnnouncement',
    method: 'get',
    params
  }).then(res => {
    // 设置数据
    announcementData.value = res.data.list
    // 设置当前页码
    pageNo.value = res.data.pageNum
    // 设置总页数
    pages.value = res.data.pages
  }).catch(err => {
    message.error(err)
  }).finally(() => {
    announcementLoading.value = false
  })
}
// 加载信息
findAnnouncementData()

/**
 * 刷新公告信息
 */
function refreshAnnoData() {
  const p = {
    page: pageNo.value,
    annNo: announcementFindData.value.announcementId,
    status: announcementFindData.value.announcementStatus,
    type: announcementFindData.value.announcementType,
    title: announcementFindData.value.announcementTitle
  }
  if (announcementFindData.value.dataRange != null) {
    p.startTime = formatDate(new Date(announcementFindData.value.dataRange[0]))
    p.endTime = formatDate(new Date(announcementFindData.value.dataRange[1]))
  }
  findAnnouncementData(p)
}

/**
 * 切换页面
 */
function pageAnnoData(page) {
  const p = {
    page,
    annNo: announcementFindData.value.announcementId,
    status: announcementFindData.value.announcementStatus,
    type: announcementFindData.value.announcementType,
    title: announcementFindData.value.announcementTitle
  }
  if (announcementFindData.value.dataRange != null) {
    p.startTime = formatDate(new Date(announcementFindData.value.dataRange[0]))
    p.endTime = formatDate(new Date(announcementFindData.value.dataRange[1]))
  }
  findAnnouncementData(p)
}

/**
 * 公告信息页码发生变化时事件
 */
const annoPageChange = (page) => {
  pageAnnoData(page)
}

// #endregion

// #region === 公告信息模态框 ===
// 公告 模态框
const annoModelStatus = ref(null); // add 添加 update 修改 show 查看
const annoFormRef = ref(null);
const showAnnoModal = ref(false) // 模态框是否打开
const info = ref(false) // 模态框查看状态

// 提交按钮加载
const annoSubmitLoading = ref(false);

// 表单校验
const annoRules = {
  title: {
    required: true,
    message: "请输入公告标题",
    trigger: "blur"
  },
  type: {
    required: true,
    type: "number",
    message: "请选者公告类型",
    trigger: "blur"
  },
  annoDateTime: {
    required: true,
    type: "array",
    message: "请选择公告时间",
    trigger: "blur"
  },
  conEnt: {
    required: true,
    message: "请输入公告内容",
    trigger: "blur"
  },
}

// 表单输入数据
const annoValue = ref({
  title: null, // 公告标题
  type: null, // 公告类型
  annoDateTime: null, // 公告时间
  conEnt: null, // 公告内容
})

/**
 * 打开模态框
 */
const openAnnoModal = (status, anno) => {
  // 清空模态框数据
  annoValue.value = {
    title: null, // 公告标题
    type: null, // 公告类型
    annoDateTime: null, // 公告时间
    conEnt: null, // 公告内容
  }
  if (status === 'update' || status === 'info') { // 判断是修改
    info.value = (status === 'info')
    annoId = anno.id // 设置当前选中的公告id
    annoNo = anno.annNo // 设置当前选中的公告编号
    // 设置参数
    annoValue.value = {
      annoNo: anno.annNo,
      title: anno.title, // 公告标题
      type: anno.type, // 公告类型
      annoDateTime: [new Date(anno.startTime).getTime(), new Date(anno.endTime).getTime()], // 公告时间
      conEnt: anno.conEnt, // 公告内容
    }
  } else {
    info.value = false
  }
  // 打开模态框
  showAnnoModal.value = true
  annoModelStatus.value = status
}

/**
 * 表单提交事件
 */
const annoSubmit = (e) => {
  e.preventDefault();
  annoFormRef.value?.validate((errors) => {
    if (!errors) {
      // 校验通过
      if (annoModelStatus.value === 'add') { // 添加
        addAnno()
      } else if (annoModelStatus.value === 'update') { // 修改
        updateAnno()
      }
    } else {
      // 校验不通过
    }
  });
}

/**
 * 添加公告
 */
const addAnno = () => {
  annoSubmitLoading.value = true
  annoValue.value.communityNo = '' // 小区编号
  annoValue.value.annNo = createId() // 创建公告编号
  annoValue.value.startTime = formatDate(new Date(annoValue.value.annoDateTime[0])) // 发布时间
  annoValue.value.endTime = formatDate(new Date(annoValue.value.annoDateTime[1])) // 发布时间
  annoValue.value.status = 0 // 公告状态

  axios({
    method: 'post',
    url: global.api + '/addAppAnnouncement',
    data: QueryString.stringify(annoValue.value)
  }).then(res => {
    if (res.data.success) {
      showAnnoModal.value = false
      message.success('公告添加成功！')
      refreshAnnoData();
    } else {
      message.warning('公告添加失败！')
    }
  }).catch(err => {
    message.error('公告添加出现异常！' + err)
  }).finally(() => {
    annoSubmitLoading.value = false
  })
}

// 当前选中的公告 id
let annoId = null
// 当前选中的公告编号
let annoNo = null

/**
 * 修改公告信息
 */
const updateAnno = () => {

  annoSubmitLoading.value = true
  annoValue.value.id = annoId // 公告id
  annoValue.value.communityNo = '' // 小区编号
  annoValue.value.annNo = annoNo // 创建公告编号
  annoValue.value.startTime = formatDate(new Date(annoValue.value.annoDateTime[0])) // 发布时间
  annoValue.value.endTime = formatDate(new Date(annoValue.value.annoDateTime[1])) // 发布时间
  annoValue.value.status = 0 // 公告状态

  axios({
    method: 'put',
    url: global.api + '/updateAppAnnouncement', 
    data: QueryString.stringify(annoValue.value)
  }).then(res => {
    if (res.data.success) {
      showAnnoModal.value = false
      message.success('公告修改成功！')
    } else {
      message.warning('公告修改失败！')
    }
    refreshAnnoData()
  }).catch(err => {
    message.error('修改公告信息失败！' + err);
  }).finally(() => {
    annoSubmitLoading.value = false
  })
}

/**
 * 删除公告信息
 */
const deleteAnno = (id, name) => {

  dialog.warning({
    title: "请确认您的操作!",
    content: "确认是否删除公告“" + name + "”!",
    positiveText: "确认删除",
    negativeText: "取消",
    onPositiveClick: () => {
      let delLoading = message.loading("正在删除")
      axios({
        method: 'delete',
        url: global.api + '/deleteAppAnnouncement/' + id
      }).then(res => {
        if (res.data.success) {
          message.success("删除成功！")
          refreshAnnoData()
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
  name: 'AnnouceLayout'
}
</script>

<style scoped>

</style>