# 光速入门

[Gulp官网](https://gulpjs.com/)

## Gulp 与 npm scripts

  <img src="/images/nodeautomation/73.jpg" style="width: 100%; display:block; margin: 0 ;">

- Gulp 与 npm scripts 都能够实现自动化构建
- Gulp 语法简单
  - Gulp 语法就是 JavaScript 语法
  - npm scripts 语法接近 shell 脚本
- Gulp 生态完善，构建效率高

## Gulp 基本使用

### 步骤

- 全局安装 gulp 客户端（ npm install -g gulp-cli）
- 初始化项目（npm init --yes）
- 安装 gulp 包（ npm install gulp -D ）
- 新建 gulpfile 文件(在项目根目录下) （ gulpfile.js ）
- 在 gulpfile.js 中，创建 gulp 任务
- 执行 gulp 任务 （ gulp `<task-name>` ）

### 创建文件目录

```
01.basic_usage
 ├── gulpfile.js
 └── package.json
```

### 新建`gulpfile.js`配置文件

```js
// 旧版声明任务的语法
const gulp = require("gulp");
gulp.task("task3", (cb) => {
  console.log("Task 3 is running");

  cb();
});
//旧版不需要module.exports导出

// 新版-创建 gulp 任务
const task1 = (cb) => {
  //cb：回调函数
  console.log("Task 1 is running");

  cb();
};
const task2 = (cb) => {
  //cb：回调函数
  console.log("Task 2 is running");

  cb();
};

// 新版-导出任务
module.exports = {
  task1,
  default: task2, // 默认任务
};
```

### 执行命令

```sh
gulp task1
```

```sh
gulp //执行默认任务task2
```
