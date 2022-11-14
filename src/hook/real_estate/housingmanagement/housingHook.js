import { ref, inject, computed } from 'vue'

import { useMessage, useDialog } from 'naive-ui'

import axios from 'axios'

import QueryString from 'qs'

export default (unitNode, refreshList) => {

    // 当前修改的房屋
    let tempHousing = null;

    // 接收全局变量
    const global = inject('global');

    const message = useMessage();
    const dialog = useDialog();

    // 房屋 模态框
    const housingModelStatus = ref(false); // false 添加 true 修改
    const housingFormRef = ref(null);
    const showHousingModal = ref(false) // 模态框是否打开

    // 提交按钮加载
    const housingSubmitLoading = ref(false);

    // 表单校验
    const housingRules = {
        housesNo: {
            required: true,
            message: "请输入房屋编号",
            trigger: "blur"
        },
        floor: {
            required: true,
            type: "number",
            message: "请输入房屋楼层",
            trigger: "blur"
        },
        propertyType: {
            required: true,
            validator(rule, value) {
                if (value.length !== 4) {
                    return new Error("请选择户型");
                }
                return true;
            },
            trigger: "blur"
        },
        housesType: {
            required: true,
            type: 'number',
            message: "请选择房屋类型",
            trigger: "blur"
        },
        area: {
            required: true,
            type: "number",
            message: "请输入室内面积",
            trigger: "blur"
        },
    }

    // 表单输入数据
    const housingValue = ref({
        housesNo: "", // 房屋编号
        floor: null, // 房屋楼层
        room: null, // 室
        hall: null, // 厅
        propertyType: computed({
            set(value) {
                housingValue.value.room = value.substring(0, 2)
                housingValue.value.hall = value.substring(2)
            },
            get() {
                return housingValue.value.room + housingValue.value.hall
            }
        }), // 户型
        housesType: null, // 房屋类型
        area: null, // 室内面积
        exquisite: false, // 精装修
        remark: "", // 备注
    })

    const houseType = [
        [{
            value: "一室",
            label: "一室",
        }, {
            value: "两室",
            label: "两室",
        }, {
            value: "三室",
            label: "三室",
        }, {
            value: "四室",
            label: "四室",
        }, {
            value: "五室",
            label: "五室",
        }, {
            value: "六室",
            label: "六室",
        }, {
            value: "七室",
            label: "七室",
        }, {
            value: "八室",
            label: "八室",
        }], [{
            value: "一厅",
            label: "一厅",
        }, {
            value: "两厅",
            label: "两厅",
        }, {
            value: "三厅",
            label: "三厅",
        }, {
            value: "四厅",
            label: "四厅",
        }, {
            value: "五厅",
            label: "五厅",
        }, {
            value: "六厅",
            label: "六厅",
        }, {
            value: "七厅",
            label: "七厅",
        }, {
            value: "八厅",
            label: "八厅",
        }]
    ]

    // 单元加载
    const unitOptionLoading = ref(false)
    // 单元选项
    const unitOption = ref([])

    // 表单提交事件
    const housingSubmit = (e) => {
        e.preventDefault();
        housingFormRef.value?.validate((errors) => {
            if (!errors) {
                // 校验通过
                if (!housingModelStatus.value) { // 添加
                    addHousing()
                } else { // 修改
                    updateHousing()
                }
            } else {
                // 校验不通过
            }
        });
    }

    /**
     * 添加房屋
     */
    const addHousing = () => {
        housingSubmitLoading.value = true
        axios({
            method: 'post',
            url: global.api + "/addHouses",
            data: QueryString.stringify({
                buildingNo: unitNode.value.building.id,
                unitNo: unitNode.value.id,
                housesNo: housingValue.value.housesNo,
                floor: housingValue.value.floor,
                propertyType: housingValue.value.propertyType,
                housesType: housingValue.value.housesType,
                area: housingValue.value.area,
                status: 0,
                exquisite: housingValue.value.exquisite ? 1 : 0,
                remark: housingValue.value.remark,
            })
        }).then(res => {
            if (res.data.success) {
                message.success('添加成功！')
                showHousingModal.value = false
                refreshList()
            } else {
                message.warning('添加失败！')
            }
        }).catch(err => {
            message.error('加载出现异常！' + err)
        }).finally(() => {
            housingSubmitLoading.value = false
        })
    }

    /**
     * 修改房屋
     */
    const updateHousing = () => {
        housingSubmitLoading.value = true
        axios({
            method: 'put',
            url: global.api + '/updateHouses',
            data: QueryString.stringify({
                id: tempHousing.id,
                buildingNo: unitNode.value.building.id,
                unitNo: housingValue.value.unitNo,
                housesNo: housingValue.value.housesNo,
                floor: housingValue.value.floor,
                propertyType: housingValue.value.propertyType,
                housesType: housingValue.value.housesType,
                area: housingValue.value.area,
                status: tempHousing.status,
                exquisite: housingValue.value.exquisite ? 1 : 0,
                remark: housingValue.value.remark,
            })
        }).then(res => {
            if (res.data.data.updateStatus) {
                message.success("修改成功！")
                showHousingModal.value = false
                refreshList()
            } else {
                message.warning("修改失败！")
            }
        }).catch(err => {
            message.error("修改出现异常！" + err)
        }).finally(() => {
            housingSubmitLoading.value = false
        })
    }

    /**
     * 删除房屋信息
     * @param {*} housing 房屋信息
     */
    const deleteHousing = (housing) => {
        dialog.warning({
            title: "请确认您的操作!",
            content: "确认是否删除房屋" + housing.housesNo + "!",
            positiveText: "确认删除",
            negativeText: "取消",
            onPositiveClick: () => {
                let delLoading = message.loading("正在删除")
                axios({
                    method: 'delete',
                    url: global.api + '/deleteHouses/' + housing.id
                }).then(res => {
                    if (res.data.success) {
                        message.success("删除成功！")
                        refreshList();
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
    }

    /**
     * 打开模态框
     * @param {*} status false 添加 false 修改 
     */
    const openHousingModel = (status, housing) => {
        // 校验节点是否被选中
        if (unitNode.value == null) {
            message.warning("请先选择单元！")
            return;
        }

        // 重置模态框
        housingValue.value = {
            housesNo: "", // 房屋编号
            floor: null, // 房屋楼层
            room: null, // 室
            hall: null, // 厅
            propertyType: computed({
                set(value) {
                    housingValue.value.room = value.substring(0, 2)
                    housingValue.value.hall = value.substring(2)
                },
                get() {
                    return housingValue.value.room + housingValue.value.hall
                }
            }), // 户型
            housesType: null, // 房屋类型
            area: null, // 室内面积
            exquisite: false, // 精装修
            remark: "", // 备注
        }

        if (status) { // 如果是修改则填充数据

            unitOption.value = []

            unitOptionLoading.value = true
            axios({
                method: 'get',
                url: global.api + '/getAllByBuildingNoUnits/' + unitNode.value.building.id,
            }).then(res => {
                for (let unit of res.data) {
                    unitOption.value.push({
                        label: unit.unitNo + "单元",
                        value: unit.unitNo
                    })
                }
            }).catch(err => {
                console.log("单元选项加载异常！" + err);
            }).finally(() => {
                unitOptionLoading.value = false
            })


            tempHousing = housing;

            housingValue.value = {
                housesNo: housing.housesNo, // 房屋编号
                floor: housing.floor, // 房屋楼层
                unitNo: housing.unit.unitNo,
                room: housing.propertyType.substring(0, 2), // 室
                hall: housing.propertyType.substring(2), // 厅
                propertyType: computed({
                    set(value) {
                        housingValue.value.room = value.substring(0, 2)
                        housingValue.value.hall = value.substring(2)
                    },
                    get() {
                        return housingValue.value.room + housingValue.value.hall
                    }
                }), // 户型
                housesType: housing.housesType.id, // 房屋类型
                area: housing.area, // 室内面积
                exquisite: housing.exquisite === 1, // 精装修
                remark: housing.remark, // 备注
            }
        }

        showHousingModal.value = true;
        housingModelStatus.value = status;
    }

    return {
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
    }

}