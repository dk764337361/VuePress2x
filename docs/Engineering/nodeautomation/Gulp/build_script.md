# Gulp 构建JS脚本文件

<img src="/images/nodeautomation/88.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/89.jpg" style="width: 100%; display:block; margin: 0 ;">

### 创建文件目录

```
build_script
    ├─── src
    │    ├── js
    │    │   └── main.js
    │    ├── style
    │    │   └── main.less
    │    └──index.html
    ├─── gulpfile.js
    └──  package.json
```

- main.js

```js
/**
 * 声明函数
 */
const showMsg = () => {
  alert("Hello");
};
```

## 步骤 1：构建样式文件所需插件

[查找 Gulp 官方插件](https://gulpjs.com/plugins/)

- 全局安装 gulp 客户端（ npm install -g gulp-cli）
- 初始化项目（npm init --yes）
- 安装 gulp 包（ npm install gulp -D ）

### Gulp 构建样式文件所需插件

- [glup-babel](https://www.npmjs.com/package/gulp-babel)将 ES6 文件转成 es5 文件

```sh
# Babel 7
# $ npm install --save-dev gulp-babel @babel/core @babel/preset-env

# Babel 6
$ npm install --save-dev gulp-babel@7 babel-core babel-preset-env
```

- cnpm install gulp-rename -S
- cnpm install gulp-less -S

## 步骤 2:

- 新建 gulpfile 文件(在项目根目录下) （ gulpfile.js ）
- 在 gulpfile.js 中，创建 gulp 任务

#### 新建`gulpfile.js`配置文件

```js
// 通过 解构 的方式引入函数
const { src, dest } = require("gulp");
const less = require("gulp-less");
const cleancss = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

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
        // presets: ['@babel/env']        //Babel7写法
        presets: ["babel-preset-env"], //Babel6写法
      })
    )
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest("dist/scripts"));
};

// 导出任务
module.exports = {
  style,
  script,
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
    "gulp-less": "^4.0.1",
    "gulp-rename": "^2.0.0",
    "gulp-uglify": "^3.0.2"
  }
}
```

## 步骤 3:执行命令

```sh
gulp script
```
