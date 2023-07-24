---
title: 高阶函数的使用
pageClass: higherOrderFun
---

> 在这里记录一些比较实用的高阶函数

## 只执行一次

这是一个`只会执行一次`的函数，该函数只会执行一次，这对于某些场景，如事件监听、回调函数，以及其他只需执行一次的函数非常有用。

```js
// fun.js
export function once(fn, replacer = null) {
  return function (...args) {
    if (fn) {
      const ret = fn.apply(this, args);
      fn = null;
      return ret;
    }
    if (replacer) {
      // return replacer.apply(this, args);
      return replacer.apply(this, ['这个方法只被调用一次']);
    }
  };
}
```

#### 参数

- fn：接收一个函数，表示要执行的目标函数。
- replacer：可选参数，是一个函数，用于替代原始目标函数的执行结果。

#### 返回值

- 返回一个新的函数，该函数能够保证 fn 只执行一次，如果有多次调用，只有第一次调用会执行 fn。

#### 函数功能

- once 函数返回一个新的函数，这个新函数有自己的作用域，可以访问 once 函数的参数和内部变量。
- 当新函数第一次被调用时，它会执行原始目标函数 fn 并传入相应的参数。
- 在第一次调用后，新函数会将原始目标函数 fn 设置为 null，这样即使再次调用新函数，原始目标函数 fn 也不会被执行。
- 如果在第一次调用后再次调用新函数，并且提供了 replacer 参数，那么新函数将会执行 replacer 函数，并返回其结果。否则，后续调用将会返回 undefined。

#### 调用实例

:::: code-group
::: code-group-item js

```js
<div id='do-once'>只执行一次</div>

const botton = document.getElementById('do-once')
button.addEventListener('click', once((evt) => {
  ...
  console.log('点击按钮:',1,2);
},
  (e) => {
    console.log('e: ', e);
  }
));
```

:::
::: code-group-item vue2

```js
<div @click="doOnce(1,2)">只执行一次</div>

import { once } from '@/utils/fun'

export default {
  methods: {
    doOnce: once((a, b) => {
      ...
      console.log('点击按钮: ', a, b)
    }, (e) => {
      console.log('e: ', e)
      // throw new Error(e);
    }),
  }
}
```

:::
::: code-group-item vue3

```js
<div @click="doOnce(1,2)">只执行一次</div>

import { once } from '@/utils/fun'

const doOnce = once((e,b)=> {
  ...
  console.log('点击按钮:',e,b);
},(e)=>{
  console.log('e: ', e);
  // throw new Error(e);
})
```

:::
::::

> 输出结果:<br/>
> 当点击第一次的时候会输出 => <span style="color:red">点击按钮: 1 2 </span> <br/>
> 之后的点击都会输出 => <span style="color:red">e: 这个方法只被调用一次</span>

## 节流

这是一个`节流`函数，用于限制函数的执行频率，这在处理高频率事件（例如滚动、拖拽等）时非常有用，以避免过多地触发函数执行。

```js
// fun.js
export function throttle(fn, ms = 1000) {
  let throttleTimer = null;
  return function (...args) {
    if (!throttleTimer) {
      const ret = fn.apply(this, args);
      throttleTimer = setTimeout(() => {
        throttleTimer = null;
      }, ms);
      return ret;
    }
  };
}
```

#### 参数

- fn：接收一个函数，表示要执行的目标函数。
- ms：可选参数，表示时间间隔（毫秒），用于限制目标函数的执行频率。如果不提供 ms，默认为 1000 毫秒（1 秒）。

#### 返回值

- 返回一个新的函数，该函数能够保证目标函数 fn 在指定的时间间隔内只能执行一次。

#### 函数功能

- throttle 函数返回一个新的函数，这个新函数有自己的作用域，可以访问 throttle 函数的参数和内部变量。
- 当新函数第一次被调用时，它会执行原始目标函数 fn 并传入相应的参数。
- 在第一次调用后，新函数会设置一个定时器 throttleTimer，在指定的时间间隔 ms 后，定时器会被触发。
- 一旦定时器触发后，新函数会再次允许执行原始目标函数 fn，并重置定时器，保持执行间隔。

