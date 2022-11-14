<template>
    <n-el tag="div" class="app">
        <div class="left">
            <n-drawer v-model:show="leftOpen" :width="leftWidth" placement="left" v-if="!leftStatus">
                <n-layout :inverted="leftBlack" has-sider style="height: 100vh">
                    <n-layout-sider :inverted="leftBlack" bordered collapse-mode="width" :collapsed-width="64"
                        :width="leftWidth" :collapsed="!leftOpen">
                        <n-scrollbar>
                            <n-menu ref="menuInstRef" v-model:value="selectedKey" :inverted="leftBlack" accordion
                                :collapsed="!leftOpen" :options="menuOptions" :collapsed-width="64"
                                :collapsed-icon-size="22" />
                        </n-scrollbar>
                    </n-layout-sider>
                </n-layout>
            </n-drawer>

            <n-layout :inverted="leftBlack" has-sider v-else style="height: 100vh">
                <n-layout-sider :inverted="leftBlack" bordered collapse-mode="width" :collapsed-width="64"
                    :width="leftWidth" :collapsed="!leftOpen">
                    <n-scrollbar style="max-height: 100vh">
                        <n-menu ref="menuInstRef" v-model:value="selectedKey" :inverted="leftBlack" accordion
                            :collapsed="!leftOpen" :options="menuOptions" :collapsed-width="64"
                            :collapsed-icon-size="22" />
                    </n-scrollbar>
                </n-layout-sider>
            </n-layout>
        </div>
        <div class="right">
            <ActionBar :title="title" @menuClick="leftOpen = !leftOpen" :menuStatus="leftOpen" :menuEnable="true">
                <!-- 搜索按钮 -->
                <n-button @click="searchModal = true" style="width:var(--height-medium);height:var(--height-medium);"
                    quaternary circle>
                    <!-- 图片插槽 -->
                    <template #icon>
                        <n-icon>
                            <search-icon />
                        </n-icon>
                    </template>
                </n-button>
                <!-- Dark 按钮 -->
                <n-button @click="dark = !dark"
                    style="width:var(--height-medium);height:var(--height-medium);margin-left:6px;" quaternary circle>
                    <!-- 图片插槽 -->
                    <template #icon>
                        <n-icon>
                            <moon-icon v-show="!dark" />
                            <sunny-icon v-show="dark" />
                        </n-icon>
                    </template>
                </n-button>
            </ActionBar>
            <!-- 路由 -->
            <n-scrollbar style="flex: 1;">
                <router-view v-slot="{ Component }">
                    <transition name="aside-right" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </n-scrollbar>
        </div>
    </n-el>

    <n-modal v-model:show="searchModal" preset="card" style="width: 400px" title="搜索">

        <n-input v-model:value="searchText" style="margin-top: 16px;" placeholder="搜索">
            <template #prefix>
                <n-icon :component="SearchIcon" />
            </template>
        </n-input>

        <n-list style="margin-top: 10px;" hoverable clickable>
            <n-list-item :key="index" v-for="(item,index) in searchList">
                <router-link style="text-decoration: none;" :to="item.to">
                    <n-thing @click="searchModal = false" :title="item.name" content-style="margin-top: 10px;" />
                </router-link>
            </n-list-item>
        </n-list>

        <template #footer>
            <div style="width: 100%;text-align:right;">
                <n-button @click="searchModal = false">关闭</n-button>
            </div>
        </template>

    </n-modal>

</template>

<script setup>
// 引入 vue
import { ref, h, getCurrentInstance, watch, inject, provide } from 'vue'
// 引入 naive ui 组件
import {
    NButton, NSpace, NGrid, NGridItem, NEl,
    NIcon, NMenu, NLayoutSider, NLayout, NDrawer,
    NDrawerContent, NScrollbar, NAvatar, NModal,
    NInput, NList, NListItem, NThing, useLoadingBar
} from 'naive-ui'
// 引入 应用栏组件
import ActionBar from '@/components/ActionBar.vue'
// 引入路由
import { RouterLink, useRouter } from 'vue-router'
// 引入图像
import {
    Home20Regular as HomeIcon,
    Home20Regular as AcBcDcIcon,
    Building20Regular as Home20Regular,
    Money20Regular as MoneyIcon,
    BezierCurveSquare20Regular as BezierCurveSquareIcon,
    VehicleCarProfileLtr20Regular as VehicleCarProfileLtrIcon,
    CalendarEdit20Regular as CalendarEditIcon,
    ShoppingBag20Regular as ShoppingBagIcon,
    DeveloperBoard20Regular as DeveloperBoardIcon,
    Syringe20Regular as SyringeIcon,
    WeatherSunny24Regular as SunnyIcon,
    WeatherMoon16Regular as MoonIcon,
    Search32Regular as SearchIcon
} from "@vicons/fluent"

