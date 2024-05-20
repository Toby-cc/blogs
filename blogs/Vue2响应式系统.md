---
title: vue2响应式系统
date: 2023-05-05
permalink: /defineProperty/
description: 
  name: 研究一下Vue2是怎么通过Object.defineProperty实现双向绑定的
tags:
  - 学习
categories:
  - Vue
---

> Vue.js 是一款 MVVM 框架，它的核心实现就是「响应式系统」。所以想要理解它的实现，有助于避开一些常见的「坑」，也有助于在遇见一些琢磨不透的问题时可以深入其原理来解决它。

## 响应式系统的基本实现原理

