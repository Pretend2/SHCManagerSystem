// 导入包
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        // 主页
        name: 'main',
        path: '/',
        component: () => import('../layout/MainLayout.vue'),
        meta: {
            title: '主页'
        },
        children: [
            {
                // 首页
                name: 'home',
                path: '/',
                component: () => import('../layout/HomeLayout.vue'),
                meta: {
                    title: '首页'
                },
            },
            {
                // 房产
                name: 'realEstate',
                path: 'realestate',
                component: () => import('../layout/real_estate/MainLayout.vue'),
                meta: {
                    title: '房产'
                },
                children: [
                    {
                        // 房屋管理
                        name: 'housingManagement',
                        path: 'housingmanagement',
                        component: () => import('../layout/real_estate/HousingManagementLayout.vue'),
                        meta: {
                            title: '房屋管理'
                        },
                    },
                    {
                        // 业主信息
                        name: 'ownerInformation',
                        path: 'ownerinformation',
                        component: () => import('../layout/real_estate/OwnerInformationLayout.vue'),
                        meta: {
                            title: '业主信息'
                        }
                    },
                    {
                        // 业主成员
                        name: 'ownerMember',
                        path: 'ownermember',
                        component: () => import('../layout/real_estate/OwnerMemberLayout.vue'),
                        meta: {
                            title: '业主成员'
                        }
                    },
                    {
                        // 业主绑定
                        name: 'bindTheOwner',
                        path: 'bindtheowner',
                        component: () => import('../layout/real_estate/BindTheOwnerLayout.vue'),
                        meta: {
                            title: '业主绑定'
                        }
                    }
                ]
            },
            {
                // 办公
                name: 'office',
                path: 'office',
                component: () => import('../layout/office/MainLayout.vue'),
                meta: {
                    title: '办公'
                },
                children: [
                    {
                        // 发布公告
                        name: 'annouce',
                        path: 'annouce',
                        component: () => import('../layout/office/AnnouceLayout.vue'),
                        meta: {
                            title: '发布公告'
                        }
                    },
                    {
                        // 电话投诉
                        name: 'phoneComplaint',
                        path: 'phonecomplaint',
                        component: () => import('../layout/office/PhoneComplaintLayout.vue'),
                        meta: {
                            title: '电话投诉'
                        }
                    },
                    {
                        // 访客登记
                        name: 'touristRegistration',
                        path: 'touristregistration',
                        component: () => import('../layout/office/TouristRegistrationLayout.vue'),
                        meta: {
                            title: '访客登记'
                        }
                    },
                    {
                        // 活动规则
                        name: 'ruleOfActivity',
                        path: 'ruleofactivity',
                        component: () => import('../layout/office/RuleOfActivityLayout.vue'),
                        meta: {
                            title: '活动规则'
                        }
                    }
                ]
            },
            {
                // 停车
                name: 'parking',
                path: 'parking',
                component: () => import('../layout/parking/MainLayout.vue'),
                meta: {
                    title: '停车'
                },
                children: [
                    {
                        // 停车场管理
                        name: 'parkingLotManagement',
                        path: 'parkinglotmanagement',
                        component: () => import('../layout/parking/ParkingLotManagementLayout.vue'),
                        meta: {
                            title: '停车场管理'
                        }
                    },
                    {
                        // 车位管理
                        name: 'parkingSpaceManagement',
                        path: 'parkingspacemanagement',
                        component: () => import('../layout/parking/ParkingSpaceManagementLayout.vue'),
                        meta: {
                            title: '车位管理'
                        }
                    },
                    {
                        // 车位管理
                        name: 'boothManagement',
                        path: 'boothmanagement',
                        component: () => import('../layout/parking/BoothManagementLayout.vue'),
                        meta: {
                            title: '岗亭管理'
                        }
                    },
                    {
                        // 业主车辆
                        name: 'ownerVehicle',
                        path: 'ownervehicle',
                        component: () => import('../layout/parking/OwnerVehicleLayout.vue'),
                        meta: {
                            title: '业主车辆'
                        }
                    },
                    {
                        // 进场记录
                        name: 'approachRecord',
                        path: 'approachrecord',
                        component: () => import('../layout/parking/ApproachRecordLayout.vue'),
                        meta: {
                            title: '进场记录'
                        }
                    },
                    {
                        // 黑白名单
                        name: 'blackAndWhiteList',
                        path: 'blackandwhitelist',
                        component: () => import('../layout/parking/BlackAndWhiteListLayout.vue'),
                        meta: {
                            title: '黑暗名单'
                        }
                    },
                    {
                        // 剩余车位
                        name: 'remainingParkingSpaces',
                        path: 'remainingparkingspaces',
                        component: () => import('../layout/parking/RemainingParkingSpacesLayout.vue'),
                        meta: {
                            title: '剩余车位'
                        }
                    },
                    {
                        // 车位申请
                        name: 'parkingSpaceApplication',
                        path: 'parkingspaceapplication',
                        component: () => import('../layout/parking/ParkingSpaceApplicationLayout.vue'),
                        meta: {
                            title: '车位申请'
                        }
                    }
                ]
            },
            {
                // 报修
                name: 'repair',
                path: 'repair',
                component: () => import('../layout/repair/MainLayout.vue'),
                meta: {
                    title: '报修'
                },
                children: [
                    {
                        //报修设置
                        name: 'warrantySettings',
                        path: 'warrantysettings',
                        component: () => import('../layout/repair/WarrantySettingsLayout.vue'),
                        meta: {
                            title: '报修设置'
                        }
                    },
                    {
                        // 电话报修
                        name: 'telephoneRepair',
                        path: 'telephonerepair',
                        component: () => import('../layout/repair/TelephoneRepairLayout.vue'),
                        meta: {
                            title: '电话报修'
                        }
                    },
                    {
                        // 工单池
                        name: 'ticketPool',
                        path: 'ticketpool',
                        component: () => import('../layout/repair/TicketPoolLayout.vue'),
                        meta: {
                            title: '工单池'
                        }
                    },
                    // 此处 <-报修代办
                    {
                        // 报修已办
                        name: 'repairHasBeenDone',
                        path: 'repairhasbeendone',
                        component: () => import('../layout/repair/RepairHasBeenDoneLayout.vue'),
                        meta: {
                            title: '报修已办'
                        }
                    },
                    {
                        // 报修回访
                        name: 'repairVisit',
                        path: 'repairvisit',
                        component: () => import('../layout/repair/RepairVisitLayout.vue'),
                        meta: {
                            title: '报修回访'
                        }
                    },
                    {
                        // 强制回单
                        name: 'mandatoryReturnVisit',
                        path: 'mandatoryreturnvisit',
                        component: () => import('../layout/repair/MandatoryReturnVisitLayout.vue'),
                        meta: {
                            title: '强制回单'
                        }
                    },
                ]
            },
            {
                // 设备
                name: 'equipment',
                path: 'equipment',
                component: () => import('../layout/equipment/MainLayout.vue'),
                meta: {
                    title: '设备',
                },
                children: [
                    {
                        // 设备位置
                        name: 'deviceLocation',
                        path: 'devicelocation',
                        component: () => import('../layout/equipment/DeviceLocationLayout.vue'),
                        meta: {
                            title: '设备位置'
                        }
                    },
                    {
                        // 设备类型
                        name: 'equipmentType',
                        path: 'equipmenttype',
                        component: () => import('../layout/equipment/EquipmentTypeLayout.vue'),
                        meta: {
                            title: '设备类型'
                        }
                    },
                    {
                        // 设备信息
                        name: 'deviceinformation',
                        path: 'deviceInformation',
                        component: () => import('../layout/equipment/DeviceInformationLayout.vue'),
                        meta: {
                            title: '设备信息'
                        }
                    },
                    {
                        // 门禁设备
                        name: 'accessControlEquipment',
                        path: 'accesscontrolequipment',
                        component: () => import('../layout/equipment/AccessControlEquipmentLayout.vue'),
                        meta: {
                            title: '门禁设备'
                        }
                    },
                    {
                        // 车辆道闸
                        name: 'vehicleBarrier',
                        path: 'vehiclebarrier',
                        component: () => import('../layout/equipment/VehicleBarrierLayout.vue'),
                        meta: {
                            title: '车辆道闸'
                        }
                    },
                    {
                        // 监控设备
                        name: 'monitoringEquipment',
                        path: 'monitoringequipment',
                        component: () => import('../layout/equipment/MonitoringEquipmentLayout.vue'),
                        meta: {
                            title: '监控设备'
                        }
                    },
                    {
                        // 考勤机
                        name: 'attendanceMachine',
                        path: 'attendancemachine',
                        component: () => import('../layout/equipment/AttendanceMachineLayout.vue'),
                        meta: {
                            title: '考勤机'
                        }
                    },
                    {
                        // 开门记录
                        name: 'openDoorRecord',
                        path: 'opendoorrecord',
                        component: () => import('../layout/equipment/OpenDoorRecordLayout.vue'),
                        meta: {
                            title: '开门记录'
                        }
                    },
                    {
                        // 员工门禁授权
                        name: 'employeeAccessControlAuthorization',
                        path: 'employeeaccesscontrolauthorization',
                        component: () => import('../layout/equipment/EmployeeAccessControlAuthorizationLayout.vue'),
                        meta: {
                            title: '员工门禁授权'
                        }
                    },
                    {
                        // 申请钥匙
                        name: 'requestkey',
                        path: 'requestkey',
                        component: () => import('../layout/equipment/RequestkeyLayout.vue'),
                        meta: {
                            title: '申请钥匙'
                        }
                    }
                ]
            },
            {
                // 疫情
                name: 'epidemic',
                path: 'epidemic',
                component: () => import('../layout/epidemic/MainLayout.vue'),
                meta: {
                    title: '疫情'
                },
                children: [
                    {
                        // 疫情设置
                        name: 'epidemicSettings',
                        path: 'epidemicsettings',
                        component: () => import('../layout/epidemic/EpidemicSettingsLayout.vue'),
                        meta: {
                            title: '疫情设置'
                        },
                    },
                    {
                        // 返省上报
                        name: 'reportBackToTheProvince',
                        path: 'reportbacktotheprovince',
                        component: () => import('../layout/epidemic/ReportBackToTheProvinceLayout.vue'),
                        meta: {
                            title: '返省上报'
                        },
                    },
                    {
                        // 疫情上报
                        name: 'epidemicReport',
                        path: 'epidemicreport',
                        component: () => import('../layout/epidemic/EpidemicReportLayout.vue'),
                        meta: {
                            title: '疫情上报'
                        }
                    }
                ]
            },
        ]
    },
    {
        // 登录
        name: 'login',
        path: '/login',
        component: () => import('../layout/user/LoginLayout.vue'),
        meta: {
            title: '登录'
        }
    }
]

// 创建路由
export default createRouter({
    history: createWebHashHistory(),
    routes
})