// 图标渲染
function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

// 当前选中的项
const selectedKey = ref("home");
const menuInstRef = ref(null);
const selectAndExpand = (key) => {
    selectedKey.value = key;
    menuInstRef.value?.showOption(key);
};
const title = ref([{
    lable: '首页'
}])

const router = useRouter();
const loadingBar = useLoadingBar()

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    loadingBar.start();
    next();
});

router.afterEach((to, from) => {
    loadingBar.finish()
})

selectAndExpand(useRouter().currentRoute._rawValue.name);

// 设置当前选中的项
getCurrentInstance()?.appContext.config.globalProperties.$router.beforeEach((to, from, next) => {
    // 改变侧边栏选项
    selectAndExpand(to.name);
    // 更新标题
    updateTitle(to)
    // 放行
    next();
})

// 侧边栏数据
const menuOptions = [
    // 首页
    {
        label: () => h(RouterLink, { to: '/' }, { default: () => '首页' }),
        key: "home",
        icon: renderIcon(HomeIcon)
    },
    // 房产
    {
        label: '房产',
        key: "realEstate",
        icon: renderIcon(Home20Regular),
        children: [
            {
                label: () => h(RouterLink, { to: '/realestate/housingmanagement' }, { default: () => '房屋管理' }), key: "housingManagement",
            },
            {
                label: () => h(RouterLink, { to: '/realestate/ownerinformation' }, { default: () => '业主信息' }), key: "ownerInformation",
            },
            {
                label: () => h(RouterLink, { to: '/realestate/ownermember' }, { default: () => '业主成员' }), key: "ownerMember",
            },
            {
                label: () => h(RouterLink, { to: '/realestate/bindtheowner' }, { default: () => '绑定业主' }), key: "bindTheOwner",
            },
        ]
    },
    // 费用
    /* {
        label: "费用",
        key: "cost",
        icon: renderIcon(MoneyIcon),
        children: [
            {
                label: () => h(RouterLink, { to: '/' }, { default: () => '费用项设置' }), key: "expenseItemSettings",
            },
            {
                label: () => h(RouterLink, { to: '/' }, { default: () => '费用套餐' }), key: "feePackage",
            },
            {
                label: () => h(RouterLink, { to: '/' }, { default: () => '房屋收费' }), key: "housingHarges",
            },
        ]
    }, */
    // 办公
    {
        label: "办公",
        key: "office",
        icon: renderIcon(BezierCurveSquareIcon),
        children: [
            {
                label: () => h(RouterLink, { to: '/office/annouce' }, { default: () => '发布公告' }), key: "annouce",
            },
            {
                label: () => h(RouterLink, { to: '/office/phonecomplaint' }, { default: () => '电话投诉' }), key: "phoneComplaint",
            },
            {
                label: () => h(RouterLink, { to: '/office/touristregistration' }, { default: () => '访客登记' }), key: "touristRegistration",
            },
            /* {
                label: () => h(RouterLink, { to: '/office/ruleofactivity' }, { default: () => '活动规则' }), key: "ruleOfActivity",
            }, */
        ]
    },
    // 停车
    {
        label: "停车",
        key: "parking",
        icon: renderIcon(VehicleCarProfileLtrIcon),
        children: [
            {
                label: () => h(RouterLink, { to: '/parking/parkinglotmanagement' }, { default: () => '停车场管理' }), key: "parkingLotManagement",
            },
            {
                label: () => h(RouterLink, { to: '/parking/parkingspacemanagement' }, { default: () => '车位管理' }), key: "parkingSpaceManagement",
            },
            {
                label: () => h(RouterLink, { to: '/parking/boothmanagement' }, { default: () => '岗亭管理' }), key: "boothManagement",
            },
            {
                label: () => h(RouterLink, { to: '/parking/ownervehicle' }, { default: () => '业主车辆' }), key: "ownerVehicle",
            },
            {
                label: () => h(RouterLink, { to: '/parking/approachrecord' }, { default: () => '进场记录' }), key: "approachRecord",
            },
            {
                label: () => h(RouterLink, { to: '/parking/blackandwhitelist' }, { default: () => '黑白名单' }), key: "blackAndWhiteList",
            },
            {
                label: () => h(RouterLink, { to: '/parking/remainingparkingspaces' }, { default: () => '剩余车位' }), key: "remainingParkingSpaces",
            },
            {
                label: () => h(RouterLink, { to: '/parking/parkingspaceapplication' }, { default: () => '车位申请' }), key: "parkingSpaceApplication",
            },
        ]
    },
    // 报修
    {
        label: "报修",
        key: "repair",
        icon: renderIcon(CalendarEditIcon),
        children: [
            {
                label: () => h(RouterLink, { to: '/repair/warrantysettings' }, { default: () => '报修设置' }), key: "warrantySettings",
            },
            {
                label: () => h(RouterLink, { to: '/repair/telephonerepair' }, { default: () => '电话报修' }), key: "telephoneRepair",
            },
            {
                label: () => h(RouterLink, { to: '/repair/ticketpool' }, { default: () => '工单池' }), key: "ticketPool",
            },
            {
                label: () => h(RouterLink, { to: '/' }, { default: () => '报修待办' }), key: "repairPending",
            },
            {
                label: () => h(RouterLink, { to: '/repair/repairhasbeendone' }, { default: () => '报修已办' }), key: "repairHasBeenDone",
            },
            {
                label: () => h(RouterLink, { to: '/repair/repairvisit' }, { default: () => '报修回访' }), key: "repairVisit",
            },
            /* {
                label: () => h(RouterLink, { to: '/repair/mandatoryreturnvisit' }, { default: () => '强制回单' }), key: "mandatoryReturnVisit",
            }, */
        ]
    },
    // 采购
    /* {
        label: "采购",
        key: "purchase",
        icon: renderIcon(ShoppingBagIcon),
        children: [
            {
                label: () => h(RouterLink, { to: '/' }, { default: () => '仓库信息' }), key: "warehouseInformation",
            },
            {
                label: () => h(RouterLink, { to: '/' }, { default: () => '物品信息' }), key: "itemInformation",
            },
            {
                label: () => h(RouterLink, { to: '/' }, { default: () => '物品类型' }), key: "itemType",
            },
            {
                label: () => h(RouterLink, { to: '/' }, { default: () => '物品供应商' }), key: "itemupplier",
            },
            {
                label: () => h(RouterLink, { to: '/' }, { default: () => '物品规格' }), key: "ItemSpecifications",
            },
            {
                label: () => h(RouterLink, { to: '/' }, { default: () => '采购申请' }), key: "purchaseRequisition",
            },
            {
                label: () => h(RouterLink, { to: '/' }, { default: () => '出入库明细' }), key: "inboundAndOutboundDetails",
            },
            {
                label: () => h(RouterLink, { to: '/' }, { default: () => '物品使用记录' }), key: "itemUsageRecord",
            },
        ]
    }, */
    // 设备
    {
        label: "设备",
        key: "equipment",
        icon: renderIcon(DeveloperBoardIcon),
        children: [
            {
                label: () => h(RouterLink, { to: '/equipment/devicelocation' }, { default: () => '设备位置' }), key: "deviceLocation",
            },
            {
                label: () => h(RouterLink, { to: '/equipment/equipmenttype' }, { default: () => '设备类型' }), key: "equipmentType",
            },
            {
                label: () => h(RouterLink, { to: '/equipment/deviceinformation' }, { default: () => '设备信息' }), key: "deviceInformation",
            },
            {
                label: () => h(RouterLink, { to: '/equipment/accesscontrolequipment' }, { default: () => '门禁设备' }), key: "accessControlEquipment",
            },
            {
                label: () => h(RouterLink, { to: '/equipment/vehiclebarrier' }, { default: () => '车辆道闸' }), key: "vehicleBarrier",
            },
            {
                label: () => h(RouterLink, { to: '/equipment/monitoringequipment' }, { default: () => '监控设备' }), key: "monitoringEquipment",
            },
            {
                label: () => h(RouterLink, { to: '/equipment/attendancemachine' }, { default: () => '考勤机' }), key: "attendanceMachine",
            },
            {
                label: () => h(RouterLink, { to: '/equipment/opendoorrecord' }, { default: () => '开门记录' }), key: "openDoorRecord",
            },
            {
                label: () => h(RouterLink, { to: '/equipment/employeeaccesscontrolauthorization' }, { default: () => '员工门禁授权' }), key: "employeeAccessControlAuthorization",
            },
            /* {
                label: () => h(RouterLink, { to: '/equipment/requestkey' }, { default: () => '申请钥匙' }), key: "requestKey",
            }, */
        ]
    },
    // 疫情
    {
        label: "疫情",
        key: "epidemic",
        icon: renderIcon(SyringeIcon),
        children: [
            {
                label: () => h(RouterLink, { to: '/epidemic/epidemicsettings' }, { default: () => '疫情设置' }), key: "epidemicSettings",
            },
            {
                label: () => h(RouterLink, { to: '/epidemic/reportbacktotheprovince' }, { default: () => '返省上报' }), key: "reportBackToTheProvince",
            },
            {
                label: () => h(RouterLink, { to: '/epidemic/epidemicreport' }, { default: () => '疫情上报' }), key: "epidemicReport",
            }
        ]
    }
];
// 侧边栏宽度
const leftWidth = 180;
// 侧边栏是否打开
const leftOpen = ref(true);
// 侧边栏模式
const leftStatus = ref(false);
// 侧边栏颜色
const leftBlack = ref(true);
// 深色模式
const dark = inject('dark');
// 获取路由信息
const to = router.currentRoute._value;

