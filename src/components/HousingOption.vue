<template>
  <n-modal :show="show" transform-origin="center">
    <n-card style="width: 800px" :title="title" :bordered="false" size="huge" role="dialog" aria-modal="true">

      <div class="my-select" v-if="housingDisplay">
        <n-select v-model:value="selectOption.buildingValue" filterable :loading="buildingLoading"
                  style="margin-right: 5px;" @update:value="buildingUpdateValue"
                  :disabled="selectDisabled.buildingDisabled || housingDisabled" :options="buildingOptions" placeholder="请选择楼栋"/>
        <n-select v-model:value="selectOption.housingValue" @update:value="housingUpdateValue" filterable
                  :loading="housingLoading" style="margin-left: 5px" :disabled="selectDisabled.housingDisabled || housingDisabled"
                  :options="housingOptions" placeholder="请选择房屋"/>
      </div>

      <n-grid :y-gap="16" v-if="selectOption.housingValue != null && housingDisplay" style="margin: 16px;"
              cols="1 400:2 600:3">
        <n-grid-item>
          <div class="sub-info">
            房屋ID：{{ housingInfo.id }}
          </div>
        </n-grid-item>
        <n-grid-item>
          <div class="sub-info">
            房屋编号：{{ housingInfo.housesNo }}
          </div>
        </n-grid-item>
        <n-grid-item>
          <div class="sub-info">
            单元：{{ housingInfo.unit.unitNo }} 单元
          </div>
        </n-grid-item>
        <n-grid-item>
          <div class="sub-info">
            楼层： {{ housingInfo.floor }}
          </div>
        </n-grid-item>
        <n-grid-item>
          <div class="sub-info">
            户型：{{ housingInfo.propertyType }}
          </div>
        </n-grid-item>
        <n-grid-item>
          <div class="sub-info">
            建筑面积：{{ housingInfo.area }} 平方米
          </div>
        </n-grid-item>
        <n-grid-item>
          <div class="sub-info">
            备注：{{ housingInfo.remark }}
          </div>
        </n-grid-item>
      </n-grid>

      <slot name="content"></slot>

      <template #footer>
        <slot name="footer"></slot>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup>
// 引入 vue
import {ref, toRefs, inject, reactive, watch, computed} from 'vue'
// 引入 naive-ui 组件
import {
  NModal, NCard, NSpace, NButton, NSelect,
  useMessage, NGridItem, NGrid
} from 'naive-ui'
// 引入 axios
import axios from 'axios';

import QueryString from 'qs'

import {mergeObject} from '../util/BaseUtil'

// 接收全局变量
const global = inject("global")

// 获取 message 对象
const message = useMessage();

// props 参数
const props = defineProps({
  show: { // 接收标题参数
    type: Boolean, // 参数类型为 Boolean 类型
    default: false // 默认值
  },
  data: { // 接收数据参数
    type: Object,
    default: {}
  },
  reqUrl: { // 接收请求地址
    type: String,
    default: '/getHousesByBuildingId/'
  },
  defaultData: {
    type: Object,
    default: {
      building: null,
      housing: null,
    }
  },
  housingDisplay: { // 显示选择栏
    type: Boolean,
    default: true
  },
  housingDisabled: { // 禁用选择栏
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '选择房屋'
  }
})

// 接收响应式数据
const {show, data, reqUrl, defaultData, housingDisplay, housingDisabled, title} = toRefs(props);

watch(show, (newValue, oldValue) => {
  selectOption.buildingValue = null
  selectOption.housingValue = null
  data.value.data = null
  if (newValue && defaultData.value.building != null && defaultData.value.housing != null) {
    loadBuilding((res) => {
      for (let building of res) {
        if (building.data.buildingNo === defaultData.value.building) {
          loadHousing(building.data.id, (res) => {
            for (let housing of res.data) {
              if (housing.housesNo === defaultData.value.housing) {
                selectOption.buildingValue = housing.building.name
                selectOption.housingValue = housing.unit.unitNo + " - " + housing.housesNo
                housingInfo.value = housing
                data.value.data = housing
              }
            }
          })
        }
      }
    })
  }
})

// 加载
const buildingLoading = ref(false) // 楼栋
const housingLoading = ref(false) // 房屋

const selectDisabled = reactive({
  buildingDisabled: computed(() => {
    return housingLoading.value
  }),
  housingDisabled: computed(() => {
    return selectOption.buildingValue == null
  })
})

const selectOption = reactive({
  buildingValue: null,
  housingValue: null,
})

const buildingUpdateValue = (value, option) => {
  loadHousing(option.data.id)
  housingOptions.value = []
  selectOption.housingValue = null;
}

const housingUpdateValue = (value, option) => {
  housingInfo.value = option.data
  data.value.data = option.data
}

// 楼栋数据
const buildingOptions = ref([])
// 房屋数据
const housingOptions = ref([])

const housingInfo = ref({
  id: null,
  housesNo: null,
  unit: {
    unitNo: null,
  },
  floor: null,
  propertyType: null,
  area: null,
  remark: null
})

/**
 * 加载楼栋信息
 */
const loadBuilding = (call) => {
  buildingLoading.value = true
  axios({
    method: 'get',
    url: global.api + '/getAllBuildings'
  }).then(res => {
    buildingOptions.value = []
    for (let building of res.data) {
      const buildingData = {
        label: building.name,
        value: building.id,
        data: building
      }
      buildingOptions.value.push(buildingData)
    }
    if (call != null) {
      call(buildingOptions.value)
    }
  }).catch(err => {
    message.error("楼栋加载失败！" + err)
  }).finally(() => {
    buildingLoading.value = false
  })
}
/**
 * 加载房屋信息
 */
const loadHousing = (id, call) => {
  housingLoading.value = true
  axios({
    method: 'get',
    url: global.api + reqUrl.value + id
  }).then(res => {
    housingOptions.value = []
    for (let housing of res.data) {
      const housingData = {
        label: housing.unit.unitNo + " - " + housing.housesNo,
        value: housing.id,
        data: housing
      }
      housingOptions.value.push(housingData)
    }
    if (call != null) {
      call(res)
    }
  }).catch(err => {
    message.error("房屋加载失败！" + err)
  }).finally(() => {
    housingLoading.value = false
  })
}
// 调用加载楼栋
loadBuilding()

</script>
<script>
export default {
  name: 'HousingOption'
}
</script>

<style scoped>
.my-select {
  display: flex;
  justify-content: center;
}
</style>