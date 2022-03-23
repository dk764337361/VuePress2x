# Tree Shaking（摇树）

## usedExports

### 作用：

- Tree Shaking 的作用是删除未引用代码（dead code）
- return 后面的代码
- 只声明，而未使用的函数
- 只引入，未使用的代码
  <img src="/images/nodeautomation/150.jpg" style="width: 100%; display:block; margin: 0 ;">

### 前提：

- 使用 ES Modules 规范的模块，才能执行 Tree Shaking
- Tree Shaking 依赖于 ES Modules 的静态语法分析

### 如何使用

- 生产模式：Tree shaking 会自动开启
- 开发模式：
  - usedExports
  - sideEffects

### optimization.usedExports（标记没用的代码）

- `/* unused harmony export xxxxx */`

### 插件 terser-webpack-plugin（删除没用的代码）

- optimization.minimize: true（删除 unused harmony export xxxxx 标记的代码 ）
- Webpack 4 需要单独安装（Webpack 5 无需安装）

```sh
cnpm i -D terser-webpack-plugin
```

- https://www.npmjs.com/package/terser-webpack-plugin

### Tree Shaking 与 Source Map 存在兼容性问题

- devtool: source-map | inline-source-map | hidden-source-map | nosourcessource-map
- eval 模式，将 JS 输出为字符串（不是 ES Modules 规范），导致 Tree Shaking 不兼容

### 待修改文件

```
12.webpacktreeshaking
├─── src
│   ├── css
│   ├   └── main.css
│   ├   └── main.less
│   ├── public
│   ├   └── favicon.ico
│   ├── image
│   ├   └── icon
│   │   │    └── xxxx.png
│   │   │    └── xxxx.png....
│   ├   └── bg.jpg
│   ├   └── xph.gif
│   ├── fonts
│   ├   └── ....
│   ├   └── ...
│   ├── plugin
│   ├   └── MyPlugin.js
│   ├── loader
│   ├   └── markdown-loader.js
│   ├── about.md
│   ├── data.json
│   └── wp.js
│   └── math.js(新增)
│   └── index.js(修改)
│   └── about.js
│   └── index.ejs
└── webpack.config.js(修改)
└── postcss.config.js
└── package.json
```

### 举例文件：math.js

```js
//举例1：return 后面的 console.log用不上，会被标记删掉
export function add(x, y) {
  return x + y;

  console.log("加法运算");
}
//举例2：函数minus用不上，会被标记删掉

export function minus(x, y) {
  return x - y;

  console.log("减法运算");
}
```

### index.js

```js{19-21}
/**
 * Webpack 打包入口文件
 */
// polyfill 会转译所有的 JS 新语法
// import '@babel/polyfill'
import $ from "jquery";
import data from "./data.json";

// 引入样式文件
import "./css/main.css";
import "./css/main.less";

import about from "./about.md";

// 以模块的方式引入图片
import boy from "./image/xph.gif";
import homeIcon from "./image/icon/home-blue.png";

import { add } from "./math";
// eslint-disable-next-line
console.log("2 + 4 = ", add(2, 4));

// eslint-disable-next-line
// 故意写错函数名，用来验证 Source Map
// console.log11(data, '123');
console.log(data, "123");

const showMsg = () => {
  // eslint-disable-next-line
  alert("Hello");
};

// eslint-disable-next-line
window.showMsg = showMsg;

const p = new Promise((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log("Promise is working");
    resolve();
  }, 1000);
});
// eslint-disable-next-line
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

// eslint-disable-next-line
console.log("接口地址：", API_BASE_URL);

// eslint-disable-next-line
console.log(about);

// 给 body 添加一个页脚(包含备案号)
$("body").append("<h3>备案号：XXXXXXX</h3>");

// // 验证按需加载
document.getElementById("btn").onclick = function() {
  // import 启动懒加载
  // webpackChunkName: 'desc' 指定懒加载的文件名称
  // webpackPrefetch: true 启动预加载
  import(/* webpackChunkName: 'desc', webpackPrefetch: true */ "./wp").then(
    ({ desc }) => {
      alert(desc());
    }
  );
};
```

### webpack.config.js

