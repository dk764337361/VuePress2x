# 什么是构建

<img src="/images/nodeautomation/48.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 为什么构建（构建内容）

- 一些代码需要编译（CSS，JS）， 保证浏览器的兼容性；
- 将 Less 或 Sass 转换成 CSS
- 将 ES6+ 的新语法转成 ES5
- 有些代码需要压缩（CSS，JS，HTML，图片等）；
- 压缩之后的代码体积更小，加载更快，节省带宽
- 有些代码需要做格式化校验，统一代码风格；

<img src="/images/nodeautomation/49.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 构建初体验

将 less 转成 css

<img src="/images/nodeautomation/50.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/51.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 步骤

- 安装 less 插件

```sh
npm i less -g
```

- 通过 lessc 命令转换

```sh
lessc input.less output.css
```

## 什么是自动化构建
自动化构建是指将手动构建任务，通过命令自动执行的过程。

<img src="/images/nodeautomation/52.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/53.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
