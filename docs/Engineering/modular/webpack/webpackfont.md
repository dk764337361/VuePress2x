# 打包 字体

## Webpack 实践 12

### 插件简介

- [阿里巴巴-字体库](https://www.iconfont.cn/webfont?spm=a313x.7781069.1998910419.d81ec59f2#!/webfont/index)
- file-loader

```sh
cnpm i file-loader -D
```

```js
test: /\.(eot|svg|ttf|woff|woff2)$/i;
```

- copy-webpack-plugin
  - 不需要处理的其他文件，可以直接复制到输出目录
  - https://www.npmjs.com/package/copy-webpack-plugin

```sh
cnpm i copy-webpack-plugin -D
```

- clean-webpack-plugin（每次打包之前，先删除历史文件）
  - https://www.npmjs.com/package/clean-webpack-plugin

```sh
cnpm i clean-webpack-plugin -D
```

### 待修改文件

```
06.webpackfile
├─── src
│   ├── css
│   ├   └── main.css
│   ├   └── main.less(修改)
│   ├── public(新增)
│   ├   └── favicon.ico
│   ├── image(新增)
│   ├   └── icon
│   │   │    └── xxxx.png
│   │   │    └── xxxx.png....
│   ├   └── bg.jpg
│   ├   └── xph.gif
│   ├── fonts(新增)
│   ├   └── ....
│   ├   └── ...
│   ├── data.json
│   └── index.js
│   └── index.ejs(修改)
└── webpack.config.js(修改)
└── postcss.config.js
└── package.json
```

- webpack.config.js

```js{10-11,113-122,204-215}
/**
 * Webpack 的配置文件
 */
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  // 打包模式
  mode: 'development',

  // 入口文件
  entry: './src/index.js',

  // 出口配置
  output: {
    // 输出目录（输出目录必须是绝对路径）
    path: resolve(__dirname, 'output'),
    // 输出文件名称
    filename: 'bundle.js'
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
              publicPath: '../'
            }
          },

          // 2. css-loader 按照 CommonJS 规范，将样式文件，输出到 JS 中
          'css-loader',

          // 1. 通过 postcss-loader 给样式属性添加浏览器前缀
          'postcss-loader'
        ]
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
              publicPath: '../'
            }
          },

          // 3. css-loader 按照 CommonJS 规范，将样式文件，输出到 JS 中
          'css-loader',

          // 2. 通过 postcss-loader 给样式属性添加浏览器前缀
          'postcss-loader',

          // 1. 将 less 转成普通的 CSS
          'less-loader'
        ]
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
            esModule: false
          }
        }
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
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env', 
                { 
                  // 按需加载
                  useBuiltIns: 'usage',
                  // core-js 的版本
                  corejs: 3,
                  // targets: "defaults" 
                  // 指定兼容浏览器的版本
                  targets: {
                    chrome: '58',
                    ie: '9',
                    firefox: '60',
                    safari: '10',
                    edge: '17'
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },

  // 开发服务器
  devServer: {

  },

  // 插件配置
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new StylelintPlugin({
      // 指定需要进行格式校验的文件
      files: ['src/css/*.{css,less,sass,scss}']
    }),
    // 压缩 CSS
    new OptimizeCssAssetsPlugin(),

    // Html 的配置
    new HtmlWebpackPlugin({
      // 指定打包后的文件名称
      filename: 'index.html',

      // 用来指定，生成 HTML 的模板
      template: './src/index.ejs',
      // 指定 HTML 中使用的变量
      title: "Webpack Demo"
    }),
    new HtmlWebpackPlugin({
      // 指定打包后的文件名称
      filename: 'about.html',
      // 用来指定，生成 HTML 的模板
      template: './src/index.ejs',
      // 指定 HTML 中使用的变量
      title: "关于我们",
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new ESLintPlugin({
      // 自动解决常规的代码格式报错
      fix: true
    }),
    // 直接将 src 下，不需要特殊处理的文件，直接复制到输出目录中
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/public",
          to: "public"
        }
      ]
    }),

    // 打包之前，先删除历史文件
    new CleanWebpackPlugin(),
  ]
}
```

- main.css

```css
a {
  color: blue;
  line-height: .8;
}

@font-face {
  font-family: "webfont";
  font-display: swap;
  src: url('../fonts/webfont.eot'); /* IE9 */
  src:
    url('../fonts/webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('../fonts/webfont.woff2') format('woff2'),
    url('../fonts/webfont.woff') format('woff'), /* chrome、firefox */
    url('../fonts/webfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
    url('../fonts/webfont.svg#webfont') format('svg'); /* iOS 4.1- */
}

.web-font {
  font-family: "webfont", sans-serif !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

```

- index.ejs

```js{8}
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

  <h1 onclick="showMsg()">Hello Webpack</h1>
  <p class="web-font">验证字体文件</p>
  <a href="index.html">首页</a>
  <a href="about.html">关于</a>

  <img src="<%= require('./image/icon/ok-black.png') %>" alt="">

</body>
</html>
```