```js{13,42-52}
/**
 * Webpack 的配置文件
 */
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

// 引入自定义插件
const MyPlugin = require("./plugin/MyPlugin");

module.exports = (env, argv) => {
  const config = {
    // 打包模式
    mode: "development",

    // 入口文件
    // entry: './src/index.js',
    // 多入口打包
    entry: {
      index: "./src/index.js",
      about: "./src/about.js",
    },

    // 出口配置
    output: {
      // 输出目录（输出目录必须是绝对路径）
      path: resolve(__dirname, "output"),
      // 输出文件名称
      filename: "[name].bundle.js",
    },

    // Tree Shaking 仅支持 source-map | inline-source-map | hidden-source-map | nosources-source-map
    devtool: "source-map",

    // 优化策略
    optimization: {
      // 标记未被使用的代码
      usedExports: true,
      // 删除 usedExports 标记的未使用的代码
      minimize: true,
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: "all",
      },
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
          // use: {
          //   loader: "url-loader",
          //   options: {
          //     // 指定图片大小，小于该数值的图片，会被转成 base64
          //     limit: 8 * 1024, // 8 kb
          //     // [name] 是图片原来的名称
          //     // [ext] 是图片原来的后缀名
          //     name: "image/[name].[ext]",
          //     // url-loader 默认采用 ES Modules 规范进行解析，但是 html-loader 引入图片使用的是 CommonJS 规范
          //     // 解决：关闭 url-loader 默认的 ES Modules 规范，强制 url-loader 使用 CommonJS 规范进行打包
          //     esModule: false
          //   }
          // }

          // 使用资源模块
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
          generator: {
            filename: "image/[name][ext]",
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
          test: /\.md$/i,
          // use: './loader/markdown-loader'
          use: [
            "html-loader",
            // './loader/markdown-loader'
            {
              loader: "./loader/markdown-loader",
              options: {
                size: 20,
              },
            },
          ],
        },

        // 匹配字体文件
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/i,
          // use: {
          //   loader: 'file-loader',
          //   options: {
          //     name: 'fonts/[name].[ext]'
          //   }
          // }

          // 使用资源模块处理字体文件
          // asset 可以在 asset/resource 和 asset/inline 之间进行选择
          // 如果文件小于 8kb，则使用 asset/inline 类型
          // 如果文件大于 8kb，则使用 asset/resource 类型
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
          generator: {
            filename: "fonts/[name][ext]",
          },
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
                    modules: false,
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
    devServer: {
      // 指定加载内容的路径
      contentBase: resolve(__dirname, "output"),

      // 启用 gzip 压缩
      compress: true,

      // 端口号
      port: 9200,

      // 启动自动更新（禁用 hot）
      liveReload: true,

      // 配置代理：解决接口跨域问题
      proxy: {
        // http://localhost:9200/api
        "/api": {
          // http://localhost:9200/api/users => https://api.github.com/api/users
          target: "https://api.github.com",
          // http://localhost:9200/api/users => https://api.github.com/users
          pathRewrite: {
            "^/api": "",
          },
          // 不能使用 localhost:9200 作为 github 的主机名
          changeOrigin: true,
        },
      },
    },

    // 配置目标
    target: "web",

    // 插件配置
    plugins: [
      new webpack.DefinePlugin({
        // 开发环境下的接口地址
        // 变量后面的值，是一段代码片段
        API_BASE_URL: JSON.stringify("http://apidev.example.com"),
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      }),
      new StylelintPlugin({
        // 指定需要进行格式校验的文件
        files: ["src/css/*.{css,less,sass,scss}"],
      }),

      // Html 的配置
      new HtmlWebpackPlugin({
        // 指定打包后的文件名称
        filename: "index.html",

        // 用来指定，生成 HTML 的模板
        template: "./src/index.ejs",
        // 指定 HTML 中使用的变量
        title: "Webpack Demo",
        // 指定要加载的打包文件
        chunks: ["index"],
      }),
      new HtmlWebpackPlugin({
        // 指定打包后的文件名称
        filename: "about.html",
        // 用来指定，生成 HTML 的模板
        template: "./src/index.ejs",
        // 指定 HTML 中使用的变量
        title: "关于我们",
        chunks: ["about"],
      }),
      // new ESLintPlugin({
      //   // 自动解决常规的代码格式报错
      //   fix: true
      // }),
      // 直接将 src 下，不需要特殊处理的文件，直接复制到输出目录中
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/public",
            to: "public",
          },
        ],
      }),

      // 打包之前，先删除历史文件
      new CleanWebpackPlugin(),

      // 引入自定义插件
      new MyPlugin({
        target: ".css",
      }),
    ],
  };

  // 判断当前是否是生产环境打包
  if (env.production) {
    config.mode = "production";
    // 启用 Source Map 定位问题
    config.devtool = "nosources-source-map";
    config.plugins = [
      new webpack.DefinePlugin({
        // 开发环境下的接口地址
        // 变量后面的值，是一段代码片段
        API_BASE_URL: JSON.stringify("http://apiprod.example.com"),
      }),
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
        chunks: ["index"],
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
      new HtmlWebpackPlugin({
        // 指定打包后的文件名称
        filename: "about.html",
        // 用来指定，生成 HTML 的模板
        template: "./src/index.ejs",
        // 指定 HTML 中使用的变量
        title: "关于我们",
        chunks: ["about"],
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
      // new ESLintPlugin({
      //   // 自动解决常规的代码格式报错
      //   fix: true
      // }),
      // 直接将 src 下，不需要特殊处理的文件，直接复制到输出目录中
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/public",
            to: "public",
          },
        ],
      }),

      // 打包之前，先删除历史文件
      new CleanWebpackPlugin(),
    ];
  }

  return config;
};
```

