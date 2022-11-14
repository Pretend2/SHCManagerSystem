<template>
    <div style="padding: 0 10px">
        <n-card title="查询条件" style="margin-top: 10px">
            <n-space item-style="display: flex; align-item: center;">
                <n-input type="text" v-model:value="ownerFindValue.name" placeholder="请输入业主名称" />
                <n-input type="text" v-model:value="ownerFindValue.phone" placeholder="请输入联系方式" />
                <n-input type="text" v-model:value="ownerFindValue.idCard" placeholder="请输入业主身份证号" />
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

        <n-spin :show="ownerLoading">
            <n-card title="业主信息" style="margin-top: 10px;padding: 0; margin-bottom: 10px;">
                <template #header-extra>
                    <n-space>
                        <n-button @click="openOwnerModal(false)" type="primary">
                            <template #icon>
                                <n-icon>
                                    <add-icon />
                                </n-icon>
                            </template>
                            添加业主
                        </n-button>
                    </n-space>
                </template>
                <n-table style="margin: 0" striped>
                    <thead>
                        <tr>
                            <th>业主ID</th>
                            <th>姓名</th>
                            <th>性别</th>
                            <th>年龄</th>
                            <th>身份证</th>
                            <th>联系方式</th>
                            <th>微信</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody v-if="ownerData.length <= 0">
                        <tr>
                            <td colspan="8" style="text-align:center;">暂无数据</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr v-for="(item, index) in ownerData" :key="index">
                            <td>
                                <n-ellipsis style="max-width: 160px">
                                    {{ item.ownerNo }}
                                </n-ellipsis>
                            </td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.gender === 1 ? '男' : '女' }}</td>
                            <td>{{ item.age }}</td>
                            <td>
                                <n-ellipsis style="max-width: 160px">
                                    {{ item.idCard }}
                                </n-ellipsis>
                            </td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.weCat }}</td>
                            <td>
                                <n-button-group size="large">
                                    <n-dropdown @select="ownerMoreSelect($event, item)" placement="bottom-start"
                                        trigger="click" size="small" :options="options">
                                        <n-button size="small">变更</n-button>
                                    </n-dropdown>
                                    <n-button @click="openHousingUnbundlingOrInfo(true, item)" size="small">详情
                                    </n-button>
                                </n-button-group>
                            </td>
                        </tr>
                    </tbody>
                </n-table>

                <div v-if="ownerPages > 1"
                    style="display: flex;justify-content: center;align-items: center;margin-top: 24px;">
                    <n-pagination @update:page="ownerPageUpdate" :page-count="ownerPages" />
                </div>

            </n-card>

        </n-spin>

        <!-- 业主模态框 -->
        <n-modal :auto-focus="false" v-model:show="showOwnerModal" class="custom-card" preset="card"
            style="width: 800px" :title="ownerStatus ? '修改' : '添加' + '业主'" transform-origin="center" size="huge"
            :bordered="false" :segmented="{ content: 'soft', footer: 'soft' }">
            <n-form ref="ownerFormRef" label-placement="left" :label-width="80" :model="ownerformValue"
                :rules="ownerRules" size="medium">
                <n-grid cols="1 600:2">
                    <n-grid-item>
                        <n-form-item label="姓名" path="user.name">
                            <n-input v-model:value="ownerformValue.user.name" placeholder="输入姓名" />
                        </n-form-item>
                        <n-form-item label="性别" path="user.gender">
                            <n-select v-model:value="ownerformValue.user.gender" placeholder="输入性别"
                                :options="ownerGenderOptions" />
                        </n-form-item>
                        <n-form-item label="年龄" path="user.age">
                            <n-input v-model:value="ownerformValue.user.age" placeholder="输入年龄" />
                        </n-form-item>
                        <n-form-item label="身份证">
                            <n-input v-model:value="ownerformValue.user.idCard" placeholder="输入身份证" />
                        </n-form-item>
                    </n-grid-item>
                    <n-grid-item>
                        <n-form-item label="手机" path="user.phone">
                            <n-input v-model:value="ownerformValue.user.phone" placeholder="输入手机号码" />
                        </n-form-item>
                        <n-form-item label="备注">
                            <n-input v-model:value="ownerformValue.user.remark" placeholder="输入备注" />
                        </n-form-item>
                        <n-form-item label="微信">
                            <n-input v-model:value="ownerformValue.user.weCat" placeholder="输入微信" />
                        </n-form-item>
                    </n-grid-item>
                </n-grid>
            </n-form>
            <template #footer>
                <n-space justify="end">
                    <n-button @click="closeOwnerModal">取消</n-button>
                    <n-button :loading="ownerModelLoading" type="primary" attr-type="button" @click="ownerSubmit">保存
                    </n-button>
                </n-space>
            </template>
        </n-modal>

        <!-- 业主信息模态框 -->
        <n-modal :auto-focus="false" v-model:show="showHousingUnbundlingOrInfo" class="custom-card" preset="card"
            style="width: 800px;" :title="housingUnbundlingOrInfoStatus ? '业主详情' : '房屋解绑'" transform-origin="center"
            size="huge" :bordered="false" :segmented="{ content: 'soft', footer: 'soft' }">
            <n-grid :y-gap="16" style="margin: 16px;" cols="1 400:2 600:3">
                <n-grid-item>
                    <div class="sub-info">
                        编号：{{ ownerInfoData.ownerNo }}
                    </div>
                </n-grid-item>
                <n-grid-item>
                    <div class="sub-info">
                        姓名：{{ ownerInfoData.name }}
                    </div>
                </n-grid-item>
                <n-grid-item>
                    <div class="sub-info">
                        性别：{{ ownerInfoData.gender === 1 ? '男' : '女' }}
                    </div>
                </n-grid-item>
                <n-grid-item>
                    <div class="sub-info">
                        年龄：{{ ownerInfoData.age }}
                    </div>
                </n-grid-item>
                <n-grid-item>
                    <div class="sub-info">
                        身份证：{{ ownerInfoData.idCard }}
                    </div>
                </n-grid-item>
                <n-grid-item>
                    <div class="sub-info">
                        电话：{{ ownerInfoData.phone }}
                    </div>
                </n-grid-item>
                <n-grid-item>
                    <div class="sub-info">
                        微信：{{ ownerInfoData.weCat }}
                    </div>
                </n-grid-item>
                <n-grid-item>
                    <div class="sub-info">
                        备注：{{ ownerInfoData.remark }}
                    </div>
                </n-grid-item>
            </n-grid>

            <n-spin :show="ownerHousingLoading">
                <n-list :show-divider="false">
                    <n-scrollbar style="max-height: 50vh;overflow: hidden;">
                        <n-list-item v-for="(item, index) in ownerInfoData.housingData" :key="index"
                            style="padding: 0 0 10px 0">
                            <n-card :title="item.housesNo + '房屋 信息'">
                                <template v-if="!housingUnbundlingOrInfoStatus" #header-extra>
                                    <n-space>
                                        <n-button @click="unbundling(item.id,ownerInfoData.ownerNo)" strong secondary size="small" type="error">退房</n-button>
                                    </n-space>
                                </template>
                                <n-grid :y-gap="6" style="margin: 16px;" cols="1 400:2 600:3">
                                    <n-grid-item>
                                        <div class="sub-info">
                                            房屋编号：{{ item.housesNo }}
                                        </div>
                                    </n-grid-item>
                                    <n-grid-item>
                                        <div class="sub-info">
                                            楼层：{{ item.floor }}
                                        </div>
                                    </n-grid-item>
                                    <n-grid-item>
                                        <div class="sub-info">
                                            房屋ID：{{ item.id }}
                                        </div>
                                    </n-grid-item>
                                    <n-grid-item>
                                        <div class="sub-info">
                                            建筑面积：{{ item.area }} 平方米
                                        </div>
                                    </n-grid-item>
                                    <n-grid-item>
                                        <div class="sub-info">
                                            户型：{{ item.propertyType }}
                                        </div>
                                    </n-grid-item>
                                    <n-grid-item>
                                        <div class="sub-info">
                                            精装修：{{ item.exquisite === 1 ? '是' : '否' }}
                                        </div>
                                    </n-grid-item>
                                    <n-grid-item>
                                        <div class="sub-info">
                                            备注：{{ item.remark }}
                                        </div>
                                    </n-grid-item>
                                </n-grid>
                            </n-card>
                        </n-list-item>
                    </n-scrollbar>
                </n-list>
            </n-spin>

            <template #footer>
                <n-space justify="end">
                    <n-button @click="showHousingUnbundlingOrInfo = false">关闭</n-button>
                </n-space>
            </template>
        </n-modal>

        <!-- 房屋选择器 -->
        <HousingOption :show="housingOptionShow" :data="housingInfo">
            <template #footer>
                <n-space justify="end">
                    <n-button @click="housingOptionShow = false">取消</n-button>
                    <n-button :loading="housingCheckInLoading" @click="housingCheckIn" type="primary"
                        attr-type="button">选择</n-button>
                </n-space>
            </template>
        </HousingOption>

    </div>
