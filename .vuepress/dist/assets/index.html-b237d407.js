import{_ as i,p as u,q as r,t as s,a5 as t,s as n,S as a,af as k,n as o}from"./framework-0cc1c2cc.js";const d={},v=n("span",null,"目录",-1),m={class:"catalogue-content"},b=n("br",null,null,-1),g=n("br",null,null,-1),y=n("br",null,null,-1),h=n("br",null,null,-1),f=n("br",null,null,-1),q=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"前言"),n("p",null,[a("其实vuepress-theme-reco@2.x虽然是通过 Xicons 来配置图标的"),n("br"),a(" 不过却几乎可以满足绝大部分场景。"),n("br"),a(" 而且Markdown也支持直接使用 Emoji 表情"),n("br"),a(" 但总是有小伙伴喜欢用自己的图标")])],-1),_=k(`<h2 id="封装图标组件" tabindex="-1"><a class="header-anchor" href="#封装图标组件" aria-hidden="true">#</a> 封装图标组件</h2><blockquote><p>我们可以封装一个组件，集合 Element、iconfont、Xicons 的图标</p></blockquote><h3 id="修改-element-图标" tabindex="-1"><a class="header-anchor" href="#修改-element-图标" aria-hidden="true">#</a> 修改 Element 图标</h3><p>首先修改一下Element图标的引入方式</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> defineClientConfig  <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vuepress/client&#39;</span><span class="token comment">// 导入组件库</span>
<span class="token keyword">import</span> ElementPlus <span class="token keyword">from</span> <span class="token string">&#39;element-plus&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;element-plus/dist/index.css&#39;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> ElementPlusIconsVue <span class="token keyword">from</span> <span class="token string">&#39;@element-plus/icons-vue&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> icons <span class="token operator">=</span> ElementPlusIconsVue <span class="token keyword">as</span> any<span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineClientConfig</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token function">enhance</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> app <span class="token punctuation">}</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 引入element图标</span>
    <span class="token comment">// Object.keys(icons).forEach(key =&gt; {</span>
    <span class="token comment">//     app.component(key, icons[key])</span>
    <span class="token comment">// })</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> i <span class="token keyword">in</span> icons<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      app<span class="token punctuation">.</span><span class="token function">component</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">ele-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>icons<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> icons<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ElementPlus<span class="token punctuation">)</span>
    <span class="token operator">...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="引入iconfont图标" tabindex="-1"><a class="header-anchor" href="#引入iconfont图标" aria-hidden="true">#</a> 引入iconfont图标</h3><p>在 head 中添加 script</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// .vuepress/config.ts</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">head</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string">&#39;link&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">rel</span><span class="token operator">:</span> <span class="token string">&#39;icon&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">href</span><span class="token operator">:</span> <span class="token string">&#39;https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/202303201032565.ico&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;script&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;module&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">async</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token literal-property property">src</span><span class="token operator">:</span> <span class="token string">&#39;//at.alicdn.com/t/c/font_3933848_spkan9npxzi.js&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="封装icon组件" tabindex="-1"><a class="header-anchor" href="#封装icon组件" aria-hidden="true">#</a> 封装icon组件</h3><p>在 .vuepress/components 中插件 SvgIcon.vue</p><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token comment">&lt;!-- .vuepress/components/SvgIcon.vue --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- 饿了么图标 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>i</span> 
    <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isShowIconSvg<span class="token punctuation">&quot;</span></span> 
    <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&#39;</span>el-icon T-icon &#39;+ getIconName<span class="token punctuation">&quot;</span></span> 
    <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>setIconSvgStyle<span class="token punctuation">&quot;</span></span>
    <span class="token punctuation">&gt;</span></span>
		<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>getIconName<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>
	<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>i</span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- 阿里图标 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>svg</span> 
    <span class="token attr-name">v-else-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>isShowIconFont<span class="token punctuation">&quot;</span></span> 
    <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&#39;</span>icon T-icon &#39;+ getIconName<span class="token punctuation">&quot;</span></span> 
    <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>setIconSvgStyle<span class="token punctuation">&quot;</span></span> 
    <span class="token attr-name">aria-hidden</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>true<span class="token punctuation">&quot;</span></span>
    <span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>use</span> <span class="token attr-name">:xlink:href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token punctuation">&#39;</span>#&#39;+getIconName<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>svg</span><span class="token punctuation">&gt;</span></span>
  <span class="token comment">&lt;!-- Xicons 图标 --&gt;</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span>
    <span class="token attr-name">v-else</span>
    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>xicon-icon T-icon<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">:style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>setIconSvgStyle<span class="token punctuation">&quot;</span></span>
    <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>icons[getIconName]<span class="token punctuation">&quot;</span></span>
  <span class="token punctuation">/&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&#39;</span>ts<span class="token punctuation">&#39;</span></span> <span class="token attr-name">setup</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token doc-comment comment">/**
 * 说明：
 * T-icon 统一的图标类名，方便批量管理
 * getIconName 图标名称
 * setIconSvgStyle 图标样式
 * 使用： &lt;SvgIcon name=&quot;ele-Delete&quot;/&gt;
 */</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> computed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> icons <span class="token keyword">from</span> <span class="token string">&#39;@vicons/carbon&#39;</span>

<span class="token keyword">const</span> props <span class="token operator">=</span> <span class="token function">defineProps</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// svg 图标组件名字</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span>String<span class="token punctuation">,</span>
    <span class="token literal-property property">required</span><span class="token operator">:</span><span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// svg 大小</span>
  <span class="token literal-property property">size</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> Number<span class="token punctuation">,</span>
    <span class="token function-variable function">default</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token number">14</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// svg 颜色</span>
  <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> String<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token comment">// 获取 icon 图标名称</span>
<span class="token keyword">const</span> getIconName <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> props<span class="token operator">?.</span>name<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 用于判断 element plus 自带 svg 图标的显示、隐藏</span>
<span class="token keyword">const</span> isShowIconSvg <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> props<span class="token operator">?.</span>name<span class="token operator">?.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&#39;ele-&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 用于判断 阿里图标库 自己图标的显示、隐藏, T：自己的图标库前缀</span>
<span class="token keyword">const</span> isShowIconFont <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> props<span class="token operator">?.</span>name<span class="token operator">?.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">&#39;T-&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 设置图标样式</span>
<span class="token keyword">const</span> setIconSvgStyle <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> style <span class="token operator">=</span>  <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
      font-size: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>props<span class="token punctuation">.</span>size<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px;
      color: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>props<span class="token punctuation">.</span>color<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
      width: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>props<span class="token punctuation">.</span>size<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px;
      height: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>props<span class="token punctuation">.</span>size<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">px;
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> style
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.icon</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span> <span class="token property">height</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
  <span class="token property">vertical-align</span><span class="token punctuation">:</span> -0.15em<span class="token punctuation">;</span>
  <span class="token property">fill</span><span class="token punctuation">:</span> currentColor<span class="token punctuation">;</span>
  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.T-icon</span> <span class="token punctuation">{</span>
  <span class="token property">vertical-align</span><span class="token punctuation">:</span> middle<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="效果" tabindex="-1"><a class="header-anchor" href="#效果" aria-hidden="true">#</a> 效果</h3><p>我们来看一下实际效果吧</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>---
title: test2
date: <span class="token number">2023</span>/3/1
tags:
  - css
categories:
  - 测试图标
---

<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
  我是 Element 图标
  <span class="token operator">&lt;</span>SvgIcon <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&quot;ele-Delete&quot;</span> <span class="token assign-left variable">color</span><span class="token operator">=</span><span class="token string">&quot;green&quot;</span> :size<span class="token operator">=</span><span class="token string">&quot;20&quot;</span>/<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/div<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
  我是 iconfont 图标
  <span class="token operator">&lt;</span>SvgIcon <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&quot;T-xin1&quot;</span> <span class="token assign-left variable">color</span><span class="token operator">=</span><span class="token string">&quot;red&quot;</span>/<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/div<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
  我是 Xicons 图标
  <span class="token operator">&lt;</span>SvgIcon <span class="token assign-left variable">name</span><span class="token operator">=</span><span class="token string">&quot;Home&quot;</span> :size<span class="token operator">=</span><span class="token string">&quot;20&quot;</span>/<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>/div<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p align="center"><img width="500" class="imageBorder" src="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/blogs/202303231820350.png/compress50"></p>`,15);function w(x,S){const e=o("SvgIcon"),p=o("RouterLink"),c=o("el-collapse-item"),l=o("el-collapse");return u(),r("div",null,[s(l,null,{default:t(()=>[s(c,{class:"catalogue"},{title:t(()=>[v,s(e,{name:"T-a-22",size:20})]),default:t(()=>[n("div",m,[s(e,{name:"T-jiantou_xiangyouliangci",size:20}),s(p,{to:"/docs/vuepress_1/"},{default:t(()=>[a("(1) 搭建Vuepress项目")]),_:1}),b,s(e,{name:"T-jiantou_xiangyouliangci",size:20}),s(p,{to:"/docs/vuepress_2/"},{default:t(()=>[a("(2) 使用社区主题和插件")]),_:1}),g,s(e,{name:"T-jiantou_xiangyouliangci",size:20}),s(p,{to:"/docs/vuepress_3/"},{default:t(()=>[a("(3) 使用 Element-Plus 组件库")]),_:1}),y,s(e,{name:"T-dangqianweizhi",size:20}),s(p,{to:"/docs/vuepress_4/"},{default:t(()=>[a("(4) 使用阿里巴巴图标")]),_:1}),h,s(e,{name:"T-jiantou_xiangyouliangci",size:20}),s(p,{to:"/docs/vuepress_5/"},{default:t(()=>[a("(5) 部署 VuePress")]),_:1}),f])]),_:1})]),_:1}),q,_])}const z=i(d,[["render",w],["__file","index.html.vue"]]);export{z as default};
