var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// .vuepress/components/vuepress-theme-reco/lib/node/recoTheme.js
import { activeHeaderLinksPlugin } from "@vuepress/plugin-active-header-links";
import { backToTopPlugin } from "@vuepress/plugin-back-to-top";
import { bulletinPopoverPlugin } from "@vuepress-reco/vuepress-plugin-bulletin-popover";
import { codeCopyPlugin } from "@vuepress-reco/vuepress-plugin-code-copy";
import { commentsPlugin } from "@vuepress-reco/vuepress-plugin-comments";
import { containerPlugin } from "@vuepress/plugin-container";
import { markdownTaskPlugin } from "@vuepress-reco/vuepress-plugin-markdown-task";
import { externalLinkIconPlugin } from "@vuepress/plugin-external-link-icon";
import { gitPlugin } from "@vuepress/plugin-git";
import { nprogressPlugin } from "@vuepress/plugin-nprogress";
import { pagePlugin } from "@vuepress-reco/vuepress-plugin-page";
import { palettePlugin } from "@vuepress/plugin-palette";
import { path, fs, getDirname } from "@vuepress/utils";
import { prismjsPlugin } from "@vuepress/plugin-prismjs";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { searchPlugin } from "@vuepress/plugin-search";
import { docsearchPlugin } from "@vuepress/plugin-docsearch";
import { mediumZoomPlugin } from "@vuepress/plugin-medium-zoom";
import { tailwindcssConfig as tailwindcssConfig2 } from "@vuepress-reco/tailwindcss-config";
import { themeDataPlugin } from "@vuepress/plugin-theme-data";
import { viteBundler } from "@vuepress/bundler-vite";
import { vuePreviewPlugin } from "@vuepress-reco/vuepress-plugin-vue-preview";
import { webpackBundler } from "@vuepress/bundler-webpack";

// .vuepress/components/vuepress-theme-reco/lib/node/resolveBundlerConfig.js
import { tailwindcssConfig } from "@vuepress-reco/tailwindcss-config";
import postcssImport from "postcss-import";
import tailwindcssNesting from "tailwindcss/nesting/index.js";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssEach from "postcss-each";
var mergeViteBundlerConfig = (options, config) => {
  var _a, _b, _c, _d, _e, _f, _g;
  const userViteConfig = (config === null || config === void 0 ? void 0 : config.viteOptions) || {};
  if (typeof ((_a = userViteConfig === null || userViteConfig === void 0 ? void 0 : userViteConfig.css) === null || _a === void 0 ? void 0 : _a.postcss) === "string") {
    throw new Error("String type postcss is not supported yet");
  }
  const userPostcssPlugins = ((_c = (_b = userViteConfig === null || userViteConfig === void 0 ? void 0 : userViteConfig.css) === null || _b === void 0 ? void 0 : _b.postcss) === null || _c === void 0 ? void 0 : _c.plugins) || [];
  if (!Array.isArray(userPostcssPlugins)) {
    throw new Error("plugins for postcss must be an array");
  }
  const viteOptions = {
    ...userViteConfig || {},
    ...{
      css: {
        ...(userViteConfig === null || userViteConfig === void 0 ? void 0 : userViteConfig.css) || {},
        ...{
          postcss: {
            ...((_d = userViteConfig === null || userViteConfig === void 0 ? void 0 : userViteConfig.css) === null || _d === void 0 ? void 0 : _d.postcss) || {},
            ...{
              plugins: [
                ...userPostcssPlugins,
                ...(_g = (_f = (_e = options === null || options === void 0 ? void 0 : options.viteOptions) === null || _e === void 0 ? void 0 : _e.css) === null || _f === void 0 ? void 0 : _f.postcss) === null || _g === void 0 ? void 0 : _g.plugins
              ]
            }
          }
        }
      }
    }
  };
  return {
    viteOptions: { ...viteOptions },
    vuePluginOptions: { ...(options === null || options === void 0 ? void 0 : options.vuePluginOptions) || {}, ...(config === null || config === void 0 ? void 0 : config.vuePluginOptions) || {} }
  };
};
var defaultViteBundlerConfig = () => ({
  viteOptions: {
    css: {
      postcss: {
        plugins: [
          postcssImport,
          tailwindcssNesting,
          tailwindcss(tailwindcssConfig),
          autoprefixer({}),
          postcssEach
        ]
      }
    }
  }
});
var resolveUserConfig = (config) => {
  return (config === null || config === void 0 ? void 0 : config.viteBundler) || {};
};

// .vuepress/components/vuepress-theme-reco/lib/node/resolveContainer.js
var svgMap = {
  info: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg>',
  tip: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8h.01"></path><path d="M11 12h1v4h1"></path></g></svg>',
  warning: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></g></svg>',
  danger: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M10 10l4 4m0-4l-4 4"></path></g></svg>',
  details: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7l5 5l5-5"></path><path d="M7 13l5 5l5-5"></path></g></svg>'
};
var renderOptions = (tokens, idx, options, env, self) => {
  const { type, info } = tokens[idx];
  const [customType, title] = info.trim().split(" ");
  if (/container\_\w+\_open/g.test(type)) {
    return `<div class="custom-container ${customType}">${svgMap[customType] || ""}<p class="custom-container-title">${title || customType.toUpperCase()}</p>`;
  }
  if (/container\_\w+\_close/g.test(type)) {
    return "</div>";
  }
  return self.renderToken(tokens, idx, options);
};
var renderOptionsForDetails = (tokens, idx, options, env, self) => {
  const { type, info } = tokens[idx];
  const [customType, title] = info.trim().split(" ");
  if (/container_details_open/g.test(type)) {
    return `<details class="custom-container ${customType}"><summary class="custom-container-title">${title || customType.toUpperCase()}</summary>`;
  }
  if (/container_details_close/g.test(type)) {
    return "</details>";
  }
  return self.renderToken(tokens, idx, options);
};
var resolveOptionsForCodeGroup = () => {
  return {
    before: () => `<CodeGroup>
`,
    after: () => "</CodeGroup>\n"
  };
};
var resolveOptionsForCodeGroupItem = () => {
  return {
    before: (info) => `<CodeGroupItem title="${info}">
`,
    after: () => "</CodeGroupItem>\n"
  };
};
var resolveContainerOptions = (type) => {
  let render = renderOptions;
  if (type === "details") {
    render = renderOptionsForDetails;
    return { type, render };
  }
  if (type === "code-group") {
    return { type, ...resolveOptionsForCodeGroup() };
  }
  if (type === "code-group-item") {
    return { type, ...resolveOptionsForCodeGroupItem() };
  }
  return { type, render };
};

// .vuepress/components/vuepress-theme-reco/lib/node/pages.js
var pages = [
  {
    type: "category",
    frontmatterKey: "categories",
    path: "/categories/",
    layout: "Categories",
    pagination: 10
  },
  {
    type: "category",
    frontmatterKey: "tags",
    path: "/tags/",
    layout: "Categories",
    pagination: 10
  },
  {
    path: "/timeline/",
    layout: "TimeLine"
  },
  {
    path: "/posts",
    layout: "Posts"
  }
];

