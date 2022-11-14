<template>
  <div>
    <n-grid style="padding: 8px;box-sizing: border-box;" cols="1 500:2 800:3" :x-gap="8" :y-gap="8" item-responsive>
      <n-grid-item span="1 500:2">
        <n-card title="小区信息">
          <n-grid cols="4">
            <n-grid-item>
              <div class="my-card">
                <n-icon size="24">
                  <building-multiple-icon />
                </n-icon>
                <div>
                  <p style="font-size: 18px">
                    <n-number-animation :from="0" :to="20" />
                  </p>
                  <p style="font-size: 13px">楼宇</p>
                </div>
              </div>
            </n-grid-item>
            <n-grid-item>
              <div class="my-card">
                <n-icon size="24">
                  <home-icon />
                </n-icon>
                <div>
                  <p style="font-size: 18px">
                    <n-number-animation :from="0" :to="99" />
                  </p>
                  <p style="font-size: 13px">房屋</p>
                </div>
              </div>
            </n-grid-item>
            <n-grid-item>
              <div class="my-card">
                <n-icon size="24">
                  <car-icon />
                </n-icon>
                <div>
                  <p style="font-size: 18px">
                    <n-number-animation :from="0" :to="68" />
                  </p>
                  <p style="font-size: 13px">车位</p>
                </div>
              </div>
            </n-grid-item>
            <n-grid-item>
              <div class="my-card">
                <n-icon size="24">
                  <calendar-edit-icon />
                </n-icon>
                <div>
                  <p style="font-size: 18px">
                    <n-number-animation :from="0" :to="12" />
                  </p>
                  <p style="font-size: 13px">报修</p>
                </div>
              </div>
            </n-grid-item>
            <n-grid-item style="border-top: 1px solid var(--divider-color)" span="2">
              <div style="display:flex;flex-direction:column;box-sizing: border-box;padding: 24px 32px 12px 0;">
                <div
                  style="display:flex;flex-direction:row;justify-content: space-between;align-items: center;box-sizing: border-box;padding-right: 10px;">
                  <span style="color: var(--n-title-text-color);font-size: var(--n-title-font-size);">住户登记</span>
                  <span style="font-size: 24px">
                    <n-number-animation :from="0" :to="50" />
                    <span style="font-size: 14px">个</span>
                  </span>
                </div>
                <div
                  style="display:flex;flex-direction:row;justify-content: space-between;align-items: center;box-sizing: border-box;margin-top: 10px;">
                  <n-icon size="42">
                    <person-edit-icon />
                  </n-icon>
                  <span style="cursor: pointer;">登记住户></span>
                </div>
              </div>
            </n-grid-item>
            <n-grid-item style="border-top: 1px solid var(--divider-color)" span="2">
              <div style="display:flex;flex-direction:column;box-sizing: border-box;padding: 24px 0 12px 32px; ">
                <div
                  style="display:flex;flex-direction:row;justify-content: space-between;align-items: center;box-sizing: border-box;padding-right: 10px;">
                  <span style="color: var(--n-title-text-color);font-size: var(--n-title-font-size);">车辆</span>
                  <span style="font-size: 24px">
                    <n-number-animation :from="0" :to="46" />
                    <span style="font-size: 14px;">辆</span>
                  </span>
                </div>
                <div
                  style="display:flex;flex-direction:row;justify-content: space-between;align-items: center;box-sizing: border-box;margin-top: 10px;">
                  <n-icon size="42">
                    <vehicle-car-icon />
                  </n-icon>
                  <span style="cursor:pointer;">查看车辆></span>
                </div>
              </div>
            </n-grid-item>
          </n-grid>
        </n-card>
      </n-grid-item>
      <n-grid-item span="1 500:2 800:1">
        <n-card title="小区公告">
          <n-scrollbar style="max-height: 239.4px">
            <n-list>
              <n-list-item :key="index" v-for="index of 100">
                <n-thing :title="'标题' + index" title-extra="2022-10-03" />
              </n-list-item>
            </n-list>
          </n-scrollbar>
        </n-card>
      </n-grid-item>

      <!--  第三排  -->
      <n-grid-item span="1 500:2 800:1">
        <n-card title="报修统计">
          <div style="height:280px;" id="report">
            <div id="reportStatistics"></div>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item span="1 500:2 800:1">
        <n-card title="投诉统计">
          <div style="height:280px;" id="complaint">
            <div id="complaintStatistics"></div>
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item span="1 500:2 800:1">
        <n-card title="住户注册统计">
          <div style="height:280px;" id="residentRegister">
            <div id="residentRegisterStatistics"></div>
          </div>
        </n-card>
      </n-grid-item>

    </n-grid>
  </div>
