<template>
  <!-- 属性信息 -->
  <div>
    <h4 style="display: flex;">
      <span>属性信息</span>
      <div style="margin-left: 10px;cursor: pointer;">
        <span @click.stop="openDialog"><SvgIcon name="ele-Plus" color="#5D67E8" :size="18"/></span>
      </div>
    </h4>
    <el-collapse v-model="activeNames" class="collapse">
      <el-collapse-item :name="item.id" v-for="(item,index) in combination" :key="item.id">
        <template #title>
          <!-- collapse标题 -->
          <div class="collapse_title">
            <div class="collapse_title--name">
              <span>{{ item.name }}</span>
              <!-- 图标 -->
              <div class="EditPen" @click.stop="rename(item.name)">
                <SvgIcon name="ele-EditPen" color="#5D67E8" :size="18"/>
              </div>
            </div>
            <el-link type="danger" :underline="false" @click.stop="delAttributes(index)">删除</el-link>
          </div>
        </template>
        <div v-for="(e,i) in item.list" class="collapse_content">
          <span>{{ e }}</span>
          <!-- 图标 -->
          <div class="EditPen" style="margin-left: 5px;">
            <span @click.stop="renameAttrValue(item.name,e,index,i)"><SvgIcon name="ele-EditPen" color="#5D67E8" :size="18"/></span>
            <span @click.stop="delAttrValue(index,i)"><SvgIcon name="ele-Delete" color="#5D67E8" :size="18"/></span>
          </div>
        </div>
        <div class="collapse_content--add">
          <span @click.stop="addAttrValue(item.name,index)"><SvgIcon name="ele-Plus" color="#5D67E8" :size="18"/></span>
        </div>
        </el-collapse-item>
    </el-collapse>
    <!-- 添加属性项的弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      title="添加属性"
      width="400px"
      :before-close="handleClose"
    >
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" >
      <el-form-item label="属性名" prop="attributeName">
        <el-input v-model="ruleForm.attributeName" />
      </el-form-item>
      <el-form-item label="属性值" prop="attributeValue">
        <el-input v-model="ruleForm.attributeValue" />
      </el-form-item>
    </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="addAttributes()">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <!-- 属性列表 -->
  <el-form 
  class="table"
  ref="ruleTable"
  :model="skuList"
  label-width="0"
  >
    <h4>属性列表</h4>
    <el-table :data="skuList.slice((currentPage - 1) * pageSize,currentPage * pageSize)" style="width: 100%" table-layout="fixed">
      <el-table-column label="属性信息" align="center" width="200">
        <el-table-column v-for="(item, index) in combination" :key="index" :label="item.name" align="center">
          <template #default="scope">
            {{ scope.row.attributesValue[item.id] }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="SKU" label="SKU" align="center" width="200"/>
      <el-table-column label="售价" align="center" width="200">
        <template #default="scope">
          <el-form-item
            :prop=" `[${scope.$index + pageSize * (currentPage - 1)}].price` "
            :rules="[{trigger: 'blur',validator:validators}]">
            <el-input type="number" v-model="scope.row.price" :min="0"/>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="库存" align="center" width="200">
        <template #default="scope">
          <el-form-item
            :prop=" `[${scope.$index + pageSize * (currentPage - 1)}].stock` "
            :rules="[{trigger: 'blur',validator:validators}]">
            <el-input type="number" v-model="scope.row.stock" :min="0"/>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template #default="scope">
          <el-link type="danger" @click="delSkuList(scope.$index)">删除</el-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      v-model:current-page="currentPage"
      layout="prev, pager, next"
      :total="skuList.length"
      class="pagination"
    />
  </el-form>
  <!-- 属性栏 -->
  <div style="margin-top: 50px;">
    <h4>属性栏</h4>
    <div class="ab_Combining" v-for="item in combination" :key="item.id">
      <div class="name">{{ item.name }}:</div>
      <el-radio-group v-model="attributesValue[item.id]" size="large">
        <el-radio-button
          :label="e"
          v-for="e in item.list"
          :disabled="!checkInventory(item.id, e)"
        />
      </el-radio-group>
    </div>
    您选择的是： {{ attributesValue }}
  </div>
</template>

<script setup>
import { reactive, onMounted, ref, watch,nextTick} from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'

const combination = reactive([
  { name: '颜色', id: 1001, list: ['红色', '蓝色', '绿色'] },
  { name: '尺码', id: 1002, list: ['S', 'M', 'L'] },
  { name: '材质', id: 1003, list: ['棉质', '涤纶'] }
]);

let skuList = reactive([]);

const dialogVisible = ref(false)
const ruleFormRef = ref(null)
const ruleTable = ref(null)

// 分页
const currentPage = ref(1)
const pageSize = ref(10)

const ruleForm = reactive({
  attributeName:'',
  attributeValue:''
})
const rules = reactive({
  attributeName: [
    { required: true, message: '请输入属性名', trigger: 'blur' },
    { min: 1, max: 10, message: '请输入1-10个字符', trigger: 'blur' },
  ],
  attributeValue: [
    { required: true, message: '请输入属性值', trigger: 'blur' },
    { min: 1, max: 10, message: '请输入1-10个字符', trigger: 'blur' },
  ],
})

// 用户所选的值
const attributesValue = ref({
  1001: '',
  1002: '',
  1003: '',
});

const activeNames = ref(1001);

// 监听属性是否有变化
watch(combination, (newValue, oldValue) => {
  let data = combination.map(item=> item.id).reduce((acc, val) => {
    acc[val] = '';
    return acc;
  }, {});
  attributesValue.value = {...data}
});

// 组合多属性
const cartesianProduct = (dataList) => {
  const array = dataList.map((item) =>
    item.list.map((itemVal) => ({ name: item.name, id: item.id, val: itemVal }))
  );
  const datas = [];

  const func = (skuarr = [], i) => {
    for (let j = 0; j < array[i].length; j++) {
      if (i < array.length - 1) {
        skuarr[i] = array[i][j];
        func(skuarr, i + 1);
      } else {
        datas.push([...skuarr, array[i][j]]);
      }
    }
    return datas;
  };

  return func([], 0);
};

// 开始组装每一项变体属性
const newListFun = (newList)=> {
  return newList.map((item,index) => {
    const attributesValue = {};

    item.forEach(({ id, val }) => {
      attributesValue[id] = val;
    });

    return {
      id: new Date().getTime() + '' + index,
      attributes: item,
      attributesValue,
      SKU: item.map((i) => i.val).join(),
      stock: Math.floor(Math.random() * 6), // 生成0-5的随机整数库存
      price: 100,
    };
  });
}

// 判断是否禁用
const checkInventory = (id, val) => {
  // 构造新的 attributesValue 对象
  const newAttributesValue = { ...attributesValue.value, [id]: val };

  for (const sku of skuList) {
    let match = true;
    for (const [key, value] of Object.entries(newAttributesValue)) {
      if (value && sku.attributesValue[key] !== value) {
        match = false;
        break;
      }
    }
    if (match && sku.stock > 0) {
      return true;
    }
  }

  return false;
};

// 更改属性名
const rename = (activeName) => {
  ElMessageBox.prompt('', '修改属性名称', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    draggable: true,
    inputPattern: /^.{0,10}$/,
    inputErrorMessage: '最多输入10个字符',
    inputValue: activeName
  })
  .then(({ value }) => {
    if (value === activeName) return
    // 修改 combination 中对应的name
    combination.forEach(item=> {
      if (item.name === activeName) {
        item.name = value
      }
    })
    // 修改 skuList 中对应的attributes
    const newList = cartesianProduct(combination);
    const list = newList.map(item => item.map(i => i.val).join());
    skuList.forEach(({SKU}, i) => {
      const j = list.findIndex(val => val === SKU);
      if (j !== -1) {
        skuList[i].attributes = newList[j];
      }
    });
  })
  .catch(() => {})
}

