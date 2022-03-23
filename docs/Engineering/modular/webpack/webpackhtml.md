# 打包 HTML

## Webpack 实践 10

- html-webpack-plugin
  - 生成 HTML 文件（用于服务器访问），并在 HTML 中加载所有的打包资源
  - 指定 HTML 模板、设置 HTML 变量、压缩 HTML
- 安装

```sh
cnpm i html-webpack-plugin -D
```

- 配置
  - https://www.npmjs.com/package/html-webpack-plugin


## 待修改文件

```
03.webpackcss
├─── src
│   ├── css
│   ├   └── main.css
│   ├   └── main.less
│   ├── data.json
│   └── index.js
│   └── index.html(新增，html模板)
└── index.html(删除)
└── webpack.config.js(修改)
└── postcss.config.js
└── package.jsond
```

- webpack.config.js

```js
/**
 * Webpack 的配置文件
 */
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 打包模式
  mode: "development",

  // 入口文件
  entry: "./src/index.js",

  // 出口配置
  output: {
    // 输出目录（输出目录必须是绝对路径）
    path: resolve(__dirname, "output"),
    // 输出文件名称
    filename: "bundle.js",
  },

  // 模块配置
  module: {
    rules: [
      // 指定多个配置规则
      {
        test: /\.css$/i,
        // use 中 loader 的加载顺序：先下后上
        use: [
          // 3. 将 JS 中的样式，挂载到 <style> 标签中
          // 'style-loader',

          // 3. 将 CSS 打包到独立的文件中
          MiniCssExtractPlugin.loader,

          // 2. css-loader 按照 CommonJS 规范，将样式文件，输出到 JS 中
          "css-loader",

          // 1. 通过 postcss-loader 给样式属性添加浏览器前缀
          "postcss-loader",
        ],
      },

      {
        test: /\.less$/i,
        // use 中 loader 的加载顺序：先下后上
        use: [
          // 4. 将 JS 中的样式，挂载到 <style> 标签中
          // 'style-loader',

          // 4. 将 CSS 打包到独立的文件中
          MiniCssExtractPlugin.loader,

          // 3. css-loader 按照 CommonJS 规范，将样式文件，输出到 JS 中
          "css-loader",

          // 2. 通过 postcss-loader 给样式属性添加浏览器前缀
          "postcss-loader",

          // 1. 将 less 转成普通的 CSS
          "less-loader",
        ],
      },
    ],
  },

  // 开发服务器
  devServer: {},

  // 插件配置
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new StylelintPlugin({
      // 指定需要进行格式校验的文件
      files: ["src/css/*.{css,less,sass,scss}"],
    }),
    // 压缩 CSS
    new OptimizeCssAssetsPlugin(),

    // Html 的配置
    new HtmlWebpackPlugin({
      // 指定打包后的文件名称
      filename: "index.html",

      // 用来指定，生成 HTML 的模板
      template: "./src/index.html",
      // 指定 HTML 中使用的变量
      title: "Webpack Demo",
    }),
    new HtmlWebpackPlugin({
      // 指定打包后的文件名称
      filename: "about.html",
      // 用来指定，生成 HTML 的模板
      template: "./src/index.html",
      // 指定 HTML 中使用的变量
      title: "关于我们",
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
};
```
