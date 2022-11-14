import { ref, reactive, inject, watch } from 'vue'

import { useMessage, useDialog } from 'naive-ui'

import axios from 'axios'

import QueryString from 'qs'

export default (loadList) => {

  // 接收全局变量
  const global = inject('global');

  const message = useMessage();
  const dialog = useDialog();

  const leftSpin = ref(false)

  // 当前选中节点
  const buildingNode = ref(null);
  const unitNode = ref(null);

  // 楼栋 模态框
  const buildingStatus = ref(false); // false 添加 true 修改
  const buildingFormRef = ref(null);
  const showBuildingModal = ref(false) // 模态框是否打开

  // 提交按钮加载
  const submitLoading = ref(false);

  // 表单校验
  const buildingRules = {
    id: {
      required: true,
      message: "请输入楼栋编号",
      trigger: "blur"
    },
    name: {
      required: true,
      message: "请输入楼栋名称",
      trigger: "blur"
    },
    area: {
      required: true,
      message: "请输入建筑面积",
      trigger: "blur"
    },
  }

  // 表单输入数据
  const buildingValue = ref({
    id: "",
    name: "",
    area: "",
    remark: "",
  })

  // 表单提交事件
  const buildingSubmit = (e) => {
    e.preventDefault();
    buildingFormRef.value?.validate((errors) => {
      if (!errors) {
        // 校验通过
        if (!buildingStatus.value) { // 添加
          addBuilding(); // 调用添加方法
        } else { // 修改
          updateBuilding();
        }
      } else {
        // 校验不通过
      }
    });
  }

  // 楼栋信息
  const buildingData = reactive([])

  /* 
  
  [{
      "label": "1栋",
      "type": 0,
      "key": "403626",
      "children": [
        {
          "label": "1单元",
          "type": 1,
          "key": "40362610"
        },
        {
          "label": "2单元",
          "type": 1,
          "key": "40362611"
        },
        {
          "label": "6单元",
          "type": 1,
          "key": "40362612"
        },
        {
          "label": "12单元",
          "type": 1,
          "key": "40362613"
        }
      ]
    }, {
      "label": "2栋",
      "type": 0,
      "key": "403627",
      "children": [
        {
          "label": "1单元",
          "type": 1,
          "key": "40362614"
        },
        {
          "label": "2单元",
          "type": 1,
          "key": "40362615"
        },
        {
          "label": "6单元",
          "type": 1,
          "key": "40362616"
        },
        {
          "label": "12单元",
          "type": 1,
          "key": "40362617"
        }
      ]
    }, , {
      "label": "3栋",
      "type": 0,
      "key": "403628",
      "children": [
        {
          "label": "1单元",
          "type": 1,
          "key": "40362618"
        },
        {
          "label": "2单元",
          "type": 1,
          "key": "40362619"
        },
        {
          "label": "6单元",
          "type": 1,
          "key": "40362620"
        },
        {
          "label": "12单元",
          "type": 1,
          "key": "40362621"
        }
      ]
    }]
  */

  // 加载楼栋信息
  leftSpin.value = true
  // 加载楼栋信息
  function loadBuilding() {
    buildingData.length = 0

    axios({
      method: 'get',
      url: global.api + '/getAllBuildings',
    }).then(res => {
      for (let building of res.data) {
        const tempData = reactive({
          "id": building.buildingNo,
          "label": building.name,
          "type": 0,
          "key": "L" + building.id,
          "area": building.area,
          "remark": building.remark,
          "children": []
        })

        axios({
          method: 'get',
          url: global.api + '/getAllByBuildingNoUnits/' + building.buildingNo,
        }).then(res => {
          for (let unit of res.data) {
            tempData.children.push({
              "id": unit.unitNo,
              "label": unit.unitNo + "单元",
              "type": 1,
              "totalNumberOfLayers": unit.totalFloors,
              "elevator": unit.elevator === 1,
              "key": "D" + unit.id,
              "building": {
                "id": building.buildingNo,
                "label": building.name,
                "type": 0,
                "key": "L" + building.id,
                "area": building.area,
                "remark": building.remark,
              }
            })
          }
          leftSpin.value = false
        }).catch(err => {
          message.error('加载出现异常！' + err)
          leftSpin.value = false
        })
        buildingData.push(tempData);
      }
    }).catch(err => {
      leftSpin.value = false
      message.error('数据加载异常！' + err, { duration: 5000 })
    })
  }
  loadBuilding()

  watch(showBuildingModal, (newValue, oldValue) => {
    if (newValue) {
      buildingValue.value = {
        id: "",
        name: "",
        area: "",
        remark: "",
      }
    }
    if (newValue && buildingStatus.value) {
      if (buildingNode.value != null) {
        const buildingInfo = buildingNode.value;
        buildingValue.value = {
          id: buildingInfo.id,
          name: buildingInfo.label,
          area: buildingInfo.area.toString(),
          remark: buildingInfo.remark,
          key: buildingInfo.key.substring(1)
        }
      } else {
        message.warning("请先选择楼栋！")
        showBuildingModal.value = false
      }
    }
  })

  // 楼栋节点点击事件
  function nodeProps({ option }) {
    return {
      onClick() {
        if (option.type === 0) { // 楼栋被点击
          buildingNode.value = option
        } else if (option.type === 1) { // 单元被点击
          buildingNode.value = option.building
          unitNode.value = option
          loadList(option, 1);
        }
      }
    };
  }

  // 删除楼栋
  const deleteBuilding = () => {
    if (buildingNode.value != null) {
      dialog.warning({
        title: "请确认您的操作!",
        content: "确认是否删除" + buildingNode.value.label + "!",
        positiveText: "确认删除",
        negativeText: "取消",
        onPositiveClick: () => {
          let delLoading = message.loading("正在删除")
          axios({
            method: 'delete',
            url: global.api + '/deleteBuilding/' + buildingNode.value.key.substring(1)
          }).then(res => {
            if (res.data.success) {
              loadBuilding();
              message.success("删除成功！")
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
      });
    } else {
      message.warning("请先选择楼栋！")
    }
  }

  // 添加楼栋信息
  const addBuilding = () => {
    submitLoading.value = true
    axios({
      method: 'post',
      url: global.api + '/addBuilding',
      data: QueryString.stringify({
        buildingNo: buildingValue.value.id,
        name: buildingValue.value.name,
        area: buildingValue.value.area,
        remark: buildingValue.value.remark
      })
    }).then(res => {
      if (res.data.success) {
        message.success("添加成功！");
        loadBuilding()
        showBuildingModal.value = false
      } else {
        message.warning("添加失败！");
      }
    }).catch(err => {
      message.error("添加出现异常！" + err)
    }).finally(() => {
      submitLoading.value = false
    })
  }

  // 修改楼栋信息系
  const updateBuilding = () => {
    submitLoading.value = true
    axios({
      method: 'put',
      url: global.api + '/updateBuilding',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        "area": buildingValue.value.area,
        "buildingNo": buildingValue.value.id,
        "id": buildingValue.value.key,
        "name": buildingValue.value.name,
        "remark": buildingValue.value.remark
      }
    }).then(res => {
      if (res.data.data.updateStatus) {
        message.success("修改成功！");
        loadBuilding();
        buildingNode.value = null
        showBuildingModal.value = false
      } else {
        message.warning("修改失败！")
      }
    }).catch(err => {
      message.error("修改出现异常！" + err)
    }).finally(() => {
      submitLoading.value = false
    })
  }

  return {
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
  }
}




