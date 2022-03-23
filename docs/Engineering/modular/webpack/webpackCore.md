# Webpack 核心概念

- 入口（Entry）
- 出口（Output）
- 加载器（Loader）
- 插件（Plugins）
- 模式（Mode）
- 模块（Module）
- 依赖图（Dependency Graph）

## 入口（Entry）

- 打包时，第一个被访问的源码文件
- 默认是 src/index.js （可以通过配置文件指定）
- Webpack 通过入口，加载整个项目的依赖

<img src="/images/nodeautomation/106.jpg" style="width: 50%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/107.jpg" style="width: 40%; display:block; margin: 20px ;">


## 出口（Output）

- 打包后，输出的文件名称
- 默认是 dist/main.js（可以通过配置文件指定）
  <img src="/images/nodeautomation/108.jpg" style="width: 100%; display:inline-block; margin: 20px ;">

## 加载器（Loader）

- 专门用来处理一类文件`（非 JS）`的工具
- Webpack 默认只能识别 JS，想要处理其他类型的文件，需要对应的 loader
- 命名方式：xxx-loader（css-loader | html-loader | fileloader）
- 以 -loader 为后缀
- 常用加载器：https://www.webpackjs.com/loaders/
  <img src="/images/nodeautomation/109.jpg" style="width: 100%; display:inline-block; margin: 20px ;">
- bundel.js 既可以包含其他文件，也可以单独放其他文件
  <img src="/images/nodeautomation/110.jpg" style="width: 100%; display:inline-block; margin: 20px ;">
  <img src="/images/nodeautomation/111.jpg" style="width: 100%; display:inline-block; margin: 20px ;">

## 插件（Plugins）

- 实现 loader 之外的其他功能
- Plugin 是 Webpack 的支柱，用来实现丰富的功能
- 命名方式：xxx-webpack-plugin（html-webpack-plugin）
- 以 -webpack-plugin 为后缀
- 常用插件：https://www.webpackjs.com/plugins/

::: tip 提示
Loader 和 Plugin 本质上都是 npm 包
:::

## 模式（Mode）

- 用来区分环境的关键字
- 不同环境的打包逻辑不同，因此，需要区分
- 三种模式
  - development（自动优化打包速度，添加一些调试过程中的辅助）
  - production（自动优化打包结果）
  - none（运行最原始的打包，不做任何额外处理）

## 模块（Module）

- Webpack 中，模块的概念比较宽泛（一切皆为模块）
- JS 模块
- 一段 CSS
- 一张图片
- 一个字体文件
- ……
- 详情：https://www.webpackjs.com/concepts/modules/

## 依赖图（Dependency Graph）
  <img src="/images/nodeautomation/112.jpg" style="width: 100%; display:inline-block; margin: 20px ;">
