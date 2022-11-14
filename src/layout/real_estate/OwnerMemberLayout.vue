<template>
    <div class="body">
        <n-card title="业主信息">
            <template #header-extra>
                <n-space>
                    <n-button @click="openSelectOwnerModel" type="primary">
                        <template #icon>
                            <n-icon>
                                <search-icon />
                            </n-icon>
                        </template>
                        选择业主
                    </n-button>
                    <n-button v-if="ownerInfo.id != null" @click="openOwnerMemberModal(false)" type="primary">
                        <template #icon>
                            <n-icon>
                                <add-icon />
                            </n-icon>
                        </template>
                        添加成员
                    </n-button>
                </n-space>
            </template>
            <div class="user-info">
                <!-- <img class="photo" src="../../assets/user/noPhoto.jpg" /> -->
                <n-grid :y-gap="16" style="margin-left: 16px;" cols="1 400:2 600:3">
                    <n-grid-item>
                        <div class="sub-info">
                            业主ID：{{ ownerInfo.ownerNo }}
                        </div>
                    </n-grid-item>
                    <n-grid-item>
                        <div class="sub-info">
                            名称：{{ ownerInfo.name }}
                        </div>
                    </n-grid-item>
                    <n-grid-item>
                        <div class="sub-info">
                            性别：{{ ownerInfo.gender === 1 ? '男' : ownerInfo.gender === 0 ? '女' : '' }}
                        </div>
                    </n-grid-item>
                    <n-grid-item>
                        <div class="sub-info">
                            年龄：{{ ownerInfo.age }}
                        </div>
                    </n-grid-item>
                    <n-grid-item>
                        <div class="sub-info">
                            身份证：{{ ownerInfo.idCard }}
                        </div>
                    </n-grid-item>
                    <n-grid-item>
                        <div class="sub-info">
                            联系方式：{{ ownerInfo.phone }}
                        </div>
                    </n-grid-item>
                    <n-grid-item>
                        <div class="sub-info">
                            微信：{{ ownerInfo.weCat }}
                        </div>
                    </n-grid-item>
                    <n-grid-item>
                        <div class="sub-info">
                            备注：{{ ownerInfo.remark }}
                        </div>
                    </n-grid-item>
                </n-grid>
            </div>
        </n-card>

        <n-spin :show="ownerMemberLoading">
            <n-table style="margin-top: 10px" striped>
                <thead>
                    <tr>
                        <th>成员ID</th>
                        <th>名称</th>
                        <th>性别</th>
                        <th>年龄</th>
                        <th>身份证</th>
                        <th>电话</th>
                        <th>备注</th>
                        <th>微信</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody v-if="ownerMemberData.length <= 0">
                    <tr>
                        <td colspan="9" style="text-align:center;">暂无数据</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr v-for="(item, index) in ownerMemberData" :key="index">
                        <td>
                            <n-ellipsis style="max-width: 160px">
                                {{ item.ownerNo }}
                            </n-ellipsis>
                        </td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.gender === 1 ? '男' : item.gender === 0 ? '女' : '' }}</td>
                        <td>{{ item.age }}</td>
                        <td>{{ item.idCard }}</td>
                        <td>{{ item.phone }}</td>
                        <td>
                            <n-ellipsis style="max-width: 100px">
                                {{ item.remark }}
                            </n-ellipsis>
                        </td>
                        <td>{{ item.weCat }}</td>
                        <td>
                            <n-button-group size="large">
                                <n-button size="small" @click="openOwnerMemberModal(true, item)">修改</n-button>
                                <n-button type="error" @click="deleteOwnerMember(item.id,item.name)" size="small" strong secondary>删除</n-button>
                            </n-button-group>
                        </td>
                    </tr>
                </tbody>
            </n-table>

            <div v-if="ownerMemberPages > 1"
                style="display: flex;justify-content: center;align-items: center;margin-top: 10px;">
                <n-pagination @update:page="ownerMemberPageUpdate" :page-count="ownerMemberPages" />
            </div>
        </n-spin>

        <!-- 业主信息模态框 -->
        <n-modal :auto-focus="false" v-model:show="showSelectOwnerModel" class="custom-card" preset="card"
            style="width: 800px" title="选择业主" transform-origin="center" size="huge" :bordered="false"
            :segmented="{ content: 'soft', footer: 'soft' }">

            <n-spin :show="ownerLoading">

                <div class="selectOwnerClass">
                    <n-input-group>
                        <n-input v-model:value="ownerNameValue" type="text" placeholder="请输入业主姓名" />
                        <n-button @click="findOwnerInfo({ name: ownerNameValue })" type="primary">搜索</n-button>
                    </n-input-group>
                </div>

                <n-table style="margin-top: 16px" striped>
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>性别</th>
                            <th>年龄</th>
                            <th>身份证</th>
                            <th>电话</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody v-if="ownerData.length <= 0">
                        <tr>
                            <td colspan="6" style="text-align:center;">暂无数据</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr v-for="(item, index) in ownerData" :key="index">
                            <td>
                                <n-ellipsis style="max-width: 100px">
                                    {{ item.name }}
                                </n-ellipsis>
                            </td>
                            <td>
                                <n-ellipsis style="max-width: 100px">
                                    {{ item.gender === 1 ? '男' : '女' }}
                                </n-ellipsis>
                            </td>
                            <td>
                                <n-ellipsis style="max-width: 100px">
                                    {{ item.age }}
                                </n-ellipsis>
                            </td>
                            <td>
                                <n-ellipsis style="max-width: 160px">
                                    {{ item.idCard }}
                                </n-ellipsis>
                            </td>
                            <td>
                                <n-ellipsis style="max-width: 100px">
                                    {{ item.phone }}
                                </n-ellipsis>
                            </td>
                            <td style="width: 60px">
                                <n-button-group size="large">
                                    <n-button @click="selectOwnerInfo(item)" size="small" type="primary">选择</n-button>
                                </n-button-group>
                            </td>
                        </tr>
                    </tbody>
                </n-table>

                <div v-if="ownerPages > 1"
                    style="display: flex;justify-content: center;align-items: center;margin-top: 26px;">
                    <n-pagination @update:page="ownerPageUpdate" :page-count="ownerPages" />
                </div>

            </n-spin>


            <template #footer>
                <n-space justify="end">
                    <n-button @click="showSelectOwnerModel = false">关闭</n-button>
                </n-space>
            </template>
        </n-modal>

        <!-- 业主成员信息模态框 -->
        <n-modal :auto-focus="false" v-model:show="showOwnerMemberModal" class="custom-card" preset="card"
            style="width: 800px" :title="ownerMemberStatus ? '修改' : '添加' + '业主'" transform-origin="center" size="huge"
            :bordered="false" :segmented="{ content: 'soft', footer: 'soft' }">
            <n-form ref="ownerMemberFormRef" label-placement="left" :label-width="80" :model="ownerMemberformValue"
                :rules="ownerMemberRules" size="medium">
                <n-grid cols="1 600:2">
                    <n-grid-item>
                        <n-form-item label="姓名" path="user.name">
                            <n-input v-model:value="ownerMemberformValue.user.name" placeholder="输入姓名" />
                        </n-form-item>
                        <n-form-item label="性别" path="user.gender">
                            <n-select v-model:value="ownerMemberformValue.user.gender" placeholder="输入性别"
                                :options="ownerMemberGenderOptions" />
                        </n-form-item>
                        <n-form-item label="年龄" path="user.age">
                            <n-input v-model:value="ownerMemberformValue.user.age" placeholder="输入年龄" />
                        </n-form-item>
                        <n-form-item label="身份证">
                            <n-input v-model:value="ownerMemberformValue.user.idCard" placeholder="输入身份证" />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <n-form-item label="手机" path="user.phone">
                            <n-input v-model:value="ownerMemberformValue.user.phone" placeholder="输入手机号码" />
                        </n-form-item>
                        <n-form-item label="备注">
                            <n-input v-model:value="ownerMemberformValue.user.remark" placeholder="输入备注" />
                        </n-form-item>
                        <n-form-item label="微信">
                            <n-input v-model:value="ownerMemberformValue.user.weCat" placeholder="输入微信" />
                        </n-form-item>
                    </n-grid-item>
                </n-grid>
            </n-form>
            <template #footer>
                <n-space justify="end">
                    <n-button @click="showOwnerMemberModal = false">取消</n-button>
                    <n-button :loading="ownerMemberModalLoading" type="primary" attr-type="button"
                        @click="ownerMemberSubmit">保存
                    </n-button>
                </n-space>
            </template>
        </n-modal>


    </div>
