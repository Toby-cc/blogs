---
title: 前端导出Excel的方式
date: 2023-06-25
labelImage: 'https://img.zcool.cn/community/01d2fe5b4f0a85a80121ade0d94322.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp'
isLabelImage: true
lastUpdated: true
description: 
  name: 在项目开发中。导出excel表格应该算是一个比较常见的需求了
  detailShow: false
tags:
  - 分享
  - Excel
categories:
  - js
permalink: /Excel/
---

## 前言

> 前两天遇到一个导出Excel表格的需求，原本是让后端处理好，前端直接调接口然后导出的，省事又方便生活美滋滋。<br/>
可是出于各种原因，数据量太大、查询库太慢、渲染太卡等等因素表明后端实现太复杂。<SvgIcon name="T-ganga" :size="15"/><br/>
所以，导出功能就只能前端在没有后端小伙伴协助的情况下，自己happy了。

目前导出Excel文档常用的方案有三种：后端处理、xlsx.js、ExcelJS。<br/>为此，我们刚好可以浅浅的探讨一下

## 后端导出
服务端处理数据对我们来说是最简单的了，直接调用接口获取后端返回的文件数据后，可以将数据保存为文件。<br/>使用 Blob 对象将数据转换为可下载的文件，并创建一个下载链接。
```js
// 前端代码
axios.get('/api/download', {
  responseType: 'blob' // 设置响应类型为 Blob
})
  .then(response => {
    const blob = new Blob([response.data], { type: response.headers['content-type'] });

    // 创建下载链接
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'document.pdf';

    // 模拟点击下载链接触发文件下载
    downloadLink.click();
  })
  .catch(error => {
    console.error('Download failed:', error);
  });
```
在上述示例中，发送 GET 请求到 /api/download 接口，设置响应类型为 Blob。接收到响应后，将返回的数据保存为 Blob 对象，然后创建下载链接并触发下载操作。<br/>

处理文件生成可能涉及复杂的计算或大量的数据操作，这可能对服务器的资源产生较大的压力。<br/>
将这部分工作放在后端可以更好地管理和控制资源的使用，避免前端对客户端设备的性能要求过高。<br/>
当需要在文件生成过程中引入更多的逻辑、数据处理或数据源时，后端可以更容易进行扩展和调整，而前端只需关注数据的请求和文件的下载。
::: warning
需要注意的是，选择后端处理导出文件的方式还取决于具体的业务需求和技术栈。<br/>
对于简单的导出操作或较小的文件，前端直接处理可能更加简单和快速。<br/>
但对于复杂的文件生成需求或大规模的数据操作，使用后端处理可以提供更好的性能和安全性
:::

