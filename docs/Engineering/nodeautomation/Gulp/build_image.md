# Gulp 构建图片文件

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

## 步骤 1：构建图片文件所需插件

[查找 Gulp 官方插件](https://gulpjs.com/plugins/)

- 全局安装 gulp 客户端（ npm install -g gulp-cli）
- 初始化项目（npm init --yes）
- 安装 gulp 包（ npm install gulp -D ）

### Gulp 构建样式文件所需插件

压缩 HTML 文件

- [gulp-imagemin](https://www.npmjs.com/package/gulp-htmlmin)

```sh
 npm install -D gulp-imagemin
```

### 安装依赖报错解决方案

- 报错
- <img src="/images/nodeautomation/90.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
- 解决
  - 配置 hosts
  - 通过 vscode 打开 hosts 文件（C:\Windows\System32\Drivers\etc）
  - 添加 Github hosts 内容（ 请查看课堂笔记 ）
- 保存（如无权限，以管理员身份新打开文件）
- 然后重新安装 gulp-imagemin

## 步骤 2:

- 新建 gulpfile 文件(在项目根目录下) （ gulpfile.js ）
- 在 gulpfile.js 中，创建 gulp 任务

#### 新建`gulpfile.js`配置文件

```js
// 通过 解构 的方式引入函数
const { src, dest, parallel } = require("gulp");
const less = require("gulp-less");
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");

// 声明 gulp 任务
const style = () => {
  // 流 就是异步操作
  return src("src/styles/main.less", { base: "src" })
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest("dist"));
};

// 声明 脚本 构建任务
const script = () => {
  return src("src/js/main.js")
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
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist"));
};

// 组合任务
const build = parallel(style, script, html, image);

// 导出任务
module.exports = {
  style,
  script,
  html,
  build,
  image,
};
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
    "gulp": "^4.0.2",
    "gulp-autoprefixer": "^7.0.1",
    "gulp-babel": "^7.0.1",
    "gulp-clean-css": "^4.3.0",
    "gulp-htmlmin": "^5.0.1",
    "gulp-imagemin": "^7.1.0",
    "gulp-less": "^4.0.1",
    "gulp-rename": "^2.0.0",
    "gulp-uglify": "^3.0.2"
  }
}
```

## 步骤 3:执行命令

```sh
gulp image
```
