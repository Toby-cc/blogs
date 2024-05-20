---
title: 关于《iframe + postMessage非同源传递数据》
date: 2023-12-28
labelImage: 'https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/programmer.png?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp'
isLabelImage: true
lastUpdated: true
description: 
  name: 为了在非同源环境下实现安全的跨文档通信探讨iframe和postMessage的工作原理
  detailShow: false
tags:
  - 分享
  - iframe
categories:
  - js
permalink: /postMessage/
---

## 前言
> 在Web开发的大海中，我们时常需要在不同源的网页之间传递数据。<br/>
这就像是一场充满挑战的跨域漂流，而同源策略就像是一艘船，坚定地拒绝着任何未经允许的入侵。<br/>
为了绕开这个"同源"的大门卫，我们经常会借助一对默契的搭档：iframe 和 postMessage。<br/>
这是一场非同源传递数据的狂欢派对，今天我们就要揭开这对搭档的神秘面纱，一探究竟！😎

## 1、iframe 和 postMessage 的浪漫邂逅
在我们的传奇故事中，iframe和postMessage就像是两位不同源的相亲对象，通过一场浪漫的邂逅找到了彼此的默契。

### 1.1 认识 iframe

iframe是HTML中的一位"精灵"，可以在一个网页中嵌套另一个网页。就像是把一个小窗口嵌入到大窗口一样，这位精灵为我们提供了一种在不同源页面之间建立连接的方法。

```js
<iframe src="child.html" id="childFrame" width="400" height="300"></iframe>
```
在这个例子中，我们把一个名为child.html的小宝藏嵌套到了大舞台上。这就是iframe的魔法所在！

### 1.2 认识 postMessage
而postMessage，就是这场浪漫邂逅的巫师。他是HTML5引入的一位大法师，可以在不同源的窗口之间传递安全的消息。这就像是他为这对相亲对象打通了一条通讯的魔法之门。
```js
// 在父页面中
const childFrame = document.getElementById('childFrame');
childFrame.contentWindow.postMessage('Hello from parent!', 'http://child-origin.com');
```
在这里，父页面通过postMessage向child.html发送了一条问候。而这条消息穿越了不同源的边界，安全地传递到了目标页面。

::: tip
在这一步骤中，我们引入了iframe和postMessage的概念，同时使用代码示例展示了它们的基本用法。<br/>
下一步，我们可以继续深入，讨论它们如何协同工作，完成这场传递数据的舞蹈。<br/>
你是否准备好了？🧐
:::

## 2、iframe 和 postMessage 的华丽舞蹈

现在，我们的搭档 iframe 和 postMessage 已经相互认识，是时候看看它们是如何在舞台上华丽起舞的了。这一步我们将更深入地探讨它们的默契配合。

### 2.1 监听和发送
在这场舞蹈中，一方是消息的发送者，一方是消息的接收者。我们需要确保这两位舞者时刻保持听觉灵敏，以便在音乐响起时，准确地开始或结束他们的动作。

```js
// 在父页面中
window.addEventListener('message', event => {
  if (event.origin === 'http://child-origin.com') {
    const dataFromChild = event.data;
    console.log('Received data from child:', dataFromChild);
  }
});

// 向子页面发送消息
function sendMessageToChild() {
  const message = 'Hello from parent!';
  childFrame.contentWindow.postMessage(message, 'http://child-origin.com');
}
```
这段代码展示了在父页面中如何监听子页面发送的消息，并且在需要的时候向子页面发送消息。这就是我们舞台上的两位舞者如何相互呼应的方式。

### 2.2 双向通讯
在这场华丽的舞蹈中，不仅仅是单向的传递，有时候我们还需要一种双向的沟通方式。这就像是在舞蹈中，有时你主动引导，有时你需要跟随对方的步伐。
```js
// 在子页面中
window.addEventListener('message', event => {
  if (event.origin === 'http://parent-origin.com') {
    const dataFromParent = event.data;
    console.log('Received data from parent:', dataFromParent);

    // 向父页面发送响应消息
    const responseMessage = 'Hello from child!';
    event.source.postMessage(responseMessage, 'http://parent-origin.com');
  }
});
```
这段代码展示了在子页面中如何监听父页面发送的消息，并且在接收到消息后，向父页面发送响应消息。这就是两位舞者如何默契地完成双向的舞蹈。
::: tip
在这一步骤中，我们深入探讨了在 iframe 和 postMessage 的共同作用下，如何实现消息的双向传递。<br/>
这就像是一场跨域通讯的优美舞蹈，彰显了它们默契的舞台表演。<br/>
接下来，我们可以讨论一些具体的应用场景或者继续深入了解它们的工作原理。<br/>
你想要哪个方向发展？🤓
:::

