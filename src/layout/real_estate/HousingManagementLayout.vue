<template>

  <div>

    <div class="button-box">
      <!-- 楼栋 -->
      <n-button @click="showBuildingModal = true;buildingStatus = false;">
        <template #icon>
          <n-icon>
            <add-icon />
          </n-icon>
        </template>
        添加楼栋
      </n-button>
      <n-button @click="showBuildingModal = true;buildingStatus = true;">
        <template #icon>
          <n-icon>
            <edit-icon />
          </n-icon>
        </template>
        修改楼栋
      </n-button>
      <n-button @click="deleteBuilding">
        <template #icon>
          <n-icon>
            <delete-icon />
          </n-icon>
        </template>
        删除楼栋
      </n-button>
      <!-- 单元 -->
      <n-button @click="showApartmentModal = true;apartmentStatus = false;">
        <template #icon>
          <n-icon>
            <add-icon />
          </n-icon>
        </template>
        添加单元
      </n-button>
      <n-button @click="showApartmentModal = true;apartmentStatus = true;">
        <template #icon>
          <n-icon>
            <edit-icon />
          </n-icon>
        </template>
        修改单元
      </n-button>
      <n-button @click="deleteApartment">
        <template #icon>
          <n-icon>
            <delete-icon />
          </n-icon>
        </template>
        删除单元
      </n-button>
      <!-- 添加房屋 -->
      <n-button @click="openHousingModel(false)" type="primary">
        <template #icon>
          <n-icon>
            <add-icon />
          </n-icon>
        </template>
        添加房屋
      </n-button>
      <!-- 房产导入 -->
      <n-button @click="openImportProperty" type="primary">
        <template #icon>
          <n-icon>
            <add-icon />
          </n-icon>
        </template>
        房产导入
      </n-button>
    </div>

    <div class="main">
      <div class="left">
        <n-card class="left-card">
          <n-spin :show="leftSpin">
            <n-tree :node-props="nodeProps" block-line :data="buildingData" default-expand-all virtual-scroll />
          </n-spin>
        </n-card>
      </div>

      <div class="right">

        <n-spin :show="mainSpin">

          <n-card title="查询条件">
            <n-space item-style="display: flex; align-item: center;">
              <n-input v-model:value="housingNo" style="width:256px" type="text" placeholder="请填写房屋编号" />
              <n-select v-model:value="housingStatus" placeholder="请选择状态" style="width:160px"
                :options="statusOptions" />
              <n-select v-model:value="housingType" :loading="housingTypeLoading" placeholder="请选择房屋类型"
                style="width:160px" :options="housingOptions" />
              <n-button @click="findClick" type="primary">
                <template #icon>
                  <n-icon>
                    <search-icon />
                  </n-icon>
                </template>
                查询
              </n-button>
              <n-button @click="resetClick">
                <template #icon>
                  <n-icon>
                    <arrow-clockwise-icon />
                  </n-icon>
                </template>
                重置
              </n-button>
            </n-space>
          </n-card>

          <n-table style="margin-top: 10px" striped>
            <thead>
              <tr>
                <th>房屋</th>
                <th>楼层</th>
                <th>业主</th>
                <th>电话</th>
                <th>类型</th>
                <th>建筑面积</th>
                <th>室内面积</th>
                <th>入住时间</th>
                <th>房屋状态</th>
                <th>精装修</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody v-if="houseDataDisplay">
              <tr>
                <td colspan="11" style="text-align:center;">暂无数据</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr v-for="(item,index) in houseData.list" :key="index">
                <td>{{item.building != null ? item.building.buildingNo : ''}}-{{item.unit != null ? item.unit.unitNo :
                ''}}-{{item.housesNo}}</td>
                <td>{{item.floor}}层</td>
                <td>{{item.owner != null ? item.owner.name : ''}}</td>
                <td>{{item.owner != null ? item.owner.phone : ''}}</td>
                <td>{{item.housesType != null ? item.housesType.name : ''}}</td>
                <td>{{item.building != null ? item.building.area : ''}} 平方米</td>
                <td>{{item.area}} 平方米</td>
                <td>{{item.checkTime}}</td>
                <td>{{item.status === 0 ? '未入住' : '已入住'}}</td>
                <td>{{item.exquisite === 0 ? '否' : '是'}}</td>
                <td>
                  <n-button-group size="large">
                    <n-button @click="openHousingModel(true,item)" size="small">修改</n-button>
                    <n-button @click="deleteHousing(item)" type="error" size="small" strong secondary>删除</n-button>
                  </n-button-group>
                </td>
              </tr>
            </tbody>
          </n-table>

          <div v-if="!(pages <= 1)"
            style="display: flex;justify-content: center;align-items: center;margin-top: 10px;margin-bottom: 10px;">
            <n-pagination @update:page="pageNoUpdate" v-model:page="pageNo" :page-count="pages" />
          </div>

        </n-spin>

      </div>
    </div>

    <!-- 楼栋模态框 -->
    <n-modal :auto-focus="false" v-model:show="showBuildingModal" class="custom-card" preset="card" style="width: 600px"
      :title="(buildingStatus ? '修改' : '添加') + '楼栋'" transform-origin="center" size="huge" :bordered="false"
      :segmented="{content: 'soft',footer: 'soft'}">
      <n-form ref="buildingFormRef" label-placement="left" :label-width="80" :model="buildingValue"
        :rules="buildingRules" size="medium">
        <n-grid cols="1">
          <n-grid-item>
            <n-form-item label="楼栋编号" path="id">
              <n-input v-model:value="buildingValue.id" placeholder="输入楼栋编号" />
            </n-form-item>
            <n-form-item label="楼栋名称" path="name">
              <n-input v-model:value="buildingValue.name" placeholder="输入楼栋名称" />
            </n-form-item>
            <n-form-item label="建筑面积" path="area">
              <n-input v-model:value="buildingValue.area" placeholder="输入建筑面积" />
            </n-form-item>
            <n-form-item label="备注" path="remark">
              <n-input type="textarea" v-model:value="buildingValue.remark" placeholder="输入备注" />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showBuildingModal = false">取消</n-button>
          <n-button :loading="submitLoading" type="primary" attr-type="button" @click="buildingSubmit">保存</n-button>
        </n-space>
      </template>
    </n-modal>

    <!-- 单元模态框 -->
    <n-modal :auto-focus="false" v-model:show="showApartmentModal" class="custom-card" preset="card"
      style="width: 600px" :title="(apartmentStatus ? '修改' : '添加') + '单元'" transform-origin="center" size="huge"
      :bordered="false" :segmented="{content: 'soft',footer: 'soft'}">
      <n-form ref="apartmentFormRef" label-placement="left" :label-width="80" :model="apartmentValue"
        :rules="apartmentRules" size="medium">
        <n-grid cols="1">
          <n-grid-item>
            <n-form-item label="单元编号" path="id">
              <n-input v-model:value="apartmentValue.id" placeholder="输入单元编号" />
            </n-form-item>
            <n-form-item label="总层数" path="totalNumberOfLayers">
              <n-input-number style="width:100%" v-model:value="apartmentValue.totalNumberOfLayers" clearable />
            </n-form-item>
            <n-form-item label="电梯">
              <n-switch v-model:value="apartmentValue.elevator">
                <template #checked>
                  有
                </template>
                <template #unchecked>
                  无
                </template>
              </n-switch>
            </n-form-item>
            <n-form-item label="备注" path="remark">
              <n-input type="textarea" v-model:value="apartmentValue.remark" placeholder="输入备注" />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showApartmentModal = false">取消</n-button>
          <n-button :loading="apartmentSubmitLoading" type="primary" attr-type="button" @click="apartmentSubmit">保存
          </n-button>
        </n-space>
      </template>
    </n-modal>

    <!-- 房屋模态框 -->
    <n-modal :auto-focus="false" v-model:show="showHousingModal" class="custom-card" preset="card" style="width: 600px"
      :title="(housingModelStatus ? '修改' : '添加') + '房屋'" transform-origin="center" size="huge" :bordered="false"
      :segmented="{content: 'soft',footer: 'soft'}">
      <n-form ref="housingFormRef" label-placement="left" :label-width="120" :model="housingValue" :rules="housingRules"
        size="medium">
        <n-grid cols="1">
          <n-grid-item>
            <n-form-item label="房屋编号" path="housesNo">
              <n-input v-model:value="housingValue.housesNo" placeholder="输入房屋编号" />
            </n-form-item>
            <n-form-item label="房屋楼层" path="floor">
              <n-input-number style="width:100%" v-model:value="housingValue.floor" placeholder="输入房屋楼层" clearable />
            </n-form-item>
            <n-form-item v-show="housingModelStatus" label="房屋单元" path="unitNo">
              <n-select :loading="unitOptionLoading" v-model:value="housingValue.unitNo" placeholder="请选择房屋单元"
                :options="unitOption" />
            </n-form-item>
            <n-form-item label="房间户型" path="propertyType">
              <n-select v-model:value="housingValue.room" placeholder="请选择户型" :options="houseType[0]" />
              <div style="width: 10px"></div>
              <n-select v-model:value="housingValue.hall" placeholder="请选择户型" :options="houseType[1]" />
            </n-form-item>
            <n-form-item label="房屋类型" path="housesType">
              <n-select v-model:value="housingValue.housesType" :loading="housingTypeLoading" placeholder="请选择房屋类型"
                :options="housingModelOptions" />
            </n-form-item>
            <n-form-item label="室内面积(平方)" path="area">
              <n-input-number style="width:100%" v-model:value="housingValue.area" placeholder="请输入室内面积" clearable />
            </n-form-item>
            <n-form-item label="精装修">
              <n-switch v-model:value="housingValue.exquisite">
                <template #checked>
                  是
                </template>
                <template #unchecked>
                  否
                </template>
              </n-switch>
            </n-form-item>
            <n-form-item label="备注" path="">
              <n-input v-model:value="housingValue.remark" type="textarea" placeholder="输入备注" />
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showHousingModal = false">取消</n-button>
          <n-button :loading="housingSubmitLoading" type="primary" @click="housingSubmit" attr-type="button">保存
          </n-button>
        </n-space>
      </template>
    </n-modal>

    <!-- 导入房产 -->
    <n-modal :auto-focus="false" v-model:show="showImportPropertyModal" class="custom-card" preset="card"
      style="width: 600px" title="房产导入" transform-origin="center" size="huge" :bordered="false"
      :segmented="{content: 'soft',footer: 'soft'}">
      <n-form ref="showImportPropertyFormRef" label-placement="left" :label-width="120" size="medium">
        <n-grid cols="1">
          <n-grid-item>
            <n-form-item label="选择文件：">
              <n-upload :show-file-list="true" accept=".xls,.xlsx" :action="global.api + '/housesExcelImport'" @finish="importPropertySubmit">
                <n-button>选择文件</n-button>
              </n-upload>
            </n-form-item>
            <n-form-item label="下载模板：">
              请先下载 <a :href="global.api + '/housesExcelExport'">房产模板</a> 准备数据后，上传导入
            </n-form-item>
          </n-grid-item>
        </n-grid>
      </n-form>
      <template #footer>
        <n-space justify="end">
          <n-button @click="showImportPropertyModal = false">关闭</n-button>
        </n-space>
      </template>
    </n-modal>


  </div>

