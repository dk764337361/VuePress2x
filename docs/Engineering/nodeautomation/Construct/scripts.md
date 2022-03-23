# Npm scripts 构建脚本文件

<img src="/images/nodeautomation/66.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/67.jpg" style="width: 100%; display:block; margin: 0 ;">

## Babel 插件介绍

<img src="/images/nodeautomation/68.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/69.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/70.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/71.jpg" style="width: 100%; display:block; margin: 0 ;">

## 步骤

1. 开启服务器（npm i server -g）
2. 初始化项目（npm init --yes）
3. 安装 Babel（ npm install -g babel-core babelcli）
4. 安装转码规则（ npm install -D babel-presetenv）
5. 配置转换规则（ .babelrc ）
6. 在 npm scripts 中添加转换命令（ babel src -ddist ）
7. 执行转换命令

### 创建文件目录

```
case
 ├─── js
 │   ├── main.js
 ├─── style
 │   ├── main.less
 ├── .gitignore
 ├── .babelrc
 └── package.json
 └── index.html
```

### 添加`.babelrc`配置文件

```json
{
  "presets": ["env"]
}
```

### 在 package.json 里添加命令

```json{8}
{
  "name": "style",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "style": "lessc styles/main.less styles/main.css && minify styles/main.css > styles/main.min.css",
    "script": "babel js -d scripts && minify scripts/main.js > scripts/main.min.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-preset-env": "^1.7.0"
  }
}
```

### index.html 添加内容

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="styles/main.css" />
  </head>
  <body>
    <h1 onclick="show_msg()">Hello</h1>

    <script src="scripts/main.js"></script>
  </body>
</html>
```

### mian.js 添加内容

```js
/**
 * 声明函数
 */
var show_msg = () => {
  alert("Hello");
};
```

### 执行命令

```sh
npm run script
server .
```
