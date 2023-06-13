---
title: ES 新特性
pageClass: background
---

## 认识ECMAScript

ECMAScript,简称 ES 。<br/>它是JavaScript的标准化规范，定义了JavaScript的语法、类型、对象和运行时行为等方面的规则。

<p align="center">
  <img class="imageBorder" src="https://bkimg.cdn.bcebos.com/pic/d009b3de9c82d15834a6cbdd890a19d8bc3e42b2?x-bce-process=image/resize,m_lfit,w_536,limit_1/format,f_auto" lazy />
</p>

使用ECMAScript规范，JavaScript引擎（如V8引擎用于Chrome和Node.js）可以实现和支持规定的语言特性。<br/>
开发人员可以根据规范来编写兼容不同JavaScript引擎的代码，并利用最新的语言功能来提高开发效率和代码质量。

ECMAScript规范的版本以ES开头，后面跟着版本号。<br/>
<span style="color:red">ES5</span>是目前广泛支持的稳定版本，而ES6（或ES2015）及其后续版本引入了许多新特性和语言增强。<br/>随后的版本包括ES7、ES8、ES9、ES10、ES11和ES12，每个版本都引入了新的功能和语法。

## 各版本增加的新特性
ES7、ES8、ES9、ES10、ES11和ES12是JavaScript的连续版本，也被称为ECMAScript的不同规范版本。<br/>
下面我会详细介绍每个版本中新增的一些主要特性：
### ES7（2016）

#### Array.prototype.includes
新增了Array.prototype.includes方法，用于检查数组是否包含特定的元素。<br/>它返回一个布尔值，表示目标元素是否存在于数组中。
```js
const numbers = [1, 2, 3, 4, 5];

if (numbers.includes(3)) {
  console.log('数组中包含数字 3');
} else {
  console.log('数组中不包含数字 3');
}
```
这段代码使用includes方法检查numbers数组是否包含数字3。<br/>如果包含，就输出"数组中包含数字 3"；如果不包含，就输出"数组中不包含数字 3"。

#### 指数操作符（Exponentiation Operator）
引入了指数操作符**，用于进行乘方运算。例如，2 ** 3将返回8，表示2的3次方。
```js
const result = 2 ** 3;
console.log(result); // 输出 8
```
这段代码使用指数操作符**对2进行3次方运算，结果为8。

#### Object.values/Object.entries
新增了Object.values和Object.entries方法，用于返回对象属性的值数组和键值对数组。<br/>
Object.values返回对象的属性值数组，Object.entries返回一个包含对象属性键值对的数组。
```js
const person = {
  name: 'John',
  age: 30,
  occupation: 'Developer'
};

const values = Object.values(person);
console.log(values); // 输出 ['John', 30, 'Developer']

const entries = Object.entries(person);
console.log(entries);
// 输出 [['name', 'John'], ['age', 30], ['occupation', 'Developer']]
```
这段代码使用Object.values方法返回了person对象的属性值数组，并使用Object.entries方法返回了person对象的键值对数组。

### ES8（2017）

#### Async/Await
引入了async和await关键字，简化了异步编程，使得异步代码可以像同步代码一样易于阅读和编写。 
```js
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchData();
```
这段代码展示了使用async和await关键字进行异步编程。<br/>
async函数返回一个Promise，允许在函数内使用await来等待异步操作的结果，使得异步代码的编写和理解更加直观和简洁。
#### Object.values/Object.entries
新增了Object.values和Object.entries方法，分别用于返回对象的值数组和键值对数组。
```js
const obj = { a: 1, b: 2, c: 3 };

const values = Object.values(obj);
console.log(values); // [1, 2, 3]

const entries = Object.entries(obj);
console.log(entries);
// [["a", 1], ["b", 2], ["c", 3]]
```
这段代码展示了Object.values和Object.entries方法的使用。<br/>
Object.values返回一个包含对象的所有值的数组，Object.entries返回一个包含对象的所有键值对的数组。

### ES9（2018）

#### 异步迭代器（Asynchronous Iteration）
通过引入for-await-of循环，支持异步迭代器，使得处理异步数据流更加方便。
```js
const asyncData = {
  async *[Symbol.asyncIterator]() {
    yield await someAsyncOperation();
    yield await anotherAsyncOperation();
    // ...
  }
};

(async () => {
  for await (const item of asyncData) {
    console.log(item);
  }
})();
```
#### Promise.prototype.finally
新增了Promise.prototype.finally方法，用于在Promise结束时执行回调，不论Promise的状态是成功还是失败。
```js
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve("Data fetched successfully.");
      } else {
        reject("Error occurred while fetching data.");
      }
    }, 1000);
  });
};

fetchData()
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log("Promise execution completed.");
  });
```

### ES10（2019）