</template>

<script setup>
// 引入 vue
import { ref, reactive, computed, inject } from 'vue'
// 引入 naive-ui 组件
import {
  NButton, NIcon, NGrid, NGridItem, NTree, NCard,
  NInput, NSelect, NSpace, NTable, NButtonGroup,
  NPagination, NModal, NForm, NFormItem, NInputNumber,
  NSwitch, useMessage, NSpin, useLoadingBar, NResult,
  NUpload
} from 'naive-ui'
// 引入 axios
import axios from 'axios';
// 引入图标 
import {
  Add16Regular as AddIcon,
  Edit16Regular as EditIcon,
  Delete16Regular as DeleteIcon,
  Search16Regular as SearchIcon,
  ArrowClockwise16Regular as ArrowClockwiseIcon
} from '@vicons/fluent'

// 引入楼栋 Hook
import buildingHook from '../../hook/real_estate/housingmanagement/buildingHook'

// 引入单元 Hook
import apartmentHook from '../../hook/real_estate/housingmanagement/apartmentHook'

// 引入房屋 Hook
import housingHook from '../../hook/real_estate/housingmanagement/housingHook'

// 引入导入房屋 Hook
import importPropertyHook from '../../hook/real_estate/housingmanagement/importPropertyHook'

// 接收全局变量
const global = inject('global');

