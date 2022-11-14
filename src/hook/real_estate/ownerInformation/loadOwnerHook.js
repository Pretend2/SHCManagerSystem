import { ref, inject } from 'vue'
import { useMessage } from 'naive-ui'
import QueryString from 'qs'
import axios from 'axios'
import {mergeObject} from '../../../util/BaseUtil.js'

// 加载业主信息
export default () => {
    // 获取消息对象
    const message = useMessage();

    // 获取全局变量
    const global = inject("global")
    // 业主加载
    const ownerLoading = ref(false);

    // 当前页码
    const ownerPageNo = ref(1);
    // 总页数
    const ownerPages = ref(1);
    // 业主数据
    const ownerData = ref([])

    /**
     * 加载业主信息
     * @param {页码} page 
     */
    const loadOwnerInfo = (page,more) => {
        ownerLoading.value = true
        const params = {
            page,
            size: global.pageSize
        }
        mergeObject(params,more) // 合并对象
        axios({
            method: 'get',
            url: global.api + '/getAllOwner',
            params
        }).then(res => {
            // 设置业主数据
            ownerData.value = res.data.list
            // 设置当前页码
            ownerPageNo.value = res.data.pageNum
            // 设置总页数
            ownerPages.value = res.data.pages
        }).catch(err => {
            message.error("业主列表加载异常！" + err);
        }).finally(() => {
            ownerLoading.value = false
        })
    }
    
    /**
     * 页码发生改变时触发
     * @param {页码} page 
     */
    const ownerPageUpdate = (page) => {
        loadOwnerInfo(page) // 加载数据
    }

    return {
        ownerPageNo, // 业主数据页码
        ownerPages, // 业主数据总页数
        ownerData, // 业主数据
        ownerLoading, // 业主加载
        loadOwnerInfo, // 加载业主信息
        ownerPageUpdate, // 页码改变时事件
    }
}