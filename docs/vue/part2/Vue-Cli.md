# Vue Cli

## 介绍

[Vue Cli 官网](https://cli.vuejs.org/zh/index.html)

- Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统，称为脚手架工具。
- 统一项目的架构风格。
- 初始化配置项目依赖。
- 提供单文件组件。
- 操作方式：命令行工具

## 安装

```sh
cnpm i -g @vue/cli
```

- 升级

```sh
cnpm update -g @vue/cli
```

- 版本

```sh
vue --version
```

## 项目搭建

### 1.创建项目

```sh
vue create project-demo
```

### 2.选择 Preset

<img src="/images/vue/273.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

### 3.选择包管理器

<img src="/images/vue/274.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

### 4.创建完成

<img src="/images/vue/275.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

### 5.运行项目

```sh
npm run serve
```

<img src="/images/vue/276.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

## 目录与文件

文件目录介绍：

```
└─ 根目录
 ├─── public 预览文件目录
 ├─── src
      ├── assets 静态资源目录
      └── components 项目组件目录
      ├── App.vue 根组件
      └── main.js 入口文件
```

## 单文件组件

- 单文件组件可以将组件的功能统一保存在以 `.vue` 为扩展名的文件中。

## 打包与部署

### 打包

- 打包就是将 Vue CLI 项目编译为浏览器可识别的文件。
- 命令：

```sh
npm run build
```

### 部署

- 部署指的是将 Vue 项目 dist 目录部署到服务器上。
- 安装node.js自带的静态文件服务器：

```sh
npm i -g serve
```

- 在 dist 下通过 `serve` 命令部署