</template>

<!-- setup 语法糖 -->
<script setup>

// 引入 vue
import { ref, onMounted, onBeforeUnmount } from 'vue'
// 引入 naive-ui 组件
import {
  NGrid, NGridItem, NCard, NIcon, NLayout, NList,
  NListItem, NThing, NScrollbar, NNumberAnimation, useThemeVars
} from 'naive-ui'
// 引入图像
import {
  Album24Regular as AlbumIcon,
  BuildingMultiple24Regular as BuildingMultipleIcon,
  Home48Regular as HomeIcon,
  VehicleCarProfileLtr16Regular as CarIcon,
  CalendarEdit20Regular as CalendarEditIcon,
  PersonEdit20Regular as PersonEditIcon,
  VehicleCar16Regular as VehicleCarIcon,
} from '@vicons/fluent'
// 引入 ECharts 库
import * as echarts from 'echarts';

import {hexToRgba} from '../util/BaseUtil'

// 获取主题变量
const themeVars = useThemeVars()

let myChart;
let myChart1;
let myChart2;

const initChartssize = () => {
  chartssize(document.getElementById('report'), document.getElementById('reportStatistics'))
  chartssize(document.getElementById('complaint'), document.getElementById('complaintStatistics'))
  chartssize(document.getElementById('residentRegister'), document.getElementById('residentRegisterStatistics'))
  myChart.resize()
  myChart1.resize()
  myChart2.resize()
}

// 添加
window.addEventListener("resize", initChartssize)

// 图标配置
function init() {
  // 基于准备好的dom，初始化echarts实例
  chartssize(document.getElementById('report'), document.getElementById('reportStatistics'))
  chartssize(document.getElementById('complaint'), document.getElementById('complaintStatistics'))
  chartssize(document.getElementById('residentRegister'), document.getElementById('residentRegisterStatistics'))
  myChart = echarts.init(document.getElementById('reportStatistics'));
  myChart1 = echarts.init(document.getElementById('complaintStatistics'));
  myChart2 = echarts.init(document.getElementById('residentRegisterStatistics'));

  // 指定图表的配置项和数据
  let option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      top: '5%',
      left: 'right',
    },
    color: [themeVars.value.primaryColor, hexToRgba(themeVars.value.primaryColorHover,0.5)],
    series: [
      {
        name: '信息',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '已处理' },
          { value: 735, name: '未处理' },
        ]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
  myChart1.setOption(option);
  myChart2.setOption(option);
}

// 组件渲染
onMounted(
  () => {
    setTimeout(() => {
      init()
    }, 100)
  }
)
// 组件销毁前
onBeforeUnmount(
  () => {
    window.removeEventListener("resize", initChartssize)
  }
)

function chartssize(container, charts) {
  function getStyle(el, name) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(el, null);
    } else {
      return el.currentStyle;
    }
  }
  var wi = getStyle(container, 'width').width;
  var hi = getStyle(container, 'height').height;
  charts.style.width = wi
  charts.style.height = hi
}

function getStyle(el, name) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el, null);
  } else {
    return el.currentStyle;
  }
}

</script>
<!-- 设置组件名称 -->
<script>
export default {
  name: 'HomeLayout'
}
</script>

<style scoped>
.my-card {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px 0 40px 0;
}

.my-card>div p {
  margin: 0;
  padding: 0;
}

.my-card .n-icon {
  margin-right: 12px;
  border-radius: var(--border-radius);
  background: var(--button-color-2-hover);
  padding: 14px;
}
</style>