// .vuepress/components/vuepress-theme-reco/lib/node/recoTheme.js
var __vite_injected_original_import_meta_url = "file:///C:/Users/86159/Desktop/vuepress-reco/.vuepress/components/vuepress-theme-reco/lib/node/recoTheme.js";
var __dirname = getDirname(__vite_injected_original_import_meta_url);
var recoTheme = (themeConfig) => {
  const plugins = [
    bulletinPopoverPlugin(),
    commentsPlugin(),
    pagePlugin(pages || [], themeConfig),
    gitPlugin(),
    themeDataPlugin({ themeData: themeConfig }),
    searchPlugin({
      hotKeys: [{ key: "s", ctrl: true }]
    }),
    palettePlugin(),
    mediumZoomPlugin({
      zoomOptions: {
        background: "inherit"
      }
    }),
    nprogressPlugin(),
    prismjsPlugin(),
    activeHeaderLinksPlugin({
      headerLinkSelector: "a.page-catalog-item"
    }),
    containerPlugin(resolveContainerOptions("tip")),
    containerPlugin(resolveContainerOptions("info")),
    containerPlugin(resolveContainerOptions("warning")),
    containerPlugin(resolveContainerOptions("danger")),
    containerPlugin(resolveContainerOptions("details")),
    containerPlugin(resolveContainerOptions("code-group")),
    containerPlugin(resolveContainerOptions("code-group-item")),
    externalLinkIconPlugin(),
    vuePreviewPlugin(),
    registerComponentsPlugin({
      componentsDir: path.resolve(process.cwd(), themeConfig.vuePreviewsDir || "./.vuepress/vue-previews")
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(process.cwd(), themeConfig.componentsDir || "./.vuepress/components")
    }),
    backToTopPlugin(),
    codeCopyPlugin(),
    markdownTaskPlugin()
  ];
  if (themeConfig.algolia) {
    plugins.push(docsearchPlugin(themeConfig.algolia));
  }
  return {
    name: "vuepress-theme-reco",
    onInitialized(app) {
      if (themeConfig.primaryColor) {
        tailwindcssConfig2.theme.extend.colors.reco.primary = themeConfig.primaryColor;
      }
      const userConfig = resolveUserConfig(themeConfig);
      if (app.options.bundler.name === "@vuepress/bundler-vite") {
        const options = defaultViteBundlerConfig();
        const viteBundlerOptions = mergeViteBundlerConfig(options, userConfig);
        app.options.bundler = viteBundler(viteBundlerOptions);
      } else {
        app.options.bundler = webpackBundler({
          postcss: {
            postcssOptions: {
              plugins: [
                ["tailwindcss", tailwindcssConfig2],
                ["autoprefixer", {}],
                [__require("tailwindcss/nesting")],
                ["postcss-each"]
              ]
            }
          }
        });
      }
    },
    templateBuild: path.resolve(__dirname, "../../templates/index.build.html"),
    templateDev: path.resolve(__dirname, "../../templates/index.dev.html"),
    clientConfigFile: path.resolve(__dirname, "../client/config.js"),
    alias: Object.fromEntries(fs.readdirSync(path.resolve(__dirname, "../client/components")).filter((file) => file.endsWith(".vue")).map((file) => [
      `@theme/${file}`,
      path.resolve(__dirname, "../client/components", file)
    ])),
    extendsPage: (page) => {
      page.data.filePathRelative = page.filePathRelative;
      page.routeMeta.title = page.title;
    },
    plugins
  };
};

// .vuepress/components/vuepress-theme-reco/lib/node/index.d.ts
var index_d_default = recoTheme;

// .vuepress/theme/navbar.js
var navbar_default = [
  { text: "\u9996\u9875", link: "/", icon: "T-shouye2" },
  { text: "\u5206\u7C7B", link: "/categories/qianduan/1/", icon: "T-fenlei" },
  { text: "\u6807\u7B7E", link: "/tags/fenxiang/1/", icon: "T-24gl-tags3" }
];

// .vuepress/theme/index.js
var theme_default = index_d_default({
  // logo: "https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images202303021104339.png/compress50",
  author: "Toby",
  authorAvatar: "https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/202303201032561.png/compress50",
  // repo: 'https://gitee.com/Toby_c/blogs',
  lastUpdatedText: "\u66F4\u65B0\u65F6\u95F4",
  lastUpdated: true,
  editLink: false,
  colorModeSwitch: false,
  catalogTitle: "\u6587\u6863\u76EE\u5F55",
  // series,//左侧边栏
  navbar: navbar_default,
  commentConfig: {
    type: "valine",
    options: {
      appId: "INehFJKj6HiCSE4sCTtxCakB-gzGzoHsz",
      // your appId
      appKey: "9qj5nh3ZDNALQbTYORfDLRpD",
      // your appKey
      hideComments: false
      // 全局隐藏评论，默认 false
    }
  }
  // bulletin,//公告
  // valineConfig 配置与 1.x 一致
  // valineConfig: {
  //   appId: 'xxx',
  //   appKey: 'xxx',
  //   placeholder: '填写邮箱可以收到回复提醒哦！',
  //   verify: true, // 验证码服务
  //   // notify: true,
  //   recordIP: true,
  //   // hideComments: true // 隐藏评论
  // },
});

// .vuepress/plugins/index.js
import { registerComponentsPlugin as registerComponentsPlugin2 } from "@vuepress/plugin-register-components";
import { palettePlugin as palettePlugin2 } from "@vuepress/plugin-palette";
import { getDirname as getDirname2, path as path2 } from "@vuepress/utils";
import exampleDemo from "vuepress-plugin-example-block";
var __vite_injected_original_import_meta_url2 = "file:///C:/Users/86159/Desktop/vuepress-reco/.vuepress/plugins/index.js";
var __dirname2 = getDirname2(__vite_injected_original_import_meta_url2);
var plugins_default = [
  registerComponentsPlugin2({
    // 配置项
    componentsDir: path2.resolve(__dirname2, "./components")
  }),
  palettePlugin2({ preset: "css" }),
  exampleDemo({
    path: __dirname2,
    //必填,写死__dirname即可
    dir: "../components"
    //选填,指定组件文件路径
  })
];

// .vuepress/head/index.js
var head_default = [
  ["link", { rel: "icon", href: "https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/202303201032565.ico" }],
  ["script", { type: "module", async: true, src: "//at.alicdn.com/t/c/font_3933848_66sgtkuwuk3.js" }],
  ["meta", { name: "referrer", content: "never" }],
  ["meta", { name: "keywords", content: "Toby\u7684\u5B66\u4E60\u57FA\u5730,Toby\u7684\u535A\u5BA2,Toby,toby,\u535A\u5BA2" }],
  ["meta", { name: "description", content: "\u8FD9\u662FToby\u7684\u4E2A\u4EBA\u535A\u5BA2,\u4E2A\u4EBA\u7A7A\u95F4\u968F\u4FBF\u5199\u5199\uFF0C\u65E5\u5E38\u79EF\u7D2F\u3002" }]
];

