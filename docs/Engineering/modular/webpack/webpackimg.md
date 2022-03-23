# 打包 图片


## Webpack 实践 11

### 插件简介

- file-loader
  - 将用到的图片复制到输出目录，过滤掉不用的图片
  - https://www.npmjs.com/package/file-loader

```sh
cnpm i file-loader -D
```

- url-loader
  - https://www.npmjs.com/package/url-loader
  - 是 file-loader 的升级版，如果图片小于配置大小，会转成 base64 字符串转成 base64 字符串后，图片会跟 js 一起加载（减少图片的请求次数）

```sh
cnpm i url-loader -D
```

### base64 简介

<img src="/images/nodeautomation/117.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/118.jpg" style="width: 100%; display:inline-block; margin-top: 20px ;">
<img src="/images/nodeautomation/119.jpg" style="width: 100%; display:inline-block; margin-top: 20px ;">

### 处理 CSS 中的图片路径（例如：背景图片加载失败）

<img src="/images/nodeautomation/120.jpg" style="width: 100%; display:inline-block; margin: 0;">

### 打包 HTML 页面里引入的图片

- html-loader
  - 将 HTML 导出为字符串（负责引入 img，从而能被 url-loader 进行处理）
  - https://www.npmjs.com/package/html-loader
- html-loader 与 html-webpack-plugin 的冲突
  - 原因：htmlWebpackPlugin 会检查目标文件是否已经有 loader 处理，如果有其他 loader 处理，htmlWebpackPlugin 不再使用 `lodash.template` 去处理 ejs 语法
  - 解决：不使用 html-loader，使用 html-webpack-plugin，将 htmlWebpackPlugin 中，模板文件的后缀名改成 `.ejs`（非 `.html`）

::: warning 注意

- html-loader 适合处理静态 html
- html-webpack-plugin 适合处理动态 html(ejs 语法)
  :::

### 待修改文件

```
06.webpackfile
├─── src
│   ├── css
│   ├   └── main.css
│   ├   └── main.less(修改)
│   ├── public
│   ├   └── favicon.ico
│   ├── image
│   ├   └── icon
│   │   │    └── xxxx.png
│   │   │    └── xxxx.png....
│   ├   └── bg.jpg
│   ├   └── xph.gif
│   ├── data.json
│   └── index.js(修改)
│   └── index.ejs(新增)
└── webpack.config.js(修改)
└── postcss.config.js
└── package.json
```

- webpack.config.js

```js{81-96,164,172}
/**
 * Webpack 的配置文件
 */
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

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
          // MiniCssExtractPlugin.loader,
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },

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
          // MiniCssExtractPlugin.loader,
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },

          // 3. css-loader 按照 CommonJS 规范，将样式文件，输出到 JS 中
          "css-loader",

          // 2. 通过 postcss-loader 给样式属性添加浏览器前缀
          "postcss-loader",

          // 1. 将 less 转成普通的 CSS
          "less-loader",
        ],
      },

      // 处理图片
      {
        test: /\.(png|gif|jpe?g)$/i,
        use: {
          loader: "url-loader",
          options: {
            // 指定图片大小，小于该数值的图片，会被转成 base64
            limit: 8 * 1024, // 8 kb
            // [name] 是图片原来的名称
            // [ext] 是图片原来的后缀名
            name: "image/[name].[ext]",
            // url-loader 默认采用 ES Modules 规范进行解析，但是 html-loader 引入图片使用的是 CommonJS 规范
            // 解决：关闭 url-loader 默认的 ES Modules 规范，强制 url-loader 使用 CommonJS 规范进行打包
            esModule: false,
          },
        },
      },

      // {
      //   test: /\.(htm|html)$/i,
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       // Webpack 4 中只需要在 url-loader 配置 esModule: false
      //       // Webpack 5 需要 html-loader 中，也配置 esModule: false
      //       esModule: false
      //     }
      //   }
      // },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  // 按需加载
                  useBuiltIns: "usage",
                  // core-js 的版本
                  corejs: 3,
                  // targets: "defaults"
                  // 指定兼容浏览器的版本
                  targets: {
                    chrome: "58",
                    ie: "9",
                    firefox: "60",
                    safari: "10",
                    edge: "17",
                  },
                },
              ],
            ],
          },
        },
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
      template: "./src/index.ejs",
      // 指定 HTML 中使用的变量
      title: "Webpack Demo",
    }),
    new HtmlWebpackPlugin({
      // 指定打包后的文件名称
      filename: "about.html",
      // 用来指定，生成 HTML 的模板
      template: "./src/index.ejs",
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
    new ESLintPlugin({
      // 自动解决常规的代码格式报错
      fix: true,
    }),
  ],
};
```

- index.js

```js
/**
 * Webpack 打包入口文件
 */
// polyfill 会转译所有的 JS 新语法
// import '@babel/polyfill'

import data from "./data.json";

// 引入样式文件
import "./css/main.css";
import "./css/main.less";

// 以模块的方式引入图片
import boy from "./image/xph.gif";
import homeIcon from "./image/icon/home-blue.png";

console.log(data);

const showMsg = () => {
  // eslint-disable-next-line
  alert("Hello");
};

// eslint-disable-next-line
window.showMsg = showMsg;

const p = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Promise is working");
    resolve();
  }, 1000);
});
console.log(p);

// eslint-disable-next-line
const img = new Image();
img.src = boy;

// eslint-disable-next-line
document.body.append(img);

// eslint-disable-next-line
const img1 = new Image();
img1.src = homeIcon;

// eslint-disable-next-line
document.body.append(img1);

// console.log('Hello Webpack')
```

- index.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <h1 onclick="showMsg()">Hello Webpack</h1>
    <p class="web-font">验证字体文件</p>
    <a href="index.html">首页</a>
    <a href="about.html">关于</a>

    <img src="<%= require('./image/icon/ok-black.png') %>" alt="" />
  </body>
</html>
```

- main.less

```less
@bg-color: #d4b;

html,
body {
  margin: 0;
  padding: 0;
}

body {
  background: url(../image/bg.jpg);
}

div {
  background: @bg-color;
}

.code {
  user-select: none;
}
```
