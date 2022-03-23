# 脚手架工具

- 脚手架的作用:创建项目基础结构、提供项目规范和约定

## 项目基础结构

<img src="/images/nodeautomation/43.jpg" style="width: 30%; display:inline-block; margin: 0 ;">

## 脚手架创建项目基础结构

<img src="/images/nodeautomation/44.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 脚手架的分类

<img src="/images/nodeautomation/45.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 通用脚手架 Yeoman

## Yeoman 的基本概念

- Yeoman 是一款脚手架工具
- 可以帮助开发人员创建项目的基础结构代码
- yo 是 Yeoman 的命令行管理工具
- 可以在命令行运行 yeoman 的命令
- 生成器：Yeoman 中具体的脚手架
- 针对不同项目有不同的脚手架（例如：网站，APP，小程序等）

<img src="/images/nodeautomation/46.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## Yeoman 使用说明

- 全局安装 yo

```sh
npm install --global yo
```

- 安装 generator

```sh
npm install --global generator-webapp
```

- 通过 yo 运行 generator

```sh
mkdir project-name
cd project-name
yo webapp
```

- 启动应用

```sh
npm run start
```