#### 调用实例

:::: code-group
::: code-group-item js

```js
<div id='door'>节流</div>

const botton = document.getElementById('door')
button.addEventListener('mousemove', throttle((e) => {
  ...
  console.log('鼠标移动到哪个位置:',1,2);
}));
```

:::
::: code-group-item vue2

```js
<div @mousemove="door(1,2)">节流</div>

import { throttle } from '@/utils/fun'

export default {
  methods: {
    door: throttle((a, b) => {
      ...
      console.log('鼠标移动到哪个位置: ', a, b)
    }),
  }
}
```

:::
::: code-group-item vue3

```js
<div @mousemove="door(1,2)">节流</div>

import { throttle } from '@/utils/fun'

const door = throttle((e,b)=> {
  ...
  console.log('鼠标移动到哪个位置:',e,b);
})
```

:::
::::

> 输出结果：<br/>
> 函数每 `ms` 毫秒内只执行一次 => <span style="color:red">鼠标移动到哪个位置: 1 2</span>

## 防抖

这是一个`防抖`函数，用于处理高频率事件的情况，只有在事件停止触发一段时间后，才会执行目标函数，这有助于避免频繁执行函数并提高性能。<br/>
在实际开发中，它通常用于处理用户输入、浏览器窗口调整、搜索框实时查询等场景。

```js
// fun.js
export function debounce(fn, ms = 1000) {
  let debounceTimer = null;
  return function (...args) {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      fn.apply(this, args);
    }, ms);
  };
}
```

#### 参数

- fn：接收一个函数，表示要执行的目标函数
- ms：可选参数，表示时间间隔（毫秒），用于指定在调用函数之后多久才执行目标函数。如果不提供 ms，默认为 1000 毫秒（1 秒）。

#### 返回值

- 返回一个新的函数，该函数通过定时器机制来确保目标函数 fn 在最后一次调用之后的指定时间间隔内才会被执行。

#### 函数功能

- debounce 函数返回一个新的函数，这个新函数有自己的作用域，可以访问 debounce 函数的参数和内部变量。
- 每次新函数被调用时，它会清除之前设置的定时器 debounceTimer，这样可以确保只有最后一次调用才会触发目标函数的执行。
- 新函数会设置一个新的定时器 debounceTimer，在指定的时间间隔 ms 后，定时器会被触发，从而执行目标函数 fn。

#### 调用实例

:::: code-group
::: code-group-item js

```js
<div id='door'>防抖</div>

const botton = document.getElementById('door')
button.addEventListener('click', debounce((e) => {
  ...
  console.log('按钮点击触发:',1,2);
}));
```

:::
::: code-group-item vue2

```js
<div @click="door(1,2)">防抖</div>

import { debounce } from '@/utils/fun'

export default {
  methods: {
    door: debounce((a, b) => {
      ...
      console.log('按钮点击触发: ', a, b)
    }),
  }
}
```

:::
::: code-group-item vue3

```js
<div @click="door(1,2)">防抖</div>

import { debounce } from '@/utils/fun'

const door = debounce((e,b)=> {
  ...
  console.log('按钮点击触发:',e,b);
})
```

:::
::::

> 输出结果：<br/>
> 当用户频繁点击按钮的时候，无论点击多少次都不会触发函数 <br/>
> 只有等用户最后一次点击完毕的 `ms`毫秒后才会触发 => <span style="color:red">按钮点击触发: 1 2</span>

## 拦截器

这是一个`拦截器`，函数提供了在调用目标函数前后执行额外操作的能力，可以在 beforeCall 函数中执行前置操作，并根据返回值来决定是否继续执行目标函数，然后在 afterCall 函数中执行后置操作，并可以根据需要处理目标函数的返回值。这样可以灵活地拓展目标函数的功能，例如添加日志、数据验证等功能。