// .vuepress/config.ts
import { getDirname as getDirname3, path as path3 } from "@vuepress/utils";
var __vite_injected_original_import_meta_url3 = "file:///C:/Users/86159/Desktop/vuepress-reco/.vuepress/config.ts";
var __dirname3 = getDirname3(__vite_injected_original_import_meta_url3);
var config_default = {
  // base: '/blogs/',
  title: "Toby\u7684\u5B66\u4E60\u57FA\u5730",
  description: "\u8FD9\u662FToby\u7684\u4E2A\u4EBA\u535A\u5BA2",
  theme: theme_default,
  plugins: plugins_default,
  head: head_default,
  alias: {
    "@": path3.resolve(__dirname3, "./")
  }
};
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZ1ZXByZXNzL2NvbXBvbmVudHMvdnVlcHJlc3MtdGhlbWUtcmVjby9saWIvbm9kZS9yZWNvVGhlbWUuanMiLCAiLnZ1ZXByZXNzL2NvbXBvbmVudHMvdnVlcHJlc3MtdGhlbWUtcmVjby9saWIvbm9kZS9yZXNvbHZlQnVuZGxlckNvbmZpZy5qcyIsICIudnVlcHJlc3MvY29tcG9uZW50cy92dWVwcmVzcy10aGVtZS1yZWNvL2xpYi9ub2RlL3Jlc29sdmVDb250YWluZXIuanMiLCAiLnZ1ZXByZXNzL2NvbXBvbmVudHMvdnVlcHJlc3MtdGhlbWUtcmVjby9saWIvbm9kZS9wYWdlcy5qcyIsICIudnVlcHJlc3MvY29tcG9uZW50cy92dWVwcmVzcy10aGVtZS1yZWNvL2xpYi9ub2RlL2luZGV4LmQudHMiLCAiLnZ1ZXByZXNzL3RoZW1lL25hdmJhci5qcyIsICIudnVlcHJlc3MvdGhlbWUvaW5kZXguanMiLCAiLnZ1ZXByZXNzL3BsdWdpbnMvaW5kZXguanMiLCAiLnZ1ZXByZXNzL2hlYWQvaW5kZXguanMiLCAiLnZ1ZXByZXNzL2NvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6L1VzZXJzLzg2MTU5L0Rlc2t0b3AvdnVlcHJlc3MtcmVjby8udnVlcHJlc3MvY29tcG9uZW50cy92dWVwcmVzcy10aGVtZS1yZWNvL2xpYi9ub2RlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw4NjE1OVxcXFxEZXNrdG9wXFxcXHZ1ZXByZXNzLXJlY29cXFxcLnZ1ZXByZXNzXFxcXGNvbXBvbmVudHNcXFxcdnVlcHJlc3MtdGhlbWUtcmVjb1xcXFxsaWJcXFxcbm9kZVxcXFxyZWNvVGhlbWUuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzg2MTU5L0Rlc2t0b3AvdnVlcHJlc3MtcmVjby8udnVlcHJlc3MvY29tcG9uZW50cy92dWVwcmVzcy10aGVtZS1yZWNvL2xpYi9ub2RlL3JlY29UaGVtZS5qc1wiO2ltcG9ydCB7IGFjdGl2ZUhlYWRlckxpbmtzUGx1Z2luIH0gZnJvbSAnQHZ1ZXByZXNzL3BsdWdpbi1hY3RpdmUtaGVhZGVyLWxpbmtzJztcbmltcG9ydCB7IGJhY2tUb1RvcFBsdWdpbiB9IGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tYmFjay10by10b3AnO1xuaW1wb3J0IHsgYnVsbGV0aW5Qb3BvdmVyUGx1Z2luIH0gZnJvbSAnQHZ1ZXByZXNzLXJlY28vdnVlcHJlc3MtcGx1Z2luLWJ1bGxldGluLXBvcG92ZXInO1xuaW1wb3J0IHsgY29kZUNvcHlQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MtcmVjby92dWVwcmVzcy1wbHVnaW4tY29kZS1jb3B5JztcbmltcG9ydCB7IGNvbW1lbnRzUGx1Z2luIH0gZnJvbSAnQHZ1ZXByZXNzLXJlY28vdnVlcHJlc3MtcGx1Z2luLWNvbW1lbnRzJztcbmltcG9ydCB7IGNvbnRhaW5lclBsdWdpbiB9IGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tY29udGFpbmVyJztcbmltcG9ydCB7IG1hcmtkb3duVGFza1BsdWdpbiB9IGZyb20gJ0B2dWVwcmVzcy1yZWNvL3Z1ZXByZXNzLXBsdWdpbi1tYXJrZG93bi10YXNrJztcbmltcG9ydCB7IGV4dGVybmFsTGlua0ljb25QbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLWV4dGVybmFsLWxpbmstaWNvbic7XG5pbXBvcnQgeyBnaXRQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLWdpdCc7XG5pbXBvcnQgeyBucHJvZ3Jlc3NQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLW5wcm9ncmVzcyc7XG5pbXBvcnQgeyBwYWdlUGx1Z2luIH0gZnJvbSAnQHZ1ZXByZXNzLXJlY28vdnVlcHJlc3MtcGx1Z2luLXBhZ2UnO1xuaW1wb3J0IHsgcGFsZXR0ZVBsdWdpbiB9IGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tcGFsZXR0ZSc7XG5pbXBvcnQgeyBwYXRoLCBmcywgZ2V0RGlybmFtZSB9IGZyb20gJ0B2dWVwcmVzcy91dGlscyc7XG5pbXBvcnQgeyBwcmlzbWpzUGx1Z2luIH0gZnJvbSAnQHZ1ZXByZXNzL3BsdWdpbi1wcmlzbWpzJztcbmltcG9ydCB7IHJlZ2lzdGVyQ29tcG9uZW50c1BsdWdpbiB9IGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tcmVnaXN0ZXItY29tcG9uZW50cyc7XG5pbXBvcnQgeyBzZWFyY2hQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLXNlYXJjaCc7XG5pbXBvcnQgeyBkb2NzZWFyY2hQbHVnaW4sIH0gZnJvbSAnQHZ1ZXByZXNzL3BsdWdpbi1kb2NzZWFyY2gnO1xuaW1wb3J0IHsgbWVkaXVtWm9vbVBsdWdpbiB9IGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tbWVkaXVtLXpvb20nO1xuaW1wb3J0IHsgdGFpbHdpbmRjc3NDb25maWcgfSBmcm9tICdAdnVlcHJlc3MtcmVjby90YWlsd2luZGNzcy1jb25maWcnO1xuaW1wb3J0IHsgdGhlbWVEYXRhUGx1Z2luIH0gZnJvbSAnQHZ1ZXByZXNzL3BsdWdpbi10aGVtZS1kYXRhJztcbmltcG9ydCB7IHZpdGVCdW5kbGVyIH0gZnJvbSAnQHZ1ZXByZXNzL2J1bmRsZXItdml0ZSc7XG5pbXBvcnQgeyB2dWVQcmV2aWV3UGx1Z2luIH0gZnJvbSAnQHZ1ZXByZXNzLXJlY28vdnVlcHJlc3MtcGx1Z2luLXZ1ZS1wcmV2aWV3JztcbmltcG9ydCB7IHdlYnBhY2tCdW5kbGVyIH0gZnJvbSAnQHZ1ZXByZXNzL2J1bmRsZXItd2VicGFjayc7XG5pbXBvcnQgeyBtZXJnZVZpdGVCdW5kbGVyQ29uZmlnLCBkZWZhdWx0Vml0ZUJ1bmRsZXJDb25maWcsIHJlc29sdmVVc2VyQ29uZmlnLCB9IGZyb20gJy4vcmVzb2x2ZUJ1bmRsZXJDb25maWcuanMnO1xuaW1wb3J0IHsgcmVzb2x2ZUNvbnRhaW5lck9wdGlvbnMgfSBmcm9tICcuL3Jlc29sdmVDb250YWluZXIuanMnO1xuaW1wb3J0IHsgcGFnZXMgfSBmcm9tICcuL3BhZ2VzLmpzJztcbmNvbnN0IF9fZGlybmFtZSA9IGdldERpcm5hbWUoaW1wb3J0Lm1ldGEudXJsKTtcbmV4cG9ydCBjb25zdCByZWNvVGhlbWUgPSAodGhlbWVDb25maWcpID0+IHtcbiAgICBjb25zdCBwbHVnaW5zID0gW1xuICAgICAgICBidWxsZXRpblBvcG92ZXJQbHVnaW4oKSxcbiAgICAgICAgY29tbWVudHNQbHVnaW4oKSxcbiAgICAgICAgcGFnZVBsdWdpbihwYWdlcyB8fCBbXSwgdGhlbWVDb25maWcpLFxuICAgICAgICBnaXRQbHVnaW4oKSxcbiAgICAgICAgdGhlbWVEYXRhUGx1Z2luKHsgdGhlbWVEYXRhOiB0aGVtZUNvbmZpZyB9KSxcbiAgICAgICAgc2VhcmNoUGx1Z2luKHtcbiAgICAgICAgICAgIGhvdEtleXM6IFt7IGtleTogJ3MnLCBjdHJsOiB0cnVlIH1dLFxuICAgICAgICB9KSxcbiAgICAgICAgcGFsZXR0ZVBsdWdpbigpLFxuICAgICAgICBtZWRpdW1ab29tUGx1Z2luKHtcbiAgICAgICAgICAgIHpvb21PcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ2luaGVyaXQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICAgIG5wcm9ncmVzc1BsdWdpbigpLFxuICAgICAgICBwcmlzbWpzUGx1Z2luKCksXG4gICAgICAgIGFjdGl2ZUhlYWRlckxpbmtzUGx1Z2luKHtcbiAgICAgICAgICAgIGhlYWRlckxpbmtTZWxlY3RvcjogJ2EucGFnZS1jYXRhbG9nLWl0ZW0nLFxuICAgICAgICB9KSxcbiAgICAgICAgY29udGFpbmVyUGx1Z2luKHJlc29sdmVDb250YWluZXJPcHRpb25zKCd0aXAnKSksXG4gICAgICAgIGNvbnRhaW5lclBsdWdpbihyZXNvbHZlQ29udGFpbmVyT3B0aW9ucygnaW5mbycpKSxcbiAgICAgICAgY29udGFpbmVyUGx1Z2luKHJlc29sdmVDb250YWluZXJPcHRpb25zKCd3YXJuaW5nJykpLFxuICAgICAgICBjb250YWluZXJQbHVnaW4ocmVzb2x2ZUNvbnRhaW5lck9wdGlvbnMoJ2RhbmdlcicpKSxcbiAgICAgICAgY29udGFpbmVyUGx1Z2luKHJlc29sdmVDb250YWluZXJPcHRpb25zKCdkZXRhaWxzJykpLFxuICAgICAgICBjb250YWluZXJQbHVnaW4ocmVzb2x2ZUNvbnRhaW5lck9wdGlvbnMoJ2NvZGUtZ3JvdXAnKSksXG4gICAgICAgIGNvbnRhaW5lclBsdWdpbihyZXNvbHZlQ29udGFpbmVyT3B0aW9ucygnY29kZS1ncm91cC1pdGVtJykpLFxuICAgICAgICBleHRlcm5hbExpbmtJY29uUGx1Z2luKCksXG4gICAgICAgIHZ1ZVByZXZpZXdQbHVnaW4oKSxcbiAgICAgICAgcmVnaXN0ZXJDb21wb25lbnRzUGx1Z2luKHtcbiAgICAgICAgICAgIGNvbXBvbmVudHNEaXI6IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCB0aGVtZUNvbmZpZy52dWVQcmV2aWV3c0RpciB8fCAnLi8udnVlcHJlc3MvdnVlLXByZXZpZXdzJyksXG4gICAgICAgIH0pLFxuICAgICAgICByZWdpc3RlckNvbXBvbmVudHNQbHVnaW4oe1xuICAgICAgICAgICAgY29tcG9uZW50c0RpcjogcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIHRoZW1lQ29uZmlnLmNvbXBvbmVudHNEaXIgfHwgJy4vLnZ1ZXByZXNzL2NvbXBvbmVudHMnKSxcbiAgICAgICAgfSksXG4gICAgICAgIGJhY2tUb1RvcFBsdWdpbigpLFxuICAgICAgICBjb2RlQ29weVBsdWdpbigpLFxuICAgICAgICBtYXJrZG93blRhc2tQbHVnaW4oKSxcbiAgICBdO1xuICAgIGlmICh0aGVtZUNvbmZpZy5hbGdvbGlhKSB7XG4gICAgICAgIHBsdWdpbnMucHVzaChkb2NzZWFyY2hQbHVnaW4odGhlbWVDb25maWcuYWxnb2xpYSkpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBuYW1lOiAndnVlcHJlc3MtdGhlbWUtcmVjbycsXG4gICAgICAgIG9uSW5pdGlhbGl6ZWQoYXBwKSB7XG4gICAgICAgICAgICBpZiAodGhlbWVDb25maWcucHJpbWFyeUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGFpbHdpbmRjc3NDb25maWcudGhlbWUuZXh0ZW5kLmNvbG9ycy5yZWNvLnByaW1hcnkgPSB0aGVtZUNvbmZpZy5wcmltYXJ5Q29sb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0b2RvIEB2dWVwcmVzcy9idW5kbGVyLXdlYnBhY2sgXHU5MDAyXHU5MTREXHU5NUVFXHU5ODk4XG4gICAgICAgICAgICAvLyBhcHAub3B0aW9ucy5idW5kbGVyLm5hbWUgPSAnQHZ1ZXByZXNzL2J1bmRsZXItd2VicGFjaydcbiAgICAgICAgICAgIGNvbnN0IHVzZXJDb25maWcgPSByZXNvbHZlVXNlckNvbmZpZyh0aGVtZUNvbmZpZyk7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBpZiAoYXBwLm9wdGlvbnMuYnVuZGxlci5uYW1lID09PSAnQHZ1ZXByZXNzL2J1bmRsZXItdml0ZScpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0gZGVmYXVsdFZpdGVCdW5kbGVyQ29uZmlnKCk7XG4gICAgICAgICAgICAgICAgY29uc3Qgdml0ZUJ1bmRsZXJPcHRpb25zID0gbWVyZ2VWaXRlQnVuZGxlckNvbmZpZyhvcHRpb25zLCB1c2VyQ29uZmlnKTtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgYXBwLm9wdGlvbnMuYnVuZGxlciA9IHZpdGVCdW5kbGVyKHZpdGVCdW5kbGVyT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgYXBwLm9wdGlvbnMuYnVuZGxlciA9IHdlYnBhY2tCdW5kbGVyKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zdGNzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdGNzc09wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsndGFpbHdpbmRjc3MnLCB0YWlsd2luZGNzc0NvbmZpZ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFsnYXV0b3ByZWZpeGVyJywge31dLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcmVxdWlyZSgndGFpbHdpbmRjc3MvbmVzdGluZycpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWydwb3N0Y3NzLWVhY2gnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdGVtcGxhdGVCdWlsZDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uL3RlbXBsYXRlcy9pbmRleC5idWlsZC5odG1sJyksXG4gICAgICAgIHRlbXBsYXRlRGV2OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vLi4vdGVtcGxhdGVzL2luZGV4LmRldi5odG1sJyksXG4gICAgICAgIGNsaWVudENvbmZpZ0ZpbGU6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9jbGllbnQvY29uZmlnLmpzJyksXG4gICAgICAgIGFsaWFzOiBPYmplY3QuZnJvbUVudHJpZXMoZnNcbiAgICAgICAgICAgIC5yZWFkZGlyU3luYyhwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vY2xpZW50L2NvbXBvbmVudHMnKSlcbiAgICAgICAgICAgIC5maWx0ZXIoKGZpbGUpID0+IGZpbGUuZW5kc1dpdGgoJy52dWUnKSlcbiAgICAgICAgICAgIC5tYXAoKGZpbGUpID0+IFtcbiAgICAgICAgICAgIGBAdGhlbWUvJHtmaWxlfWAsXG4gICAgICAgICAgICBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vY2xpZW50L2NvbXBvbmVudHMnLCBmaWxlKSxcbiAgICAgICAgXSkpLFxuICAgICAgICBleHRlbmRzUGFnZTogKHBhZ2UpID0+IHtcbiAgICAgICAgICAgIC8vIHNhdmUgcmVsYXRpdmUgZmlsZSBwYXRoIGludG8gcGFnZSBkYXRhIHRvIGdlbmVyYXRlIGVkaXQgbGlua1xuICAgICAgICAgICAgcGFnZS5kYXRhLmZpbGVQYXRoUmVsYXRpdmUgPSBwYWdlLmZpbGVQYXRoUmVsYXRpdmU7XG4gICAgICAgICAgICAvLyBzYXZlIHRpdGxlIGludG8gcm91dGUgbWV0YSB0byBnZW5lcmF0ZSBuYXZiYXIgYW5kIHNlcmllc1xuICAgICAgICAgICAgcGFnZS5yb3V0ZU1ldGEudGl0bGUgPSBwYWdlLnRpdGxlO1xuICAgICAgICB9LFxuICAgICAgICBwbHVnaW5zLFxuICAgIH07XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOi9Vc2Vycy84NjE1OS9EZXNrdG9wL3Z1ZXByZXNzLXJlY28vLnZ1ZXByZXNzL2NvbXBvbmVudHMvdnVlcHJlc3MtdGhlbWUtcmVjby9saWIvbm9kZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcODYxNTlcXFxcRGVza3RvcFxcXFx2dWVwcmVzcy1yZWNvXFxcXC52dWVwcmVzc1xcXFxjb21wb25lbnRzXFxcXHZ1ZXByZXNzLXRoZW1lLXJlY29cXFxcbGliXFxcXG5vZGVcXFxccmVzb2x2ZUJ1bmRsZXJDb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzg2MTU5L0Rlc2t0b3AvdnVlcHJlc3MtcmVjby8udnVlcHJlc3MvY29tcG9uZW50cy92dWVwcmVzcy10aGVtZS1yZWNvL2xpYi9ub2RlL3Jlc29sdmVCdW5kbGVyQ29uZmlnLmpzXCI7aW1wb3J0IHsgdGFpbHdpbmRjc3NDb25maWcgfSBmcm9tICdAdnVlcHJlc3MtcmVjby90YWlsd2luZGNzcy1jb25maWcnO1xuaW1wb3J0IHBvc3Rjc3NJbXBvcnQgZnJvbSAncG9zdGNzcy1pbXBvcnQnO1xuaW1wb3J0IHRhaWx3aW5kY3NzTmVzdGluZyBmcm9tICd0YWlsd2luZGNzcy9uZXN0aW5nL2luZGV4LmpzJztcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICd0YWlsd2luZGNzcyc7XG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcic7XG5pbXBvcnQgcG9zdGNzc0VhY2ggZnJvbSAncG9zdGNzcy1lYWNoJztcbmV4cG9ydCBjb25zdCBtZXJnZVZpdGVCdW5kbGVyQ29uZmlnID0gKG9wdGlvbnMsIGNvbmZpZykgPT4ge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZztcbiAgICAvLyBIYW5kbGluZyBwb3N0Y3NzIGFsb25lXG4gICAgLy8gRm9yIGlubGluZSBQb3N0Q1NTIGNvbmZpZywgaXQgZXhwZWN0cyB0aGUgc2FtZSBmb3JtYXQgYXMgcG9zdGNzcy5jb25maWcuanMuXG4gICAgLy8gQnV0IGZvciBwbHVnaW5zIHByb3BlcnR5LCBvbmx5IGFycmF5IGZvcm1hdCBjYW4gYmUgdXNlZC5cbiAgICBjb25zdCB1c2VyVml0ZUNvbmZpZyA9IChjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcudml0ZU9wdGlvbnMpIHx8IHt9O1xuICAgIGlmICh0eXBlb2YgKChfYSA9IHVzZXJWaXRlQ29uZmlnID09PSBudWxsIHx8IHVzZXJWaXRlQ29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VyVml0ZUNvbmZpZy5jc3MpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5wb3N0Y3NzKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTdHJpbmcgdHlwZSBwb3N0Y3NzIGlzIG5vdCBzdXBwb3J0ZWQgeWV0Jyk7XG4gICAgfVxuICAgIGNvbnN0IHVzZXJQb3N0Y3NzUGx1Z2lucyA9ICgoX2MgPSAoX2IgPSB1c2VyVml0ZUNvbmZpZyA9PT0gbnVsbCB8fCB1c2VyVml0ZUNvbmZpZyA9PT0gdm9pZCAwID8gdm9pZCAwIDogdXNlclZpdGVDb25maWcuY3NzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IucG9zdGNzcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnBsdWdpbnMpIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh1c2VyUG9zdGNzc1BsdWdpbnMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigncGx1Z2lucyBmb3IgcG9zdGNzcyBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gICAgfVxuICAgIGNvbnN0IHZpdGVPcHRpb25zID0ge1xuICAgICAgICAuLi51c2VyVml0ZUNvbmZpZyB8fCB7fSxcbiAgICAgICAgLi4ue1xuICAgICAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICAgICAgLi4uKHVzZXJWaXRlQ29uZmlnID09PSBudWxsIHx8IHVzZXJWaXRlQ29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VyVml0ZUNvbmZpZy5jc3MpIHx8IHt9LFxuICAgICAgICAgICAgICAgIC4uLntcbiAgICAgICAgICAgICAgICAgICAgcG9zdGNzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uKChfZCA9IHVzZXJWaXRlQ29uZmlnID09PSBudWxsIHx8IHVzZXJWaXRlQ29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiB1c2VyVml0ZUNvbmZpZy5jc3MpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC5wb3N0Y3NzKSB8fCB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbHVnaW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnVzZXJQb3N0Y3NzUGx1Z2lucyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uKF9nID0gKF9mID0gKF9lID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnZpdGVPcHRpb25zKSA9PT0gbnVsbCB8fCBfZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2UuY3NzKSA9PT0gbnVsbCB8fCBfZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2YucG9zdGNzcykgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLnBsdWdpbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIHZpdGVPcHRpb25zOiB7IC4uLnZpdGVPcHRpb25zIH0sXG4gICAgICAgIHZ1ZVBsdWdpbk9wdGlvbnM6IHsgLi4uKChvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMudnVlUGx1Z2luT3B0aW9ucykgfHwge30pLCAuLi4oKGNvbmZpZyA9PT0gbnVsbCB8fCBjb25maWcgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbmZpZy52dWVQbHVnaW5PcHRpb25zKSB8fCB7fSkgfVxuICAgIH07XG59O1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRWaXRlQnVuZGxlckNvbmZpZyA9ICgpID0+ICh7XG4gICAgdml0ZU9wdGlvbnM6IHtcbiAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICBwb3N0Y3NzOiB7XG4gICAgICAgICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgICAgICAgICBwb3N0Y3NzSW1wb3J0LFxuICAgICAgICAgICAgICAgICAgICB0YWlsd2luZGNzc05lc3RpbmcsXG4gICAgICAgICAgICAgICAgICAgIHRhaWx3aW5kY3NzKHRhaWx3aW5kY3NzQ29uZmlnKSxcbiAgICAgICAgICAgICAgICAgICAgYXV0b3ByZWZpeGVyKHt9KSxcbiAgICAgICAgICAgICAgICAgICAgcG9zdGNzc0VhY2hcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfVxufSk7XG5leHBvcnQgY29uc3QgcmVzb2x2ZVVzZXJDb25maWcgPSAoY29uZmlnKSA9PiB7XG4gICAgcmV0dXJuIChjb25maWcgPT09IG51bGwgfHwgY29uZmlnID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb25maWcudml0ZUJ1bmRsZXIpIHx8IHt9O1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzovVXNlcnMvODYxNTkvRGVza3RvcC92dWVwcmVzcy1yZWNvLy52dWVwcmVzcy9jb21wb25lbnRzL3Z1ZXByZXNzLXRoZW1lLXJlY28vbGliL25vZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDg2MTU5XFxcXERlc2t0b3BcXFxcdnVlcHJlc3MtcmVjb1xcXFwudnVlcHJlc3NcXFxcY29tcG9uZW50c1xcXFx2dWVwcmVzcy10aGVtZS1yZWNvXFxcXGxpYlxcXFxub2RlXFxcXHJlc29sdmVDb250YWluZXIuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzg2MTU5L0Rlc2t0b3AvdnVlcHJlc3MtcmVjby8udnVlcHJlc3MvY29tcG9uZW50cy92dWVwcmVzcy10aGVtZS1yZWNvL2xpYi9ub2RlL3Jlc29sdmVDb250YWluZXIuanNcIjsvLyB0b2RvIFx1NTg5RVx1NTJBMFx1NUJGOSBkZXRhaWwgXHU1NDhDIFx1NEVFM1x1NzgwMVx1NzkzQVx1NEY4Qlx1NzY4NFx1NUM1NVx1NzkzQVxuY29uc3Qgc3ZnTWFwID0ge1xuICAgIGluZm86ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PGcgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCI5XCI+PC9jaXJjbGU+PHBhdGggZD1cIk0xMiA4aC4wMVwiPjwvcGF0aD48cGF0aCBkPVwiTTExIDEyaDF2NGgxXCI+PC9wYXRoPjwvZz48L3N2Zz4nLFxuICAgIHRpcDogJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48ZyBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48Y2lyY2xlIGN4PVwiMTJcIiBjeT1cIjEyXCIgcj1cIjlcIj48L2NpcmNsZT48cGF0aCBkPVwiTTEyIDhoLjAxXCI+PC9wYXRoPjxwYXRoIGQ9XCJNMTEgMTJoMXY0aDFcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gICAgd2FybmluZzogJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48ZyBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48Y2lyY2xlIGN4PVwiMTJcIiBjeT1cIjEyXCIgcj1cIjlcIj48L2NpcmNsZT48cGF0aCBkPVwiTTEyIDh2NFwiPjwvcGF0aD48cGF0aCBkPVwiTTEyIDE2aC4wMVwiPjwvcGF0aD48L2c+PC9zdmc+JyxcbiAgICBkYW5nZXI6ICc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCI+PGcgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2Utd2lkdGg9XCIyXCIgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZS1saW5lam9pbj1cInJvdW5kXCI+PGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCI5XCI+PC9jaXJjbGU+PHBhdGggZD1cIk0xMCAxMGw0IDRtMC00bC00IDRcIj48L3BhdGg+PC9nPjwvc3ZnPicsXG4gICAgZGV0YWlsczogJzxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj48ZyBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjJcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIj48cGF0aCBkPVwiTTcgN2w1IDVsNS01XCI+PC9wYXRoPjxwYXRoIGQ9XCJNNyAxM2w1IDVsNS01XCI+PC9wYXRoPjwvZz48L3N2Zz4nXG59O1xuY29uc3QgcmVuZGVyT3B0aW9ucyA9ICh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKSA9PiB7XG4gICAgY29uc3QgeyB0eXBlLCBpbmZvIH0gPSB0b2tlbnNbaWR4XTtcbiAgICBjb25zdCBbY3VzdG9tVHlwZSwgdGl0bGVdID0gaW5mby50cmltKCkuc3BsaXQoJyAnKTtcbiAgICBpZiAoL2NvbnRhaW5lclxcX1xcdytcXF9vcGVuL2cudGVzdCh0eXBlKSkge1xuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJjdXN0b20tY29udGFpbmVyICR7Y3VzdG9tVHlwZX1cIj4ke3N2Z01hcFtjdXN0b21UeXBlXSB8fCAnJ308cCBjbGFzcz1cImN1c3RvbS1jb250YWluZXItdGl0bGVcIj4ke3RpdGxlIHx8IGN1c3RvbVR5cGUudG9VcHBlckNhc2UoKX08L3A+YDtcbiAgICB9XG4gICAgaWYgKC9jb250YWluZXJcXF9cXHcrXFxfY2xvc2UvZy50ZXN0KHR5cGUpKSB7XG4gICAgICAgIHJldHVybiAnPC9kaXY+JztcbiAgICB9XG4gICAgcmV0dXJuIHNlbGYucmVuZGVyVG9rZW4odG9rZW5zLCBpZHgsIG9wdGlvbnMpO1xufTtcbmNvbnN0IHJlbmRlck9wdGlvbnNGb3JEZXRhaWxzID0gKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpID0+IHtcbiAgICBjb25zdCB7IHR5cGUsIGluZm8gfSA9IHRva2Vuc1tpZHhdO1xuICAgIGNvbnN0IFtjdXN0b21UeXBlLCB0aXRsZV0gPSBpbmZvLnRyaW0oKS5zcGxpdCgnICcpO1xuICAgIGlmICgvY29udGFpbmVyX2RldGFpbHNfb3Blbi9nLnRlc3QodHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIGA8ZGV0YWlscyBjbGFzcz1cImN1c3RvbS1jb250YWluZXIgJHtjdXN0b21UeXBlfVwiPjxzdW1tYXJ5IGNsYXNzPVwiY3VzdG9tLWNvbnRhaW5lci10aXRsZVwiPiR7dGl0bGUgfHwgY3VzdG9tVHlwZS50b1VwcGVyQ2FzZSgpfTwvc3VtbWFyeT5gO1xuICAgIH1cbiAgICBpZiAoL2NvbnRhaW5lcl9kZXRhaWxzX2Nsb3NlL2cudGVzdCh0eXBlKSkge1xuICAgICAgICByZXR1cm4gJzwvZGV0YWlscz4nO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZi5yZW5kZXJUb2tlbih0b2tlbnMsIGlkeCwgb3B0aW9ucyk7XG59O1xuZXhwb3J0IGNvbnN0IHJlc29sdmVPcHRpb25zRm9yQ29kZUdyb3VwID0gKCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGJlZm9yZTogKCkgPT4gYDxDb2RlR3JvdXA+XFxuYCxcbiAgICAgICAgYWZ0ZXI6ICgpID0+ICc8L0NvZGVHcm91cD5cXG4nLFxuICAgIH07XG59O1xuZXhwb3J0IGNvbnN0IHJlc29sdmVPcHRpb25zRm9yQ29kZUdyb3VwSXRlbSA9ICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBiZWZvcmU6IChpbmZvKSA9PiBgPENvZGVHcm91cEl0ZW0gdGl0bGU9XCIke2luZm99XCI+XFxuYCxcbiAgICAgICAgYWZ0ZXI6ICgpID0+ICc8L0NvZGVHcm91cEl0ZW0+XFxuJyxcbiAgICB9O1xufTtcbmV4cG9ydCBjb25zdCByZXNvbHZlQ29udGFpbmVyT3B0aW9ucyA9ICh0eXBlKSA9PiB7XG4gICAgbGV0IHJlbmRlciA9IHJlbmRlck9wdGlvbnM7XG4gICAgaWYgKHR5cGUgPT09ICdkZXRhaWxzJykge1xuICAgICAgICByZW5kZXIgPSByZW5kZXJPcHRpb25zRm9yRGV0YWlscztcbiAgICAgICAgcmV0dXJuIHsgdHlwZSwgcmVuZGVyIH07XG4gICAgfVxuICAgIGlmICh0eXBlID09PSAnY29kZS1ncm91cCcpIHtcbiAgICAgICAgcmV0dXJuIHsgdHlwZSwgLi4ucmVzb2x2ZU9wdGlvbnNGb3JDb2RlR3JvdXAoKSB9O1xuICAgIH1cbiAgICBpZiAodHlwZSA9PT0gJ2NvZGUtZ3JvdXAtaXRlbScpIHtcbiAgICAgICAgcmV0dXJuIHsgdHlwZSwgLi4ucmVzb2x2ZU9wdGlvbnNGb3JDb2RlR3JvdXBJdGVtKCkgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgdHlwZSwgcmVuZGVyIH07XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOi9Vc2Vycy84NjE1OS9EZXNrdG9wL3Z1ZXByZXNzLXJlY28vLnZ1ZXByZXNzL2NvbXBvbmVudHMvdnVlcHJlc3MtdGhlbWUtcmVjby9saWIvbm9kZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcODYxNTlcXFxcRGVza3RvcFxcXFx2dWVwcmVzcy1yZWNvXFxcXC52dWVwcmVzc1xcXFxjb21wb25lbnRzXFxcXHZ1ZXByZXNzLXRoZW1lLXJlY29cXFxcbGliXFxcXG5vZGVcXFxccGFnZXMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzg2MTU5L0Rlc2t0b3AvdnVlcHJlc3MtcmVjby8udnVlcHJlc3MvY29tcG9uZW50cy92dWVwcmVzcy10aGVtZS1yZWNvL2xpYi9ub2RlL3BhZ2VzLmpzXCI7ZXhwb3J0IGNvbnN0IHBhZ2VzID0gW1xuICAgIHtcbiAgICAgICAgdHlwZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgZnJvbnRtYXR0ZXJLZXk6ICdjYXRlZ29yaWVzJyxcbiAgICAgICAgcGF0aDogJy9jYXRlZ29yaWVzLycsXG4gICAgICAgIGxheW91dDogJ0NhdGVnb3JpZXMnLFxuICAgICAgICBwYWdpbmF0aW9uOiAxMCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdHlwZTogJ2NhdGVnb3J5JyxcbiAgICAgICAgZnJvbnRtYXR0ZXJLZXk6ICd0YWdzJyxcbiAgICAgICAgcGF0aDogJy90YWdzLycsXG4gICAgICAgIGxheW91dDogJ0NhdGVnb3JpZXMnLFxuICAgICAgICBwYWdpbmF0aW9uOiAxMCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgcGF0aDogJy90aW1lbGluZS8nLFxuICAgICAgICBsYXlvdXQ6ICdUaW1lTGluZScsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHBhdGg6ICcvcG9zdHMnLFxuICAgICAgICBsYXlvdXQ6ICdQb3N0cycsXG4gICAgfSxcbl07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6L1VzZXJzLzg2MTU5L0Rlc2t0b3AvdnVlcHJlc3MtcmVjby8udnVlcHJlc3MvY29tcG9uZW50cy92dWVwcmVzcy10aGVtZS1yZWNvL2xpYi9ub2RlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw4NjE1OVxcXFxEZXNrdG9wXFxcXHZ1ZXByZXNzLXJlY29cXFxcLnZ1ZXByZXNzXFxcXGNvbXBvbmVudHNcXFxcdnVlcHJlc3MtdGhlbWUtcmVjb1xcXFxsaWJcXFxcbm9kZVxcXFxpbmRleC5kLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy84NjE1OS9EZXNrdG9wL3Z1ZXByZXNzLXJlY28vLnZ1ZXByZXNzL2NvbXBvbmVudHMvdnVlcHJlc3MtdGhlbWUtcmVjby9saWIvbm9kZS9pbmRleC5kLnRzXCI7aW1wb3J0IHsgcmVjb1RoZW1lIH0gZnJvbSBcIi4vcmVjb1RoZW1lLmpzXCI7XG5leHBvcnQgKiBmcm9tICcuL3JlY29UaGVtZS5qcyc7XG5leHBvcnQgZGVmYXVsdCByZWNvVGhlbWU7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6L1VzZXJzLzg2MTU5L0Rlc2t0b3AvdnVlcHJlc3MtcmVjby8udnVlcHJlc3MvdGhlbWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDg2MTU5XFxcXERlc2t0b3BcXFxcdnVlcHJlc3MtcmVjb1xcXFwudnVlcHJlc3NcXFxcdGhlbWVcXFxcbmF2YmFyLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy84NjE1OS9EZXNrdG9wL3Z1ZXByZXNzLXJlY28vLnZ1ZXByZXNzL3RoZW1lL25hdmJhci5qc1wiO2V4cG9ydCBkZWZhdWx0IFtcbiAgeyB0ZXh0OiBcIlx1OTk5Nlx1OTg3NVwiLCBsaW5rOiBcIi9cIiwgaWNvbjogJ1Qtc2hvdXllMicgfSxcbiAgeyB0ZXh0OiBcIlx1NTIwNlx1N0M3QlwiLCBsaW5rOiBcIi9jYXRlZ29yaWVzL3FpYW5kdWFuLzEvXCIsIGljb246ICdULWZlbmxlaScgfSxcbiAgeyB0ZXh0OiBcIlx1NjgwN1x1N0I3RVwiLCBsaW5rOiBcIi90YWdzL2ZlbnhpYW5nLzEvXCIsIGljb246ICdULTI0Z2wtdGFnczMnIH0sXG5dIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOi9Vc2Vycy84NjE1OS9EZXNrdG9wL3Z1ZXByZXNzLXJlY28vLnZ1ZXByZXNzL3RoZW1lXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw4NjE1OVxcXFxEZXNrdG9wXFxcXHZ1ZXByZXNzLXJlY29cXFxcLnZ1ZXByZXNzXFxcXHRoZW1lXFxcXGluZGV4LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy84NjE1OS9EZXNrdG9wL3Z1ZXByZXNzLXJlY28vLnZ1ZXByZXNzL3RoZW1lL2luZGV4LmpzXCI7XHJcbmltcG9ydCByZWNvVGhlbWUgZnJvbSBcIi4uL2NvbXBvbmVudHMvdnVlcHJlc3MtdGhlbWUtcmVjby9saWIvbm9kZS9pbmRleC5kLnRzXCI7XHJcbi8vIGltcG9ydCByZWNvVGhlbWUgZnJvbSBcInZ1ZXByZXNzLXRoZW1lLXJlY29cIjtcclxuaW1wb3J0IG5hdmJhciBmcm9tIFwiLi9uYXZiYXJcIlxyXG5pbXBvcnQgc2VyaWVzIGZyb20gXCIuL3Nlcmllc1wiXHJcbmltcG9ydCBidWxsZXRpbiBmcm9tIFwiLi9idWxsZXRpblwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCByZWNvVGhlbWUoe1xyXG4gICAgLy8gbG9nbzogXCJodHRwczovL3RvYnk2MDctMTMxNzA0OTY5Ni5jb3MuYXAtZ3Vhbmd6aG91Lm15cWNsb3VkLmNvbS9pbWFnZXMyMDIzMDMwMjExMDQzMzkucG5nL2NvbXByZXNzNTBcIixcclxuICAgIGF1dGhvcjogXCJUb2J5XCIsXHJcbiAgICBhdXRob3JBdmF0YXI6IFwiaHR0cHM6Ly90b2J5NjA3LTEzMTcwNDk2OTYuY29zLmFwLWd1YW5nemhvdS5teXFjbG91ZC5jb20vaW1hZ2VzLzIwMjMwMzIwMTAzMjU2MS5wbmcvY29tcHJlc3M1MFwiLFxyXG4gICAgLy8gcmVwbzogJ2h0dHBzOi8vZ2l0ZWUuY29tL1RvYnlfYy9ibG9ncycsXHJcbiAgICBsYXN0VXBkYXRlZFRleHQ6IFwiXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0XCIsXHJcbiAgICBsYXN0VXBkYXRlZDp0cnVlLFxyXG4gICAgZWRpdExpbms6ZmFsc2UsXHJcbiAgICBjb2xvck1vZGVTd2l0Y2g6ZmFsc2UsXHJcbiAgICBjYXRhbG9nVGl0bGU6ICdcdTY1ODdcdTY4NjNcdTc2RUVcdTVGNTUnLFxyXG4gICAgLy8gc2VyaWVzLC8vXHU1REU2XHU0RkE3XHU4RkI5XHU2ODBGXHJcbiAgICBuYXZiYXIsXHJcbiAgICBjb21tZW50Q29uZmlnOiB7XHJcbiAgICAgIHR5cGU6ICd2YWxpbmUnLFxyXG4gICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgYXBwSWQ6ICdJTmVoRkpLajZIaUNTRTRzQ1R0eENha0ItZ3pHem9Ic3onLCAvLyB5b3VyIGFwcElkXHJcbiAgICAgICAgYXBwS2V5OiAnOXFqNW5oM1pETkFMUWJUWU9SZkRMUnBEJywgLy8geW91ciBhcHBLZXlcclxuICAgICAgICBoaWRlQ29tbWVudHM6IGZhbHNlLCAvLyBcdTUxNjhcdTVDNDBcdTk2OTBcdTg1Q0ZcdThCQzRcdThCQkFcdUZGMENcdTlFRDhcdThCQTQgZmFsc2VcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICAvLyBidWxsZXRpbiwvL1x1NTE2Q1x1NTQ0QVxyXG4gICAgLy8gdmFsaW5lQ29uZmlnIFx1OTE0RFx1N0Y2RVx1NEUwRSAxLnggXHU0RTAwXHU4MUY0XHJcbiAgICAvLyB2YWxpbmVDb25maWc6IHtcclxuICAgIC8vICAgYXBwSWQ6ICd4eHgnLFxyXG4gICAgLy8gICBhcHBLZXk6ICd4eHgnLFxyXG4gICAgLy8gICBwbGFjZWhvbGRlcjogJ1x1NTg2Qlx1NTE5OVx1OTBBRVx1N0JCMVx1NTNFRlx1NEVFNVx1NjUzNlx1NTIzMFx1NTZERVx1NTkwRFx1NjNEMFx1OTE5Mlx1NTRFNlx1RkYwMScsXHJcbiAgICAvLyAgIHZlcmlmeTogdHJ1ZSwgLy8gXHU5QThDXHU4QkMxXHU3ODAxXHU2NzBEXHU1MkExXHJcbiAgICAvLyAgIC8vIG5vdGlmeTogdHJ1ZSxcclxuICAgIC8vICAgcmVjb3JkSVA6IHRydWUsXHJcbiAgICAvLyAgIC8vIGhpZGVDb21tZW50czogdHJ1ZSAvLyBcdTk2OTBcdTg1Q0ZcdThCQzRcdThCQkFcclxuICAgIC8vIH0sXHJcbiAgfSkiLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6L1VzZXJzLzg2MTU5L0Rlc2t0b3AvdnVlcHJlc3MtcmVjby8udnVlcHJlc3MvcGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcODYxNTlcXFxcRGVza3RvcFxcXFx2dWVwcmVzcy1yZWNvXFxcXC52dWVwcmVzc1xcXFxwbHVnaW5zXFxcXGluZGV4LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy84NjE1OS9EZXNrdG9wL3Z1ZXByZXNzLXJlY28vLnZ1ZXByZXNzL3BsdWdpbnMvaW5kZXguanNcIjtpbXBvcnQgeyByZWdpc3RlckNvbXBvbmVudHNQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLXJlZ2lzdGVyLWNvbXBvbmVudHMnXHJcbmltcG9ydCB7IHBhbGV0dGVQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLXBhbGV0dGUnXHJcbmltcG9ydCB7IGdldERpcm5hbWUscGF0aCB9IGZyb20gJ0B2dWVwcmVzcy91dGlscydcclxuaW1wb3J0IGV4YW1wbGVEZW1vIGZyb20gJ3Z1ZXByZXNzLXBsdWdpbi1leGFtcGxlLWJsb2NrJ1xyXG5cclxuY29uc3QgX19kaXJuYW1lID0gZ2V0RGlybmFtZShpbXBvcnQubWV0YS51cmwpXHJcblxyXG5leHBvcnQgZGVmYXVsdCBbXHJcbiAgcmVnaXN0ZXJDb21wb25lbnRzUGx1Z2luKHtcclxuICAgIC8vIFx1OTE0RFx1N0Y2RVx1OTg3OVxyXG4gICAgY29tcG9uZW50c0RpcjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vY29tcG9uZW50cycpLFxyXG4gIH0pLFxyXG4gIHBhbGV0dGVQbHVnaW4oeyBwcmVzZXQ6ICdjc3MnIH0pLFxyXG4gIGV4YW1wbGVEZW1vKHtcclxuICAgIHBhdGg6IF9fZGlybmFtZSwgIC8vXHU1RkM1XHU1ODZCLFx1NTE5OVx1NkI3Ql9fZGlybmFtZVx1NTM3M1x1NTNFRlxyXG4gICAgZGlyOicuLi9jb21wb25lbnRzJyAvL1x1OTAwOVx1NTg2QixcdTYzMDdcdTVCOUFcdTdFQzRcdTRFRjZcdTY1ODdcdTRFRjZcdThERUZcdTVGODRcclxuICB9KVxyXG5dIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOi9Vc2Vycy84NjE1OS9EZXNrdG9wL3Z1ZXByZXNzLXJlY28vLnZ1ZXByZXNzL2hlYWRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXDg2MTU5XFxcXERlc2t0b3BcXFxcdnVlcHJlc3MtcmVjb1xcXFwudnVlcHJlc3NcXFxcaGVhZFxcXFxpbmRleC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvODYxNTkvRGVza3RvcC92dWVwcmVzcy1yZWNvLy52dWVwcmVzcy9oZWFkL2luZGV4LmpzXCI7ZXhwb3J0IGRlZmF1bHQgW1xuICBbJ2xpbmsnLCB7IHJlbDogJ2ljb24nLCBocmVmOiAnaHR0cHM6Ly90b2J5NjA3LTEzMTcwNDk2OTYuY29zLmFwLWd1YW5nemhvdS5teXFjbG91ZC5jb20vaW1hZ2VzLzIwMjMwMzIwMTAzMjU2NS5pY28nIH1dLFxuICBbJ3NjcmlwdCcsIHsgdHlwZTogJ21vZHVsZScsIGFzeW5jOiB0cnVlLCBzcmM6ICcvL2F0LmFsaWNkbi5jb20vdC9jL2ZvbnRfMzkzMzg0OF82NnNndGt1d3VrMy5qcycgfV0sXG4gIFsnbWV0YScsIHsgbmFtZTogJ3JlZmVycmVyJyxjb250ZW50OiAnbmV2ZXInIH1dLFxuICBbJ21ldGEnLCB7IG5hbWU6ICdrZXl3b3JkcycsY29udGVudDogJ1RvYnlcdTc2ODRcdTVCNjZcdTRFNjBcdTU3RkFcdTU3MzAsVG9ieVx1NzY4NFx1NTM1QVx1NUJBMixUb2J5LHRvYnksXHU1MzVBXHU1QkEyJyB9XSxcbiAgWydtZXRhJywgeyBuYW1lOiAnZGVzY3JpcHRpb24nLGNvbnRlbnQ6ICdcdThGRDlcdTY2MkZUb2J5XHU3Njg0XHU0RTJBXHU0RUJBXHU1MzVBXHU1QkEyLFx1NEUyQVx1NEVCQVx1N0E3QVx1OTVGNFx1OTY4Rlx1NEZCRlx1NTE5OVx1NTE5OVx1RkYwQ1x1NjVFNVx1NUUzOFx1NzlFRlx1N0QyRlx1MzAwMicgfV0sXG5dIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOi9Vc2Vycy84NjE1OS9EZXNrdG9wL3Z1ZXByZXNzLXJlY28vLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw4NjE1OVxcXFxEZXNrdG9wXFxcXHZ1ZXByZXNzLXJlY29cXFxcLnZ1ZXByZXNzXFxcXGNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvODYxNTkvRGVza3RvcC92dWVwcmVzcy1yZWNvLy52dWVwcmVzcy9jb25maWcudHNcIjtpbXBvcnQgdGhlbWUgZnJvbSBcIi4vdGhlbWVcIjtcbmltcG9ydCBwbHVnaW5zIGZyb20gXCIuL3BsdWdpbnNcIjtcbmltcG9ydCBoZWFkIGZyb20gJy4vaGVhZC9pbmRleCdcbmltcG9ydCB7IGdldERpcm5hbWUsIHBhdGggfSBmcm9tICdAdnVlcHJlc3MvdXRpbHMnXG5cbmNvbnN0IF9fZGlybmFtZSA9IGdldERpcm5hbWUoaW1wb3J0Lm1ldGEudXJsKVxuZXhwb3J0IGRlZmF1bHQge1xuICAvLyBiYXNlOiAnL2Jsb2dzLycsXG4gIHRpdGxlOiBcIlRvYnlcdTc2ODRcdTVCNjZcdTRFNjBcdTU3RkFcdTU3MzBcIixcbiAgZGVzY3JpcHRpb246IFwiXHU4RkQ5XHU2NjJGVG9ieVx1NzY4NFx1NEUyQVx1NEVCQVx1NTM1QVx1NUJBMlwiLFxuICB0aGVtZSxcbiAgcGx1Z2lucyxcbiAgaGVhZCxcbiAgYWxpYXM6IHtcbiAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLycpLFxuICB9LFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7OztBQUEyYixTQUFTLCtCQUErQjtBQUNuZSxTQUFTLHVCQUF1QjtBQUNoQyxTQUFTLDZCQUE2QjtBQUN0QyxTQUFTLHNCQUFzQjtBQUMvQixTQUFTLHNCQUFzQjtBQUMvQixTQUFTLHVCQUF1QjtBQUNoQyxTQUFTLDBCQUEwQjtBQUNuQyxTQUFTLDhC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ZUFBYyxFQUFFLFFBQVEsTUFBTSxDQUFDO0FBQUEsRUFDL0IsWUFBWTtBQUFBLElBQ1YsTUFBTUo7QUFBQTtBQUFBLElBQ04sS0FBSTtBQUFBO0FBQUEsRUFDTixDQUFDO0FBQ0g7OztBQ2pCdVUsSUFBTyxlQUFRO0FBQUEsRUFDcFYsQ0FBQyxRQUFRLEVBQUUsS0FBSyxRQUFRLE1BQU0sc0ZBQXNGLENBQUM7QUFBQSxFQUNySCxDQUFDLFVBQVUsRUFBRSxNQUFNLFVBQVUsT0FBTyxNQUFNLEtBQUssa0RBQWtELENBQUM7QUFBQSxFQUNsRyxDQUFDLFFBQVEsRUFBRSxNQUFNLFlBQVcsU0FBUyxRQUFRLENBQUM7QUFBQSxFQUM5QyxDQUFDLFFBQVEsRUFBRSxNQUFNLFlBQVcsU0FBUyxtRkFBaUMsQ0FBQztBQUFBLEVBQ3ZFLENBQUMsUUFBUSxFQUFFLE1BQU0sZUFBYyxTQUFTLHNJQUE2QixDQUFDO0FBQ3hFOzs7QUNIQSxTQUFTLGNBQUFLLGFBQVksUUFBQUMsYUFBWTtBQUhvSyxJQUFNQyw0Q0FBMkM7QUFLdFAsSUFBTUMsYUFBWUMsWUFBV0YseUNBQWU7QUFDNUMsSUFBTyxpQkFBUTtBQUFBO0FBQUEsRUFFYixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLRyxNQUFLLFFBQVFGLFlBQVcsSUFBSTtBQUFBLEVBQ25DO0FBQ0Y7IiwKICAibmFtZXMiOiBbInRhaWx3aW5kY3NzQ29uZmlnIiwgInRhaWx3aW5kY3NzQ29uZmlnIiwgInJlZ2lzdGVyQ29tcG9uZW50c1BsdWdpbiIsICJwYWxldHRlUGx1Z2luIiwgImdldERpcm5hbWUiLCAicGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsIiwgIl9fZGlybmFtZSIsICJnZXREaXJuYW1lIiwgInJlZ2lzdGVyQ29tcG9uZW50c1BsdWdpbiIsICJwYXRoIiwgInBhbGV0dGVQbHVnaW4iLCAiZ2V0RGlybmFtZSIsICJwYXRoIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwiLCAiX19kaXJuYW1lIiwgImdldERpcm5hbWUiLCAicGF0aCJdCn0K
