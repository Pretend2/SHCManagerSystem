import { ref } from 'vue'

import { useMessage } from 'naive-ui'

export default (refreshList) => {

    // 获取消息对象
    const message = useMessage();

    // 模态框打开
    const showImportPropertyModal = ref(false)

    /**
     * 表单提交事件
     */
    const importPropertySubmit = ({
        file,
        event
    }) => {
        const res = JSON.parse((event?.target).response);
        if (res.success) {
            message.success("共：" + res.data.excelCountTotal + " 行数据，成功：" + res.data.successCount + " 行，失败：" + res.data.failedCount + " 行",{duration: 3000})
            showImportPropertyModal.value = false
            refreshList()
        } else {
            message.warning("导入失败！")
        }
        return file;
    };

    /**
     * 导入房屋
     */
    const importProperty = () => {
        
    }

    /**
     * 打开模态框
     */
    const openImportProperty = () => {
        showImportPropertyModal.value = true
    }

    return {
        showImportPropertyModal, // 模态框打开
        importPropertySubmit, // 表单提交事件
        openImportProperty, // 打开模态框
    }

}