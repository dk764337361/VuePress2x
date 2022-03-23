# 代码分离

::: tip 为什么需要代码分离

- 如果把所有代码都打包到一起，可能最终的代码非常大。从而影响加载时间
- 而且，很多代码是初始加载时，不需要的。因此，我们可以根据代码使用的紧急程度，将代码分割打包后，按需加载
  :::

## 步骤一：多入口打包

配置 entry 加载多个入口文件

- entry（后面写成对象）
  - { index: './src/index.js', about: './src/about.js' }
- output.filename（不能写成固定名称，否则报错）
  - 写法：`[name].bundle.js`
  - 举例：index.bundle.js、about.bundle.js、
- HtmlWebpackPlugin（不同页面加载各自的 bundle）
  - chunks:`['index']` //index.html 加载 index.bundle.js
  - chunks: `['about']` //about.html 加载 about.bundle.js

### 待修改文件

```
10.webpackcodesplitting
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
│   ├── about.md(新增)
│   ├── data.json
│   └── index.js
│   └── about.js(新增)
│   └── index.ejs
└── webpack.config.js(修改)
└── postcss.config.js
└── package.json
```

### webpack.config.js

```js{24-28,30-36,254-278}
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

### about.js

```js
console.log("about");
```

## 步骤二：提取公共模块

- 如果多个页面都用到了一个公共文件（例如：jQuery），每个页面都将公共文件打包一次是不合理的。更好的办法是将公共文件
- 例如：京东的商品页超过 1000000 个，如果打包的 1000000 个文件都包含 jQuery，打包文件会超过 80 G（88KB \* 1000000）
  - optimization.splitChunks.chunks: 'all'
  - 将公共文件提取出来，单独打包提取出来。
    <img src="/images/nodeautomation/130.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
    <img src="/images/nodeautomation/131.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```sh
cnpm i jquery -S
```

### 待修改文件

```
10.webpackcodesplitting
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
│   └── index.js(修改)
│   └── about.js(修改)
│   └── index.ejs
└── webpack.config.js(修改)
└── postcss.config.js
└── package.json
```

### webpack.config.js

```js{38-43}
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

    // 优化策略
    optimization: {
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

```js{6}
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

// eslint-disable-next-line
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
```

### about.js

```js
import $ from "jquery";

console.log("about");

$("body").append("<h3>备案号：XXXXXXX</h3>");
```

## 步骤三：动态导入

动态导入：按需加载 | 预加载

- 懒加载
  - 默认不加载，事件触发后才加载
  - webpackChunkName: '加载名称'
- 预加载
  - 先等待其他资源加载，浏览器空闲时，再加载
  - webpackPrefetch: true
  - 缺点：在移动端有兼容性问题

### 待修改文件

```
10.webpackcodesplitting
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
│   └── wp.js(新增)
│   └── index.js(修改)
│   └── about.js
│   └── index.ejs
└── webpack.config.js
└── postcss.config.js
└── package.json
```

### 修改 index.ejs

```js{13}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= htmlWebpackPlugin.options.title %></title>
  <link rel="shortcut icon" href="./public/favicon.ico" type="image/x-icon">
</head>
<body>

  <h1 onclick="showMsg()">Hello Webpack123321</h1>
  <button id="btn">什么是 Webpack?</button>
  <p class="web-font">验证字体文件</p>
  <a href="index.html">首页</a>
  <a href="about.html">关于</a>

  <img src="<%= require('./image/icon/ok-black.png') %>" alt="">

</body>
</html>
```

### 新建 wp.js

```js
// 判断模块是否加载
console.log("模块加载了");

export function desc() {
  return "Webpack 是一款前端打包工具";
}
```

### 修改index.js

```js{71-78}
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

// eslint-disable-next-line
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
// $('body').append('<h3>备案号：XXXXXXX</h3>')

// // 验证按需加载
document.getElementById("btn").onclick = function() {
  //懒加载：
  // import 启动懒加载
  // webpackChunkName: 'desc' 指定懒加载的文件名称

  //预加载：
  // webpackPrefetch: true 启动预加载
  import(/* webpackChunkName: 'desc', webpackPrefetch: true */ "./wp").then(
    ({ desc }) => {
      alert(desc());
    }
  );
};
```
