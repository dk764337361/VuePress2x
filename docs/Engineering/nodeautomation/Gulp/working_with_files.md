# Gulp 文件操作

<img src="/images/nodeautomation/78.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/79.jpg" style="width: 100%; display:block; margin: 0 ;">

::: tip 提示
Gulp 是基于 `流` 的构建系统
:::
<img src="/images/nodeautomation/80.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/81.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/82.jpg" style="width: 100%; display:block; margin: 0 ;">

### 步骤

- 全局安装 gulp 客户端（ npm install -g gulp-cli）
- 初始化项目（npm init --yes）
- 安装 gulp 包（ npm install gulp -D ）
- 新建 gulpfile 文件(在项目根目录下) （ gulpfile.js ）
- 在 gulpfile.js 中，创建 gulp 任务
- 执行 gulp 任务 （ gulp `<task-name>` ）

### 创建文件目录

```
working_with_files
    ├─── src
    │   ├── style
    │         ├── main.less
    ├─── dist
    ├──  gulpfile.js
    ├──  package.json
    └── package.json
```

### 新建`gulpfile.js`配置文件

```js
// 引入 gulp
// const gulp = require('gulp')
// 通过 ES6 解构 的方式引入函数
const { src, dest } = require("gulp");

// 声明 gulp 任务
const style = () => {
  // 流 就是异步操作
  // return gulp.src('src/styles/main.less', { base: 'src' }).pipe(gulp.dest('dist'))  
  //src()的第二个参数：保持原有目录结构
  return src("src/styles/main.less", { base: "src" }).pipe(dest("dist"));
};

// 导出任务
module.exports = {
  style,
};
```

### 执行命令

```sh
gulp style
```

<!-- <img src="/images/nodeautomation/77.jpg" style="width: 100%; display:block; margin: 0 ;"> -->

