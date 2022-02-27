import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

// import { defineUserConfig } from '@vuepress/cli'
// import type { DefaultThemeOptions } from '@vuepress/theme-default'

const isProd = process.env.NODE_ENV === 'production'
export default defineUserConfig<DefaultThemeOptions>({
  base: "/", // 部署到github相关的配置
  head: [
    // 注入到当前页面的 HTML <head> 中的标签
    //Android Chrome: manifest.webmanifest
    //Android Chrome主题颜色: theme-color
    ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],

    //windows固定网站功能，对用户来说这是一种只需在任务栏上单击图标即可直接访问网站的简单方式.
    //https://blog.csdn.net/q506417225/article/details/79345930
    //https://blog.csdn.net/FrontEnder_way/article/details/51734939
    ["meta", { name: "msapplication-TileColor", content: "#3eaf7c" }],
    ["meta", { name: "msapplication-TileImage", content: "/images/icons/mstile-310x310.png" }],
    ["meta", { name: "msapplication-config", content: "/images/icons/browserconfig.xml" }],

    //iOS Safari:apple-touch-icon
    ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/images/icons/apple-touch-icon.png", }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" }],
    //favicon收藏图标
    ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/images/icons/favicon-32x32.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/images/icons/favicon-16x16.png" }],
    ["link", { rel: "mask-icon", href: "/images/icons/safari-pinned-tab.svg", color: "#5bbad5" }],
  ],
  // site-level locales config
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '陈道宽',
      description: '大前端学习',
    },
  },

  // 打包
  bundler:
    process.env.DOCS_BUNDLER ??
    (isProd ? '@vuepress/webpack' : '@vuepress/vite'),


  themeConfig: {
    logo: './images/logo.jpg',
    repoLabel: "查看源码",
    repo: 'https://github.com/dk764337361/VuePress2x',
    docsDir: "docs",
    docsBranch: "main",
    editLinks: true,

    locales: {
      '/': {
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        contributors: true,

        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',

        // a11y
        openInNewWindow: '在新窗口打开',
        toggleDarkMode: '切换夜间模式',
        toggleSidebar: '切换侧边栏',


        sidebar: {
          '/guide/': [
            {
              text: '指南',
              children: [
                '/guide/readme.md',
              ],
            },
            {
              text: '快速上手',
              children: [
                '/guide/Initialize.md',
                '/guide/Markdown.md',
                '/guide/Emoji.md',
                '/guide/Container.md',
                '/guide/Components.md',
              ],
            },
            {
              text: '插件',
              children: [
                '/guide/Pwa.md',
                '/guide/docsearch.md',
              ],
            },
            {
              text: '部署',
              children: [
                '/guide/Deploy/Prepare.md',
                '/guide/Deploy/Contrast.md',
                '/guide/Deploy/GithubPages.md',
                '/guide/Deploy/Netlify.md',
              ],
            },
          ],
          '/html/': [
            {
              text: 'html',
              children: [
                '/html/readme.md',
                '/html/01.md',
                '/html/02.md',
              ],
            },
          ],
          '/html5/': [
            {
              text: '简介',
              children: [
                '/html5/readme.md',
              ],
            },
            {
              text: '新增语义化标签',
              children: [
                // '/html5/Introduction.md',
                '/html5/Semantic-tags.md',
                '/html5/Audio.md',
                '/html5/video.md',
                '/html5/input.md',
                '/html5/New-Form.md',
              ],
            },
          ],
          '/cssbase/': [
            {
              text: '简介',
              children: [
                '/cssbase/readme.md',
              ],
            },
            {
              text: '样式表',
              children: [
                '/cssbase/Style-sheet/readme.md',
                '/cssbase/Style-sheet/Inline.md',
                '/cssbase/Style-sheet/Embedded.md',
                '/cssbase/Style-sheet/Outreach.md',
                '/cssbase/Style-sheet/Imported.md',
                '/cssbase/Style-sheet/rules.md',
              ],
            },
            {
              text: '选择器',
              children: [
                '/cssbase/selector/readme.md',
                '/cssbase/selector/base.md',
                '/cssbase/selector/advanced.md',
              ],
            },
            {
              text: '层叠式',
              children: [
                '/cssbase/Cascading/readme.md',
                '/cssbase/Cascading/inherit.md',
                '/cssbase/Cascading/Cascade.md',
              ],
            },
            {
              text: '一、Font',
              children: [
                '/cssbase/font/color.md',
                '/cssbase/font/font-­family.md',
                '/cssbase/font/font­-size.md',
                '/cssbase/font/complex.md',
                '/cssbase/font/font-weight.md',
                '/cssbase/font/font-style.md',
                '/cssbase/font/line-height.md',
              ],
            },
            {
              text: '二、text的文本属性',
              children: [
                '/cssbase/text/text-align.md',
                '/cssbase/text/text-decoration.md',
                '/cssbase/text/text-indent.md',
              ],
            },
            {
              text: '三、盒模型',
              children: [
                '/cssbase/box/readme.md',
                // '/css3/box/other.md',
                '/cssbase/box/width.md',
                '/cssbase/box/height.md',
                '/cssbase/box/padding.md',
                '/cssbase/box/boder.md',
                '/cssbase/box/margin.md',
              ],
            },
            {
              text: '盒模型扩展',
              children: [
                '/cssbase/boxexpand/cleanstyle.md',
                '/cssbase/boxexpand/height.md',
                '/cssbase/boxexpand/overflow.md',
                '/cssbase/boxexpand/center.md',
                '/cssbase/boxexpand/FatherSon.md',
              ],
            },
            {
              text: '标准文档流',
              children: [
                '/cssbase/Documentation/ElementTable.md',
                '/cssbase/Documentation/StandardDoc.md',
                '/cssbase/Documentation/display.md',
                '/cssbase/Documentation/A-label.md',
              ],
            },
            {
              text: '浮动',
              children: [
                '/cssbase/Documentation/float.md',
                '/cssbase/Documentation/FloatWelt.md',
                '/cssbase/Documentation/FloatMargin.md',
                '/cssbase/Documentation/FloatStandard.md',
                '/cssbase/Documentation/Float-Issue.md',
                '/cssbase/Documentation/Float-clean.md',
              ],
            },
            {
              text: '背景',
              children: [
                '/cssbase/Documentation/Background.md',
                '/cssbase/Documentation/Background-application.md',
                '/cssbase/Documentation/Background-css3-Add.md',
              ],
            },
            {
              text: '定位',
              children: [
                '/cssbase/Position/Positioning-Introduction.md',
                '/cssbase/Position/Position-Relative.md',
                '/cssbase/Position/Position-Absolute.md',
                '/cssbase/Position/Positioning-Fixed.md',
                '/cssbase/Position/Positioning-use.md',
                '/cssbase/Position/Sequence.md',
              ],
            },
            {
              text: '综合应用',
              children: [
                '/cssbase/application/lunbo.md',
              ],
            },
          ],
          '/css3/':[
            {
              text: '简介',
              children: [
                '/css3/readme.md',
              ],
            },
            {
              text: '新增选择器',
              children: [
                '/css3/selector/child.md',
                '/css3/selector/brother.md',
                '/css3/selector/structure.md',
                '/css3/selector/pseudo-element.md',
                '/css3/selector/attributes.md',
              ],
            },
            {
              text: '盒模型新增属性',
              children: [
                '/css3/box/readme.md',
                '/css3/box/border-radius.md',
                '/css3/box/text-shadow.md',
                '/css3/box/box-shadow.md',
                '/css3/box/transition.md',
              ],
            },
          ],
        },

        navbar: [
          { text: "指南", link: "/guide/" },
          // 嵌套 Group - 最大深度为 2
          {
            text: "Group",
            children: [
              {
                text: "SubGroup",
                children: [
                  {
                    text: "foo",
                    link: "/group/foo/",
                    // 该元素将一直处于激活状态
                    // activeMatch: '/',
                  },
                  {
                    text: "bar",
                    link: "/group/bar/",
                    // 该元素将一直处于激活状态
                    // activeMatch: '/',
                  },
                ],
              },
            ],
          },
          {
            text: '前端三驾马车',
            children: [
              {
                text: 'CSS',
                children: [
                  '/cssbase/',
                  '/css3/',
                ],
              },
              {
                text: 'HTML',
                children: [
                  "/html/",
                  "/html5/",
                ],
              },
              {
                text: 'Javascript',
                children: [
                  '/Javascript/'
                ],
              },
            ],
          },
          {
            text: "前端工程化",
            children: [
              {
                text: "VSCode",
                link: "/Engineering/",
                // 该元素将一直处于激活状态
                activeMatch: "/Engineering/vscode/",
              },
              {
                text: "Git",
                link: "/Engineering/git/",
                // 该元素在当前路由路径是 /foo/ 开头时激活
                // 支持正则表达式
                // activeMatch: "/Engineering/git/",
              },
              {
                text: "Github",
                link: "/Engineering/github/",
                // 该元素在当前路由路径是 /foo/ 开头时激活
                // 支持正则表达式
                // activeMatch: "/Engineering/github/",
              },
            ],
          },
          { text: "前端进阶", link: "/others/" },
          { text: "github", link: "https://github.com/dk764337361" },
        ]
      }
    }
  },


  plugins: [
    [
      "@vuepress/plugin-toc",
      {
        componentName: "Toc",

      },
    ],
    //插件`@vuepress/pwa`使你的 VuePress 站点成为一个 渐进式 Web 应用 (PWA)
    [
      "@vuepress/pwa",
      {
        // skipWaiting: true,
      },
      // console.log("官方PWA插件运行中"),
    ],

    //插件`@vuepress/plugin-pwa-popup`提供一个弹窗组件，允许用户手动刷新 PWA Service Worker
    //该插件必须和@vuepress/pwa插件一起使用，并且 skipWaiting 配置项不能设置为 true 。
    [
      "@vuepress/plugin-pwa-popup",
      {
        locales: {
          "/": {
            message: "发现新内容可用",
            buttonText: "刷新",
          },
        },
      },
    ],

    //@vuepress/docsearch将谷歌的Algolia DocSearch集成到 VuePress中，为你的文档网站提供搜索功能。
    [
      "@vuepress/docsearch",
      {
        appId: "SDW82XCTM9",
        apiKey: "b7e438df93efeb46f9d4a72be8db5ad3",
        indexName: "VuepressV2",
        // placeholder:"搜索文档",
        locales: {
          '/': {
            placeholder: 'Search Documentation',
          },
          '/zh/': {
            placeholder: '搜索文档',
          },
        },
      },
    ],
  ],
})

