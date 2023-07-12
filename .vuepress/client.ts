import { defineClientConfig  } from '@vuepress/client'// 导入组件库
import ElementPlus from 'element-plus'
import { onMounted } from 'vue'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import loveme from './public/js/love-me';
import FeTurbulence from './components/FeTurbulence.vue'
import VueLazyload from 'vue-lazyload'

const icons = ElementPlusIconsVue as any;


export default defineClientConfig ({
  enhance({ app }){
    for (const i in icons) {
      app.component(`ele-${icons[i].name}`, icons[i]);
    }
    app.use(ElementPlus)
    app.use(VueLazyload)
  },
  setup() {
    onMounted(() => {
      addEventListener('click', e => {
        loveme(e)
      })
    })
  },
  rootComponents: [FeTurbulence],
})