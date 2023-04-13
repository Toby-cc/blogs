---
home: true
modules:
  - BannerBrand
  - Blog
  - MdContent
  - Footer
bannerBrand:
  bgImage: 'https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/gif/202303201031954.gif'
  title: Toby
  description: 记录美好生活
  tagline: 个人空间随便写写，日常积累。
  buttons:
    - { text: who am I？, link: '/blogs/konwMe/'}
blog:
  socialLinks:
    - { icon: 'LogoGithub', link: 'https://github.com/Toby-cc/blogs' }
    - { icon: 'T-gitee-fill-round', link: 'https://gitee.com/Toby_c/blogs' }
isShowTitleInHome: true
actionText: About
actionLink: /views/other/about
--- 
<!-- <contrastPicture
  width="300px"
  changedImg="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/202303201025380.jpg"
  originImg="https://toby607-1317049696.cos.ap-guangzhou.myqcloud.com/images/202303201032562.jpg"
/> -->

<style>
.banner-brand__content {
  border-radius: 41% 59% 0% 100% / 42% 55% 45% 58% ;
  padding: 2rem;
  backdrop-filter: blur(2px);
  background-color: rgba(0,191,255, 0.075);
  box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
  border: 2px rgba(255,255,255,0.4) solid;
  border-bottom: 2px rgba(40,40,40,0.35) solid;
  border-right: 2px rgba(40,40,40,0.35) solid;
}
.banner-brand__wrapper .banner-brand__content .btn-group {
  text-align:center;
}
.btn-group .xicon-container.left:hover {
  transform: translateZ(0);
  outline: 200px solid transparent;
  filter: url(#fe1);
}
</style>