## 3、跨越边界的挑战
虽然我们的 iframe 和 postMessage 已经是一对默契的舞伴，但在非同源的大舞台上，它们仍然需要面对一些特殊的考验。<br/>
在这个步骤中，我们将深入探讨在非同源环境下数据传递的一些挑战和解决方案。

### 3.1 安全之约：同源策略
在Web开发的舞台上，同源策略（Same-Origin Policy）扮演着一位重要的门卫，确保不同源的网页之间的安全性。这个策略基于一个简单而有力的原则：一个网页只能从相同协议、主机和端口加载另一个网页的资源。这意味着如果两个网页的协议、主机或端口任意一个不同，它们就被认为是不同源的。

同源策略的存在是为了防止恶意网页通过一些隐蔽的手段获取其他网页的敏感信息。然而，在现实的Web开发中，我们经常需要在不同源的网页之间进行一些合理的交互，这就是 iframe 和 postMessage 的舞台登场的地方。

::: details 同源策略的限制
同源策略限制了以下几个方面的操作：<br/>
1、Cookie、LocalStorage 和 IndexDB 等存储性资源： 不同源的页面无法访问彼此的本地存储资源，以确保用户敏感信息的安全。
<br/>
2、DOM： 不同源的页面无法直接访问对方的 DOM 结构，以防止恶意页面篡改其他页面的显示。
<br/>
3、AJAX 请求： 不同源的页面无法通过普通的 AJAX 请求获取对方的数据，以保护用户的隐私。
:::

### 3.2 姜太公钓鱼：安全的消息验证
在非同源的环境下，我们需要小心翼翼地验证消息的来源。<br/>
就像是姜太公钓鱼，我们希望只有那些真正愿意上钩的鱼儿才能够被接纳。<br/>
通过检查消息的来源（event.origin），我们可以确保只有合法的消息才能够被处理。

在同源策略的限制下，iframe 和 postMessage 提供了一种跨越同源限制的方法。<br/>
通过在一个页面中嵌套另一个页面，然后使用 postMessage 进行安全的消息传递，我们可以在不同源的页面之间建立起通信的桥梁。
```js
// 在父页面中
window.addEventListener('message', event => {
  if (event.origin === 'http://child-origin.com') {
    // 处理来自合法源的消息
    const dataFromChild = event.data;
    console.log('Received data from child:', dataFromChild);
  }
});
```
通过检查 event.origin，我们可以确保只处理来自合法源的消息，从而维护了同源策略的安全性。<br/>
这就是 postMessage 在同源策略下安全传递消息的机制。

::: tip
总的来说，同源策略是Web安全的基石，而 iframe 和 postMessage 则为我们提供了在同源限制下进行跨域通信的一种优雅解决方案。<br/>
在这场舞台上，它们共同构建起了一座安全之桥，使得不同源的网页可以和谐共舞，而无需担心信息泄露的风险。
:::

## 4、实际应用场景
在前面的步骤中，我们深入了解了 iframe 和 postMessage 在非同源环境下的数据传递。<br/>
让我们将这些理论知识应用到实际场景中，看看它们是如何在真实的项目中发挥作用的。
### 4.1 跨文档数据传递的实际应用

<h4>场景一：单点登录（Single Sign-On）</h4>
假设有一个门户网站，用户需要在这个门户网站上登录后，能够访问其他不同源的子系统，而无需再次登录。通过使用 iframe 和 postMessage，我们可以实现单点登录的效果。

实现步骤：
1. 用户在门户网站登录后，生成一个令牌（token）。<br/>
2. 将令牌传递给子系统，子系统将令牌存储在本地。<br/>
3. 在子系统中嵌套门户网站的 iframe，并使用 postMessage 将令牌传递给门户网站。<br/>
门户网站接收到令牌后，验证其有效性，从而实现用户在子系统中的单点登录。

::: details
门户网站（Parent）：
```js
<!-- parent.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Parent Site</title>
</head>
<body>
  <h1>Parent Site</h1>
  <button onclick="login()">Login</button>

  <iframe id="childFrame" src="child.html" width="600" height="400"></iframe>

  <script>
    function login() {
      // 在登录后生成令牌（这里简化为随机生成）
      const token = Math.random().toString(36).substring(7);
      
      // 获取子系统的 iframe
      const childFrame = document.getElementById('childFrame');

      // 向子系统发送令牌
      childFrame.contentWindow.postMessage({ type: 'login', token }, 'http://child-origin.com');
    }
  </script>
</body>
</html>
```

