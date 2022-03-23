# 常规操作（项目部署）

- 初始化项目（npm init -y）
- 常规操作

```sh
cnpm i -D webpack webpack-cli html-webpack-plugin webpack-dev-server copy-webpack-plugin clean-webpack-plugin mini-css-extract-plugin cssloader style-loader postcss-loader autoprefixer babel-loader @babel/core @babel/preset-env
```

- webpack.config.js
- src
  - index.js
  - index.ejs

## Webpack 中使用 Bootstrap

- [Bootstrap5](https://getbootstrap.com/docs/5.1/getting-started/introduction/)
- 安装 Bootstrap(popperjs 是 Bootstrap4 和 5 必须依赖包)

```sh
cnpm i bootstrap @popperjs/core
```

- 样式(Bootstrap 使用 sass 预处理 CSS)

```sh
cnpm i –D sass sass-loader
```

- 配置 sass 文件
- 验证效果（导航菜单，轮播图）

<img src="/images/nodeautomation/164.jpg" style="width: 100%; display:inline-block; margin: 0 ;">


### 项目基本结构

```
17.webpackproject
├─── src
│   ├── css
│   ├   └──custom.scss （自定义Bootstrap CSS）
│   ├   └──main.scss （自定义Bootstrap CSS）
│   ├── public
│   ├   └── favicon.ico
│   ├── image
│   ├   └── icon
│   │        └── xxxx.png
│   │        └── xxxx.png....
│   └── index.js
│   └── about.js
│   └── index.ejs
└── webpack.config.js(修改)
└── package.json
```

### webpack.config.js

```js{100-104}
/**
 * Webpack 的配置文件
 */
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 通用的样式 loader
const commonStyleLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: "../",
    },
  },

  "css-loader",
  {
    // Run postcss actions
    loader: "postcss-loader",
    options: {
      // `postcssOptions` is needed for postcss 8.x;
      // if you use postcss 7.x skip the key
      postcssOptions: {
        // postcss plugins, can be exported to postcss.config.js
        plugins: function() {
          return [require("autoprefixer")];
        },
      },
    },
  },
];

// webpack 配置
module.exports = {
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
    filename: "[name].[contenthash:8].js",
  },

  // Tree Shaking 仅支持 source-map | inline-source-map | hidden-source-map | nosources-source-map
  devtool: "source-map",

  // 模块的解析规则
  resolve: {
    alias: {
      // 指定路径的别名
      "@": resolve("src"),
    },
    // 指定引入文件的后缀名（指定之后，在引入文件时，后缀名可以省略）
    extensions: [".js", ".json", ".less"],
    // 指定模块默认加载的路径
    modules: [resolve(__dirname, "./node_modules"), "node_modules"],
  },

  // 排除打包依赖项
  externals: {
    jquery: "jQuery",
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
        use: commonStyleLoader,
      },

      {
        test: /\.less$/i,
        // use 中 loader 的加载顺序：先下后上
        use: [...commonStyleLoader, "less-loader"],
      },

      {
        test: /\.scss$/i,
        // use 中 loader 的加载顺序：先下后上
        use: [...commonStyleLoader, "sass-loader"],
      },

      // 处理图片
      {
        test: /\.(png|gif|jpe?g)$/i,
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

      // 匹配字体文件
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/i,
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
            // 第二次构建时，会读取之前的缓存
            cacheDirectory: true,
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
    port: 9527,

    // 启动自动更新（禁用 hot）
    liveReload: true,
  },

  // 配置目标
  target: "web",

  // 插件配置
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
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
  ],
};
```

### index.js

```js
console.log("index.js");

// 引入 Bootstrap.js
import { Button } from "bootstrap";

// 引入 bootstrap.css
import "bootstrap/dist/css/bootstrap.min.css";

// 引入自定义样式
import "@/css/main.scss";
```

### about.js

```js
console.log("about.js");

// 引入 Bootstrap.js
import { Button } from "bootstrap";

// 引入 bootstrap.css
import "bootstrap/dist/css/bootstrap.min.css";

// 引入自定义样式
import "@/css/main.scss";
```

### index.ejs

```js
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

  <div class="container container-sm container-md container-lg container-xl container-xxl">
    <!-- Content here -->

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="index.html">首页</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="about.html">关于</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                下拉菜单
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- 轮播图 -->
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="<%= require('./image/1.jpg') %>" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="<%= require('./image/2.jpg') %>" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="<%= require('./image/3.jpg') %>" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">上一张</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">下一张</span>
      </button>
    </div>
    <button type="button" class="btn btn-primary">Primary</button>

    <img src="<%= require('./image/icon/ok-black.png') %>" alt="">
  </div>



  <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</body>
</html>
```

### custom.scss

```scss
$body-bg: #dfb;
```

### main.scss

```scss
@import "custom";
@import "~bootstrap/scss/bootstrap";
```
