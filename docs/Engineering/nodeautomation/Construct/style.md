# Npm scripts 实践构建样式文件

## 构建样式文件

### 转换

- 将 less 转成 css

```sh
npm i less -g
lessc input.less output.css
```

### 压缩

- 压缩 css 文件

```sh
npm i minify -g
minify output.css > output.min.css
```

<img src="/images/nodeautomation/62.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/63.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/64.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/65.jpg" style="width: 100%; display:block; margin: 0 ;">

## 步骤

- 初始化项目（npm init --yes）
- 添加 scripts 命令 （ less + minify ）
- 执行 scripts 命令（ npm run 命令 ）

### 添加全局插件
```sh
npm i server -g
npm i less -g
npm i minify -g
```

```sh
//在当前目录下
npm init --yes
```

### 创建文件目录

```
case
 ├─── style
 │   ├── main.less
 ├── .gitignore
 └── package.json
 └── index.html
```

### 1. 在当前目录下开启服务器

```
server .
```

### 2. 在 package.json 里添加命令

```json{7}
{
  "name": "style",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "style": "lessc styles/main.less styles/main.css && minify styles/main.css > styles/main.min.css"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

### 3. index.html 添加内容

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
    <h1>Hello</h1>
  </body>
</html>
```

### 4. mian.css添加内容

```css
body {
  margin: 0 auto;
  padding: 0 20px;
  background-color: #dff;
  color: red;
}

```



### 5. 执行命令

```sh
npm run style
```