## xlsx.js
在纯前端导出开发中，`xlsx.js`库应该是呼吁最高的一个。<br/>
xlsx.js（官网称为 [SheetJS](https://github.com/rockboom/SheetJS-docs-zh-CN)） 是一个纯 JavaScript 实现的用于读取、处理和生成 Excel 文件的库。<br/>
它提供了强大的功能，允许开发人员在前端环境中处理 Excel 文件，而无需依赖于服务器端的 Excel 处理工具。

要使用 xlsx.js 库，其实也很简单。<br/>
我们可以配合`FileSaver.js`一起使用。

### 1. 安装 xlsx.js、FileSaver.js
> 使用 npm 或 yarn 在你的项目中安装 xlsx.js、FileSaver.js
```shell
npm install xlsx
npm install file-saver 
// FileSaver.js 是一个用于在浏览器中保存文件的 JavaScript 库。
// 它提供了一种简单的方法，可以让你将数据保存为文件，并将其下载到用户的计算机上。
```
### 2. 导入 xlsx.js/FileSaver.js
> 在代码中导入 xlsx.js、FileSaver.js 的核心模块
```js
import { write, utils } from 'xlsx';
import { saveAs } from 'file-saver';
```

### 3. 创建数据表格并导出
> 使用 FileSaver.js 和 xlsx.js 库导出表格数据为 Excel 文件
```js
<el-table :data="tableData" show-summary max-height="700" ref="table">
...
</el-table>

<script>
...

exportTable() {
  const table = this.$refs.table.$el;
  const workbook = utils.table_to_book(table); // 将表格转换为工作簿对象

  const excelBuffer = write(workbook, {
    bookType: 'xlsx',
    type: 'array',
    cellStyles: true, // 保留表格样式
  });

  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, '表格.xlsx');
}
</script>
```

上述代码中，首先获取到表格的 DOM 元素，通过 xlsx.js 的 table_to_book 函数将表格转换为工作簿对象 workbook。<br/>
接下来，使用 write 函数将工作簿对象写入到一个数组 excelBuffer 中，指定了导出文件的类型为 xlsx，并保留了表格的样式。<br/>
然后，通过创建一个 Blob 对象，将数组 excelBuffer 包装为 Excel 文件的二进制数据，同时指定文件的 MIME 类型为 application/vnd.openxmlformats-officedocument.spreadsheetml.sheet。<br/>
最后，使用 FileSaver.js 的 saveAs 方法将 Blob 对象保存为名为 `表格.xlsx` 的文件。

::: warning
虽然`xlsx.js`使用起来也挺方便的，不过它不支持改变样式。<br/>
想要支持改变样式，需要使用它的收费版本。
:::

## ExcelJS
> [ExcelJS](https://github.com/exceljs/exceljs/blob/HEAD/README_zh.md)是一个用于读取、操作和写入Excel文件的JavaScript库。<br/>
它可以在浏览器和Node.js环境中使用,支持多种Excel文件格式,包括XLSX、XLS、CSV和ODS等。<br/>

### 1. 模拟表格
我们先模拟一个表格
```js
<template>
  <el-button type="primary" @click="exportTable">导出</el-button>
  <el-table :data="tableData" show-summary max-height="700" ref="table">
    <el-table-column prop="name" label="医助" align="center"/>
    <el-table-column label="业绩" align="center">
      <el-table-column prop="a" label="业绩实收" />
      <el-table-column prop="b" label="初诊业绩金额" />
      <el-table-column prop="c" label="复诊业绩金额" />
    </el-table-column>
    <el-table-column label="初诊" align="center">
      <el-table-column prop="d" label="初诊预约人数" />
      <el-table-column prop="e" label="初诊看诊人数" />
      <el-table-column prop="f" label="初诊拿药人数" />
    </el-table-column>
    <el-table-column label="复诊" align="center">
      <el-table-column prop="g" label="复诊预约人次" />
      <el-table-column prop="h" label="复诊看诊人次" />
      <el-table-column prop="i" label="复诊拿药人次" />
    </el-table-column>
    <el-table-column label="处方" align="center">
      <el-table-column prop="j" label="总处方张数" />
    </el-table-column>
    <el-table-column label="客单价" align="center">
      <el-table-column prop="k" label="初诊客单价" />
      <el-table-column prop="l" label="复诊客单价" />
      <el-table-column prop="m" label="总平均客单价" />
    </el-table-column>
    <el-table-column label="会员" align="center">
      <el-table-column prop="n" label="新增会员数" />
      <el-table-column prop="o" label="新增会员率" />
    </el-table-column>
    <el-table-column label="下单失败" align="center">
      <el-table-column prop="p" label="初诊下单失败数" />
      <el-table-column prop="q" label="复诊下单失败数" />
      <el-table-column prop="r" label="总下单失败单数" />
      <el-table-column prop="s" label="总下单失败总金额" />
    </el-table-column>
    <el-table-column label="退费" align="center">
      <el-table-column prop="t" label="退费单数" />
      <el-table-column prop="u" label="退费金额" />
      <el-table-column prop="v" label="总退费金额" />
    </el-table-column>
  </el-table>
</template>

<script lang='ts' setup>
import { ref } from 'vue';

const tableData = ref([
  {name: 0, a :1, b: 2, c: 1, d: 1, e: 1, f: 1, g: 1, h: 1, i: 1, j: 1, k: 1, l: 1, m: 1, n: 1, o: 1, p: 1, q: 1, r: 1, s: 1, t: 1, u: 1, v: 1},
  {name: 0, a :2, b: 2, c: 2, d: 2, e: 2, f: 2, g: 2, h: 2, i: 2, j: 2, k: 2, l: 2, m: 2, n: 2, o: 2, p: 2, q: 2, r: 2, s: 2, t: 2, u: 2, v: 2},
  {name: 0, a :3, b: 3, c: 3, d: 3, e: 3, f: 3, g: 3, h: 3, i: 3, j: 3, k: 3, l: 3, m: 3, n: 3, o: 3, p: 3, q: 3, r: 3, s: 3, t: 3, u: 3, v: 3},
])
</script>
```

### 2. 安装/导入 ExcelJS
```shell
npm install exceljs
npm install file-saver // 顺便安装一下FileSaver.js
```
```js
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
```
### 3. 创建数据表格并导出
```js
const exportTable = () => {
  // 创建工作簿
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  // 设置表头
  const headerRow = worksheet.addRow(['医助', '业绩', '初诊','复诊', '处方','客单价','会员', '下单失败','退费']);
  headerRow.getCell(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFCC00' }
  };

  // 合并一级表头单元格
  worksheet.mergeCells('A1:A2');
  worksheet.mergeCells('B1:D1');
  worksheet.mergeCells('E1:G1');
  worksheet.mergeCells('H1:J1');
  worksheet.mergeCells('L1:N1');
  worksheet.mergeCells('O1:P1');
  worksheet.mergeCells('Q1:T1');
  worksheet.mergeCells('U1:W1');

  // 设置一级表头文本
  worksheet.getCell('B1').value = '业绩';
  worksheet.getCell('E1').value = '初诊';
  worksheet.getCell('H1').value = '复诊';
  worksheet.getCell('K1').value = '处方';
  worksheet.getCell('L1').value = '客单价';
  worksheet.getCell('O1').value = '会员';
  worksheet.getCell('Q1').value = '下单失败';
  worksheet.getCell('U1').value = '退费';

  // 设置二级表头文本
  worksheet.getCell('B2').value = '业绩实收';
  worksheet.getCell('C2').value = '初诊业绩金额';
  worksheet.getCell('D2').value = '复诊业绩金额';
  worksheet.getCell('E2').value = '初诊预约人数';
  worksheet.getCell('F2').value = '初诊看诊人数';
  worksheet.getCell('G2').value = '初诊拿药人数';
  worksheet.getCell('H2').value = '复诊预约人次';
  worksheet.getCell('I2').value = '复诊看诊人次';
  worksheet.getCell('J2').value = '复诊拿药人次';
  worksheet.getCell('K2').value = '总处方张数';
  worksheet.getCell('L2').value = '初诊客单价';
  worksheet.getCell('M2').value = '复诊客单价';
  worksheet.getCell('N2').value = '总平均客单价';
  worksheet.getCell('O2').value = '新增会员数';
  worksheet.getCell('P2').value = '新增会员率';
  worksheet.getCell('Q2').value = '初诊下单失败数';
  worksheet.getCell('R2').value = '复诊下单失败数';
  worksheet.getCell('S2').value = '总下单失败单数';
  worksheet.getCell('T2').value = '总下单失败总金额';
  worksheet.getCell('U2').value = '退费单数';
  worksheet.getCell('V2').value = '退费金额';
  worksheet.getCell('W2').value = '总退费金额';

  // 设置表头居中
  headerRow.eachCell(cell => {
    cell.alignment = { horizontal: 'center' };
  });
  // 设置整列的样式
  const column = worksheet.getColumn('A');
  column.alignment = { vertical: 'middle', horizontal: 'center' };

  

  // 填充表格数据
  const Data = tableData.value;
  for (const row of Data) {
    worksheet.addRow(Object.values(row));
    // worksheet.addRow([
    //   row.name, row.a, row.b, row.c, row.d, row.e, row.f, row.g, row.h, row.i, row.j, row.k, row.l, row.m, row.n, row.o, row.p, row.q, row.r, row.s, row.t, row.u, row.v 
    // ]);
  }

    // 设置列宽
  worksheet.columns.forEach(column => {
    column.width = 15;
  });
  worksheet.getColumn(1).width = 10;

  // 导出Excel文件
  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'table.xlsx');
  });
}
```
这段代码利用了ExcelJS库的功能来操作Excel文件，提供了灵活的选项来自定义表格样式和导出的Excel文件。<br/>
通过调用该函数，你可以方便地将表格数据导出为Excel文件，用于数据分析、报告生成等应用场景。

看一下导出后的表格：
<p align="center">
  <img class="imageBorder" src="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/20230626110708.png/compress50" lazy />
</p>

::: tip 
ExcelJS的功能还是蛮丰富的，并有良好的兼容性。<br/>
它支持导出和读取大型数据集，并能处理复杂的Excel文件结构。<br/>
提供了灵活的样式和格式控制，可以设置单元格的字体、颜色、边框、对齐方式等。<br/>
它还支持合并单元格、设置列宽、行高等操作，使生成的Excel文件具有良好的可读性和美观度。<br/>
更多的设置可以查看一下 [ExcelJS官方文档](https://github.com/exceljs/exceljs/blob/HEAD/README_zh.md)
:::
