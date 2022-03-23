# 打包 CSS

## 1. 打包逻辑

- 非 JS 文件打包，需要对应的 loader
- css-loader 将 CSS 转化为 JS（将 CSS 输出到打包后的 JS 文件中）
- style-loader 把包含 CSS 内容的 JS 代码，挂载到页面的 `<style>` 标签当中
- 引入 CSS（import "./css/main.css"）
- 安装（npm i css-loader style-loader –D）
- 配置
- 匹配后缀名： `test: /\.css$/i`，
  - `\.`:表示转义`.点符号`，`$`:表示匹配后缀名，`/i`：表示大小写不敏感
- 指定加载器： `use: ['style-loader', 'css-loader']`
  - Loader 执行顺序：先右后左（先下后上）
    <img src="/images/nodeautomation/113.jpg" style="width: 50%; display:block; margin: 0 ;">

### Webpack 实践 3

```
03.webpackcss
├─── src
│   ├── css
│   ├   └── main.css
│   ├── data.json
│   └── index.js
└── index.html
└── webpack.config.js
└── package.json
```

```sh
cnpm i style-loader css-loader -D
```

### 待修改文件

- webpack.config.js

```js
/**
 * Webpack 的配置文件
 */
const { resolve } = require("path");

module.exports = {
  // 打包模式
  mode: "production", // "production" | "development" | "none"

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
        //use 中loader的加载顺序：先下后上
        use: [
          //将JS中的样式，挂载到<style>标签中
          "style-loader",
          //css-loader按照CommonJS规范，将样式文件输出到JS中
          "css-loader",
        ],
      },
    ],
  },

  // 开发服务器
  devServer: {},

  // 插件配置
  plugins: [],
};
```

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./output/bundle.js"></script>
  </body>
</html>
```

- index.js

```js
/**
 * Webpack 打包入口文件
 */
import data from "./data.json";
console.log(data);

//引入样式文件
import "./css/main.css";
```

- main.css

```css
html,
body {
  margin: 0;
  padding: 0;
}
body {
  background-color: #dfb;
}
```

```sh
webpack //执行打包命令
serve .  //开启调试服务
```

## 2. less 转换

1. 入口文件 index.js 引入 less

```sh
import "./css/main.less"
```

2. 安装

```sh
cnpm i less less-loader -D
```

3. 配置

- 匹配后缀名： test: /\.less\$/i,
- 指定加载器： use: ['style-loader', 'css-loader', 'less-loader']
  <img src="/images/nodeautomation/114.jpg" style="width: 50%; display:block; margin: 0 ;">

### Webpack 实践 4

```
03.webpackcss
├─── src
│   ├── css
│   ├   └── main.css
│   ├   └── main.less（新增）
│   ├── data.json
│   └── index.js(修改)
└── index.html
└── webpack.config.js(修改)
└── package.json
```

```sh
cnpm i less less-loader -D
```

### 待修改文件

- webpack.config.js

```js{43-44}
/**
 * Webpack 的配置文件
 */
const { resolve } = require("path");

module.exports = {
  // 打包模式
  mode: "production", // "production" | "development" | "none"

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
        //use 中loader的加载顺序：先下后上
        use: [
          //2. 将JS中的样式，挂载到<style>标签中
          "style-loader",
          //1. css-loader按照CommonJS规范，将样式文件输出到JS中
          "css-loader",
        ],
      },
      {
        test: /\.less$/i,
        //use 中loader的加载顺序：先下后上
        use: [
          //3. 将JS中的样式，挂载到<style>标签中
          "style-loader",
          //2. css-loader按照CommonJS规范，将样式文件输出到JS中
          "css-loader",
          //1. 将less转成普通的CSS
          "less-loader",
        ],
      },
    ],
  },

  // 开发服务器
  devServer: {},

  // 插件配置
  plugins: [],
};
```

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="./output/bundle.js"></script>
  </body>
</html>
```

- index.js

```js{9}
/**
 * Webpack 打包入口文件
 */
import data from "./data.json";
console.log(data);

//引入样式文件
import "./css/main.css";
import "./css/main.less";
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
  background: @bg-color;
}

div {
  background: @bg-color;
}

.code {
  user-select: none;
}
```

```sh
webpack //执行打包命令
serve .  //开启调试服务
```

## 3. 打包 CSS 成独立文件

### Webpack 实践 5

