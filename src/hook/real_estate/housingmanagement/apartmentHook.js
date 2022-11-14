import { ref, inject, watch } from 'vue'

import { useMessage, useDialog } from 'naive-ui'

import QueryString from 'qs'

import axios from 'axios'

export default (buildingNode, loadBuilding, unitNode) => {

    // 接收全局变量
    const global = inject("global")

    const message = useMessage();
    const dialog = useDialog();

    // 单元 模态框
    const apartmentStatus = ref(false); // false 添加 true 修改
    const apartmentFormRef = ref(null);
    const showApartmentModal = ref(false) // 模态框是否打开

    // 提交按钮加载
    const apartmentSubmitLoading = ref(false);

    // 表单校验
    const apartmentRules = {
        id: {
            required: true,
            message: "请输入单元编号",
            trigger: "blur"
        },
        totalNumberOfLayers: {
            type: "number",
            required: true,
            message: "请输入总层数",
            trigger: "blur"
        }
    }

    // 表单输入数据
    const apartmentValue = ref({
        id: "",
        totalNumberOfLayers: null,
        elevator: false,
        remark: ""
    })

    // 表单提交事件
    const apartmentSubmit = (e) => {
        e.preventDefault();
        apartmentFormRef.value?.validate((errors) => {
            if (!errors) {
                // 校验通过
                if (!apartmentStatus.value) { // 添加
                    addApartment()
                } else { // 修改
                    updateApartment();
                }
            } else {
                // 校验不通过
            }
        });
    }

    watch(showApartmentModal, (newValue, oldValue) => {
        if (newValue) {
            apartmentValue.value = {
                id: "",
                totalNumberOfLayers: null,
                elevator: false,
                remark: ""
            }
            if (buildingNode.value != null && apartmentStatus.value) { // 修改
                if (unitNode.value != null) {
                    const unit = unitNode.value;
                    apartmentValue.value = {
                        id: unit.id,
                        totalNumberOfLayers: unit.totalNumberOfLayers,
                        elevator: unit.elevator,
                        remark: unit.remark,
                        key: unitNode.value.key.substring(1),
                    }
                } else {
                    message.warning("请先选择单元！")
                    showApartmentModal.value = false
                }
            } else if (buildingNode.value != null) { // 添加

            } else {
                message.warning("请先选择楼栋！")
                showApartmentModal.value = false
            }
        }
    })

    // 删除单元
    const deleteApartment = () => {
        const unit = unitNode.value
        if (unit != null) {
            dialog.warning({
                title: "请确认您的操作!",
                content: "确认是否删除" + unit.label + "!",
                positiveText: "确认删除",
                negativeText: "取消",
                onPositiveClick: () => {
                    let delLoading = message.loading("正在删除")
                    axios({
                        method: 'delete',
                        url: global.api + '/deleteUnit/' + unit.key.substring(1)
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
            message.warning("请先选择单元！")
        }
    }

    // 添加单元
    const addApartment = () => {
        apartmentSubmitLoading.value = true
        console.log(unitNode);
        axios({
            method: 'post',
            url: global.api + '/addUnit',
            data: QueryString.stringify({
                buildingNo: buildingNode.value.id,
                unitNo: apartmentValue.value.id,
                totalFloors: apartmentValue.value.totalNumberOfLayers,
                elevator: apartmentValue.value.elevator ? 1 : 0,
                remark: apartmentValue.value.remark,
            })
        }).then(res => {
            if (res.data.success) {
                message.success("添加成功！")
                loadBuilding();
                showApartmentModal.value = false
            } else {
                message.warning("添加失败！")
            }
        }).catch(err => {
            message.error("添加出现异常！" + err)
        }).finally(() => {
            apartmentSubmitLoading.value = false
        })
    }

    // 修改单元
    const updateApartment = () => {
        apartmentSubmitLoading.value = true
        axios({
            method: 'put',
            url: global.api + '/updateUnit',
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                id: apartmentValue.value.key,
                buildingNo: unitNode.value.building.id,
                unitNo: apartmentValue.value.id,
                totalFloors: apartmentValue.value.totalNumberOfLayers,
                elevator: apartmentValue.value.elevator ? 1 : 0,
                remark: apartmentValue.value.remark
            }
        }).then(res => {
            if (res.data.data.updateStatus) {
                message.success("修改成功！");
                loadBuilding();
                unitNode.value = null
                showApartmentModal.value = false
            } else {
                message.warning("修改失败！")
            }
        }).catch(err => {
            message.error("修改出现异常！" + err)
        }).finally(() => {
            apartmentSubmitLoading.value = false
        })
    }

    return {
        apartmentStatus, // 单元模态框状态
        apartmentFormRef, // 单元模态框 Form 引用
        showApartmentModal, // 显示单元模态框
        apartmentRules, // 单元模态框 Form 校验数据
        apartmentValue, // 单元模态框 Form 参数
        apartmentSubmitLoading, // 单元提交加载
        apartmentSubmit, // 单元模态框 Form 提交事件
        deleteApartment, // 删除单元点击事件
    }
}