// 添加业主
import { ref, inject } from 'vue'
import { useMessage, useDialog } from 'naive-ui'
import QueryString from 'qs'
import axios from 'axios'
import { createId } from '../../../util/BaseUtil'

export default (refreshOwnerData) => {
    // 当前选中的业主
    let tempoOwner = null;

    // 接收全局变量
    const global = inject("global")
    // 获取消息对象
    const message = useMessage();
    // 创建弹出框对象
    const dialog = useDialog()

    // 业主 模态框
    const ownerStatus = ref(false); // false 添加 true 修改
    const ownerFormRef = ref(null); // 业主 Form 引用
    const showOwnerModal = ref(false) // 模态框是否打开

    // 表单校验
    const ownerRules = {
        user: {
            name: {
                required: true,
                message: "请输入姓名",
                trigger: "blur"
            },
            gender: {
                required: true,
                type: "number",
                message: "请选择性别",
                trigger: "blur"
            },
            age: {
                required: true,
                message: "请输入年龄",
                trigger: "blur"
            },
            phone: {
                required: true,
                message: "请输入手机号码",
                trigger: "blur"
            },
        },
    }
    // 表单输入数据
    const ownerformValue = ref({
        user: {
            name: "",
            gender: null,
            age: "",
            idCard: "",
            phone: "",
            remark: "",
            weCat: "",
            isMember: 0
        },
    })

    // 表单提交事件
    const ownerSubmit = (e) => {
        e.preventDefault();
        ownerFormRef.value?.validate((errors) => {
            if (!errors) {
                // 校验通过
                if (!ownerStatus.value) { // 添加
                    addOwner()
                } else { // 修改
                    updateOwner()
                }
            } else {
                // 校验不通过
            }
        });
    }

    // 业主添加加载
    const ownerModelLoading = ref(false)
    /**
     * 添加业主
     */
    const addOwner = () => {
        ownerModelLoading.value = true
        ownerformValue.value.user.ownerNo = createId()
        axios({
            method: 'post',
            url: global.api + '/addOwner',
            data: QueryString.stringify(ownerformValue.value.user)
        }).then(res => {
            if (res.data.success) {
                message.success("添加成功！")
                refreshOwnerData() // 刷新业主数据
                showOwnerModal.value = false // 关闭模态框
            } else {
                message.warning("添加失败！")
            }
        }).catch(err => {
            message.error("添加业主出现异常！" + err)
        }).finally(() => {
            ownerModelLoading.value = false
        })
    }

    /**
     * 修改业主信息
     */
    const updateOwner = () => {
        ownerModelLoading.value = true
        ownerformValue.value.user.id = tempoOwner.id
        ownerformValue.value.user.ownerNo = tempoOwner.ownerNo
        axios({
            method: 'post',
            url: global.api + '/updateOwner',
            data: QueryString.stringify(ownerformValue.value.user)
        }).then(res => {
            if (res.data.success) {
                message.success("修改成功！")
                refreshOwnerData() // 刷新业主数据
                showOwnerModal.value = false // 关闭模态框
            } else {
                message.warning("修改失败！")
            }
        }).catch(err => {
            message.error("修改业主出现异常！" + err)
        }).finally(() => {
            ownerModelLoading.value = false
        })
    }

    // 性别选择框数据
    const ownerGenderOptions = ref([
        {
            label: "男",
            value: 1
        },
        {
            label: "女",
            value: 0
        }
    ])

    /**
     * 打开模态框
     * @param {false 添加 true 修改} status
     */
    const openOwnerModal = (status, item) => {
        // 清空数据
        ownerformValue.value = {
            user: {
                name: "",
                gender: null,
                age: "",
                idCard: "",
                phone: "",
                remark: "",
                weCat: "",
                isMember: 0
            },
        }
        if (status) { // 如果是修改则填充数据
            tempoOwner = item;
            ownerformValue.value.user.name = item.name
            ownerformValue.value.user.gender = item.gender
            ownerformValue.value.user.age = item.age.toString()
            ownerformValue.value.user.idCard = item.idCard
            ownerformValue.value.user.phone = item.phone
            ownerformValue.value.user.remark = item.remark
            ownerformValue.value.user.weCat = item.weCat
            ownerformValue.value.user.isMember = item.isMember
        }
        // 打开模态框
        showOwnerModal.value = true;
        ownerStatus.value = status
    }

    /**
     * 关闭模态框
     */
    const closeOwnerModal = () => {
        showOwnerModal.value = false;
    }

    /**
     * 删除业主信息
     * @param {*} id  业主编号
     */
    const deleteOwner = (id, name) => {
        dialog.warning({
            title: "请确认您的操作!",
            content: "确认是否删除" + name + "!",
            positiveText: "确认删除",
            negativeText: "取消",
            onPositiveClick: () => {
                let delLoading = message.loading("正在删除")
                axios({
                    method: 'delete',
                    url: global.api + '/deleteOwner/' + id
                }).then(res => {
                    if (res.data.success) {
                        refreshOwnerData();
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
    }

    return {
        ownerStatus, // 模态 添加 or 修改 框状态
        ownerFormRef, // 业主 Form 引用
        showOwnerModal, // 显示模态框
        ownerRules, // 表单校验
        ownerformValue, // 表单参数
        ownerGenderOptions, // 性别选项数据
        ownerModelLoading, // 业主加载
        openOwnerModal, // 打开模态框
        closeOwnerModal, // 关闭模态框
        ownerSubmit, // 表单提交
        deleteOwner, // 删除业主信息
    }

}