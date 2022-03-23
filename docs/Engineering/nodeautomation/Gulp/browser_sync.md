# 浏览器同步测试工具

1. [Browsersync 官网](https://browsersync.io/) 【推荐，功能强大】
2. [serve](https://www.npmjs.com/package/serve)【一般】

## 创建文件目录

```
build_script
    ├─── src
    │    ├── images
    │    │   └── 1.jpg
    │    │   └── 2.png
    │    │   └── ......
    │    ├── js
    │    │   └── main.js
    │    ├── style
    │    │   └── main.less
    │    └──index.html
    ├─── gulpfile.js
    └──  package.json
```

## 步骤 1：项目插件

[查找 Gulp 官方插件](https://gulpjs.com/plugins/)

- 全局安装 gulp 客户端（ npm install -g gulp-cli）
- 初始化项目（npm init --yes）
- 安装 gulp 包（ npm install gulp -D ）

### 安装 Browsersync

```sh
npm i browser-sync -D
```

## 步骤 2:

- 新建 gulpfile 文件(在项目根目录下) （ gulpfile.js ）
- 在 gulpfile.js 中，创建 gulp 任务

#### 新建`gulpfile.js`配置文件

```js
// 通过 解构 的方式引入函数
const { src, dest, parallel, series, watch } = require("gulp");
const less = require("gulp-less");
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const del = require("del");
const browserSync = require("browser-sync");
const bs = browserSync.create();

// 声明 gulp 任务
const style = () => {
  // 流 就是异步操作
  return src("src/styles/*.less", { base: "src" })
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest("dist"));
};

// 声明 脚本 构建任务
const script = () => {
  return src("src/js/*.js")
    .pipe(
      babel({
        presets: ["babel-preset-env"],
      })
    )
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest("dist/scripts"));
};

// 声明 页面 的构建任务
const html = () => {
  return src("src/index.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      })
    )
    .pipe(dest("dist"));
};

// 声明 图片 构建任务
const image = () => {
  return src("src/images/**", { base: "src" })
    .pipe(imagemin())
    .pipe(dest("dist"));
};

// 声明 文件清除 任务
const clean = () => {
  return del(["dist"]);
};

// 声明 服务发布 任务
const serve = () => {
  // watch(被监视的文件，对应的任务)
  watch("src/index.html", html);
  watch("src/styles/*.less", style);
  watch("src/js/*.js", script);
  watch("src/images/**", image);

  // 初始化服务
  bs.init({
    notify: false, // 禁用 浏览器 右上角的 browserSync connected 提示框
    files: "dist/**", // 监视 dist 下 文件的变化，然后在浏览器上实时更新
    server: {
      baseDir: "./dist", // 指定服务启动的目录
      routes: {
        "/node_modules": "node_modules",
      },
    },
  });
};

// 组合任务
const build = parallel(style, script, html, image);
const dev = series(clean, build, serve);

// 导出任务
module.exports = {
  build,
  dev,
  serve,
};
```

## index.html

```html{7-8}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      rel="stylesheet"
      href="/node_modules/bootstrap/dist/css/bootstrap.min.css"
    />
    <link rel="stylesheet" href="styles/main.min.css" />
  </head>
  <body>
    <h1 onclick="showMsg()">Hello999</h1>

    <p class="code">
      console.log('不能选中')
    </p>

    <p>
      console.log('能够选中')
    </p>

    <div
      id="carousel-example-generic"
      class="carousel slide"
      data-ride="carousel"
    >
      <!-- Indicators -->
      <ol class="carousel-indicators">
        <li
          data-target="#carousel-example-generic"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
      </ol>

      <!-- Wrapper for slides -->
      <div class="carousel-inner" role="listbox">
        <div class="item active">
          <img src="images/1.jpg" alt="..." />
          <div class="carousel-caption">
            ...
          </div>
        </div>
        <div class="item">
          <img src="images/2.jpg" alt="..." />
          <div class="carousel-caption">
            ...
          </div>
        </div>
        <div class="item">
          <img src="images/3.jpg" alt="..." />
          <div class="carousel-caption">
            ...
          </div>
        </div>
      </div>

      <!-- Controls -->
      <a
        class="left carousel-control"
        href="#carousel-example-generic"
        role="button"
        data-slide="prev"
      >
        <span
          class="glyphicon glyphicon-chevron-left"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="right carousel-control"
        href="#carousel-example-generic"
        role="button"
        data-slide="next"
      >
        <span
          class="glyphicon glyphicon-chevron-right"
          aria-hidden="true"
        ></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <script src="scripts/main.min.js"></script>
    <script src="/node_modules/jquery/dist/jquery.min.js"></script>
    <script src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
  </body>
</html>
```

## package.json

```json
{
  "name": "03.working_with_files",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-preset-env": "^1.7.0",
    "browser-sync": "^2.26.13",
    "del": "^6.0.0",
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^7.0.1",
    "gulp-babel": "^7.0.1",
    "gulp-clean-css": "^4.3.0",
    "gulp-htmlmin": "^5.0.1",
    "gulp-imagemin": "^7.1.0",
    "gulp-less": "^4.0.1",
    "gulp-rename": "^2.0.0",
    "gulp-uglify": "^3.0.2"
  },
  "dependencies": {
    "bootstrap": "^3.4.1",
    "jquery": "^3.5.1"
  }
}
```

## 步骤 3:执行命令

```sh
gulp dev
```