### 打包命令

```sh
webpack --env production
```

## sideEffects

- 副作用
  - 无副作用：如果一个模块单纯的导入导出变量，那它就无副作用
  - 有副作用：如果一个模块还修改其他模块或者全局的一些东西，就有副作用
    - 修改全局变量
    - 在原型上扩展方法
    - CSS 的引入
- sideEffects 的作用：把未使用但无副作用的模块一并删除
  - 对于没有副作用的模块，未使用代码不会被打包（相当于压缩了输出内容）

<img src="/images/nodeautomation/152.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 开启副作用（webpack.config.js）
  - optimization.sideEffects: true
- 标识代码是否有副作用（package.json）
  - ''sideEffects''
    - false：所有代码都没有副作用（告诉 webpack 可以安全地删除未用的 exports）
    - true：所有代码都有副作用
    - 数组：（告诉 webpack 哪些模块有副作用，不删除）
      - ['./src/wp.js', '*.css']

### 待修改文件

```
12.webpacktreeshaking
├─── src
│   ├── css
│   ├   └── main.css
│   ├   └── main.less
│   ├── public
│   ├   └── favicon.ico
│   ├── image
│   ├   └── icon
│   │   │    └── xxxx.png
│   │   │    └── xxxx.png....
│   ├   └── bg.jpg
│   ├   └── xph.gif
│   ├── fonts
│   ├   └── ....
│   ├   └── ...
│   ├── plugin
│   ├   └── MyPlugin.js
│   ├── loader
│   ├   └── markdown-loader.js
│   ├── about.md
│   ├── data.json
│   └── wp.js
│   └── math.js(新增)
│   └── extend.js
│   └── index.js(修改)
│   └── about.js
│   └── index.ejs
└── webpack.config.js(修改)
└── postcss.config.js
└── package.json
```

### 举例文件：extend.js

```js
// 为 Number 的原型添加一个扩展方法
Number.prototype.pad = function(size) {
  let res = this + "";
  while (res.length < size) {
    res = "0" + res;
  }
  return res;
};
```

### package.json