</template>

<script setup>
// 引入 vue 
import { ref, inject } from 'vue';
// 引入 naive-ui 组件
import {
    NCard, NLayout, NLayoutSider, NLayoutFooter,
    NLayoutContent, NLayoutHeader, NGrid, NGridItem,
    NButton, NSpace, NIcon, NButtonGroup, NPagination,
    NTable, NEllipsis, NModal, NInputGroup, NInput,
    useMessage, useDialog, NSpin, NForm, NFormItem,
    NSelect
} from 'naive-ui';
// 引入图标 
import {
    Add20Filled as AddIcon,
    Search16Filled as SearchIcon
} from '@vicons/fluent'
// 引入 axios
import axios from 'axios'
// 引入工具包
import { mergeObject, createId } from '../../util/BaseUtil'
import QueryString from 'qs'

// 读取全局变量
const global = inject("global")
// 获取消息对戏
const message = useMessage()
// 获取弹窗对象
const dialog = useDialog()

// #region ===== 业主选择 =====
// 当前选中的业主
const ownerInfo = ref({
    "id": null,
    "ownerNo": null,
    "name": null,
    "gender": null,
    "age": null,
    "phone": null,
    "idCard": null,
    "weCat": null,
    "remark": null,
    "isMember": null,
    "memberNo": null
})
// 当前选中的业主成员
const ownerMemberInfo = ref(null)
// 选择业主模态框
const showSelectOwnerModel = ref(false)
// 业主列表加载
const ownerLoading = ref(false)
// 业主信息
const ownerData = ref([])
// 当前页码
const ownerPage = ref(1)
// 总页数
const ownerPages = ref(1)
// modal nameInput
const ownerNameValue = ref(null)
/**
 * 打开模态框
 */