子系统（Child）：
```js
<!-- child.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Child System</title>
</head>
<body>
  <h1>Child System</h1>
  <p>Status: Not Logged In</p>

  <script>
    // 监听来自门户网站的消息
    window.addEventListener('message', event => {
      if (event.origin === 'http://parent-origin.com') {
        const data = event.data;

        if (data.type === 'login') {
          // 在子系统中处理登录逻辑
          // 这里简单地更新状态，实际应用中需要进行用户验证等操作
          document.querySelector('p').textContent = `Status: Logged In with Token - ${data.token}`;
        }
      }
    });
  </script>
</body>
</html>
```

在这个例子中，当用户在门户网站中点击登录按钮时，门户网站生成了一个随机的令牌，并通过 postMessage 向子系统传递了登录消息。子系统监听来自门户网站的消息，在收到登录消息后更新了状态。<br/>
这是一个简化的示例，实际上，你可能需要更复杂的用户验证逻辑。
:::

<h4>场景二：嵌套第三方内容</h4>
假设有一个博客平台，用户可以在自己的博客中嵌套其他用户的博客文章。通过使用 iframe 和 postMessage，我们可以实现在博客平台中嵌套第三方内容的功能。

实现步骤：

1. 用户在博客平台输入其他用户的博客文章地址。
2. 博客平台通过 iframe 嵌套第三方博客文章，并使用 postMessage 向嵌套的页面传递一些配置信息。
3. 第三方博客文章页面接收到配置信息后，根据配置进行相应的显示调整，以适应在博客平台中的展示要求。

::: details
博客平台（Blog Platform）：
```js
<!-- blog-platform.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog Platform</title>
</head>
<body>
  <h1>Blog Platform</h1>
  <iframe id="myIframe" src="blog.html" width="300" height="600"></iframe>

  <script>
    document.addEventListener('DOMContentLoaded', function () {
      const token = '1111111111'
      const iframe = document.getElementById('myIframe');
      iframe.contentWindow.postMessage({ token:token }, 'blog.html');
    })
  </script>
</body>
</html>
```

第三方博客文章（Third-party Blog）：
```js
<!-- third-party-blog.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Third-party Blog</title>
</head>
<body>
  <h1>Third-party Blog</h1>
  <p>This is a fascinating blog post!</p>

  <script>
      window.addEventListener('message', function(event) {
          const message = event.data;
          if (message && message.token) {
            // 这里可以根据需要进行一些动态调整，以适应在博客平台中的展示要求
          }

      });
  </script>
</body>
</html>
```

在这个例子中，用户在博客平台中输入了其他用户的博客文章地址，博客平台通过创建 iframe 元素并设置其 src 属性来嵌套第三方博客文章。这样，第三方博客文章就可以在博客平台中展示出来。在实际应用中，你可能需要更多的配置和样式的调整，以确保嵌套的内容在博客平台中良好地显示。
:::

### 4.2 实际项目中的挑战与解决方案

<h4>挑战一：安全性问题</h4>
在实际项目中，安全性始终是首要任务。为了防范 XSS 攻击等威胁，我们需要在消息传递的过程中做好消息的验证和过滤，确保只有合法的消息得以处理。

<h4>挑战二：性能问题</h4>
在一些复杂的应用场景中，频繁的数据传递可能会导致性能问题。为了优化性能，我们可以考虑使用一些缓存策略，避免不必要的数据传递。

<h4>解决方案：细致入微的控制</h4>
通过细致入微地控制消息的来源、内容和频率，可以有效解决安全性和性能问题。合理地使用消息传递，可以在实际项目中取得良好的效果。

::: details 解决方案一：安全性问题
在消息的接收方进行安全验证，包括验证消息的来源 (event.origin) 和消息的内容。只有当消息来自可信任的源并包含受信任的数据时，才应该处理这些消息。
```js
// 子系统中的消息验证
window.addEventListener('message', event => {
  if (event.origin === 'http://parent-origin.com') {
    const data = event.data;

    // 进行更详细的安全验证，例如验证 token 的有效性等
    if (data.type === 'login' && isValidToken(data.token)) {
      // 处理登录逻辑
    }
  }
});
```
:::

