# 缓存

- Babel 缓存
  - cacheDirectory: true（第二次构建时，会读取之前的缓存）
- 文件资源缓存
  - 如果代码在缓存期内，代码更新后看不到实时效果
  - 方案：将代码文件名称，设置为哈希名称，名称发生变化时，就加载最新的内容
- Webpack 哈希值
  - [hash]（每次 Webpack 打包生成的 hash 值）
  - [chunkhash]（不同 chunk 的 hash 值不同 – 同一次打包可能生成不同的 chunk）
  - [contenthash]（不同内容的 hash 值不同 - 同一个 chunk 中可能有不同的内容）
<img src="/images/nodeautomation/153.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/154.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/155.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/156.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

<img src="/images/nodeautomation/157.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/158.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/159.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/160.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 待修改文件

```
13.webpackcache
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

### webpack.config.js

```js{36,267}
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
const webpack = require('webpack')
const TerserPlugin = require("terser-webpack-plugin");

// 引入自定义插件
const MyPlugin = require('./plugin/MyPlugin')

module.exports = (env, argv) => {
  const config = {
    // 打包模式
    mode: 'development',
  
    // 入口文件
    // entry: './src/index.js',
    // 多入口打包
    entry: {
      'index': './src/index.js',
      'about': './src/about.js'
    },
  
    // 出口配置
    output: {
      // 输出目录（输出目录必须是绝对路径）
      path: resolve(__dirname, 'output'),
      // 输出文件名称
      filename: '[name].[contenthash:8].js'
    },

    // Tree Shaking 仅支持 source-map | inline-source-map | hidden-source-map | nosources-source-map
    devtool: 'source-map',

    // 优化策略
    optimization: {
      sideEffects: true,
      // 标记未被使用的代码
      usedExports: true,
      // 删除 usedExports 标记的未使用的代码
      // minimize: true,
      // minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: 'all'
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
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024
            }
          },
          generator: {
            filename: "image/[name][ext]"
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

        {
          test: /\.md$/i,
          // use: './loader/markdown-loader'
          use: [
            'html-loader',
            // './loader/markdown-loader'
            {
              loader: './loader/markdown-loader',
              options: {
                size: 20
              }
            }
          ]
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
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024
            }
          },
          generator: {
            filename: "fonts/[name][ext]"
          }
        },
  
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true,
              presets: [
                [
                  '@babel/preset-env', 
                  { 
                    modules: false,
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
      // 指定加载内容的路径
      contentBase: resolve(__dirname, 'output'),
  
      // 启用 gzip 压缩
      compress: true,
  
      // 端口号
      port: 9200,
  
      // 启动自动更新（禁用 hot）
      liveReload: true,
  
      // 配置代理：解决接口跨域问题
      proxy: {
        // http://localhost:9200/api
        '/api': {
          // http://localhost:9200/api/users => https://api.github.com/api/users
          target: 'https://api.github.com',
          // http://localhost:9200/api/users => https://api.github.com/users
          pathRewrite: {
            '^/api': ""
          },
          // 不能使用 localhost:9200 作为 github 的主机名
          changeOrigin: true
        }
      }
    },
  
    // 配置目标
    target: "web",
  
    // 插件配置
    plugins: [
      new webpack.DefinePlugin({
        // 开发环境下的接口地址
        // 变量后面的值，是一段代码片段
        API_BASE_URL: JSON.stringify('http://apidev.example.com')
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css'
      }),
      new StylelintPlugin({
        // 指定需要进行格式校验的文件
        files: ['src/css/*.{css,less,sass,scss}']
      }),
  
      // Html 的配置
      new HtmlWebpackPlugin({
        // 指定打包后的文件名称
        filename: 'index.html',
  
        // 用来指定，生成 HTML 的模板
        template: './src/index.ejs',
        // 指定 HTML 中使用的变量
        title: "Webpack Demo",
        // 指定要加载的打包文件
        chunks: ['index']
      }),
      new HtmlWebpackPlugin({
        // 指定打包后的文件名称
        filename: 'about.html',
        // 用来指定，生成 HTML 的模板
        template: './src/index.ejs',
        // 指定 HTML 中使用的变量
        title: "关于我们",
        chunks: ['about']
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
            to: "public"
          }
        ]
      }),
  
      // 打包之前，先删除历史文件
      new CleanWebpackPlugin(),

      // 引入自定义插件
      new MyPlugin({
        target: '.css'
      })
    ]
  }

  // 判断当前是否是生产环境打包
  if (env.production) {
    config.mode = "production"
    // 启用 Source Map 定位问题
    config.devtool = 'nosources-source-map'
    config.plugins = [
      new webpack.DefinePlugin({
        // 开发环境下的接口地址
        // 变量后面的值，是一段代码片段
        API_BASE_URL: JSON.stringify('http://apiprod.example.com')
      }),
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
        title: "Webpack Demo",
        chunks: ['index'],
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
      new HtmlWebpackPlugin({
        // 指定打包后的文件名称
        filename: 'about.html',
        // 用来指定，生成 HTML 的模板
        template: './src/index.ejs',
        // 指定 HTML 中使用的变量
        title: "关于我们",
        chunks: ['about'],
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
      // new ESLintPlugin({
      //   // 自动解决常规的代码格式报错
      //   fix: true
      // }),
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

  return config
}


```


