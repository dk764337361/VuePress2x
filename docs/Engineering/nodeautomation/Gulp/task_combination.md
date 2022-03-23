# Gulp 组合任务

## Gulp 与 NPM 执行方式的区别

<img src="/images/nodeautomation/60.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/74.jpg" style="width: 100%; display:block; margin: 0 ;">

## Gulp 与 NPM 组合任务的区别

<img src="/images/nodeautomation/75.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/76.jpg" style="width: 100%; display:block; margin: 0 ;">

### 步骤

- 全局安装 gulp 客户端（ npm install -g gulp-cli）
- 初始化项目（npm init --yes）
- 安装 gulp 包（ npm install gulp -D ）
- 新建 gulpfile 文件(在项目根目录下) （ gulpfile.js ）
- 在 gulpfile.js 中，创建 gulp 任务
- 执行 gulp 任务 （ gulp `<task-name>` ）

### 创建文件目录

```
02.task_combination
 ├── gulpfile.js
 └── package.json
```

### 新建`gulpfile.js`配置文件

```js
// 引入 gulp
const gulp = require("gulp");

const task1 = (cb) => {
  setTimeout(() => {
    console.log("Task 1 is running");

    cb();
  }, 1000);
};

const task2 = (cb) => {
  setTimeout(() => {
    console.log("Task 2 is running");

    cb();
  }, 1000);
};

const task3 = (cb) => {
  setTimeout(() => {
    console.log("Task 3 is running");

    cb();
  }, 1000);
};

// 任务的并行执行
exports.p = gulp.parallel(task1, task2, task3);

// 任务的串行执行
exports.s = gulp.series(task1, task2, task3);
```

### 执行命令

```sh
gulp p
gulp s
```

<img src="/images/nodeautomation/77.jpg" style="width: 100%; display:block; margin: 0 ;">

```sh
gulp //执行默认任务task2
```
