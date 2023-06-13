---
title: 谈谈 window.open()
pageClass: background
---

## 了解 window.open()

> window.open() 是 JavaScript 中的一个方法，用于在浏览器中打开新的窗口或标签页。<br/>它接受一个 URL 参数，指定要在新窗口中打开的网页地址。

<div>
<div>基本语法如下：</div>
<span style="color:red">window.open(url, target, features, replace);</span>
</div>

- url：表示要在新窗口中打开的网页的 URL 地址。
- target（可选）：指定新窗口的目标。常见的值包括：
  - blank：在新标签页中打开。
  - self：在当前窗口中打开（默认行为）。
  - parent：在父级窗口或框架中打开。
  - top：在最顶层的窗口中打开。
- features（可选）：一个逗号分隔的字符串，用于指定新窗口的特性，例如大小、位置、工具栏、菜单等。具体的特性值取决于浏览器的支持和实现。
- replace（可选）：一个布尔值，指示新窗口是否替换当前窗口的浏览历史记录。默认为 false，不替换浏览历史记录。

## 使用场景

window.open() 可以应用于各种场景，包括但不限于以下几种常见用法：

### 场景一：
> 在新标签页中打开链接：可以使用 window.open() 在用户点击链接时在新标签页中打开一个链接。

```js
<a href="https://www.baidu.com/" target="_blank" onclick="event.preventDefault(); window.open(this.href, '_blank');">打开链接</a>
```
### 场景二：
> 弹出窗口：可以使用 window.open() 创建一个自定义的弹出窗口，例如用于显示用户认证、消息通知或其他交互性内容。

```js
var popup = window.open('popup.html', 'popupWindow', 'width=400,height=300');
```
### 场景三：
> 跨域通信：可以使用 window.open() 在两个不同域名的页面之间进行通信，通过在目标页面中使用 window.opener 访问源页面的上下文。

```js
// 源页面
var popup = window.open('target.html', 'targetWindow');

// 目标页面
window.opener.postMessage('Hello', '*');
```
### 场景四：
> 引导用户进行第三方认证：可以使用 window.open() 在新窗口中打开第三方认证页面，然后在认证完成后返回认证结果给原页面。

```js
var authWindow = window.open('https://auth-provider.com/login', 'authWindow');

// 在第三方认证页面中认证完成后执行以下代码
var authToken = '...'; // 获取认证令牌

authWindow.opener.postMessage({ type: 'authComplete', token: authToken }, '*');
```

::: warning
需要注意的是，由于浏览器的安全策略，window.open() 方法在某些情况下可能受到限制。
:::

## 需要注意的问题
> 以下是一些需要注意的安全策略：

1、弹出窗口被浏览器拦截：现代浏览器通常会对弹出窗口进行拦截和阻止，特别是在未经用户交互的情况下。这是为了防止滥用和恶意弹出窗口，以保护用户的浏览体验和安全性。<br/>

2、广告拦截器的影响：一些广告拦截器工具和浏览器插件可能会将 window.open() 视为潜在的广告弹出窗口，并将其阻止或过滤。<br/>

3、弹出窗口被阻止后无法捕获：如果浏览器拦截了 window.open() 弹出的窗口，JavaScript 代码将无法捕获此事件，也无法获得对新窗口的引用。<br/>

4、同源策略限制：在跨域情况下，由于同源策略的限制，父页面与弹出窗口之间的通信可能受到限制。跨域的弹出窗口无法直接访问父页面的 DOM 或执行脚本。<br/>

5、弹出窗口的设计和用户体验：弹出窗口的使用应该谨慎，并考虑用户体验。弹出窗口可能会打断用户的浏览流程，对于移动设备或小屏幕设备，弹出窗口可能导致不良的用户体验。<br/>

6、安全风险：如果不正确使用 window.open()，可能会存在安全风险，例如通过弹出窗口进行钓鱼攻击、注入恶意脚本等。在使用 window.open() 时，应注意验证和过滤用户提供的数据，避免潜在的安全漏洞。<br/>

> 为了遵守浏览器的安全策略，使用 window.open() 方法时，建议遵循以下最佳实践：

- 在用户交互的上下文中使用：例如，在按钮点击事件或用户操作后调用 window.open()。<br/>
- 提供有用的内容：确保弹出的窗口或标签页中提供有用的内容，而不是仅仅用于广告或欺诈目的。<br/>
- 提示用户：向用户解释为什么打开新窗口或标签页，并给出清晰的指示。<br/>
- 尊重用户的选择：如果浏览器阻止了弹出窗口，不要尝试绕过阻止机制，而是尊重用户的选择。<br/>

总之，使用 window.open() 时请注意遵守浏览器的安全策略，以确保用户安全和良好的用户体验。

## 讨论一个问题

> 前段时间遇到个问题<br/>
需求是需要调用接口，服务端返回二进制数据对象(Blob),然后我把它下载到本地。<br/>
其实很简单，实现的方法也很多。先看看我写的代码：

```js
import qs from 'qs';

const params = {
  // 参数对象
};

const apiUrl = import.meta.env.VITE_API_URL as string;
const url = `${apiUrl}/edu/entrance/resume/export?${qs.stringify(params)}`;
window.open(url, "newWindow");
```

在上述代码中，我使用了 qs 库来将参数对象转换为查询字符串。<br/>
然后，我们将查询字符串附加到 API URL 中，形成完整的导出文件的 URL。<br/>
最后，使用 window.open() 方法在新窗口中打开该 URL。<br/>

>这样写其实也没有毛病，直到发到正式环境用了个把月之后<br/>
服务端突然找我说：我改接口了，现在这个接口需要请求头传 Token 。<br/>
我：. . .<br/>
(说明一下，因为只有管理员才能触发这个下载按钮的事件，而整个项目管理员才不到三个，而且都是公司自己人。<br/>
所以当初才没有带参就调用。正是因为只有我才选择使用 window.open()。<br/>即省事又方便嘛！DDDD😂)

虽然不清楚为什么上线个把月之后服务端才说要接口要传 Token。<br/>
不过问题也不大，改就改呗。

秉着能省就省，用最少的代码量写最好的程序的原则。我突然有种想法：<br/>
能不能在原有基础上直接加上请求头参数，方便又快捷，心里美滋滋。🤔

后来发现，是我的想法天真了。😑

::: warning
 window.open()并不提供直接设置请求头的方法
:::

它主要用于在浏览器中打开新的窗口或标签页，并导航到指定的 URL 地址。

如果想在打开的新窗口或标签页中发送带有特定请求头的请求，就需要考虑使用其他方法。<br/>
如使用 JavaScript 的 XMLHttpRequest 或 Fetch API 进行请求。<br/>
这些方法允许我们更精细地控制请求，包括设置请求头。

唉~  所以只能改了。<br/>
最后改成了API请求

```js
import qs from 'qs';
import api from '@/api' // 封装的api

const params = {
  // 参数对象
};

const apiUrl = import.meta.env.VITE_API_URL as string;
// const url = `${apiUrl}/edu/entrance/resume/export?${qs.stringify(params)}`;
// window.open(url, "newWindow");
api.export({method:'get',params}).then((blob: Blob | MediaSource) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = '导出文件.xlsx';

  // 添加 <a> 元素到页面，并触发点击事件
  document.body.appendChild(link);
  link.click();

  // 清理资源
  document.body.removeChild(link);
})
```

因为这件事特意把window.open()重新了解了一遍，其实也不错。<svgIcon name="T-xin1"/>

