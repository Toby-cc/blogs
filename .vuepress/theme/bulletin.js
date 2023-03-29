export default {
  body: [
    {
      type: "text",
      content: `🎉🎉🎉 这是一个公告`,
      style: "font-size: 12px;",
    },
    {
      type: "hr",
    },
    {
      type: "title",
      content: "QQ 群",
    },
    {
      type: "text",
      content: `
      <ul>
        <li>QQ群1：132456798</li>
      </ul>`,
      style: "font-size: 12px;",
    },
    {
      type: "hr",
    },
    {
      type: "title",
      content: "GitHub",
    },
    {
      type: "text",
      content: `
      <ul>
        <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
        <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
      </ul>`,
      style: "font-size: 12px;",
    },
    {
      type: "hr",
    },
    {
      type: "buttongroup",
      children: [
        {
          text: "打赏",
          link: "/docs/others/donate.html",
        },
      ],
    },
  ],
}