// 获取消息对象
const message = useMessage();

// 房屋列表 Spin
const mainSpin = ref(false);

// 楼栋
const {
  buildingStatus, // 楼栋模态框状态
  buildingFormRef, // 楼栋模态框 Form 引用
  showBuildingModal, // 楼栋模态框是否显示
  buildingRules, // 楼栋模态框 Form 校验信息
  buildingValue, // 楼栋模态框 Form 参数
  buildingData, // 楼栋信息
  leftSpin, // 楼栋信息 Spin
  buildingNode, // 单前选中的楼栋节点
  unitNode, // 单前选中的单元节点
  submitLoading, // 提交按钮加载
  loadBuilding, //加载楼栋信息
  buildingSubmit, // 楼栋 Form 提交事件
  nodeProps, // 楼栋信息节点选中事件
  deleteBuilding, // 删除楼栋事件
} = buildingHook(loadList)

// 单元
const {
  apartmentStatus, // 单元模态框状态
  apartmentFormRef, // 单元模态框 Form 引用
  showApartmentModal, // 显示单元模态框
  apartmentRules, // 单元模态框 Form 校验数据
  apartmentValue, // 单元模态框 Form 参数
  apartmentSubmitLoading, // 单元提交加载
  apartmentSubmit, // 单元模态框 Form 提交事件
  deleteApartment, // 删除单元点击事件
} = apartmentHook(buildingNode, loadBuilding, unitNode)

