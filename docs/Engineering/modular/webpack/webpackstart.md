# Webpack 简介

- Webpack = Web Package
- Webpack 是一个现代 JS 应用程序的`静态模块打包器（modulebundler）`
- 模块（模块化开发，可以提高开发效率，避免重复造轮子）
- 打包（将各个模块，按照一定的规则组装起来）
- [官网](https://webpack.js.org/)
- 特点
  - 功能强大（打包、构建、发布 Web 服务）
  - 学习成本高

## 怎么来理解模块化和打包？

<img src="/images/nodeautomation/100.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/101.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 构建（转换）：把不支持的代码，转成支持的代码
<img src="/images/nodeautomation/102.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 打包（合并）：把多个文件合并成一个文件
<img src="/images/nodeautomation/103.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/104.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## Webpack 的功能
- 将多个文件合并（打包），减少 HTTP 请求次数，从而提高效率
- 对代码进行编译，确保浏览器兼容性
- 对代码进行压缩，减小文件体积，提高加载速度
- 检测代码格式，确保代码质量
- 提供热更新服务，提高开发效率
- 针对不同环境，提供不同的打包策略

## Webpack 的发展历史
- 2012 年 3 月 10 日，Webpack 诞生
- 2014 年 2 月 ，Webpack 1
- 2016 年 12 月，Webpack 2
- 2017 年 6 月，Webpack 3
- 2018 年 2 月， Webpack 4
- 2020 年 10 月， Webpack 5 （Node.js 10.13+）