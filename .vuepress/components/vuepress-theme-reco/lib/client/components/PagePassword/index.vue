<template>
  <div class="T-page-password">
    <img class="sign-img normal" v-if="toggle === 0" src="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/login/normal.webp" alt="" />
    <img class="sign-img greeting" v-if="toggle === 1" src="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/login/greeting.webp" alt="" />
    <img class="sign-img blindfold" v-if="toggle === 2" src="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/login/blindfold.webp" alt="" />
    <div class="title">
      <Xicons
        :icon="lockIcon"
        text="暗号：般若波罗蜜"
      />
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef" class="password-ruleForm" :show-message="false">
      <el-form-item prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入作者" autocomplete="off" @focus="toggle = 1" @blur="toggle = 0"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" show-password autocomplete="new-password" @focus="toggle = 2" @blur="toggle = 0"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">进入</el-button>
      </el-form-item>
    </el-form>
    <input
      v-show="false"
      type="password"
      ref="passwordRef"
      v-model="password"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { usePageInfo, useHandlePassword } from './hook'
import { md5 } from '@vuepress-reco/shared'
import { ElMessage } from "element-plus";
import { useThemeLocaleData } from '@vuepress/plugin-theme-data/client'

const themeData = useThemeLocaleData()

const props = defineProps({
  pageData: {
    type: Object,
    default: () => ({}),
  },
})

const toggle = ref(0)

const ruleFormRef = ref(null)

const validatename = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入作者姓名'))
  } else {
    const author = props.pageData?.frontmatter?.author || themeData.value.author
    if (value !== author) {
      callback(new Error('作者姓名错误'))
    }
    callback()
  }
}
const validatepass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    const paw = md5(md5(value))
    if (paw !== props.pageData?.frontmatter?.password) {
      callback(new Error('密码输入错误'))
    }
    callback()
  }
}

const ruleForm = reactive({
  name: '',
  password:''
})


const rules = reactive({
  name: [{ validator: validatename, trigger: 'blur' }],
  password: { validator: validatepass, trigger: 'blur' }
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid,fields) => {
    if (valid) {
      focus()
      password.value = ruleForm.password
    } else {
      const key = Object.keys(fields)
      ElMessage({ showClose: true, message: fields[key[0]][0]?.message||'请检查必填字段', type: 'warning', })
    }
  })
}


const emit = defineEmits(['pass'])

const { pagePassword } = usePageInfo()
const { password, passwordRef, lockIcon, focus } = useHandlePassword(
  pagePassword, emit
)
</script>

<style lang="scss">
.T-page-password {
  position: relative;
  margin-top: 60px;
  padding: 30px;
  height: 250px;
  width: 100%;
  border-radius: 0.5rem;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity));
  border: 1px solid rgb(234 236 239 / var(--tw-border-opacity));
  text-align: center;
  .title {
    margin-bottom: 20px;
  }
  .sign-img {
    width: 120px;
    position: absolute;
    top: 0;
    left: 50%;
  }

  .normal {
    transform: translate(-50%, -83%);
  }
  .greeting {
    transform: translate(-50%, -75.8%);
  }
  .blindfold {
    transform: translate(-50%, -75%);
  }
  .el-input {
    max-width: 300px;
    margin: auto;
  }
  .el-form-item {
    margin-bottom: 25px;
  }
  .el-form-item__error {
    width: 100%;
  }
  .el-button {
    margin: auto;
  }
}
</style>