#### Array.prototype.flat/flatMap
- Array.prototype.flat方法用于将多维数组扁平化为一维数组。
- Array.prototype.flatMap方法结合了map和flat，可以在映射数组的同时进行扁平化。
```js
const arr = [1, [2, [3, 4]]];
const flatArray = arr.flat();
console.log(flatArray); // 输出: [1, 2, [3, 4]]

const arr2 = [1, 2, 3];
const mappedArray = arr2.flatMap(x => [x * 2]);
console.log(mappedArray); // 输出: [2, 4, 6]
```
#### Object.fromEntries
引入了Object.fromEntries方法，用于将键值对数组转换为对象。
```js
const entries = [['name', 'John'], ['age', 30], ['city', 'New York']];

const person = Object.fromEntries(entries);
console.log(person); // { name: 'John', age: 30, city: 'New York' }
```
### ES11（2020）

#### Nullish Coalescing Operator
引入了??空值合并运算符，用于提供默认值的情况下，仅当变量为null或undefined时才使用默认值。<br/>
比方说，假设我们有一个变量username，我们希望在username为null或undefined时使用默认值"Guest"：
```js
const username = null;
const displayName = username ?? "Guest";

console.log(displayName); // 输出: "Guest"
```
在上面的代码中，因为username的值为null，所以使用了默认值"Guest"赋给displayName变量。

#### Optional Chaining Operator
可选链操作符（?.）用于简化访问深层嵌套属性或方法时的空值检查。

比方说，我们有一个对象user，其中包含了一个address对象，而address对象中又有一个street属性。<br/>我们想要安全地访问street属性，即使user或address中的任何一个为空：
```js
const user = {
  name: "John",
  address: null
};

const streetName = user?.address?.street;

console.log(streetName); // 输出: undefined
```
在上面的代码中，由于address为null，所以访问street属性的操作返回了undefined，而不是抛出错误。

### ES12（2021）

#### Promise.any()
方法接受一个 Promise 数组，返回其中最先达成状态的 Promise 对象。<br/>
如果所有 Promise 都变成了 rejected 状态，则返回一个 AggregateError 对象，其中包含所有 Promise 的 rejection 原因。<br/>
这个方法可以简化处理 Promise 数组的代码。
```js
const promises = [
  Promise.reject('Error 1'),
  new Promise((resolve) => setTimeout(() => resolve('Success'), 2000)),
  Promise.reject('Error 2')
];

Promise.any(promises)
  .then((value) => console.log(value))
  .catch((error) => console.log(error));
```
在上面的例子中，由于第二个 Promise 最先达成 fulfilled 状态，因此 Promise.any() 返回了它的值 'Success'。

#### Logical Assignment Operators
ES12 中引入了三个逻辑赋值运算符：&&=、||= 和 ??=。<br/>
这些运算符结合了逻辑运算符和赋值运算符的功能，可以简化某些常见的编程模式。
```js
let a = 5;
let b = null;
let c = undefined;

a &&= 10; // a 等于 10
b ||= 20; // b 等于 20
c ??= 30; // c 等于 30
```
在上面的例子中，&&= 运算符将 a 赋值为 10，因为 a 的初始值为 5，而 5 是一个 truthy 值。，<br/>
||= 运算符将 b 赋值为 20，因为 b 的初始值为 null，null 是一个 falsy 值。<br/>
??= 运算符将 c 赋值为 30，因为 c 的初始值为 undefined，undefined 是一个 falsy 值。

#### String.prototype.replaceAll()
方法可以用来替换字符串中所有匹配的子串。<br/>这个方法接受两个参数：一个需要被替换的子串和一个替换的子串。
```js
const str = 'hello world';
const newStr = str.replaceAll('l', 'L'); // newStr 等于 'heLLo worLd'
```
#### WeakRefs
ES12 中新增了 WeakRefs，这是一种新的引用类型，可以用来创建弱引用。<br/>
与普通引用不同，弱引用不会防止其指向的对象被垃圾回收。这可以解决一些内存泄漏的问题。
```js
let obj = { name: 'John' };
const ref = new WeakRef(obj);

// 在某个时刻后，obj 可能被垃圾回收了，但是 ref 仍然存在
// 我们可以通过 ref.deref() 方法来获取 obj，如果 obj 已经被回收了，则返回 undefined
```

### 结语
这些特性的引入丰富了JavaScript的语言功能，使开发者能够更方便地操作数组和对象，并提供了更灵活的数学运算能力。

需要注意的是，ECMAScript规范和JavaScript运行环境之间可能存在差异，特别是在旧版本的JavaScript环境中，可能不支持最新的ECMAScript特性。

因此，在编写JavaScript代码时，需要考虑目标运行环境的支持情况，或者使用转译工具（如Babel）将较新版本的代码转换为较旧版本的兼容代码，以确保在不同环境中的兼容性。