::: details 解决方案二：性能问题
限制消息的传递频率，确保只有必要的信息被传递。在某些情况下，可以考虑使用本地缓存，避免重复获取相同的信息。
```js
// 门户网站中的消息发送
function sendTokenToChild() {
  const token = getTokenFromLocalStorage();

  // 只有在 token 不为空的情况下才发送消息
  if (token) {
    childFrame.contentWindow.postMessage({ type: 'login', token }, 'http://child-origin.com');
  }
}
```
通过细致入微地控制消息的来源、内容和频率，可以在实际项目中取得良好的性能表现。
:::


::: tip
在这一步骤中，我们将 iframe 和 postMessage 应用到实际项目场景中，讨论了一些常见的应用案例，并提出了在实际项目中可能面临的挑战与解决方案。<br/>
通过这些实际案例，我们能更深入地理解这对默契的舞伴是如何在实战中发挥作用的。<br/>
接下来，我们可以进一步探讨一些高级的主题，或者总结这次旅程的所学所感。<br/>
你有其他特别关注的方向吗？
:::

## 5、高级主题
在这一步骤中，我们将深入研究一些与 iframe 和 postMessage 相关的高级主题，以及它们在实际开发中的更深层次的应用。

### 5.1 跨文档消息传递的安全性增强
 1. 消息源的验证<br/>
 在前面的步骤中，我们已经强调了验证消息来源的重要性。然而，在实际应用中，我们可能会面临更为复杂的情况。<br/>
 例如，我们可能需要处理多个子系统，每个子系统都有一个不同的源。为了提高安全性，可以考虑使用更为灵活的方式验证消息来源，而不仅仅是通过硬编码的方式检查 "<strong>event.origin</strong>"。
 ```js
 // 在父页面中
const trustedOrigins = ['http://child1-origin.com', 'http://child2-origin.com'];

window.addEventListener('message', event => {
  if (trustedOrigins.includes(event.origin)) {
    // 处理来自合法源的消息
    const dataFromChild = event.data;
    console.log('Received data from child:', dataFromChild);
  }
});
```
2. 使用安全通信通道<br/>
在一些敏感的应用场景中，我们可能需要更高级的安全措施。可以考虑使用加密通信来确保消息在传递过程中的机密性。这可以通过使用 HTTPS 协议以及加密算法来实现。



### 5.2 跨文档消息传递的性能优化
1. 懒加载和按需加载<br/>
为了优化性能，可以考虑采用懒加载和按需加载的策略。不必在页面加载时就将所有 iframe 加载进来，而是在需要时再进行加载。
```js
// 动态创建 iframe
function loadChildFrame() {
  const childFrame = document.createElement('iframe');
  iframe.id = 'myIframe';
  iframe.width = 600;
  iframe.height = 400;
  iframe.style.border = '2px';
  iframe.scrolling="no" 
  iframe.loading = 'lazy';
  childFrame.src = 'child.html';

  // 将 iframe 插入到页面中
  document.body.appendChild(childFrame);
}
```
2. 优化消息的传递频率<br/>
合理地控制消息的传递频率是性能优化的关键。可以考虑使用一些缓存策略，避免不必要的数据传递。
```js
// 在父页面中
let lastData = null;

function sendDataToChild(data) {
  // 只有在数据发生变化时才发送消息
  if (JSON.stringify(data) !== JSON.stringify(lastData)) {
    childFrame.contentWindow.postMessage(data, 'http://child-origin.com');
    lastData = data;
  }
}
```

::: tip
在这一步骤中，我们深入探讨了一些高级主题，包括安全性增强、性能优化。这些主题可以帮助我们更好地应对复杂的应用场景，并确保跨文档消息传递的可靠性和安全性。<br/>
如果你有其他关注的主题，或者希望更深入了解其中的某个方面，请告诉我！
:::

## 结缘
在这个代码的时空中，我们邂逅了 iframe 和 postMessage，它们如同编程世界中的一对浪漫情侣，默契无间，共舞于浏览器的夜空。

在同源的花海中，我们目睹了它们的缠绵，从一个模块传递到另一个模块，仿佛代码间的秘密告白，让整个Web页面变成了一个奇妙的舞台。

就像一个模块在夜晚轻轻地对另一个模块耳语一样，它们用 postMessage 传递着思念，实现着页面间的温馨交流。

在这场代码的邂逅中，我们学会了如何巧妙地诉说心意，用嵌套的魔法创造奇迹，共同航向未知的冒险。

未来，或许这对浪漫搭档会继续在Web的星空中徜徉，与其他技术相遇，共织出更为美丽的前端故事。

让我们一起怀揣着对代码浪漫的憧憬，继续追寻那片属于我们的Web开发的星海。