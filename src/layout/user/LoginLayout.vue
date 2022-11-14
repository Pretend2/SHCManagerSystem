<template>
    <div class="body">
        <!-- 标题 -->
        <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;margin-bottom: 10px;">
            <h1>SHC 社区管理系统</h1>
        </div>
        <!-- form 表单 -->
        <n-form label-placement="left" ref="formRef" :model="formValue" :rules="rules" size="medium"
            style="width: 280px;">
            <n-form-item path="account">
                <n-input v-model:value="formValue.account" placeholder="请输入账号" />
            </n-form-item>
            <n-form-item path="password">
                <n-input type="password" v-model:value="formValue.password" placeholder="请输入密码" />
            </n-form-item>
            <n-form-item path="code">
                <n-input-group>
                    <n-input v-model:value="formValue.code" placeholder="请输入验证码" />
                    <image-code :change="data.change_img_code" @click="changeImageCode" @getCode="backImageCode">
                    </image-code>
                </n-input-group>
            </n-form-item>
            <n-form-item>
                <n-checkbox v-model:checked="formValue.autoLogin">
                    记住密码
                </n-checkbox>
            </n-form-item>
            <n-form-item>
                <n-button :loading="formValue.loading" style="width: 100%;" type="primary" attr-type="button" @click="loginClick">
                    登录
                </n-button>
            </n-form-item>
        </n-form>
    </div>
</template>

<script setup>
// 引入 vue
import { ref, reactive, inject } from 'vue'
// 引入 naive-ui 组件
import {
    NForm, NFormItem, NButton, NInput, NCheckbox,
    NInputGroup, useMessage
} from 'naive-ui'
// 引入图形验证码组件
import imageCode from '../../components/ImageCode.vue'
// 引入 md5 插件
import md5 from 'md5';
import axios from 'axios';

import { useRouter } from 'vue-router'

// 接收全局
const global = inject('global');

// 获取路由对象
const router = useRouter();

// 验证码数据
const data = reactive({
    change_img_code: false, // 刷新验证码
    img_code: '',// 加密后的验证码值
})

// 刷新验证码操作
const changeImageCode = () => {
    data.change_img_code = !data.change_img_code
}

// 接收组件返回加密后的验证码值
const backImageCode = (code) => {
    data.img_code = code
}


const formRef = ref(null)
const message = useMessage()

const formValue = ref({
    account: "",
    password: "",
    code: "",
    autoLogin: false,
    loading: false
})
const rules = {
    account: {
        required: true,
        message: "请输入账号",
        trigger: ["input", "blur"]
    },
    password: {
        required: true,
        message: "请输入密码",
        trigger: ["input", "blur"]
    },
    code: {
        required: true,
        message: "请输入验证码",
        trigger: ["input", "blur"]
    }
}

// 登录按钮点事件
const loginClick = (e) => {
    e.preventDefault();
    formRef.value?.validate((errors) => {
        if (!errors) {
            if (data.img_code === md5(formValue.value.code.toLowerCase())) {
                // message.success("验证码校验成功！");
                changeImageCode(); // 刷新验证码
                login() // 登录
            } else {
                message.warning("验证码输入错误！");
            }
        }
    })
}

// 登录
function login() {
    formValue.value.loading = true
    axios({
        url: global.api + '/login',
        params: {
            account: formValue.value.account,
            password: formValue.value.password
        }
    }).then(res => {
        const data = res.data
        if (data.success) {
            localStorage.setItem("user",JSON.stringify(data.data))
            router.replace("/")
        } else {
            message.warning(data.message);
        }

    }).catch(err => {
        message.error("请求异常！" + err)
    }).finally(() => {
        formValue.value.loading = false
    })
}

</script>

<script>
export default {
    name: 'LoginLayout'
}
</script>

<style scoped>
.body {
    background: url(../../assets/login/loginBg.svg);
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
</style>