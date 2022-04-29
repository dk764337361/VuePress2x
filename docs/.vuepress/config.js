const isProd = process.env.NODE_ENV === "production";
module.exports = {
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
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/images/icons/mstile-310x310.png",
      },
    ],
    [
      "meta",
      {
        name: "msapplication-config",
        content: "/images/icons/browserconfig.xml",
      },
    ],

    //iOS Safari:apple-touch-icon
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/images/icons/apple-touch-icon.png",
      },
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    //favicon收藏图标
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/images/icons/favicon-32x32.png",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/images/icons/favicon-16x16.png",
      },
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/images/icons/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  ],
  // site-level locales config
  locales: {
    "/": {
      lang: "zh-CN",
      title: "陈道宽",
      description: "大前端学习",
    },
  },

  // 打包
  // bundler:
  //   process.env.DOCS_BUNDLER ??
  //   (isProd ? "@vuepress/webpack" : "@vuepress/vite"),
  // bundler: '@vuepress/bundler-vite',
  bundler: "@vuepress/bundler-webpack",
  themeConfig: {
    logo: "./images/logo.jpg",
    // repoLabel: "查看源码",
    // repo: "https://github.com/dk764337361/VuePress2x",
    docsDir: "docs",
    docsBranch: "main",
    editLinks: true,

    locales: {
      "/": {
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdatedText: "上次更新",
        contributorsText: "贡献者",
        contributors: true,

        // 404 page
        notFound: [
          "这里什么都没有",
          "我们怎么到这来了？",
          "这是一个 404 页面",
          "看起来我们进入了错误的链接",
        ],
        backToHome: "返回首页",

        // a11y
        openInNewWindow: "在新窗口打开",
        toggleDarkMode: "切换夜间模式",
        toggleSidebar: "切换侧边栏",

        sidebar: {
          "/guide/": [
            {
              text: "指南",
              children: ["/guide/readme.md"],
            },
            {
              text: "快速上手",
              children: [
                "/guide/Initialize.md",
                "/guide/Markdown.md",
                "/guide/Emoji.md",
                "/guide/Container.md",
                "/guide/Components.md",
              ],
            },
            {
              text: "插件",
              children: ["/guide/Pwa.md", "/guide/docsearch.md"],
            },
            {
              text: "部署",
              children: [
                "/guide/Deploy/Prepare.md",
                "/guide/Deploy/Contrast.md",
                "/guide/Deploy/GithubPages.md",
                "/guide/Deploy/Netlify.md",
              ],
            },
          ],
          "/journal/2021/": [
            {
              text: "12月",
              children: [
                "/journal/2021/December/2.md",
                // "/journal/2021/December/12.md",
                // "/journal/2021/December/26.md",
              ],
            },
          ],
          "/journal/2022/": [
            {
              text: "1月",
              children: [
                // "/journal/2022/01.md",
                "/journal/2022/January/019.md",
                // "/journal/2022/January/022.md",
                // "/journal/2022/January/023.md",
              ],
            },
          ],
          "/html/htmlNote.md": [
            {
              text: "html",
              children: [
                // '/html/readme.md',
                // '/html/htmlNote.md',
                // '/html/02.md',
              ],
            },
          ],
          "/html5/": [
            {
              text: "简介",
              children: ["/html5/readme.md"],
            },
            {
              text: "新增语义化标签",
              children: [
                // '/html5/Introduction.md',
                "/html5/Semantic-tags.md",
                "/html5/Audio.md",
                "/html5/video.md",
                "/html5/input.md",
              ],
            },
          ],
          "/Staticpages/": [
            {
              text: "简介",
              children: ["/Staticpages/readme.md"],
            },
            {
              text: "PC端静态页面应用开发及项目",
              children: [
                "/Staticpages/Process.md",
                "/Staticpages/concept.md",
                "/Staticpages/header.md",
                "/Staticpages/login-banner.md",
                "/Staticpages/search.md",
                "/Staticpages/content.md",
                "/Staticpages/main.md",
                "/Staticpages/hot_recruit.md",
                "/Staticpages/footer.md",
                "/Staticpages/copyright.md",
                "/Staticpages/backtop.md",
                "/Staticpages/public.md",
              ],
            },
          ],
          "/cssbase/": [
            {
              text: "简介",
              children: ["/cssbase/readme.md"],
            },
            {
              text: "样式表",
              children: [
                "/cssbase/Style-sheet/readme.md",
                "/cssbase/Style-sheet/Inline.md",
                "/cssbase/Style-sheet/Embedded.md",
                "/cssbase/Style-sheet/Outreach.md",
                "/cssbase/Style-sheet/Imported.md",
                "/cssbase/Style-sheet/rules.md",
              ],
            },
            {
              text: "选择器",
              children: [
                "/cssbase/selector/readme.md",
                "/cssbase/selector/base.md",
                "/cssbase/selector/advanced.md",
              ],
            },
            {
              text: "层叠式",
              children: [
                "/cssbase/Cascading/readme.md",
                "/cssbase/Cascading/inherit.md",
                "/cssbase/Cascading/Cascade.md",
              ],
            },
            {
              text: "一、Font",
              children: [
                "/cssbase/font/color.md",
                "/cssbase/font/font-­family.md",
                "/cssbase/font/font­-size.md",
                "/cssbase/font/complex.md",
                "/cssbase/font/font-weight.md",
                "/cssbase/font/font-style.md",
                "/cssbase/font/line-height.md",
                "/cssbase/font/v-align.md",
              ],
            },
            {
              text: "二、text的文本属性",
              children: [
                "/cssbase/text/text-align.md",
                "/cssbase/text/text-decoration.md",
                "/cssbase/text/text-indent.md",
              ],
            },
            {
              text: "三、盒模型",
              children: [
                "/cssbase/box/readme.md",
                // '/css3/box/other.md',
                "/cssbase/box/width.md",
                "/cssbase/box/height.md",
                "/cssbase/box/padding.md",
                "/cssbase/box/boder.md",
                "/cssbase/box/margin.md",
              ],
            },
            {
              text: "盒模型扩展",
              children: [
                "/cssbase/boxexpand/cleanstyle.md",
                "/cssbase/boxexpand/height.md",
                "/cssbase/boxexpand/overflow.md",
                "/cssbase/boxexpand/center.md",
                "/cssbase/boxexpand/FatherSon.md",
              ],
            },
            {
              text: "标准文档流",
              children: [
                "/cssbase/Documentation/ElementTable.md",
                "/cssbase/Documentation/StandardDoc.md",
                "/cssbase/Documentation/display.md",
                "/cssbase/Documentation/A-label.md",
              ],
            },
            {
              text: "浮动",
              children: [
                "/cssbase/Documentation/float.md",
                "/cssbase/Documentation/FloatWelt.md",
                "/cssbase/Documentation/FloatMargin.md",
                "/cssbase/Documentation/FloatStandard.md",
                "/cssbase/Documentation/Float-Issue.md",
                "/cssbase/Documentation/Float-clean.md",
              ],
            },
            {
              text: "背景",
              children: [
                "/cssbase/Documentation/Background.md",
                "/cssbase/Documentation/Background-application.md",
                "/cssbase/Documentation/Background-css3-Add.md",
              ],
            },
            {
              text: "定位",
              children: [
                "/cssbase/Position/Positioning-Introduction.md",
                "/cssbase/Position/Position-Relative.md",
                "/cssbase/Position/Position-Absolute.md",
                "/cssbase/Position/Positioning-Fixed.md",
                "/cssbase/Position/Positioning-use.md",
                "/cssbase/Position/Sequence.md",
              ],
            },
            {
              text: "综合应用",
              children: [
                "/cssbase/application/lunbo.md",
                "/cssbase/application/distable.md",
              ],
            },
          ],
          "/css3/": [
            {
              text: "简介",
              children: ["/css3/readme.md"],
            },
            {
              text: "新增选择器",
              children: [
                "/css3/selector/child.md",
                "/css3/selector/brother.md",
                "/css3/selector/structure.md",
                "/css3/selector/pseudo-element.md",
                "/css3/selector/attributes.md",
              ],
            },
            {
              text: "盒模型新增属性",
              children: [
                "/css3/box/readme.md",
                "/css3/box/border-radius.md",
                "/css3/box/text-shadow.md",
                "/css3/box/box-shadow.md",
                "/css3/box/transition.md",
              ],
            },
            {
              text: "2D转换",
              children: [
                "/css3/2D/2D-displacement.md",
                "/css3/2D/2D-scale.md",
                "/css3/2D/2D-rotate.md",
                "/css3/2D/2D-skew.md",
                "/css3/2D/case.md",
              ],
            },
            {
              text: "3D转换",
              children: [
                "/css3/3D/3D-perspective.md",
                "/css3/3D/3D-rotate.md",
                "/css3/3D/3D-displacement.md",
                "/css3/3D/transform-style.md",
                "/css3/3D/compatibility.md",
                "/css3/3D/case.md",
                "/css3/3D/animation.md",
              ],
            },
            {
              text: "综合运用",
              children: ["/css3/application/lunbo.md"],
            },
          ],
          "/FrontPrepare/": [
            {
              text: "前端开发准备",
              children: [
                "/FrontPrepare/code-specification.md",
                "/FrontPrepare/conditional-comment.md",
                "/FrontPrepare/code-specification.md",
                "/FrontPrepare/csshack.md",
                "/FrontPrepare/cutting-tool.md",
                "/FrontPrepare/layout.md",
              ],
            },
          ],
          "/Engineering/nodeautomation/": [
            {
              text: "Node.js 全栈基础",
              children: [
                "/Engineering/nodeautomation/base/init.md",
                "/Engineering/nodeautomation/base/module.md",
                "/Engineering/nodeautomation/base/npm.md",
                "/Engineering/nodeautomation/base/async.md",
                "/Engineering/nodeautomation/base/web.md",
              ],
            },
            {
              text: "脚手架工具",
              children: ["/Engineering/nodeautomation/scaffold/init.md"],
            },
            {
              text: "自动化构建",
              children: [
                "/Engineering/nodeautomation/Construct/readme.md",
                "/Engineering/nodeautomation/Construct/npm_scripts.md",
                "/Engineering/nodeautomation/Construct/style.md",
                "/Engineering/nodeautomation/Construct/scripts.md",
                "/Engineering/nodeautomation/Construct/lint.md",
              ],
            },
            {
              text: "Gulp",
              children: [
                "/Engineering/nodeautomation/Gulp/basic_usage.md",
                "/Engineering/nodeautomation/Gulp/task_combination.md",
                "/Engineering/nodeautomation/Gulp/working_with_files.md",
                "/Engineering/nodeautomation/Gulp/build_style.md",
                "/Engineering/nodeautomation/Gulp/build_script.md",
                "/Engineering/nodeautomation/Gulp/build_html.md",
                "/Engineering/nodeautomation/Gulp/build_image.md",
                "/Engineering/nodeautomation/Gulp/del.md",
                "/Engineering/nodeautomation/Gulp/browser_sync.md",
                "/Engineering/nodeautomation/Gulp/Bootstrap.md",
                "/Engineering/nodeautomation/Gulp/Bootstrap-Reload.md",
                "/Engineering/nodeautomation/Gulp/gulp_in_yeoman.md",
              ],
            },
          ],
          "/Engineering/modular/": [
            {
              text: "ES Modules模块化开发",
              children: [
                "/Engineering/modular/es-module/features.md",
                "/Engineering/modular/es-module/export.md",
                "/Engineering/modular/es-module/import.md",
                "/Engineering/modular/es-module/export-import.md",
                "/Engineering/modular/es-module/polyfill.md",
              ],
            },
            {
              text: "在node中使用ES Modules",
              children: [
                "/Engineering/modular/es-module-in-node/esm-support.md",
                "/Engineering/modular/es-module-in-node/cmj-support.md",
                "/Engineering/modular/es-module-in-node/differences.md",
                "/Engineering/modular/es-module-in-node/new-version.md",
                "/Engineering/modular/es-module-in-node/babel.md",
              ],
            },
            {
              text: "webpack 基础",
              children: [
                "/Engineering/modular/webpack/webpackstart.md",
                "/Engineering/modular/webpack/webpackCore.md",
                "/Engineering/modular/webpack/practice.md",
                "/Engineering/modular/webpack/webpackconfig.md",
                "/Engineering/modular/webpack/webpackcss.md",
                "/Engineering/modular/webpack/webpackhtml.md",
                "/Engineering/modular/webpack/webpackjs.md",
                "/Engineering/modular/webpack/webpackimg.md",
                "/Engineering/modular/webpack/webpackfont.md",
                "/Engineering/modular/webpack/webpack-AssetModules.md",
                "/Engineering/modular/webpack/webpackdevserver.md",
              ],
            },
            {
              text: "webpack 进阶",
              children: [
                "/Engineering/modular/webpack/webpackenv.md",
                "/Engineering/modular/webpack/webpackplugin.md",
                "/Engineering/modular/webpack/webpackloader.md",
                "/Engineering/modular/webpack/webpack-Code-Splitting.md",
                "/Engineering/modular/webpack/webpacksourcemap.md",
                "/Engineering/modular/webpack/Tree-Shaking.md",
                "/Engineering/modular/webpack/webpackcache.md",
                "/Engineering/modular/webpack/webpackresolve.md",
                "/Engineering/modular/webpack/webpackexternals.md",
                "/Engineering/modular/webpack/Module-Federation.md",
              ],
            },
            {
              text: "webpack 项目",
              children: [
                "/Engineering/modular/webpack/webpackproject.md",
                "/Engineering/modular/webpack/webpackvue.md",
                "/Engineering/modular/webpack/webpackreact.md",
              ],
            },
            {
              text: "练习题",
              children: ["/Engineering/modular/webpack/exercise.md"],
            },
          ],
          "/Engineering/git/": [
            {
              text: "Git",
              children: [
                "/Engineering/git/readme.md",
                "/Engineering/git/ErrorCollection.md",
              ],
            },
          ],
          "/Engineering/vscode/": [
            {
              text: "vscode",
              children: ["/Engineering/git/config.md"],
            },
          ],
          "/Engineering/github/": [
            {
              text: "vscode",
              children: ["/Engineering/github/readme.md"],
            },
          ],
          "/mobile/mobilebase/": [
            {
              text: "一：移动端开发基础",
              link: "/mobile/mobilebase/devbasis.md",
              children: [
                "/mobile/mobilebase/devbasis.md",
                "/mobile/mobilebase/viewport.md",
                "/mobile/mobilebase/pixel-ratio.md",
                "/mobile/mobilebase/multiple-graph.md",
                "/mobile/mobilebase/dev-options.md",
                "/mobile/mobilebase/solution.md",
                "/mobile/mobilebase/technical-selection.md",
              ],
            },
          ],
          "/mobile/jingdong/": [
            {
              text: "二：流式布局-京东项目",
              link: "/mobile/jingdong/flow-layout.md",
              children: [
                "/mobile/jingdong/flow-layout.md",
                "/mobile/jingdong/work-prepar.md",
                "/mobile/jingdong/tips-layout.md",
                "/mobile/jingdong/tips-content.md",
                "/mobile/jingdong/search-layout.md",
                "/mobile/jingdong/search-content.md",
                "/mobile/jingdong/banner-layout.md",
                "/mobile/jingdong/banner-content.md",
                "/mobile/jingdong/banner2-layout.md",
                "/mobile/jingdong/promotions.md",
                "/mobile/jingdong/nav-layout.md",
                "/mobile/jingdong/newcomer.md",
              ],
            },
          ],
          "/mobile/xiecheng/": [
            {
              text: "三：flex布局-携程网项目",
              link: "/mobile/xiecheng/experience.md",
              children: [
                "/mobile/xiecheng/experience.md",
                "/mobile/xiecheng/principle.md",
                "/mobile/xiecheng/flex-direction.md",
                "/mobile/xiecheng/justify-content.md",
                "/mobile/xiecheng/flex-wrap.md",
                "/mobile/xiecheng/align-items.md",
                "/mobile/xiecheng/align-content.md",
                "/mobile/xiecheng/flex-flow.md",
                "/mobile/xiecheng/align-self.md",
                "/mobile/xiecheng/index-initialization.md",
                "/mobile/xiecheng/index-module.md",
                "/mobile/xiecheng/search-index-filling.md",
                "/mobile/xiecheng/search-index-login.md",
                "/mobile/xiecheng/focus.md",
                "/mobile/xiecheng/local-nav.md",
                "/mobile/xiecheng/nav-public.md",
                "/mobile/xiecheng/nav-special.md",
                "/mobile/xiecheng/subnav-entry.md",
                "/mobile/xiecheng/hot-top.md",
                "/mobile/xiecheng/hot-bottom.md",
              ],
            },
          ],
          "/mobile/suning/": [
            {
              text: "四：rem布局-苏宁项目",
              link: "/mobile/suning/guide.md",
              children: [
                "/mobile/suning/guide.md",
                "/mobile/suning/unit.md",
                "/mobile/suning/media-query.md",
                "/mobile/suning/media-query-case.md",
                "/mobile/suning/media-query-rem.md",
                "/mobile/suning/media-query-rem.md",
                "/mobile/suning/media-query-resource.md",
                "/mobile/suning/css-malpractice.md",
                "/mobile/suning/less-install.md",
                "/mobile/suning/less-variable.md",
                "/mobile/suning/rem-plan.md",
                "/mobile/suning/rem-plan01.md",
                "/mobile/suning/rem-summarize.md",
                "/mobile/suning/common.md",
                "/mobile/suning/import-less.md",
                "/mobile/suning/index-body.md",
                "/mobile/suning/index-top-banner.md",
                "/mobile/suning/header.md",
                "/mobile/suning/header-top.md",
                "/mobile/suning/header-search.md",
                "/mobile/suning/banner.md",
                "/mobile/suning/nav.md",
                "/mobile/suning/flexible.md",
              ],
            },
          ],
          "/mobile/alibaixiu/": [
            {
              text: "五：响应式布局-阿里百秀项目",
              link: "/mobile/alibaixiu/readme.md",
              children: [
                "/mobile/alibaixiu/readme.md",
                "/mobile/alibaixiu/theory.md",
                "/mobile/alibaixiu/container.md",
                "/mobile/alibaixiu/nav-case.md",
                "/mobile/alibaixiu/bootstrap-init.md",
                "/mobile/alibaixiu/bootstrap-use.md",
                "/mobile/alibaixiu/bootstrap-container.md",
                "/mobile/alibaixiu/bootstrap-grid-init.md",
                "/mobile/alibaixiu/bootstrap-grid-use.md",
                "/mobile/alibaixiu/bootstrap-grid-column-nesting.md",
                "/mobile/alibaixiu/bootstrap-grid-column-offset.md",
                "/mobile/alibaixiu/bootstrap-grid-column-sort.md",
                "/mobile/alibaixiu/bootstrap-grid-column-responsive-tools.md",
                "/mobile/alibaixiu/bootstrap-screen division.md",
                "/mobile/alibaixiu/bootstrap-work-preparation.md",
                "/mobile/alibaixiu/bootstrap-container-width.md",
                "/mobile/alibaixiu/bootstrap-mainbody-build.md",
                "/mobile/alibaixiu/bootstrap-logo.md",
                "/mobile/alibaixiu/bootstrap-nav.md",
                "/mobile/alibaixiu/bootstrap-news.md",
                "/mobile/alibaixiu/bootstrap-publish.md",
                "/mobile/alibaixiu/bootstrap-aside.md",
                "/mobile/alibaixiu/bootstrap-header-responsive.md",
                "/mobile/alibaixiu/bootstrap-main-responsive.md",
              ],
            },
          ],
          "/Javascript/part1/": [
            // {
            //   text: "语法、数据类型、流程控制",
            //   // link:"/Javascript/part1/grammar/zucheng.md",
            // },
            {
              text: "语法",
              link: "/Javascript/part1/grammar/zucheng.md",
              children: [
                "/Javascript/part1/grammar/zucheng.md",
                "/Javascript/part1/grammar/yufa.md",
                "/Javascript/part1/grammar/alert.md",
                "/Javascript/part1/grammar/prompt.md",
                "/Javascript/part1/grammar/console.md",
              ],
            },
            {
              text: "数据类型",
              children: [
                "/Javascript/part1/typedata/hanyi.md",
                "/Javascript/part1/typedata/integer.md",
                "/Javascript/part1/typedata/float.md",
                "/Javascript/part1/typedata/infinity.md",
                "/Javascript/part1/typedata/NaN.md",
              ],
            },
            {
              text: "字符串字面量",
              children: [
                "/Javascript/part1/Stringliteral/readme.md",
                "/Javascript/part1/Stringliteral/variables.md",
              ],
            },
            {
              text: "数据类型的含义和转换",
              children: [
                "/Javascript/part1/typedata2/readme.md",
                "/Javascript/part1/typedata2/detect.md",
                "/Javascript/part1/typedata2/conversion.md",
              ],
            },
            {
              text: "操作符",
              children: [
                "/Javascript/part1/operator/readme.md",
                "/Javascript/part1/operator/arithmetic.md",
                "/Javascript/part1/operator/comparison.md",
                "/Javascript/part1/operator/logical.md",
                "/Javascript/part1/operator/assignment.md",
                "/Javascript/part1/operator/unary.md",
                "/Javascript/part1/operator/precedence.md",
              ],
            },
            {
              text: "流程控制语句",
              children: [
                "/Javascript/part1/process/readme.md",
                "/Javascript/part1/process/if.md",
                "/Javascript/part1/process/if-Multi-branch.md",
                "/Javascript/part1/process/if-nested.md",
                "/Javascript/part1/process/ternary-expression.md",
                "/Javascript/part1/process/switch.md",
              ],
            },
            {
              text: "循环语句",
              children: [
                "/Javascript/part1/loop/readme.md",
                "/Javascript/part1/loop/for.md",
                "/Javascript/part1/loop/do-while.md",
                "/Javascript/part1/loop/while.md",
                "/Javascript/part1/loop/break.md",
                "/Javascript/part1/loop/continue.md",
                "/Javascript/part1/loop/mind.md",
                "/Javascript/part1/loop/accumulator1.md",
                "/Javascript/part1/loop/accumulator2.md",
                "/Javascript/part1/loop/daffodil.md",
              ],
            },
            {
              text: "练手习题",
              children: ["/Javascript/part1/exercise/readme.md"],
            },
          ],
          "/Javascript/part2/": [
            {
              text: "一：数组",
              children: ["/Javascript/part2/array/readme.md"],
            },
            {
              text: "二：函数",
              children: [
                "/Javascript/part2/function/notion.md",
                "/Javascript/part2/function/statement.md",
                "/Javascript/part2/function/parameter.md",
                "/Javascript/part2/function/return.md",
                "/Javascript/part2/function/expression.md",
                "/Javascript/part2/function/type-of-data.md",
                "/Javascript/part2/function/arguments.md",
                "/Javascript/part2/function/recursion.md",
                "/Javascript/part2/function/scope.md",
                "/Javascript/part2/function/parameter-variables.md",
                "/Javascript/part2/function/scope-chain.md",
                "/Javascript/part2/function/preparse.md",
                "/Javascript/part2/function/IIFE.md",
              ],
            },
            {
              text: "三：对象",
              children: [
                "/Javascript/part2/object/notion.md",
                "/Javascript/part2/object/literal.md",
                "/Javascript/part2/object/transfer.md",
                "/Javascript/part2/object/create.md",
                "/Javascript/part2/object/traverse.md",
                "/Javascript/part2/object/type-of-data.md",
                "/Javascript/part2/object/simpleData-storage.md",
                "/Javascript/part2/object/complexData-storage.md",
              ],
            },
            {
              text: "四：内置对象",
              children: [
                "/Javascript/part2/built-in-objects/readme.md",
                "/Javascript/part2/built-in-objects/MDN.md",
                "/Javascript/part2/built-in-objects/Math-object.md",
                "/Javascript/part2/built-in-objects/array.md",
                "/Javascript/part2/built-in-objects/String.md",
              ],
            },
            {
              text: "练手习题",
              children: ["/Javascript/part2/exercise/readme.md"],
            },
          ],
          "/Javascript/part3/": [
            {
              text: "DOM",
              children: [
                "/Javascript/part3/DOM/API.md",
                "/Javascript/part3/DOM/notion.md",
                "/Javascript/part3/DOM/getElementById.md",
                "/Javascript/part3/DOM/getElementsByTagName.md",
                "/Javascript/part3/DOM/inside-the-object.md",
                "/Javascript/part3/DOM/getElementsByName.md",
                "/Javascript/part3/DOM/getElementsByClassName.md",
                "/Javascript/part3/DOM/querySelector.md",
                "/Javascript/part3/DOM/summary.md",
              ],
            },
            {
              text: "DOM事件基本应用",
              children: ["/Javascript/part3/DOM/event.md"],
            },
            {
              text: "DOM 元素element的属性操作",
              children: [
                "/Javascript/part3/DOM/UnTableAttributes.md",
                "/Javascript/part3/DOM/this.md",
                "/Javascript/part3/DOM/innerHTML.md",
                "/Javascript/part3/DOM/forml.md",
                "/Javascript/part3/DOM/Diy-Attributes.md",
                "/Javascript/part3/DOM/style.md",
                "/Javascript/part3/DOM/class.md",
                "/Javascript/part3/DOM/case-style-class.md",
              ],
            },
            {
              text: "DOM 节点node的操作",
              children: [
                "/Javascript/part3/DOM/experience.md",
                "/Javascript/part3/DOM/Node-properties.md",
                "/Javascript/part3/DOM/Node-level.md",
                "/Javascript/part3/DOM/sibling-node.md",
                "/Javascript/part3/DOM/create-node.md",
                "/Javascript/part3/DOM/add-node.md",
                "/Javascript/part3/DOM/Node-judgment.md",
                "/Javascript/part3/DOM/case-element.md",
              ],
            },
            {
              text: "DOM 事件详解",
              children: [
                "/Javascript/part3/DOM/addEvent.md",
                "/Javascript/part3/DOM/DOM-event-stream.md",
                "/Javascript/part3/DOM/event-delegation.md",
                "/Javascript/part3/DOM/event-object.md",
                "/Javascript/part3/DOM/behavior.md",
              ],
            },
            {
              text: "DOM 特效",
              children: [
                "/Javascript/part3/DOM/specialEffects/offsetParent.md",
                "/Javascript/part3/DOM/specialEffects/client.md",
                "/Javascript/part3/DOM/specialEffects/scroll.md",
                "/Javascript/part3/DOM/specialEffects/case.md",
              ],
            },
            {
              text: "BOM 浏览器对象模型",
              children: [
                "/Javascript/part3/BOM/concept.md",
                "/Javascript/part3/BOM/dialog.md",
                "/Javascript/part3/BOM/onload.md",
                "/Javascript/part3/BOM/setTimeout.md",
                "/Javascript/part3/BOM/clearTimeout.md",
                "/Javascript/part3/BOM/setInterval.md",
                "/Javascript/part3/BOM/clearInterval.md",
                "/Javascript/part3/BOM/multi-attribute.md",
                "/Javascript/part3/BOM/location.md",
              ],
            },
          ],
          "/Javascript/part4/": [
            {
              text: "任务一：面对象编程",
              children: [
                "/Javascript/part4/object-oriented/notion.md",
                "/Javascript/part4/object-oriented/What-is-object.md",
                "/Javascript/part4/object-oriented/experience.md",
                "/Javascript/part4/object-oriented/create.md",
                "/Javascript/part4/object-oriented/prototype.md",
                "/Javascript/part4/object-oriented/Prototype-chain.md",
                "/Javascript/part4/object-oriented/Built-in-prototype.md",
                "/Javascript/part4/object-oriented/case.md",
              ],
            },
            {
              text: "任务二：面对向编程案例：贪吃蛇游戏",
              children: [
                "/Javascript/part4/Snake-game/Project-Introduction.md",
                "/Javascript/part4/Snake-game/food-object.md",
                "/Javascript/part4/Snake-game/snake-object.md",
                "/Javascript/part4/Snake-game/game-object.md",
                "/Javascript/part4/Snake-game/main-code.md",
                "/Javascript/part4/Snake-game/problem.md",
              ],
            },
            {
              text: "任务三：继承和函数进阶",
              children: [
                "/Javascript/part4/Advanced/Inheritance-between-objects.md",
                "/Javascript/part4/Advanced/Constructor.md",
                "/Javascript/part4/Advanced/call.md",
                "/Javascript/part4/Advanced/function-defined.md",
                "/Javascript/part4/Advanced/function-this.md",
                "/Javascript/part4/Advanced/method-of-function-object.md",
                "/Javascript/part4/Advanced/function-other-members.md",
                "/Javascript/part4/Advanced/higherorder-functions.md",
                "/Javascript/part4/Advanced/Closures.md",
              ],
            },
            {
              text: "任务四：正则表达式对象",
              children: [
                "/Javascript/part4/Regular-Expression/experience.md",
                "/Javascript/part4/Regular-Expression/grammar.md",
                "/Javascript/part4/Regular-Expression/composition.md",
                "/Javascript/part4/Regular-Expression/regular-term.md",
              ],
            },
            {
              text: "任务五：ES6新特性",
              children: [
                "/Javascript/part4/ES6/ECMAScript-Overview.md",
                "/Javascript/part4/ES6/ES2015-Overview.md",
                "/Javascript/part4/ES6/Prepare.md",
                "/Javascript/part4/ES6/let-block-scope.md",
                "/Javascript/part4/ES6/const.md",
                "/Javascript/part4/ES6/Array-Destructuring.md",
                "/Javascript/part4/ES6/Object-Destructuring.md",
                "/Javascript/part4/ES6/Template-literals.md",
                "/Javascript/part4/ES6/Tagged-templates.md",
                "/Javascript/part4/ES6/string-expansion.md",
                "/Javascript/part4/ES6/Default-parameters.md",
                "/Javascript/part4/ES6/Rest-parameters.md",
                "/Javascript/part4/ES6/Spread-array.md",
                "/Javascript/part4/ES6/Arrow-functions.md",
                "/Javascript/part4/ES6/arrow-functions-this.md",
                "/Javascript/part4/ES6/enhanced-object-literal.md",
                "/Javascript/part4/ES6/object-assign.md",
                "/Javascript/part4/ES6/class.md",
                "/Javascript/part4/ES6/set.md",
                "/Javascript/part4/ES6/Map.md",
                "/Javascript/part4/ES6/Symbol.md",
                "/Javascript/part4/ES6/for-of.md",
                "/Javascript/part4/ES6/ES2015-more.md",
                "/Javascript/part4/ES6/ES2016-more.md",
              ],
            },
            {
              text: "练习题",
              children: [
                "/Javascript/part4/ES6/practice1.md",
                "/Javascript/part4/ES6/practice2.md",
                "/Javascript/part4/ES6/practice3.md",
              ],
            },
          ],
          "/Javascript/part5/": [
            {
              text: "任务一：JQuery基础",
              children: [
                "/Javascript/part5/Base/experience.md",
                "/Javascript/part5/Base/getelement.md",
                "/Javascript/part5/Base/JQ-Object.md",
                "/Javascript/part5/Base/Selector.md",
                "/Javascript/part5/Base/case.md",
              ],
            },
            {
              text: "任务二：JQuery常见方法",
              children: [
                "/Javascript/part5/Common-method/content.md",
                "/Javascript/part5/Common-method/attributes.md",
                "/Javascript/part5/Common-method/css.md",
                "/Javascript/part5/Common-method/class.md",
                "/Javascript/part5/Common-method/event-method.md",
                "/Javascript/part5/Common-method/node.md",
                "/Javascript/part5/Common-method/chain-call.md",
                "/Javascript/part5/Common-method/case.md",
              ],
            },
            {
              text: "任务三：JQuery排序和动画",
              children: [
                "/Javascript/part5/sort/sort.md",
                "/Javascript/part5/sort/sort-Exclusive.md",
                "/Javascript/part5/sort/each.md",
                "/Javascript/part5/sort/each-Exclusive.md",
                "/Javascript/part5/sort/entry-function.md",
                "/Javascript/part5/sort/toggle.md",
                "/Javascript/part5/sort/animate.md",
                "/Javascript/part5/sort/animate-queue.md",
                "/Javascript/part5/sort/animate-delay.md",
                "/Javascript/part5/sort/animate-stop.md",
                "/Javascript/part5/sort/clear-animation-queue.md",
                "/Javascript/part5/sort/case.md",
              ],
            },
            {
              text: "任务四：jQuery节点操作和元素尺寸",
              children: [
                "/Javascript/part5/node/nodes.md",
                "/Javascript/part5/node/size-element.md",
                "/Javascript/part5/node/position-element.md",
                "/Javascript/part5/node/case.md",
              ],
            },
            {
              text: "任务五：jQuery 事件操作和插件",
              children: [
                "/Javascript/part5/event/event-action.md",
                "/Javascript/part5/event/event-object.md",
                "/Javascript/part5/event/multi-library-coexistence.md",
                "/Javascript/part5/event/plugin-usage.md",
              ],
            },
            {
              text: "练习题",
              children: [
                "/Javascript/part5/practice/start.md",
                "/Javascript/part5/practice/calculator.md",
                "/Javascript/part5/practice/message-board.md",
                "/Javascript/part5/practice/carousel_3D.md",
                "/Javascript/part5/practice/carousel_3D_plus.md",
              ],
            },
          ],
          "/Ajax/base/": [
            {
              text: "Ajax 基础",
              children: [
                "/Ajax/base/init.md",
                "/Ajax/base/experience.md",
                "/Ajax/base/primordial.md",
                "/Ajax/base/Ajax-xhr.md",
                "/Ajax/base/data-format.md",
                "/Ajax/base/JSON-Server.md",
                "/Ajax/base/Ajax-apply.md",
                "/Ajax/base/data-render.md",
                "/Ajax/base/package-Ajax.md",
              ],
            },
          ],
          "/Ajax/Common-library/": [
            {
              text: "Ajax常用库",
              children: [
                "/Ajax/Common-library/jQuery-ajax.md",
                "/Ajax/Common-library/Axios-ajax.md",
                "/Ajax/Common-library/xhr2.md",
              ],
            },
          ],
          "/Ajax/cross-domain/": [
            {
              text: "跨域和模板引擎应用",
              children: [
                "/Ajax/cross-domain/cross-domain.md",
                "/Ajax/cross-domain/solution.md",
                "/Ajax/cross-domain/case.md",
                "/Ajax/cross-domain/artTemplate.md",
              ],
            },
          ],
          "/vue/part1/": [
            {
              text: "初识 Vue.js",
              children: [
                "/vue/part1/init.md",
                "/vue/part1/install.md",
                "/vue/part1/basegrammar.md",
              ],
            },
            {
              text: "基础指令",
              children: [
                "/vue/part1/Content-processing.md",
                "/vue/part1/Attributes.md",
                "/vue/part1/render.md",
              ],
            },
            {
              text: "事件与表单处理",
              children: [
                "/vue/part1/event.md",
                "/vue/part1/form.md",
                "/vue/part1/modifier.md",
              ],
            },
            {
              text: "进阶语法",
              children: [
                "/vue/part1/custom-directive.md",
                "/vue/part1/filter.md",
                "/vue/part1/computed.md",
                "/vue/part1/watch.md",
                "/vue/part1/DevTools.md",
                "/vue/part1/life-cycle.md",
              ],
            },
            {
              text: "综合案例：TodoMVC",
              children: [
                "/vue/part1/todoMVC.md",
                "/vue/part1/List-display.md",
                "/vue/part1/Information-display.md",
                "/vue/part1/state-switch.md",
                "/vue/part1/Matters-added.md",
                "/vue/part1/Matter-deletion.md",
                "/vue/part1/Matters-Edit.md",
                "/vue/part1/Matter-filter.md",
                "/vue/part1/data-persistence.md",
              ],
            },
          ],
          "/vue/part2/": [
            {
              text: "Vue.js 组件",
              children: [
                "/vue/part2/Component-init.md",
                "/vue/part2/Component-registration.md",
                "/vue/part2/Component-communication.md",
                "/vue/part2/Props.md",
                "/vue/part2/Component-slot.md",
                "/vue/part2/built-in-component.md",
              ],
            },
            {
              text: "Vue Rouner",
              children: [
                "/vue/part2/SPA.md",
                "/vue/part2/Front-end-router.md",
                "/vue/part2/vue-rouner.md",
              ],
            },
            {
              text: "Vue CLI",
              children: [
                "/vue/part2/Vue-Cli.md",
              ],
            },
          ],
          "/vue/part3/": [
            {
              text: "项目实战",
              children: [
                "/vue/part3/VueCli-CreatProject.md",
                "/vue/part3/git.md",
                "/vue/part3/Directory-Structure.md",
                "/vue/part3/Code-Specification.md",
                "/vue/part3/style-processing.md",
                "/vue/part3/route-processing.md",
                "/vue/part3/layont-processing.md",
                "/vue/part3/Interface-handling.md",
                "/vue/part3/Login-function.md",
                "/vue/part3/Vuex.md",
                "/vue/part3/Authentication.md",
                "/vue/part3/authority-management.md",
                "/vue/part3/Course-management.md",
              ],
            },
          ],
          "/vue/part4/": [
            {
              text: "项目实战",
              children: [
                "/vue/part4/init.md",
              ],
            },
          ],
          "/vue/part5/": [
            {
              text: "项目实战",
              children: [
                "/vue/part5/init.md",
              ],
            },
          ],
          "/vue/part6/": [
            {
              text: "项目实战",
              children: [
                "/vue/part6/init.md",
              ],
            },
          ],
        },
        navbar: [
          { text: "指南", link: "/guide/" },
          {
            text: "前端三驾马车",
            children: [
              {
                text: "CSS",
                children: ["/cssbase/", "/css3/"],
              },
              {
                text: "HTML",
                children: ["/html/htmlNote.md", "/html5/", "/Staticpages/"],
              },
              {
                text: "Javascript",
                children: [
                  "/Javascript/part1/",
                  "/Javascript/part2/",
                  "/Javascript/part3/",
                  "/Javascript/part4/",
                  "/Javascript/part5/",
                ],
              },
              {
                text: "Ajax",
                children: [
                  "/Ajax/base/",
                  "/Ajax/Common-library/",
                  "/Ajax/cross-domain/",
                ],
              },
              {
                text: "前端开发准备",
                children: ["/FrontPrepare/"],
              },
            ],
          },
          {
            text: "前端高阶",
            children: [
              {
                text: "Vue.js 框架及原理",
                children: [
                  "/vue/part1/",
                  "/vue/part2/",
                  "/vue/part3/",
                  "/vue/part4/",
                  "/vue/part5/",
                  "/vue/part6/",
                ],
              },
              {
                text: "React 实战开发",
                children: ["/html/htmlNote.md", "/html5/", "/Staticpages/"],
              },
              {
                text: "小程序与游戏开发",
                children: [
                  "/Javascript/part1/",
                  "/Javascript/part2/",
                  "/Javascript/part3/",
                  "/Javascript/part4/",
                  "/Javascript/part5/",
                ],
              },
            ],
          },
          {
            text: "移动端网页应用开发及项目",
            children: [
              {
                text: "一：移动端开发基础",
                link: "/mobile/mobilebase/devbasis",
                // 该元素将一直处于激活状态
                activeMatch: "/Engineering/vscode/",
              },
              {
                text: "二：流式布局-京东项目",
                link: "/mobile/jingdong/flow-layout",
                // link: "/mobile/jingdong/flow-layout",
                // 该元素在当前路由路径是 /foo/ 开头时激活
                // 支持正则表达式
                // activeMatch: "/Engineering/git/",
              },
              {
                text: "三：flex布局-携程网项目",
                link: "/mobile/xiecheng/experience",
                // 该元素在当前路由路径是 /foo/ 开头时激活
                // 支持正则表达式
                // activeMatch: "/Engineering/github/",
              },
              {
                text: "四：rem布局-苏宁项目",
                link: "/mobile/suning/guide",
                // 该元素在当前路由路径是 /foo/ 开头时激活
                // 支持正则表达式
                // activeMatch: "/Engineering/github/",
              },
              {
                text: "五：响应式布局-阿里百秀项目",
                link: "/mobile/alibaixiu/readme.md",
                // 该元素在当前路由路径是 /foo/ 开头时激活
                // 支持正则表达式
                // activeMatch: "/Engineering/github/",
              },
            ],
          },
          // { text: "前端进阶", link: "/others/" },
          {
            text: "前端工程化",
            children: [
              {
                text: "工程化基础、自动化工具",
                link: "/Engineering/nodeautomation/",
                // 该元素将一直处于激活状态
                activeMatch: "/Engineering/nodeautomation/",
              },
              {
                text: "模块化开发及规范化标准",
                link: "/Engineering/modular/",
                // 该元素将一直处于激活状态
                activeMatch: "/Engineering/modular/",
              },
              {
                text: "VSCode",
                link: "/Engineering/vscode/",
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
          // {
          //   text: "生活日志",
          //   children: [
          //     {
          //       text: "2021",
          //       link: "/journal/2021/",
          //     },
          //     {
          //       text: "2022",
          //       link: "/journal/2022/",
          //     },
          //   ],
          // },
          { text: "Github主页", link: "https://github.com/dk764337361" },
        ],
      },
    },
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
          "/": {
            placeholder: "Search Documentation",
          },
          "/zh/": {
            placeholder: "搜索文档",
          },
        },
      },
    ],
  ],
};