// 房屋
const {
  housingModelStatus, // 房屋模态框状态
  housingFormRef, // 房屋 Form 引用
  showHousingModal, // 模态框是否打开
  housingSubmitLoading, // 提交按钮加载中
  housingRules, // 房屋 Form 校验信息
  housingValue, // 房屋 Form 参数
  houseType, // 户型
  unitOption, // 单元选项
  unitOptionLoading, // 单元加载
  housingSubmit, // Form 提交
  openHousingModel, // 打开模态框
  deleteHousing, // 删除房屋
} = housingHook(unitNode, refreshList)

// 导入房屋
const {
  showImportPropertyModal, // 模态框打开
  importPropertySubmit, // 表单提交事件
  openImportProperty, // 打开模态框
} = importPropertyHook(refreshList)


// 加载进度条
const loadingBar = useLoadingBar()

// 房屋列表
const houseData = ref([])
const houseDataDisplay = computed(() => {
  return (houseData.value.length === 0 || houseData.value.list.length === 0);
})

// 房屋分页数据
const pageNo = ref(1)
const pages = ref(1)

// 当前页码发生变化时触发
function pageNoUpdate(page) {
  loadList(unitNode.value, page)
}

// 加载房屋列表
function loadList(option, page, more) {
  mainSpin.value = true // 打开加载动画
  // loadingBar.start()
  const params = {
    buildingNo: option.building.id,
    unitNo: option.id,
    page,
    size: global.pageSize
  }
  for (let key in more) {
    if (more[key] != null) {
      params[key] = more[key]
    }
  }

  axios({
    method: 'get',
    url: global.api + '/getAllHouses',
    params
  }).then(res => {
    // 设置数据
    houseData.value = res.data
    // 设置当前页数
    pageNo.value = res.data.pageNum
    // 设置总页数
    pages.value = res.data.pages
    mainSpin.value = false // 取消加载动画
    // loadingBar.finish()
  }).catch(err => {
    // loadingBar.error()
  })
}

const statusOptions = [
  {
    label: "全部",
    value: null,
  },
  {
    label: "未入住",
    value: 0,
  },
  {
    label: "已入住",
    value: 1,
  }
]

const housingTypeLoading = ref(false)
const housingModelOptions = ref([])
const housingOptions = ref([
  {
    label: '全部',
    value: null
  }
])
// 加载房屋类型
housingTypeLoading.value = true;
axios({
  method: 'get',
  url: global.api + '/getHousesTypeList'
}).then(res => {
  for (let type of res.data) {
    housingModelOptions.value.push({
      label: type.name,
      value: type.id
    })
    housingOptions.value.push({
      label: type.name,
      value: type.id
    })
  }
}).catch(err => {
  message.error("房屋类型加载异常！" + err)
}).finally(() => {
  housingTypeLoading.value = false;
})

// 查询
const housingNo = ref('')
const housingStatus = ref(null)
const housingType = ref(null)
// 查询点击事件
const findClick = () => {
  // refreshList()
  if (unitNode.value != null) {
    loadList(unitNode.value, 1, {
      housesNo: housingNo.value,
      status: housingStatus.value,
      housesType: housingType.value
    });
  } else {
    message.warning("请先选择单元！")
  }
}
// 属性当前页数据
function refreshList() {
  if (unitNode.value != null) {
    loadList(unitNode.value, pageNo.value, {
      housesNo: housingNo.value,
      status: housingStatus.value,
      housesType: housingType.value
    });
  } else {
    message.warning("请先选择单元！")
  }
}

// 重置点击事件
const resetClick = () => {
  housingNo.value = ''
  housingStatus.value = null
  housingType.value = null
}



</script>

<script>
export default {
  name: 'HousingManagementLayout'
}
</script>

<style scoped>
.button-box>* {
  margin: 0 10px 10px 0;
}

.button-box {
  margin-top: 10px;
  margin-left: 10px;
}

.main {
  display: flex;
  flex-direction: row;
}

.left {
  width: 200px;
  margin-left: 10px;
}

.right {
  flex: 1;
  margin: 0 10px;
}
</style>


