# Webpack 配置文件
- 配置文件是用来简化命令行选项的
  - 配置前：webpack ./src/index.js --output-path ./dist --mode=development
  - 配置后：webpack
- 默认的配置文件名称是 webpack.config.js
  - webpack.config.js 是以 CommonJS 规范进行组织的
  - 使用 Webpack 的过程，大部分就是跟配置文件打交道的过程
- 配置详情
  - https://www.webpackjs.com/configuration/

## 常用配置项
- mode（模式）
- entry（入口）
- output（出口）
- module（模块配置 – 不同类型文件的配置 – loader 配置）
- plugins（插件）
- devServer（开发服务器的配置）

## Webpack 实践2

```
02.webpackstart
├─── src
│   ├── data.json
│   └── index.js
└── webpack.config.js（新增）
└── package.json
```

```js
/**
 * Webpack 的配置文件
 */
const { resolve } = require('path')

module.exports = {
  // 打包模式
  mode: 'production',// "production" | "development" | "none"

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
    ]
  },

  // 开发服务器
  devServer: {

  },

  // 插件配置
  plugins: [

  ]
}
```