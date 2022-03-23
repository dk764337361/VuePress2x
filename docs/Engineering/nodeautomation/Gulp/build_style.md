# Gulp 构建CSS样式文件

<img src="/images/nodeautomation/83.jpg" style="width: 100%; display:block; margin: 0 ;">

## 创建文件目录

```
build_style
    ├─── src
    │    ├── style
    │    │      └── main.less
    │    └── index.html
    ├─── gulpfile.js
    └──  package.json
```

- main.less

```less
@body-bg: #dfb;
@body-color: red;

body {
  margin: 0 auto;
  padding: 20px;
  background: @body-bg;
  color: @body-color;
}

.code {
  user-select: none;
}
```

## 步骤 1：构建样式文件所需插件

[查找 Gulp 官方插件](https://gulpjs.com/plugins/)

- 全局安装 gulp 客户端（ npm install -g gulp-cli）
- 初始化项目（npm init --yes）
- 安装 gulp 包（ npm install gulp -D ）

- Gulp 构建样式文件所需插件
- 将 less 文件转成 css 文件(npm i gulp-less -D)
- 压缩 CSS 代码(npm i gulp-clean-css -D)
- 对文件进行重命名(npm i gulp-rename -D)

## 步骤 2：解决 CSS 兼容性

### 什么是 CSS hack？

- CSS 代码存在兼容性问题
- 同一段 CSS 代码，在不同浏览器上的呈现效果不同。
- 我们把针对不同的浏览器写相应的 CSS 代码的过程，叫做 CSS hack!
  <img src="/images/nodeautomation/84.jpg" style="width: 80%; display:block; margin: 0 ;">

### CSS hack – 属性前缀法

<img src="/images/nodeautomation/86.jpg" style="width: 100%; display:block; margin: 0 ;">

例如：

- user-select 属性可以控制用户能否选中文本（ 存在兼容性问题 ）
- 给 CSS 属性（user-select），添加浏览器特有的前缀
  <img src="/images/nodeautomation/85.jpg" style="width: 100%; display:block; margin: 0 ;">

### 使用插件 autoprefixer

```sh
npm install --save-dev gulp-autoprefixer
```

::: tip 提示
Autoprefixer 使用 `caniuse.com` 的数据来决定哪些属性需要加前缀
:::
<img src="/images/nodeautomation/87.jpg" style="width: 100%; display:block; margin: 0 ;">

## 步骤 3:

- 新建 gulpfile 文件(在项目根目录下) （ gulpfile.js ）
- 在 gulpfile.js 中，创建 gulp 任务
- 执行 gulp 任务 （ gulp `<task-name>` ）

#### 新建`gulpfile.js`配置文件

```js
// 通过 解构 的方式引入函数
const { src, dest } = require("gulp");
const less = require("gulp-less");
const cleancss = require("gulp-clean-css");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");

// 声明 gulp 任务
const style = () => {
  // 流 就是异步操作
  return (
    src("src/styles/main.less", { base: "src" })
      .pipe(less())
      .pipe(autoprefixer())
      // .pipe(cleancss())
      // .pipe(rename({ "extname": ".min.css" }))
      .pipe(dest("dist"))
  );
};

// 导出任务
module.exports = {
  style,
};
```

#### 执行命令

```sh
gulp style
```