// 窗口变化时触发
window.onresize = () => {
    return (() => {
        initWindow();
    })()
}

// 初始化窗口函数
const initWindow = () => {
    // 获取窗口宽度
    let width = document.body.clientWidth
    // 宽度低于 1024 则使用抽屉模式
    if (width < 1024) {
        leftOpen.value = false;
        leftStatus.value = false;
    } else {
        leftOpen.value = true;
        leftStatus.value = true;
    }
    // 更新标题
    updateTitle(to)
}
// 初始化窗口
initWindow();

// 更新面包屑标题
function updateTitle(to) {
    // 将标题清空
    title.value = []
    // 
    if (to.matched.length === 2) {
        title.value.push({
            lable: '首页'
        })
    } else {
        // 遍历路由信息
        for (let toInfo of to.matched) {
            // 过滤 home 与 main 路由
            if (toInfo.name !== 'home' && toInfo.name !== 'main') {
                // 获取路由标题并添加至标题数组中
                title.value.push({
                    lable: toInfo.meta.title
                })
            }
        }
    }
}

// 搜索框
const searchModal = ref(false)
// 获取所有路由信息
const routesRoot = router.options.routes
// 输入的内容
const searchText = ref('')
// 计算得到的列表
const searchList = ref([])
// 计算所匹配的内容
watch(searchText, () => {
    searchList.value = []
    if (searchText.value.trim() !== '') {
        findRouters('', '', searchText.value, routesRoot, searchList.value)
    }
})

// 搜索方法
function findRouters(name, to, str, routesRoot, list) {
    for (let info of routesRoot) {
        if (info.children != null || info.meta.title.includes(str) || info.name === 'main') {
            const title = info.name === 'main' ? '' : (name === '' ? '' : ' / ') + info.meta.title;
            const path = info.path.indexOf("/") !== -1 ? info.path === '/' ? '' : info.path : "/" + info.path;
            if (info.children != null) {
                findRouters(name + title, to + path, str, info.children, list)
            } else {
                list.push({
                    name: name + title,
                    to: to + path
                })
            }
        }
    }
}
// 切换路由
function openPage(name) {
    router.push({ name })
}

</script>
<script>
export default {
    name: 'MainLayout'
}
</script>

<style scoped>
.app {
    display: flex;
    flex-direction: row;
}

.app>.left {
    flex: none;
    z-index: 1;
    height: 100vh;
    /* box-shadow: 5px 0 10px var(--divider-color); */
    border-right: 1px solid var(--divider-color);
}

.app>.right {
    flex: 1;
    height: 100vh;
    display: flex;
    flex-direction: column;
}

/* 路由动画 */
@import url(../assets/style/page-animation.css);
</style>