1. 安装插件[mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin#chunkFilename)

```sh
cnpm install mini-css-extract-plugin -D
```

2. 引入插件（webpack.config.js）

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 替换 style-loader（use: ['MiniCssExtractPlugin.loader', 'cssloader']）
```

3.  配置插件（new MiniCssExtractPlugin({})） （webpack.config.js）

- MiniCssExtractPlugin.loader：将 CSS 打包到独立文件中

::: tip 注意
代替之前 style-loader：将 CSS 打包到`<style>` 标签中
:::

```
03.webpackcss
├─── src
│   ├── css
│   ├   └── main.css
│   ├   └── main.less
│   ├── data.json
│   └── index.js
└── index.html(修改)
└── webpack.config.js(修改)
└── package.jsond
```

### 待修改文件

- webpack.config.js

```js{5,61-67}
/**
 * Webpack 的配置文件
 */
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // 打包模式
  mode: "production", // "production" | "development" | "none"

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
        //use 中loader的加载顺序：先下后上
        use: [
          // 3. 将 JS 中的样式，挂载到 <style> 标签中
          // 'style-loader',

          // 3. 将 CSS 打包到独立的文件中
          MiniCssExtractPlugin.loader,

          // 1. css-loader 按照 CommonJS 规范，将样式文件，输出到 JS 中
          "css-loader",
        ],
      },
      {
        test: /\.less$/i,
        //use 中loader的加载顺序：先下后上
        use: [
          //3. 将JS中的样式，挂载到<style>标签中
          // "style-loader",
          // 3. 将 CSS 打包到独立的文件中
          MiniCssExtractPlugin.loader,

          //2. css-loader按照CommonJS规范，将样式文件输出到JS中
          "css-loader",
          //1. 将less转成普通的CSS
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
      filename: "css/[name].css", //保持原来的CSS名字
      //filename: 'css/[index].css'//原来的名字改为index.css
    }),
  ],
};
```

- index.html

```html{8}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./output/css/main.css" />
  </head>
  <body>
    <script src="./output/bundle.js"></script>
  </body>
</html>
```

```sh
webpack //执行打包命令
serve .  //开启调试服务
```

## 4. 添加样式前缀

### Webpack 实践 6

1. 安装

```sh
cnpm install postcss-loader autoprefixer -D
```

2. 配置 webpack.config.js

```js
use: ["MiniCssExtractPlugin.loader", "css-loader", "postcss-loader"];
```

3. 新建 postcss.config.js

```js
plugins: [require("autoprefixer")];
```

4. 配置需要兼容的浏览器

- package.json 中指定 browserslist
- 详情参考：https://www.npmjs.com/package/browserslist

- 指定兼容规则:有两种指定⽅式，⼆选⼀即可：
- 详情查看：https://www.npmjs.com/package/browserslist

- 方法一：可以在 package.json 中指定（推荐）

```json
"browserslist": [
"last 1 version", // 最后的⼀个版本
"> 1%" // 代表全球超过 1% 使⽤的浏览器
]
```

- 方法二：在项⽬根⽬录下创建 `.browserslistrc`

```
# Browsers that we support
 last 1 version
 > 1%
```

```
更多查询条件
> 5%: 基于全球使⽤率统计⽽选择的浏览器版本范围。>=,<,<=同样适⽤。> 5% in US : 同上，只是使
> ⽤地区变为美国。⽀持两个字⺟的国家码来指定地区。
> 5% in alt-AS : 同上，只是使⽤地区变为亚洲所有国家。这⾥列举了所有的地区码。
> 5% in my stats : 使⽤定制的浏览器统计数据。
> cover 99.5% : 使⽤率总和为 99.5%的浏览器版本，前提是浏览器提供了使⽤覆盖率。
> cover 99.5% in US : 同上，只是限制了地域，⽀持两个字⺟的国家码。
> cover 99.5% in my stats :使⽤定制的浏览器统计数据。
> maintained node versions :所有还被 node 基⾦会维护的 node 版本。
> node 10 and node 10.4 : 最新的 node 10.x.x 或者 10.4.x 版本。
> current node :当前被 browserslist 使⽤的 node 版本。
> extends browserslist-config-mycompany :来⾃ browserslist-config-mycompany 包的查询设置
> ie 6-8 : 选择⼀个浏览器的版本范围。
> Firefox > 20 : 版本⾼于 20 的所有⽕狐浏览器版本。>=,<,<=同样适⽤。
> ios 7 :ios 7 ⾃带的浏览器。
> Firefox ESR :最新的⽕狐 ESR（⻓期⽀持版） 版本的浏览器。
> unreleased versions or unreleased Chrome versions : alpha 和 beta 版本。
> last 2 major versions or last 2 ios major versions :最近的两个发⾏版，包括所有的次版本号和补
> 丁版本号变更的浏览器版本。
> since 2015 or last 2 years :⾃某个时间以来更新的版本（也可以写的更具体 since 2015-03 或者
> since 2015-03-10）
> dead :通过 last 2 versions 筛选的浏览器版本中，全球使⽤率低于 0.5%并且官⽅声明不在维护或者事
> 实上已经两年没有再更新的版本。⽬前符合条件的有 IE10,IE_Mob 10,BlackBerry 10,BlackBerry
> 7,OperaMobile 12.1。
> last 2 versions :每个浏览器最近的两个版本。
> last 2 Chrome versions :chrome 浏览器最近的两个版本。
> defaults :默认配置> 0.5%, last 2 versions, Firefox ESR, not dead。
> not ie <= 8 : 浏览器范围的取反。
> 可以添加 not 在任和查询条件前⾯，表示取反
```

```
03.webpackcss
├─── src
│   ├── css
│   ├   └── main.css
│   ├   └── main.less
│   ├── data.json
│   └── index.js
└── index.html(修改)
└── webpack.config.js(修改)
└── postcss.config.js(新增)
└── package.jsond
```

### 待修改文件

- postcss.config.js

```js
module.exports = {
  plugins: [require("autoprefixer")],
};
```

- package.json

```json
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
    "autoprefixer": "^10.4.4",
    "css-loader": "^6.7.1",
    "less": "^4.1.2",
    "less-loader": "^10.2.0",
    "mini-css-extract-plugin": "^2.6.0",
    "postcss-loader": "^6.2.1",
    "style-loader": "^3.3.1",
    "webpack": "^5.70.0",
    "webpack-cli": "^4.9.2"
  },
  "browserslist": ["last 1 version", "> 1%"]
}
```

- webpack.config.js

```js{39-40,56-57}
/**
 * Webpack 的配置文件
 */
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // 打包模式
  mode: "production", // "production" | "development" | "none"

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
        //use 中loader的加载顺序：先下后上
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
        //use 中loader的加载顺序：先下后上
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
      filename: "css/[name].css", //保持原来的CSS名字
      //filename: 'css/[index].css'//原来的名字改为index.css
    }),
  ],
};
```

- main.less

```less{17-19}
@bg-color: #d4b;