// 更改属性值
const renameAttrValue = (title, activeName, index, key) => {
  ElMessageBox.prompt('', `修改${title}属性值`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    draggable: true,
    inputPattern: /^.{0,10}$/,
    inputErrorMessage: '最多输入10个字符',
    inputValue: activeName
  })
  .then(({ value }) => {
    if (combination[index].list.includes(value)) {
      ElMessage({ showClose: true, message: '已有重复属性值', type: 'warning' });
    } else {
      const id = combination[index].id;
      skuList.forEach((item) => {
        item.attributes.forEach((attr) => {
          // 修改 skuList 中 attributes 对应id的名字，和 skuList 的SKU的值
          if (attr.id === id && attr.val === activeName) {
            attr.val = value;
            item.SKU = item.attributes.map((e) => e.val).join();
          }
        });
        // 修改 skuList 中 attributesValue 对应key的值
        if (item.attributesValue[id] === activeName) {
          item.attributesValue[id] = value;
        }
      });
      // 修改 combination 对应的值
      combination[index].list[key] = value;
    }
  })
  .catch(() => {});
};

// 删除某一项属性
const delAttributes = (index) => {
  if (combination.length === 1) return ElMessage({ showClose: true, message: '无法删除最后一项属性', type: 'warning', })
  const id = combination[index].id;
  const removedAttributes = [];
  //  循环 skuList
  skuList.forEach(sku => {
    // 在attributes中找出对应的的id
    const attributesIndex = sku.attributes.findIndex(attr => attr.id === id);
    // 如果 id 存在
    if (attributesIndex !== -1) {
      // 删除attributes中对应的 attributesIndex 的下标
      sku.attributes.splice(attributesIndex, 1);
      // 获取 attributesValue 中的key
      let attributesValue = Object.keys(sku.attributesValue)
      const attrIndex = attributesValue.findIndex(attr => attr === id.toString());
      // 删除对象 attributesValue 中对应的key
      delete sku.attributesValue[attributesValue[attrIndex]]
      // 修改SKU的值
      const name = sku.attributes.map(item => item.val).join();
      sku.SKU = name;
      removedAttributes.push(attributesIndex);
    }
  });
  combination.splice(index, 1);
}