</template>

<script setup>
// 引入 vue
import { ref, inject, reactive, computed } from 'vue'
// 引入 naive-ui 组件
import {
    NCard, NSpace, NInput, NButton, NTable,
    NIcon, NPagination, NButtonGroup, NDropdown,
    NEllipsis, NModal, NGrid, NGridItem, NForm,
    NFormItem, useMessage, NSelect, NSpin, NList,
    NListItem, NScrollbar, useDialog
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

// 引入业主 Hook
import ownerHook from '../../hook/real_estate/ownerInformation/ownerHook'
// 引入加载业主 Hook
import loadOwnerHook from '../../hook/real_estate/ownerInformation/loadOwnerHook'
// 引入 HousingOption
import HousingOption from '../../components/HousingOption.vue'

import axios from 'axios'

const housingOptionShow = ref(false)

// 接收全局变量
const global = inject("global")

// 加载业主
const {
    ownerPageNo, // 业主数据页码
    ownerPages, // 业主数据总页数
    ownerData, // 业主数据
    ownerLoading, // 业主加载
    loadOwnerInfo, // 加载业主信息
    ownerPageUpdate, // 页码改变时事件
} = loadOwnerHook()
// 业主信息
const {
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
} = ownerHook(refreshOwnerData)

// 业主变更选项
const options = [
    {
        label: "修改业主",
        key: 0
    },
    {
        label: "删除业主",
        key: 1
    },
    {
        label: "入住房屋",
        key: 2
    },
    {
        label: "房屋解绑",
        key: 3
    },
];

// 开始加载业主信息
loadOwnerInfo(1);

// 创建消息提示对象
const message = useMessage()
// 创建弹窗对象
const dialog = useDialog()

// 业主查询条件
const ownerFindValue = ref({
    name: '',
    phone: '',
    idCard: '',
})

/**
 * 查询按钮点击事件
 */
const findClick = () => {
    loadOwnerInfo(1, ownerFindValue.value);
}

/**
 * 刷新业主数据
 */
function refreshOwnerData() {
    loadOwnerInfo(ownerPageNo.value, ownerFindValue.value);
}

/**
 * 重置查询条件
 */
const resetClick = () => {
    ownerFindValue.value = {
        name: '',
        phone: '',
        idCard: '',
    }
}

// 业主信息
let ownerInfo = null;
// 房屋信息
const housingInfo = ref({ data: null })

/**
 * 列表项被选中时触发
 */
const ownerMoreSelect = (key, item) => {
    switch (key) {
        case 0: // 修改业主信息
            openOwnerModal(true, item)
            break
        case 1: // 删除业主信息
            deleteOwner(item.id, item.name)
            break
        case 2: // 入住房屋
            housingOptionShow.value = true
            ownerInfo = item
            break
        case 3: // 房屋解绑
            openHousingUnbundlingOrInfo(false, item)
            break
    }
}

// 房屋入住加载
const housingCheckInLoading = ref(false)
/**
 * 房屋入住
 */
const housingCheckIn = () => {
    if (housingInfo.value.data != null) {
        housingCheckInLoading.value = true
        axios({
            method: 'put',
            url: global.api + '/bindHouses/' + housingInfo.value.data.id + '/' + ownerInfo.ownerNo
        }).then(res => {
            if (res.data.success) {
                housingOptionShow.value = false
                message.success("入住成功！")
                ownerInfo = null
            } else {
                message.warning("入住失败！")
            }
        }).catch(err => {
            message.error('入住出现异常！' + err)
        }).finally(() => {
            housingCheckInLoading.value = false
        })
    } else {
        message.warning("请选择房屋！")
    }
}

// 显示房屋解绑模态框
const showHousingUnbundlingOrInfo = ref(false)
// 模态框状态 false 解绑房屋 true 业主信息
const housingUnbundlingOrInfoStatus = ref(false)
// 业主信息
const ownerInfoData = ref({
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
    "memberNo": null,
    "housingData": null
})

/**
 * 打开模态框
 */
const openHousingUnbundlingOrInfo = (status, owner) => {
    ownerInfoData.value = owner
    ownerInfoData.value.housingData = null
    showHousingUnbundlingOrInfo.value = true
    housingUnbundlingOrInfoStatus.value = status
    findOwnerHousing(owner.ownerNo)
}

// 业主房屋信息
const ownerHousingInfo = ref([])
// 业主房屋信息加载
const ownerHousingLoading = ref(false)

/**
 * 根据业主编号查询业主房屋信息
 */
const findOwnerHousing = (ownerNo) => {
    ownerHousingLoading.value = true
    axios({
        method: 'get',
        url: global.api + '/getHousesByOwnerNo/' + ownerNo
    }).then(res => {
        ownerInfoData.value.housingData = res.data
    }).catch(err => {
        message.error('业主房屋信息加载失败！' + err)
    }).finally(() => {
        ownerHousingLoading.value = false
    })
}

/**
 * 房屋解绑
 */
const unbundling = (housingId,ownerNo) => {
    dialog.warning({
        title: "请确认您的操作!",
        content: "确认是否解除对该房屋的绑定!",
        positiveText: "确认",
        negativeText: "取消",
        onPositiveClick: () => {
            let delLoading = message.loading("正在解除绑定")
            axios({
                method: 'put',
                url: global.api + '/unbindHouses/' + housingId
            }).then(res => {
                if (res.data.success) {
                    message.success("解除绑定成功！")
                    findOwnerHousing(ownerNo)
                } else {
                    message.warning("解除绑定失败！")
                }
            }).catch(err => {
                message("解除绑定出现异常！" + err)
            }).finally(() => {
                delLoading.destroy();
                delLoading = null;
            })
        }
    })
}

</script>

<script>
export default {
    name: 'OwnerInformationLayout'
}
</script>

<style scoped>

</style>