```json{57}
{
  "name": "12.webpacktreeshaking",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build:dev": "webpack --config config/webpack.dev.conf.js",
    "build:prod": "webpack --config config/webpack.prod.conf.js",
    "dev": "webpack serve --config config/webpack.dev.conf.js",
    "start": "webpack serve --config config/webpack.prod.conf.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.14.3",
    "@babel/polyfill": "^7.12.1",
    "@babel/preset-env": "^7.14.2",
    "autoprefixer": "^10.2.5",
    "babel-loader": "^8.2.2",
    "clean-webpack-plugin": "^4.0.0-alpha.0",
    "copy-webpack-plugin": "^9.0.0",
    "core-js": "^3.12.1",
    "css-loader": "^5.2.4",
    "eslint": "^7.27.0",
    "eslint-config-airbnb-base": "^14.2.1",
    "eslint-plugin-import": "^2.23.3",
    "eslint-webpack-plugin": "^2.5.4",
    "file-loader": "^6.2.0",
    "html-loader": "^2.1.2",
    "html-webpack-plugin": "^5.3.1",
    "less": "^4.1.1",
    "less-loader": "^9.0.0",
    "loader-utils": "^2.0.0",
    "marked": "^2.0.5",
    "mini-css-extract-plugin": "^1.6.0",
    "optimize-css-assets-webpack-plugin": "^6.0.0",
    "postcss-loader": "^5.3.0",
    "style-loader": "^2.0.0",
    "stylelint": "^13.13.1",
    "stylelint-config-standard": "^22.0.0",
    "stylelint-webpack-plugin": "^2.1.1",
    "url-loader": "^4.1.1",
    "webpack": "^5.37.1",
    "webpack-cli": "^4.7.0",
    "webpack-dev-server": "^3.11.2",
    "webpack-merge": "^5.7.3"
  },
  "browserslist": ["last 1 version", "> 1%"],
  "stylelint": {
    "extends": "stylelint-config-standard",
    "rules": {
      "number-leading-zero": "never"
    }
  },
  "sideEffects": ["./src/extend.js", "./src/**"],
  "eslintConfig": {
    "extends": "airbnb-base"
  },
  "dependencies": {
    "jquery": "^3.6.0"
  }
}
```

### webpack.config.js

```js{13,42-53}
/**
 * Webpack 的配置文件
 */
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

// 引入自定义插件
const MyPlugin = require("./plugin/MyPlugin");

module.exports = (env, argv) => {
  const config = {
    // 打包模式
    mode: "development",

    // 入口文件
    // entry: './src/index.js',
    // 多入口打包
    entry: {
      index: "./src/index.js",
      about: "./src/about.js",
    },

    // 出口配置
    output: {
      // 输出目录（输出目录必须是绝对路径）
      path: resolve(__dirname, "output"),
      // 输出文件名称
      filename: "[name].bundle.js",
    },

    // Tree Shaking 仅支持 source-map | inline-source-map | hidden-source-map | nosources-source-map
    devtool: "source-map",

    // 优化策略
    optimization: {
      sideEffects: true,
      // 标记未被使用的代码
      usedExports: true,
      // 删除 usedExports 标记的未使用的代码
      // minimize: true,
      // minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: "all",
      },
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
          // use: {
          //   loader: "url-loader",
          //   options: {
          //     // 指定图片大小，小于该数值的图片，会被转成 base64
          //     limit: 8 * 1024, // 8 kb
          //     // [name] 是图片原来的名称
          //     // [ext] 是图片原来的后缀名
          //     name: "image/[name].[ext]",
          //     // url-loader 默认采用 ES Modules 规范进行解析，但是 html-loader 引入图片使用的是 CommonJS 规范
          //     // 解决：关闭 url-loader 默认的 ES Modules 规范，强制 url-loader 使用 CommonJS 规范进行打包
          //     esModule: false
          //   }
          // }

          // 使用资源模块
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
          generator: {
            filename: "image/[name][ext]",
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
          test: /\.md$/i,
          // use: './loader/markdown-loader'
          use: [
            "html-loader",
            // './loader/markdown-loader'
            {
              loader: "./loader/markdown-loader",
              options: {
                size: 20,
              },
            },
          ],
        },

        // 匹配字体文件
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/i,
          // use: {
          //   loader: 'file-loader',
          //   options: {
          //     name: 'fonts/[name].[ext]'
          //   }
          // }

          // 使用资源模块处理字体文件
          // asset 可以在 asset/resource 和 asset/inline 之间进行选择
          // 如果文件小于 8kb，则使用 asset/inline 类型
          // 如果文件大于 8kb，则使用 asset/resource 类型
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
          generator: {
            filename: "fonts/[name][ext]",
          },
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
                    modules: false,
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
    devServer: {
      // 指定加载内容的路径
      contentBase: resolve(__dirname, "output"),

      // 启用 gzip 压缩
      compress: true,

      // 端口号
      port: 9200,

      // 启动自动更新（禁用 hot）
      liveReload: true,

      // 配置代理：解决接口跨域问题
      proxy: {
        // http://localhost:9200/api
        "/api": {
          // http://localhost:9200/api/users => https://api.github.com/api/users
          target: "https://api.github.com",
          // http://localhost:9200/api/users => https://api.github.com/users
          pathRewrite: {
            "^/api": "",
          },
          // 不能使用 localhost:9200 作为 github 的主机名
          changeOrigin: true,
        },
      },
    },

    // 配置目标
    target: "web",

    // 插件配置
    plugins: [
      new webpack.DefinePlugin({
        // 开发环境下的接口地址
        // 变量后面的值，是一段代码片段
        API_BASE_URL: JSON.stringify("http://apidev.example.com"),
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      }),
      new StylelintPlugin({
        // 指定需要进行格式校验的文件
        files: ["src/css/*.{css,less,sass,scss}"],
      }),

      // Html 的配置
      new HtmlWebpackPlugin({
        // 指定打包后的文件名称
        filename: "index.html",

        // 用来指定，生成 HTML 的模板
        template: "./src/index.ejs",
        // 指定 HTML 中使用的变量
        title: "Webpack Demo",
        // 指定要加载的打包文件
        chunks: ["index"],
      }),
      new HtmlWebpackPlugin({
        // 指定打包后的文件名称
        filename: "about.html",
        // 用来指定，生成 HTML 的模板
        template: "./src/index.ejs",
        // 指定 HTML 中使用的变量
        title: "关于我们",
        chunks: ["about"],
      }),
      // new ESLintPlugin({
      //   // 自动解决常规的代码格式报错
      //   fix: true
      // }),
      // 直接将 src 下，不需要特殊处理的文件，直接复制到输出目录中
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/public",
            to: "public",
          },
        ],
      }),

      // 打包之前，先删除历史文件
      new CleanWebpackPlugin(),

      // 引入自定义插件
      new MyPlugin({
        target: ".css",
      }),
    ],
  };

  // 判断当前是否是生产环境打包
  if (env.production) {
    config.mode = "production";
    // 启用 Source Map 定位问题
    config.devtool = "nosources-source-map";
    config.plugins = [
      new webpack.DefinePlugin({
        // 开发环境下的接口地址
        // 变量后面的值，是一段代码片段
        API_BASE_URL: JSON.stringify("http://apiprod.example.com"),
      }),
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
        chunks: ["index"],
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
      new HtmlWebpackPlugin({
        // 指定打包后的文件名称
        filename: "about.html",
        // 用来指定，生成 HTML 的模板
        template: "./src/index.ejs",
        // 指定 HTML 中使用的变量
        title: "关于我们",
        chunks: ["about"],
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
      // new ESLintPlugin({
      //   // 自动解决常规的代码格式报错
      //   fix: true
      // }),
      // 直接将 src 下，不需要特殊处理的文件，直接复制到输出目录中
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/public",
            to: "public",
          },
        ],
      }),

      // 打包之前，先删除历史文件
      new CleanWebpackPlugin(),
    ];
  }

  return config;
};
```

