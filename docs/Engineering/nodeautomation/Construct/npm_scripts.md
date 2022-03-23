# Npm scripts

实现自动化构建的最简方式

## 什么是 npm scripts

- npm 允许在 package.json 文件中，使用 scripts 字段定义脚本

<img src="/images/nodeautomation/54.jpg" style="width: 70%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/55.jpg" style="width: 30%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/56.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 自动化构建样式文件

- 手动：
  <img src="/images/nodeautomation/57.jpg" style="width: 100%; display:block; margin: 0 ;">

- 自动：
  <img src="/images/nodeautomation/58.jpg" style="width: 100%; display:block; margin: 0 ;">

## npm scripts 中任务的执行方式

并行 / 串行

<img src="/images/nodeautomation/59.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/60.jpg" style="width: 100%; display:block; margin: 0 ;">
<img src="/images/nodeautomation/61.jpg" style="width: 100%; display:block; margin: 0 ;">

## 解决&（并行执行）在 Windows 下不起作用

`npm-run-all`插件
<img src="/images/nodeautomation/62.jpg" style="width: 100%; display:block; margin: 0 ;">

```json{16-17}
{
  "name": "02.npm_scripts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "prefoo": "echo prefoo",
    "foo": "node bar.js",
    "postfoo": "echo postfoo",
    "windows-p": "node task1.js & node task2.js & node task3.js",
    "windows-s": "node task1.js && node task2.js && node task3.js",
    "t1": "node task1.js",
    "t2": "node task2.js",
    "t3": "node task3.js",
    "p": "run-p t1 t2 t3",
    "s": "run-s t1 t2 t3"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "npm-run-all": "^4.1.5"
  }
}
```
