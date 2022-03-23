# 模块联邦（Module Federation）

<img src="/images/nodeautomation/161.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/162.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- webpack5提供了一种微前端概念，客户端可以远程调用远程服务器中的组件（轮播图、按钮等）
- 模块联邦： https://webpack.js.org/concepts/modulefederation/

## 待修改文件

```
16.webpackfederation
├─── app1（模块提供方）
│     ├──src
│     │    └──index.html
│     │    └──index.js
│     │    └──Sitename.js
│     └── webpack.config.js
│     └── package.json
├─── app2 （模块调用方）
│     ├──src
│     │    └──index.html
│     │    └──index.js
│     └── webpack.config.js
│     └── package.json
```

## app1

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>App1</title>
  </head>
  <body>
    <h1>App1</h1>
  </body>
</html>
```

### webpack.config.js

```js{6-7,42-54}
/**
 * Webpack 的配置文件
 */
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 引入模块联邦插件
const Mfp = require("webpack").container.ModuleFederationPlugin;

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
    ],
  },

  // 开发服务器
  devServer: {
    contentBase: resolve(__dirname, "output"),
    port: 3001,
  },

  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // 模块提供方
    new Mfp({
      // 应用名称（供调用方使用）
      name: "app1",
      // 调用方引入的文件名称
      filename: "app1.js",
      // 暴露模块
      exposes: {
        // 模块名称： 模块对应的代码路径
        "./Sitename": "./src/Sitename.js",
      },
    }),
  ],
};
```

### Sitename.js

```js
// 声明站点名称
export default (name) => {
  console.log("来自 App1 的共用模块");

  const ele = document.createElement("h3");
  ele.textContent = name;

  return ele;
};
```

### index.js

```js
import sitename from "./Sitename";

const title = sitename("应用 A");
document.body.append(title);
```

### package.json

```json
{
  "name": "app1",
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
    "html-webpack-plugin": "^5.3.1",
    "webpack": "^5.38.1",
    "webpack-cli": "^4.7.0",
    "webpack-dev-server": "^3.11.2"
  }
}
```

## app2

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>App2</title>
  </head>
  <body>
    <h1>App2</h1>
  </body>
</html>
```

### webpack.config.js

```js{6-7,42-54}
/**
 * Webpack 的配置文件
 */
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 引入模块联邦插件
const Mfp = require("webpack").container.ModuleFederationPlugin;

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
    ],
  },

  // 开发服务器
  devServer: {
    contentBase: resolve(__dirname, "output"),
    port: 3002,
  },

  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new Mfp({
      // 导入模块
      remotes: {
        // 导入别名：“远程应用名称@远程应用地址/远程导出文件的名称”
        appone: "app1@http://localhost:3001/app1.js",
      },
    }),
  ],
};
```

### index.js

```js
// 调用 app1 中的模块
import("appone/Sitename").then((res) => {
  // res.default()
  const title = res.default("应用 B");
  document.body.append(title);
});
```

### package.json

```json
{
  "name": "app2",
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
    "html-webpack-plugin": "^5.3.1",
    "webpack": "^5.38.1",
    "webpack-cli": "^4.7.0",
    "webpack-dev-server": "^3.11.2"
  }
}
```

<img src="/images/nodeautomation/163.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