### index.js

```js{19-24}
/**
 * Webpack 打包入口文件
 */
// polyfill 会转译所有的 JS 新语法
// import '@babel/polyfill'
import $ from "jquery";
import data from "./data.json";

// 引入样式文件
import "./css/main.css";
import "./css/main.less";

import about from "./about.md";

// 以模块的方式引入图片
import boy from "./image/xph.gif";
import homeIcon from "./image/icon/home-blue.png";

import { add } from "./math";
import "./extend";
console.log((7).pad(3));

// eslint-disable-next-line
console.log("2 + 4 = ", add(2, 4));

// eslint-disable-next-line
// 故意写错函数名，用来验证 Source Map
// console.log11(data, '123');
console.log(data, "123");

const showMsg = () => {
  // eslint-disable-next-line
  alert("Hello");
};

// eslint-disable-next-line
window.showMsg = showMsg;

const p = new Promise((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log("Promise is working");
    resolve();
  }, 1000);
});
// eslint-disable-next-line
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

// eslint-disable-next-line
console.log("接口地址：", API_BASE_URL);

// eslint-disable-next-line
console.log(about);

// 给 body 添加一个页脚(包含备案号)
$("body").append("<h3>备案号：XXXXXXX</h3>");

// // 验证按需加载
document.getElementById("btn").onclick = function() {
  // import 启动懒加载
  // webpackChunkName: 'desc' 指定懒加载的文件名称
  // webpackPrefetch: true 启动预加载
  import(/* webpackChunkName: 'desc', webpackPrefetch: true */ "./wp").then(
    ({ desc }) => {
      alert(desc());
    }
  );
};
```
