
import recoTheme from "../components/vuepress-theme-reco/lib/node/index.d.ts";
// import recoTheme from "vuepress-theme-reco";
import navbar from "./navbar"
import series from "./series"
import bulletin from "./bulletin"

export default recoTheme({
    style: "@vuepress-reco/style-default",
    // logo: "https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images202303021104339.png/compress50",
    author: "Toby",
    authorAvatar: "https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/202303201032561.png/compress50",
    // repo: 'https://gitee.com/Toby_c/blogs',
    lastUpdatedText: "更新时间",
    lastUpdated:true,
    editLink:false,
    // colorModeSwitch:false,
    catalogTitle: '文档目录',
    // autoSetSeries: true,
    series,//左侧边栏
    navbar,
    commentConfig: {
      type: 'valine',
      options: {
        appId: 'INehFJKj6HiCSE4sCTtxCakB-gzGzoHsz', // your appId
        appKey: '9qj5nh3ZDNALQbTYORfDLRpD', // your appKey
        hideComments: false, // 全局隐藏评论，默认 false
      },
    },
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
  })