// 删除某项属性中的属性值
const delAttrValue = (index, key) => {
  const name = combination[index].list[key];
  // 删除 skuList 表中存在相应属性值的下标
  const data = skuList.filter(item => {
    for (let j = 0; j < item.attributes.length; j++) {
      if (item.attributes[j].val === name) {
        return false;
      }
    }
    return true;
  });
  skuList.length = 0;
  skuList.push(...data)
  combination[index].list.splice(key, 1); // 删除属性值对应的项目的项目列表中的项目列表中的
};

// 添加属性值
const addAttrValue = (title,index)=> {
  ElMessageBox.prompt('', `添加${title}属性值`, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    draggable: true,
    inputPattern: /^.{0,10}$/,
    inputErrorMessage: '最多输入10个字符',
    inputValue: ''
  })
  .then(({ value }) => {
    const data = combination.map((item,i)=> {
      if (i === index) {
        return { name: item.name, id: item.id, list: [value] }
      }else {
        return item
      }
    })
    const newList = cartesianProduct(data);
    const list = newListFun(newList); 
    // skuList 中添加对应属性
    skuList.length = 0;
    skuList.push(...skuList,...list)
    // combination 中添加对应属性
    combination[index].list.push(value); // 将选择的项目加进去的列表中 记得把选择的项目加进
  })
  .catch(() => {});
}

// 添加属性项
const addAttributes = ()=> {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      const data = combination.map(item=>item.name)
      if (data.includes(ruleForm.attributeName)) {
        ElMessage({ showClose: true, message: '属性名已存在', type: 'warning', })
        return
      }
      const id = Math.floor(Math.random() * 9000) + 1000;
      combination.push({
        name:ruleForm.attributeName,
        id,
        list:[ruleForm.attributeValue] 	// 选择的项目的列表记得加进去
      })
      skuList.forEach(item=> {
        item.attributes.push({
          name:ruleForm.attributeName,
          id,
          val:ruleForm.attributeValue
        })
        item.attributesValue[id] = ruleForm.attributeValue
        item.SKU = item.attributes.map((e) => e.val).join();
      })
      handleClose()
    }
  })
}

const handleClose = ()=> {
  ruleFormRef.value.resetFields()
  dialogVisible.value = false
}

// 判断商品sku
const validators = (rule, value, callback)=> {
  if (!value && value !== 0) {
    callback(new Error('参数不能为空'))
  } else {
    callback()
  }
}

// 删除列表某一项
const delSkuList = (index)=> {
  skuList.splice(index,1) // 删除列表中指定位置的项目
}

// 分页发生变化时要校验一下表单
const handleCurrentChange = ()=> {
  setTimeout(() => {
    ruleTable.value.resetFields()
  }, 100);
}

const openDialog = ()=> {
  dialogVisible.value = true
  console.log('触发',dialogVisible.value);
}

onMounted(() => {
  const newList = cartesianProduct(combination);
  skuList.push(...newListFun(newList))
 });

</script>

<style lang="scss">
.collapse {
  margin-bottom: 20px;
  .el-collapse-item__header {
    display: flex;
  }
  .collapse_title {
    display: flex;
    width: 100%;
    padding: 0 10px;
    .collapse_title--name {
      font-size: 18px;
      flex: 1;
      .EditPen {
        margin-left: 10px;
        display: none;
        cursor: pointer;
      }
      &:hover {
        .EditPen {
          margin-left: 10px;
          display: inline-block;
        }
      }
    }
    .el-link {
      float: right;
    }
  }
  .el-collapse-item__content {
    display: grid;
    grid-template-columns: repeat(5, 20%);
    grid-gap: 10px;
  }
  .collapse_content {
    position: relative;
    text-align: center;
    border: 1px solid #e5e7eb;
    margin-bottom: 10px;
    border-radius: 5px;
    .EditPen {
      position: absolute;
      right: 0;
      top: 0;
      visibility: hidden;
      cursor: pointer;
      .T-icon {
        margin-right: 10px;
      }
    }
    &:hover {
      .EditPen {
        visibility: inherit;
      }
    }
  }
  .collapse_content--add .T-icon{
    cursor: pointer;
  }
}
.ab_Combining {
  display: flex;
  margin-bottom: 20px;
  .name {
    line-height: 40px;
  }
  .el-radio-button {
    margin: 0 10px;
    --el-radio-button-checked-border-color: none;
    .el-radio-button__inner {
      border: 1px solid #e4e7ed;
    }
  }
  .el-radio-button.is-disabled .el-radio-button__inner {
    background-color: #f2f6fc;
  }
}
.table {
  margin-bottom: 30px;
  .el-table__header,.el-table__body,.el-table__footer {
    margin:0 auto;
    width:100% !important;
    table-layout: fixed !important;
  }
  th .gutter{
    display: table-cell !important;
  }
  
}
.pagination {
  margin-top: 10px;
  float: right;
}
</style>
