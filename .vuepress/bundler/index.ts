import { viteBundler } from '@vuepress/bundler-vite'
import { path } from '@vuepress/utils'
import vue from '@vitejs/plugin-vue'
import { Plugin as importToCDN } from 'vite-plugin-cdn-import';
export default viteBundler({
    viteOptions: {
      plugins: [
        vue(),
        importToCDN({
          modules: [
            {
              name: 'vue',
              var: 'Vue',
              path: 'https://static.techtcmedu.com/npm/vue/vue@3.2.45/dist/vue.global.prod.js',
            },
            {
              name: 'axios',
              var: 'axios',
              path: 'https://static.techtcmedu.com/npm/axios/axios@0.27.2/dist/axios.min.js',
            },
            {
              name: 'element-plus',
              var: 'ElementPlus',
              // path: 'https://cdn.jsdelivr.net/npm/element-plus@2.2.16/dist/index.full.min.js',
              path: 'https://static.techtcmedu.com/npm/element-plus/element-plus@2.2.16/index.full.min.js',
              // css: 'https://cdn.jsdelivr.net/npm/element-plus@2.2.16/dist/index.css'
              css: 'https://static.techtcmedu.com/npm/element-plus/element-plus@2.2.16/index.css'
            },
            {
              name: 'vue-demi',
              var: 'VueDemi',
              // path: 'https://cdn.jsdelivr.net/npm/vue-demi@0.13.11/lib/index.iife.min.js',
              path: 'https://static.techtcmedu.com/npm/vue-demi/vue-demi@0.13.11/index.iife.min.js',
            },
            {
              name: '@element-plus/icons-vue',
              var: 'ElementPlusIconsVue',
              // path: 'https://cdn.jsdelivr.net/npm/@element-plus/icons-vue@2.0.9/dist/index.iife.min.js',
              path: 'https://static.techtcmedu.com/npm/element-plus/icons-vue@2.0.9/index.iife.min.js',

            }
          ],
        })
      ],
      build: {
        minify:"terser",//是否禁用最小化混淆，esbuild打包速度最快，terser打包体积最小。
        outDir: '.vuepress/dist',
        assetsDir:"assets",
        assetsInlineLimit:4096,//小于该值 图片将打包成Base64
        cssCodeSplit: true,//css 拆分
        sourcemap: false,//不生成sourcemap
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
          strictDeprecations:true,//启用此标志后，当使用废弃的功能时，Rollup 将抛出错误而不是警告。
          output: {
            entryFileNames: `assets/[name].${new Date().getTime()}.js`,
            chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
            // assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,//按需引入element-plus后，启用这个会让scss样式丢失
            compact: true,
            minifyInternalExports:true,
            sourcemapExcludeSources:true,//如果该选项的值为 true，那么实际源代码将不会被添加到 sourcemap 文件中，从而使其变得更小。
            // 第二种分割
            manualChunks(id) {
              if (id.includes('element-plus') || id.includes('bootstrap')) {
                return; //不打入这俩个文件相关的东西
              }
              if(id.includes('tinymce/')){ //利用文件目录判断
                return '__T__'+id.toString().split('tinymce/')[1].split('/')[0].toString();
              }
              // // 最小化拆分包
              if (id.includes("node_modules")) {
                return '__M__' + id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
              }
            }
          }
        },
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        },
      },
      resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
          '@': path.resolve(__dirname, 'src')
        }
      },
    },
    vuePluginOptions: {},
  })