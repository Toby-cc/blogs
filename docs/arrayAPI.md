---
title: JS中数组API总结
pageClass: background
---

::: tip
在JavaScript中，数组API指的是一组用于操作和处理数组的内置方法。<br/>
这些方法提供了各种功能，下面是一些常用的数组API及其功能和用途 <SvgIcon name="T-tiaopi" :size="30"/>
:::

## 1. push()

>`push()`方法将一个或多个元素添加到数组的末尾，并返回新数组的长度。

```js
const fruits = ['apple', 'banana'];

const length = fruits.push('orange');

console.log(fruits); // 输出：['apple', 'banana', 'orange']

console.log(length); // 输出：3
```


## 2. pop()

>`pop()`方法从数组的末尾删除一个元素，并返回被删除的元素。

```js
const fruits = ['apple', 'banana', 'orange'];

const lastFruit = fruits.pop();

console.log(fruits); // 输出：['apple', 'banana']

console.log(lastFruit); // 输出：'orange'
```

## 3. shift()

>`shift()`方法从数组的开头删除一个元素，并返回被删除的元素。

```js
const fruits = ['apple', 'banana', 'orange'];

const firstFruit = fruits.shift();

console.log(fruits); // 输出：['banana', 'orange']

console.log(firstFruit); // 输出：'apple'
```

## 4. unshift()

>`unshift()`方法将一个或多个元素添加到数组的开头，并返回新数组的长度。

```js
const fruits = ['banana', 'orange'];

const length = fruits.unshift('apple');

console.log(fruits); // 输出：['apple', 'banana', 'orange']

console.log(length); // 输出：3
```

## 5. concat()

>`concat()`方法用于合并两个或多个数组，并返回新数组。

```js
const fruits = ['apple', 'banana'];

const moreFruits = ['orange', 'grape'];

const allFruits = fruits.concat(moreFruits);

console.log(allFruits); // 输出：['apple', 'banana', 'orange', 'grape']
```

## 6. slice()

>`slice()`方法返回数组的指定部分（浅拷贝）。

```js
const fruits = ['apple', 'banana', 'orange', 'grape'];

const citrusFruits = fruits.slice(2, 4);

console.log(citrusFruits); // 输出：['orange', 'grape']
```

## 7. splice()

>`splice()`方法用于添加、删除或替换数组的元素。

```js
const fruits = ['apple', 'banana', 'orange'];

// 删除元素

fruits.splice(1, 1);

console.log(fruits); // 输出：['apple', 'orange']


// 替换元素

fruits.splice(1, 1, 'grape');

console.log(fruits); // 输出：['apple', 'grape']
```

## 8. indexOf()

>`indexOf()`方法返回指定元素在数组中的第一个匹配项的索引，如果没有匹配的元素，则返回-1。

```js
const fruits = ['apple', 'banana', 'orange'];

const index = fruits.indexOf('banana');

console.log(index); // 输出：1
```

## 9. lastIndexOf()

>`lastIndexOf()`方法返回指定元素在数组中的最后一个匹配项的索引，如果没有匹配的元素，则返回-1。

```js
const fruits = ['apple', 'banana', 'orange', 'banana'];

const index = fruits.lastIndexOf('banana');

console.log(index); // 输出：3
```

## 10. join()

>`join()`方法将数组中的所有元素连接成一个字符串。

```js
const fruits = ['apple', 'banana', 'orange'];

const fruitString = fruits.join(', ');

console.log(fruitString); // 输出：'apple, banana, orange'
```

## 11. forEach()

>`forEach()`方法对数组的每个元素执行指定的操作。

```js
const numbers = [1, 2, 3];

numbers.forEach((number) => {

  console.log(number);

});

// 输出：

// 1

// 2

// 3
```

## 12. map()

>`map()`方法将数组中的每个元素映射为一个新的元素，并返回一个新数组。

```js
const numbers = [1, 2, 3];

const doubleNumbers = numbers.map((number) => number * 2);

console.log(doubleNumbers); // 输出：[2, 4, 6]
```

## 13. filter()

>`filter()`方法根据指定的条件过滤数组的元素，并返回一个新数组。

```js
const numbers = [1, 2, 3, 4, 5];

const evenNumbers = numbers.filter((number) => number % 2 === 0);

console.log(evenNumbers); // 输出：[2, 4]
```

## 14. reduce()

>`reduce()`方法对数组的每个元素执行指定的归约操作，并返回一个累积值。

```js
const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((accumulator, number) => accumulator + number, 0);

console.log(sum); // 输出：15
```

## 15. every()

>`every()`方法检查数组的所有元素是否满足指定的条件，如果所有元素都满足条件，则返回`true`，否则返回`false`。

```js
const numbers = [1, 2, 3, 4, 5];

const result = numbers.every((number) => number > 0);

console.log(result); // 输出：true
```

## 16. some()

>`some()`方法检查数组的至少一个元素是否满足指定的条件，如果有满足条件的元素，则返回`true`，否则返回`false`。