function openSelectOwnerModel() {
    showSelectOwnerModel.value = true
    findOwnerInfo()
}
// 查询业主信息
function findOwnerInfo(more) {
    const params = {
        page: 1,
        size: 6,
    }
    mergeObject(params, more)
    ownerLoading.value = true
    axios({
        method: 'get',
        url: global.api + '/getAllOwnerByOtherNo',
        params
    }).then(res => {
        // 设置业主数据
        ownerData.value = res.data.list
        // 设置当前页码
        ownerPage.value = res.data.pageNum
        // 设置总页数
        ownerPages.value = res.data.pages
    }).catch(err => {
        message.error("业主列表加载出现异常！" + err)
    }).finally(() => {
        ownerLoading.value = false
    })
}
/**
 * 选中业主信息
 */
function selectOwnerInfo(owner) {
    showSelectOwnerModel.value = false
    ownerInfo.value = owner
    findOwnerMember(1) // 查询业主成员
}
/**
 * 业主信息页码改变时触发
 */
function ownerPageUpdate(page) {
    findOwnerInfo({
        name: ownerNameValue.value,
        page
    })
}
// #endregion

// #region ===== 业主成员 =====
const ownerMemberStatus = ref(false); // false 添加 true 修改
const ownerMemberFormRef = ref(null); // 业主成员 Form 引用
const showOwnerMemberModal = ref(false) // 模态框是否打开