```js
// fun.js
export function intercept(fn, { beforeCall = null, afterCall = null }) {
  return function (...args) {
    if (!beforeCall || beforeCall.call(this, args) !== false) {
      // 如果beforeCall返回false，不执行后续函数
      const ret = fn.apply(this, args);
      if (afterCall) return afterCall.call(this, ret);
      return ret;
    }
  };
}
```

#### 参数

- fn：接收一个函数，表示要执行的目标函数。
- {beforeCall, afterCall}：一个配置对象，用于定义在执行目标函数前后所执行的函数。beforeCall 和 afterCall 都是可选参数，分别表示在调用目标函数前和调用目标函数后执行的函数。

#### 返回值

- 返回一个新的函数，该函数能够在执行目标函数前后执行指定的操作，并可以根据情况控制是否执行目标函数。

#### 函数功能

- intercept 函数返回一个新的函数，这个新函数有自己的作用域，可以访问 intercept 函数的参数和内部变量。
- 在新函数被调用时，它首先检查是否提供了 beforeCall 函数，并调用它。如果 beforeCall 函数返回 false，则不会执行后续的目标函数，并直接返回。
- 如果没有提供 beforeCall 或者 beforeCall 返回值不是 false，新函数会执行目标函数 fn 并传入相应的参数。
- 如果提供了 afterCall 函数，新函数会在执行完目标函数后调用它，并将目标函数的返回值传递给 afterCall 函数。然后，新函数将返回 afterCall 的返回值。

#### 调用实例

:::: code-group
::: code-group-item js

```js
<div id='myIntercept'>拦截器</div>

const botton = document.getElementById('myIntercept')
button.addEventListener('click', intercept((evt) => {
  ...
  console.log('在这执行函数内容:',1,2);
},
  {
    beforeCall (args) {
      console.log('执行函数之前:', ...args)
    // 在此处执行你的逻辑，如果需要阻止myIntercept的调用，可以返回false
    // return false;
    },
    afterCall (result) {
      console.log('函数被执行后:', result)
    // 在此处执行你的逻辑
    }
  }
));
```

:::
::: code-group-item vue2

```js
<div @click="myIntercept(1,2)">拦截器</div>

import { intercept } from '@/utils/fun'

export default {
  methods: {
    myIntercept: intercept((a, b) => {
      // 这里可以放一些在调用之前的逻辑
      console.log('在这执行函数内容: ', a, b)
    },
      {
        beforeCall (args) {
          console.log('执行函数之前:', ...args)
        // 在此处执行你的逻辑，如果需要阻止myIntercept的调用，可以返回false
        // return false;
        },
        afterCall (result) {
          console.log('函数被执行后:', result)
        // 在此处执行你的逻辑
        }
      }
    ),
  }
}
```

:::
::: code-group-item vue3

```js
<div @click="myIntercept(1,2)">拦截器</div>

import { intercept } from '@/utils/fun'

const myIntercept = intercept((e,b)=>{
  console.log('在这执行函数内容: ', e,b);

},
  {
    beforeCall (args) {
      console.log('执行函数之前:', ...args)
    // 在此处执行你的逻辑，如果需要阻止myIntercept的调用，可以返回false
    // return false;
    },
    afterCall (result) {
      console.log('函数被执行后:', result)
    // 在此处执行你的逻辑
    }
  }
)
```

:::
::::

> `intercept`的第二个参数是一个对象，可以提供 beforeCall、afterCall 两个拦截器函数，<br/>
> 分别“拦截”fn 函数的执行前和执行后两个阶段。<br/>
> 输出结果为：<br/>
> <span style="color:red">执行函数之前: 1 2</span> <br/>
> <span style="color:red">在这执行函数内容: 1 2</span> <br/>
> <span style="color:red">函数被执行后: result</span>


## 总结
实际上，在函数式编程中，高阶函数的概念非常广泛，几乎在任何需要对函数进行操作的情况下，都可以使用高阶函数的概念。它们可以用来简化代码、提高可读性，并让代码更加模块化和易于维护。