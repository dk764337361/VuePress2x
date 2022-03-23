# 打包 JS

## 1. 转译

### Webpack 实践 10

- 目的
  - 将 ES 6+ 转成 ES 5，从而保证，JS 在低版本浏览器的兼容性
- 安装

```sh
cnpm install babel-loader @babel/core @babel/preset-env -D
```

- 配置
  - https://www.npmjs.com/package/babel-loader

### 插件简介

- @babel/core
  <img src="/images/nodeautomation/98.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
- babel-preset-env（所有最新转换规则）
  <img src="/images/nodeautomation/115.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 解决 babel 转换新语法不彻底的问题

::: warning 注意
@babel/preset-env 只能转译基本语法（promise 就不能转换）
:::

- @babel/polyfill（转译所有 JS 新语法）

```sh
cnpm i @babel/polyfill -D
```

- 入口文件(index.js)中引入

```js
import "@babel/polyfill";
```

- core-js（按需转译 JS 新语法）

```sh
cnpm i core-js -D
```

- core-js 配置：(webpack.config.js 的 rules)
  - 按需加载 useBuiltIns: 'usage'
  - 指定版本 corejs: 3

### 待修改文件

```
05.webpackjs
├─── src
│   ├── css
│   ├   └── main.css
│   ├   └── main.less
│   ├── data.json
│   └── index.js(修改)
│   └── index.html(html模板)
└── webpack.config.js(修改)
└── postcss.config.js
└── package.jsond
```

- index.js

```js
/**
 * Webpack 打包入口文件
 */
// polyfill 会转译所有的 JS 新语法
// import "@babel/polyfill";

import data from "./data.json";

// 引入样式文件
import "./css/main.css";
import "./css/main.less";

console.log(data);

const showMsg = () => {
  alert("Hello");
};

window.showMsg = showMsg;

const p = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Promise is working");
    resolve();
  }, 1000);
});
console.log(p);

// console.log('Hello Webpack')
```

- webpack.config.js

```js{72-89}
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
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // presets: [["@babel/preset-env", { targets: "defaults" }]],
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

## 2. 格式校验

### Webpack 实践 11

- 安装

```sh
cnpm i eslint eslint-config-airbnb-base eslint-webpack-plugin eslint-plugin-import -D
```

### 插件简介

- eslint （校验 JS 代码格式的工具）
  - https://eslint.org/
- eslint-config-airbnb-base （最流行的 JS 代码格式规范）
  - https://www.npmjs.com/package/eslint-config-airbnb-base
  - https://github.com/airbnb/javascript
- eslint-webpack-plugin（Webpack 的 eslint 插件）
  - https://www.npmjs.com/package/eslint-webpack-plugin
- eslint-plugin-import
  - 用于在 package.json 中读取 eslintConfig 配置项

### 插件配置

- eslint-webpack-plugin(webpack.config.js)

```js
const ESLintPlugin = require('eslint-webpack-plugin’);
plugins: [new ESLintPlugin(options)],
```

- eslintConfig（package.json）

```json
"eslintConfig": { "extends": "airbnb-base" }
```

### 待修改文件

```
05.webpackjs
├─── src
│   ├── css
│   ├   └── main.css
│   ├   └── main.less
│   ├── data.json
│   └── index.js(修改)
│   └── index.html(html模板)
└── webpack.config.js(修改)
└── postcss.config.js
└── package.jsond(修改)
```

- webpack.config.js

```js{143-148}
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
    new ESLintPlugin({
      // 自动解决常规的代码格式报错
      fix: true,
    }),
  ],
};
```

- package.json

```json{50-53}
{
  "name": "webpack-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.17.7",
    "@babel/polyfill": "^7.12.1",
    "@babel/preset-env": "^7.16.11",
    "autoprefixer": "^10.4.4",
    "babel-loader": "^8.2.3",
    "core-js": "^3.21.1",
    "css-loader": "^6.7.1",
    "eslint": "^8.11.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.25.4",
    "eslint-webpack-plugin": "^3.1.1",
    "html-webpack-plugin": "^5.5.0",
    "less": "^4.1.2",
    "less-loader": "^10.2.0",
    "mini-css-extract-plugin": "^2.6.0",
    "optimize-css-assets-webpack-plugin": "^6.0.1",
    "postcss-loader": "^6.2.1",
    "style-loader": "^3.3.1",
    "stylelint": "^14.6.0",
    "stylelint-config-standard": "^25.0.0",
    "stylelint-webpack-plugin": "^3.1.1",
    "webpack": "^5.70.0",
    "webpack-cli": "^4.9.2"
  },
  "browserslist": ["last 1 version", "> 1%"],
  "stylelint": {
    "extends": "stylelint-config-standard",
    "rules": {
      "at-rule-no-unknown": [
        null,
        {
          "ignoreAtRules": ["extends", "ignores"]
        }
      ],
      "number-leading-zero": "never"
    }
  },
  "eslintConfig": {
    "extends": "airbnb-base"
  }
}
```

- index.js

```js{16,20}
/**
 * Webpack 打包入口文件
 */
// polyfill 会转译所有的 JS 新语法
// import '@babel/polyfill'

import data from "./data.json";

// 引入样式文件
import "./css/main.css";
import "./css/main.less";

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

// console.log('Hello Webpack')
```

<img src="/images/nodeautomation/116.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
