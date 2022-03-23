# Gulp 文件清除

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

## 步骤 1：删除文件所需插件


```sh
 npm i -D del
```
## 步骤 2:

- 新建 gulpfile 文件(在项目根目录下) （ gulpfile.js ）
- 在 gulpfile.js 中，创建 gulp 任务

#### 新建`gulpfile.js`配置文件

```js
// 通过 解构 的方式引入函数
const { src, dest, parallel, series } = require('gulp')
const less = require('gulp-less')
const cleancss = require('gulp-clean-css')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const del = require('del')

// 声明 gulp 任务
const style = () => {
  // 流 就是异步操作
  return src('src/styles/main.less', { base: 'src' })
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(rename({ "extname": ".min.css" }))
    .pipe(dest('dist'))
}

// 声明 脚本 构建任务
const script = () => {
  return src('src/js/main.js')
    .pipe(babel({
      presets: ['babel-preset-env']
    }))
    .pipe(uglify())
    .pipe(rename({ "extname": ".min.js" }))
    .pipe(dest('dist/scripts'))
}

// 声明 页面 的构建任务
const html = () => {
  return src('src/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(dest('dist'))
}

// 声明 图片 构建任务
const image = () => {
  return src('src/images/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'))
}

// 声明 文件清除 任务
const clean = () => {
  return del(['dist'])
}

// 组合任务
const build = parallel(style, script, html, image)

const dev = series(clean, build)

// 导出任务
module.exports = {
  build,
  dev
}
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
  }
}

```

## 步骤 3:执行命令

```sh
gulp clean
```