```js
const numbers = [1, 2, 3, 4, 5];

const result = numbers.some((number) => number % 2 === 0);

console.log(result); // 输出：true
```

## 17. find()

>`find()`方法返回数组中满足指定条件的第一个元素，如果没有满足条件的元素则返回`undefined`。

```js
const numbers = [1, 2, 3, 4, 5];

const evenNumber = numbers.find((number) => number % 2 === 0);

console.log(evenNumber); // 输出：2

## 18. findIndex()
```

>`findIndex()`方法返回数组中满足指定条件的第一个元素的索引，如果没有满足条件的元素则返回-1。

```js
const numbers = [1, 2, 3, 4, 5];

const evenNumberIndex = numbers.findIndex((number) => number % 2 === 0);

console.log(evenNumberIndex); // 输出：1
```

## 19. includes()

>`includes()`方法检查数组是否包含指定的元素，如果包含则返回`true`，否则返回`false`。

```js
const fruits = ['apple', 'banana', 'orange'];

console.log(fruits.includes('banana')); // 输出：true

console.log(fruits.includes('grape'));  // 输出：false
```

## 20. reverse()

>`reverse()`方法将数组中的元素颠倒顺序。

```js
const fruits = ['apple', 'banana', 'orange'];

fruits.reverse();

console.log(fruits); // 输出：['orange', 'banana', 'apple']
```

## 21. sort()

>`sort()`方法按照升序对数组中的元素进行排序。

```js
const fruits = ['banana', 'apple', 'orange'];

fruits.sort();

console.log(fruits); // 输出：['apple', 'banana', 'orange']
```

## 22. toString()

>`toString()`方法将数组转换为字符串。

```js
const fruits = ['apple', 'banana', 'orange'];

const fruitString = fruits.toString();

console.log(fruitString); // 输出：'apple,banana,orange'
```

## 23. length

>`length`属性用于获取或设置数组的长度。

```js
const fruits = ['apple', 'banana', 'orange'];

console.log(fruits.length); // 输出：3



fruits.length = 5;

console.log(fruits); // 输出：['apple', 'banana', 'orange', undefined, undefined]
```

## 24. fill()

>`fill()`方法用指定的值填充数组的所有元素。

```js
const numbers = [1, 2, 3, 4, 5];

numbers.fill(0);

console.log(numbers); // 输出：[0, 0, 0, 0, 0]
```

## 25. flat() 和 flatMap()

>`flat()`方法用于扁平化嵌套数组，将嵌套的子数组变为父数组的元素。`flatMap()`方法是`map()`方法和`flat()`方法的结合，用于对数组进行映射操作并扁平化结果。

```js
const nestedArray = [1, [2, 3], [4, [5]]];

const flatArray = nestedArray.flat();

console.log(flatArray); // 输出：[1, 2, 3, 4, [5]]



const numbers = [1, 2, 3];

const doubledArray = numbers.flatMap((number) => [number * 2]);

console.log(doubledArray); // 输出：[2, 4, 6]
```

## 26. from()

>`from()`方法根据已有的数组或类数组对象创建一个新的数组实例。

```js
const string = 'Hello';

const characters = Array.from(string);

console.log(characters); // 输出：['H', 'e', 'l', 'l', 'o']



const set = new Set([1, 2, 3]);

const array = Array.from(set);

console.log(array); // 输出：[1, 2, 3]
```

## 27. reduceRight()

>`reduceRight()`方法和`reduce()`方法类似，但是是从右到左应用归约操作。

```js
const numbers = [1, 2, 3, 4, 5];

const sumRight = numbers.reduceRight((accumulator, number) => accumulator + number, 0);

console.log(sumRight); // 输出：15
```

## 28. keys()、values() 和 entries()

>`keys()`方法返回一个包含数组的索引的迭代器对象。
lues()`方法返回一个包含数组的值的迭代器对象。
```js
`entries()`方法返回一个包含数组的索引值对的迭代器对象。

示例：

const fruits = ['apple', 'banana', 'orange'];

const keys = fruits.keys();

for (const key of keys) {

  console.log(key); // 输出：0, 1, 2

}



const values = fruits.values();

for (const value of values) {

  console.log(value); // 输出：'apple', 'banana', 'orange'

}



const entries = fruits.entries();

for (const entry of entries) {

  console.log(entry); // 输出：[0, 'apple'], [1, 'banana'], [2, 'orange']

}
```

## 29. copyWithin()

>`copyWithin()`方法将数组指定范围内的元素复制到指定的目标位置，可用于数组的重排和拷贝。

```js
const numbers = [1, 2, 3, 4, 5];

numbers.copyWithin(0, 3);

console.log(numbers); // 输出：[4, 5, 3, 4, 5]
```

## 30. findLastIndex()

>`findLastIndex()`方法类似于`findIndex()`方法，但是是从数组的末尾开始查找满足条件的元素。

```js
const numbers = [1, 2, 3, 4, 5];

const lastIndex = numbers.findLastIndex((number) => number % 2 === 0);

console.log(lastIndex); // 输出：3
```