// 表单校验
const ownerMemberRules = {
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
const ownerMemberformValue = ref({
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
const ownerMemberSubmit = (e) => {
    e.preventDefault();
    ownerMemberFormRef.value?.validate((errors) => {
        if (!errors) {
            // 校验通过
            if (!ownerMemberStatus.value) { // 添加
                addOwnerMember()
            } else { // 修改
                updateOwnerMember() // 修改
            }
        } else {
            // 校验不通过
        }
    });
}

// 业主添加加载
const ownerMemberModalLoading = ref(false)

// 性别选择框数据
const ownerMemberGenderOptions = ref([
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
const openOwnerMemberModal = (status, item) => {
    // 清空数据
    ownerMemberformValue.value = {
        user: {
            name: "",
            gender: null,
            age: "",
            idCard: "",
            phone: "",
            remark: "",
            weCat: "",
            isMember: 1
        },
    }
    if (status) { // 如果是修改则填充数据
        ownerMemberInfo.value = item
        ownerMemberformValue.value.user.name = item.name
        ownerMemberformValue.value.user.gender = item.gender
        ownerMemberformValue.value.user.age = item.age.toString()
        ownerMemberformValue.value.user.idCard = item.idCard
        ownerMemberformValue.value.user.phone = item.phone
        ownerMemberformValue.value.user.remark = item.remark
        ownerMemberformValue.value.user.weCat = item.weCat
        ownerMemberformValue.value.user.isMember = item.isMember
    }
    // 打开模态框
    showOwnerMemberModal.value = true;
    ownerMemberStatus.value = status
}

/**
 * 添加业主成员
 */
const addOwnerMember = () => {
    ownerMemberModalLoading.value = true
    ownerMemberformValue.value.user.memberNo = ownerInfo.value.ownerNo
    ownerMemberformValue.value.user.ownerNo = createId()
    axios({
        method: 'post',
        url: global.api + '/addMemberOwner',
        data: QueryString.stringify(ownerMemberformValue.value.user)
    }).then(res => {
        if (res.data.success) {
            message.success("添加成功！")
            findOwnerMember(ownerMemberPageNo.value) // 刷新业主成员列表
            showOwnerMemberModal.value = false // 关闭模态框
        } else {
            message.warning("添加失败！")
        }
    }).catch(err => {
        message.error("添加业主出现异常！" + err)
    }).finally(() => {
        ownerMemberModalLoading.value = false
    })
}

/**
 * 修改业主成员信息
 */
const updateOwnerMember = () => {
    ownerMemberModalLoading.value = true
    ownerMemberformValue.value.user.id = ownerMemberInfo.value.id
    ownerMemberformValue.value.user.ownerNo = ownerMemberInfo.value.ownerNo
    axios({
        method: 'post',
        url: global.api + '/updateOwner',
        data: QueryString.stringify(ownerMemberformValue.value.user)
    }).then(res => {
        if (res.data.success) {
            message.success("修改成功！")
            findOwnerMember(ownerMemberPageNo.value) // 刷新业主成员列表
            showOwnerMemberModal.value = false // 关闭模态框
        } else {
            message.warning("修改失败！")
        }
    }).catch(err => {
        message.error("修改业主成员出现异常！" + err)
    }).finally(() => {
        ownerMemberModalLoading.value = false
    })
}

/**
 * 删除业主信息
 * @param {*} id  业主编号
 */
const deleteOwnerMember = (id, name) => {
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
                    message.success("删除成功！")
                    findOwnerMember(ownerMemberPageNo.value) // 刷新业主成员列表
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

// 业主成员信息
const ownerMemberData = ref([])
// 业主成员加载
const ownerMemberLoading = ref(false)
// 当前页码
const ownerMemberPageNo = ref(1)
// 总页数
const ownerMemberPages = ref(1)
/**
 * 查询业主成员信息
 */
const findOwnerMember = (page) => {
    ownerMemberLoading.value = true
    axios({
        method: 'get',
        url: global.api + '/getMemberInfoByOwnerNo',
        params: {
            page,
            size: global.pageSize,
            ownerNo: ownerInfo.value.ownerNo
        }
    }).then(res => {
        // 设置数据
        ownerMemberData.value = res.data.list
        // 设置当前页码
        ownerMemberPageNo.value = res.data.pageNum
        // 设置总页数
        ownerMemberPages.value = res.data.pages
    }).catch(err => {
        message.error('业主成员查询出现异常！' + err)
    }).finally(() => {
        ownerMemberLoading.value = false
    })
}

/**
 * 业主成员页码发生变化时触发
 */
const ownerMemberPageUpdate = (page) => {
    findOwnerMember(page)
}

// #endregion


</script>
<script>
export default {
    name: 'OwnerMemberLayout'
}
</script>

<style scoped>
.body {
    padding: 10px;
}

.photo {
    width: 120px;
    height: 140px;
    object-fit: cover;
}

.user-info {
    display: flex;
    flex-direction: row;
}

.sub-info {
    display: flex;
    align-items: center;
    height: 100%;
}

.selectOwnerClass {
    display: flex;
    flex-direction: row;
    justify-content: right;
}
</style>