html,
body {
  margin: 0;
  padding: 0;
}

body {
  background: @bg-color;
}

div {
  background: @bg-color;
}

.code {
  user-select: none;
}
```

```sh
webpack //执行打包命令
serve .  //开启调试服务
```

## 5. 格式校验

### Webpack 实践 7

1. 安装

```sh
cnpm i stylelint stylelint-config-standard stylelint-webpack-plugin -D
```

- stylelint 校验样式⽂件的命令
- stylelint-config-standard 校验样式⽂件的规则
- stylelint-webpack-plugin 在 Webpack 中使⽤ stylelint 的插件
  配置详情：https://www.npmjs.com/package/stylelint-webpack-plugin

1. 指定规则配置有三种⽅式，按照加载的先后顺序，依次是：

- 在 package.json 中的 stylelint 属性指定规则
- 在 .stylelintrc 中指定规则
- 在 stylelint.config.js 中指定规则

2. 引入(webpack.config.js)

```js
const StylelintPlugin = require("stylelint-webpack-plugin");
```

3. 配置(webpack.config.js)

```
new StylelintPlugin({})
```

4. 指定校验规则（在 package.json 中指定 stylelint ）

```json
"stylelint": {"extends": "stylelint-config-standard"}
```

- stylelint
  - https://stylelint.io/
- 校验规则（number-leading-zero）
  - line-height: .5; 错误
  - line-height: 0.5; 正确
- stylelint-config-standard
  - https://github.com/stylelint/stylelint-config-standard
- stylelint-webpack-plugin
  - https://webpack.docschina.org/plugins/stylelint-webpack-plugin

### 待修改文件

- webpack.config.js

```js{6,70-80}
/**
 * Webpack 的配置文件
 */
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  // 打包模式
  mode: "production", // "production" | "development" | "none"

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
        //use 中loader的加载顺序：先下后上
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
        //use 中loader的加载顺序：先下后上
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
      filename: "css/[name].css", //保持原来的CSS名字
      //filename: 'css/[index].css'//原来的名字改为index.css
    }),
    new StylelintPlugin({
      // 指定需要进行格式校验的文件
      files: ["src/css/*.{css,less,sass,scss}"],
    }),
  ],
};
```

- package.json
  使⽤ stylelint-config-standard 规则来检测代码

```json{26-32}
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
    "autoprefixer": "^10.4.4",
    "css-loader": "^6.7.1",
    "less": "^4.1.2",
    "less-loader": "^10.2.0",
    "mini-css-extract-plugin": "^2.6.0",
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
      "number-leading-zero": "never"
    }
  }
}
```

## 6. 压缩

### webpack 实践 8

1. 安装

```sh
cnpm install optimize-css-assets-webpack-plugin -D
```

1. 引入(webpack.config.js)

```js
OptimizeCssAssetsPlugin = require("optimize-css-assets-webpackplugin");
```

3. 配置(webpack.config.js)

```js
new OptimizeCssAssetsPlugin();
```

### 待修改文件

- webpack.config.js

```js{7,81-83}
/**
 * Webpack 的配置文件
 */
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
  ],
};
```

- package.json

```json{28-39}
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
    "autoprefixer": "^10.4.4",
    "css-loader": "^6.7.1",
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
  }
}
```
