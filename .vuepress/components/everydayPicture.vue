<template>
  <div class="sticky">
    <el-button type="primary" round :icon="Back" v-if="prev" @click="upperLevel()">返回上一级</el-button>
    <el-button round :icon="Upload">
      <el-upload action="" :show-file-list="false" :http-request="importData" multiple>
        上传图片
      </el-upload>
    </el-button>
    <el-button round :icon="DocumentAdd" @click="newFolder()">新建文件夹</el-button>
  </div>
  <el-empty description="NO Data" v-if="!items.length && !loading"/>
  <div v-loading="loading">
    <Waterfall :list="items" :breakpoints="breakpoints" v-if="!WaterfallShow">
      <template #item="{item,index}">
        <div class="card">
          <div v-if="item.Prefix" class="connent" @click="getImageList(item.Prefix)">
            <div class="boxImg-del" @click.stop="delImg(item.Prefix,index,'Prefix')">
              <el-icon color="#fff"><Delete /></el-icon>
            </div>
            <SvgIcon name="T-wenjianjia" :size="60"/>
            <div>{{ partsValue(item.Prefix) }}</div>
          </div>
          <template v-else>
            <div class="boxImg">
              <div class="boxImg-del" @click="delImg(item.Key,index,'Key')">
                <el-icon color="#fff"><Delete /></el-icon>
              </div>
              <LazyImg :url="item.image+'?compress20'"/>
              <!-- <p class="text">这是具体内容</p> -->
            </div>
          </template>
        </div>
      </template>
    </Waterfall>
  </div>
</template>

<script lang='ts' setup>
import { 
  getImage, 
  uploadImageToCos, 
  deleteImageFromCos,
  createFolderInCos,
  deleteFolderFromCos
} from "@utils/images";
import { Upload, DocumentAdd,Back,Delete } from '@element-plus/icons-vue'
import { nextTick, onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'
import { LazyImg, Waterfall } from '@/components/Waterfall'

const items = ref<any>([])
const loading = ref(false)
const WaterfallShow = ref(false)
const prev = ref(false)

const breakpoints = {
  1200: { //当屏幕宽度小于等于1200
    rowPerView: 4,
  },
  800: { //当屏幕宽度小于等于800
    rowPerView: 3,
  },
  500: { //当屏幕宽度小于等于500
    rowPerView: 2,
  }
}

// 当前路径
const PrefixKsy = ref('images/blogs/')
 
// 获取图片列表
const getImageList = (name) => {
  loading.value = true
  WaterfallShow.value = true
  getImage(name).then((result) => {
    const { CommonPrefixes, imageList, Prefix } = result
    // 记录当前目录
    PrefixKsy.value = Prefix

    // 判断是否有上级目录
    const array = Prefix.split('/').filter((item) => item.trim())
    if (array.length > 1) {
      prev.value = true
    }

    // 合并数组
    items.value = [...CommonPrefixes, ...imageList ]
  }).catch((err) => {
    ElMessage({
      showClose: true,
      message: err,
      type: 'error',
    })
  }).finally(()=>{
    loading.value = false
    WaterfallShow.value = false
  })
}

// 返回上一级
const upperLevel = () => {
  console.log(PrefixKsy.value);
  const value = PrefixKsy.value.split('/').filter((item) => item.trim()).slice(0, -1).join('/')+'/'
  getImageList(value)
}

// 解析路径
const partsValue = (path) => {
  const parts = path.split("/"); // 使用 "/" 将字符串拆分为子字符串数组
  const value = parts[parts.length - 2]; // 获取倒数第二个部分
  return value
}

// 上传图片
const importData = (params:any)=> {
  const {file: {size, name}} = params
  const isLimit = size / 1024 / 1024 <= 10
  const typeTest = /\.jpeg|jpg|.png|.gif|.webp$/g.test(name.toLowerCase())
  if (!typeTest) {
      ElMessage({
      showClose: true,
      message: '请上传 jpeg/jpg/png/webp 格式的图片',
      type: 'error',
    })
    return
  }
  if (!isLimit) {
    ElMessage({
      showClose: true,
      message: '文件大小超过 10MB 的限制！',
      type: 'error',
    })
    return
  }
  uploadImageToCos(params.file,PrefixKsy.value).then((result) => {
    getImageList(PrefixKsy.value)
  }).catch((err) => {
    ElMessage({
      showClose: true,
      message: err,
      type: 'error',
    })
  })
}

// 删除
const delImg = (Key,index,name) => {
  let title = ''
  let tip = ''
  if (name === 'Prefix') {
    title = '删除操作会同时删除文件夹下所有文件，删除后数据不可恢复和访问。'
    tip = `确定删除文件夹${partsValue(Key)}吗？`
  }else {
    title = '确定删除当前图片?'
    tip = '提示'
  }
  ElMessageBox.confirm(
    title,
    tip,
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
      distinguishCancelAndClose:true
    }
  ).then(() => {
    loading.value = true
    if (name === 'Prefix') {
      return deleteFolderFromCos(Key,name)
    }else {
      return deleteImageFromCos(Key,name)
    }
  }).then(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const array = items.value.filter((item,i)=>{
      if (i !== index) {
        return item
      }
    })
    items.value = []
    setTimeout(() => {
      items.value = [...array]
      nextTick(()=>{
        window.scrollTo(0, scrollTop);
      })
    }, 0)
  }).catch((err) => {
    if (['close','cancel'].includes(err)) {
      return
    }
    ElMessage({
      showClose: true,
      message: err,
      type: 'error',
    })
  }).finally(()=>{
    loading.value = false
  })
}

// 新建文件夹
const newFolder = () => {
  ElMessageBox.prompt('请输入文件夹名称', '', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: /^(?!\s*$).+/,
    inputErrorMessage: '请输入文件夹名称',
    distinguishCancelAndClose:true
  }).then(({ value }) => {
    return createFolderInCos(PrefixKsy.value,value)
  }).then((result) => {
    items.value.splice(0,0,result)
  }).catch((err) => {
    if (['close','cancel'].includes(err)) {
      return
    }
    ElMessage({
      showClose: true,
      message: err,
      type: 'error',
    })
  }).finally(()=>{
    loading.value = false
  })
}

onMounted(() => { 
  getImageList(PrefixKsy.value)
});
</script>

<style lang='scss' scoped>
.waterfall-card {
  .connent {
    position: relative;
    cursor: pointer;
    text-align: center;
    &:hover {
      >div {
        font-weight: 700;
      }
    }
  }
  .lazy__box {
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    box-shadow: 1px 1px 10px 0px rgb(0 0 0 / 10%);
  }
}
.sticky {
  position: sticky;
  top: 0px;
  z-index: 1;
  background-color: #fff;
  padding: 10px 0;
  .el-button {
    margin: 0 12px;
    margin-bottom: 10px;
  }
}

.boxImg {
  position: relative;
  min-height: 40px;
}
.boxImg-del {
  position: absolute;
  right: 0;
  width: 0px;
  height: 0px;
  border-top: 20px solid var(--primaryColor);
  border-right: 20px solid var(--primaryColor);
  border-left: 20px solid #ffffff00;
  border-bottom: 20px solid #ffffff00;
  border-radius: 4px;
  z-index: 1;
  cursor: pointer;
  .el-icon {
    position: relative;
    top: -18px;
  }
}
</style>