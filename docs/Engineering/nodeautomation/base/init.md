# Node.js 光速入门

## Node.js 概述

1. Node.js 是什么
   Node.js 不是一门编程语言，它是一个执行 JavaScript 代码的工具。工具是指可以安装在计算机操作系统之上的软件。
2. 为什么浏览器和 Node.js 都可以运行 JavaScript
   因为浏览器和 Node.js 都内置了 JavaScript V8 Engine。
   它可以将 JavaScript 代码编译为计算机能够识别的机器码。
   <img src="/images/nodeautomation/01.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

3. 浏览器中运行的 JavaScript 和 Node.js 中运行的 JavaScript 有区别吗?


   在内置了 JavaScript V8 Engine 以后实际上只能执行 ECMAScript，就是语言中的语法部分。
   浏览器为了能够让 JavaScript 操作浏览器窗口以及 HTML 文档，所以在 JavaScript V8 Engine 中添加了控制它们的 API, 就是 DOM 和 BOM. 所以 JavaScript 在浏览器中运行时是可以控制浏览器窗口对象和 DOM 文档对象的。
   和浏览器不同，在 Node.js 中是没有 DOM 和 DOM 的，所以在 Node.js 中不能执行和它们相关的
   代码，比如 或者 . DOM 和 BOM 是浏览器环境
   中特有的。在 Node.js 中，作者向其中添加了很多系统级别的 API，比如对操作系统中的文件和文
   件夹进行操作。获取操作系统信息，比如系统内存总量是多少，系统临时目录在哪，对系统的进程 进行操作等等。
   <img src="/images/nodeautomation/02.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

JavaScript 运行在浏览器中控制的是浏览器窗口和 DOM 文档。

JavaScript 运行在 Node.js 中控制的操作系统级别的内容。
<img src="/images/nodeautomation/03.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 系统环境变量

系统环境变量是指在操作系统级别上定义的变量，变量中存储了程序运行时所需要的参数。
<img src="/images/nodeautomation/04.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

比如在使用 `webpack` 构建前端应用时就使用到了系统环境变量，因为 `webpack` 需要根据系统环境变量判断当前为开发环境还是生产环境，根据环境决定如何构建应用。

在开发环境的操作系统中定义`NODE_ENV`变量，值为`development`，在生产环境的操作系统中定义`NODE_ENV`变量，值为 `production`。`webpack` 在运行时通过`process.env.NODE_ENV`获取变量的值，从而得出当前代码的运行环境是什么。

系统环境变量:`PATH` 中存储的都是应用程序路径。当要求系统运行某一个应用程序又没有告诉它程序的完整路径时，此时操作系统会先在当前文件夹中查找应用程序，如果查找不到就会去系统环境变量 `PATH` 中指定的路径中查找。

<img src="/images/nodeautomation/05.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 安装 Node.js

<img src="/images/nodeautomation/06.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- LTS：长期支持版 (稳定版) 可以运行在生产环境中。
- Current：最新版 (预览版) 不建议运行在生产环境中，因为可能有 BUG。

### 查看版本命令

- 查看 `Node` 版本： `node -v`
- 查看 `Npm` 版本： `npm -v`

<img src="/images/nodeautomation/07.jpg" style="width: 80%; display:Block; margin: 0 ;">
<img src="/images/nodeautomation/08.jpg" style="width: 80%; display:Block; margin: 0 ;">
<img src="/images/nodeautomation/09.jpg" style="width: 80%; display:Block; margin: 0 ;">
<img src="/images/nodeautomation/10.jpg" style="width: 80%; display:Block; margin: 0 ;">
<img src="/images/nodeautomation/11.jpg" style="width: 80%; display:Block; margin: 0 ;">
<img src="/images/nodeautomation/12.jpg" style="width: 80%; display:Block; margin: 0 ;">
<img src="/images/nodeautomation/13.jpg" style="width: 80%; display:Block; margin: 0 ;">
<img src="/images/nodeautomation/14.jpg" style="width: 80%; display:Block; margin: 0 ;">

### 解决安装异常

1. 解决在运行 node 命令时提示 "不是内部或外部命令, 也不是可运行的程序或批处理文件"。将 Node 应用程序目录添加到系统环境变量中, 然后重新启动命令行工具再次执行 node 命令。
   <img src="/images/nodeautomation/15.jpg" style="width: 80%; display:Block; margin: 0 ;">
2. 解决在安装 Node 的过程中出现代码为 2502 和 2503 的错误。
   <img src="/images/nodeautomation/16.jpg" style="width: 80%; display:Block; margin: 0 ;">
   <img src="/images/nodeautomation/17.jpg" style="width: 80%; display:Block; margin: 0 ;">

- 1. 通过管理员权限打开命令行工具
- 2. 切换到 node 安装包所在的目录
- 3. 通过 msiexec /package node-v10.15.0-x64.msi 运行 Node 应用程序安装包

### Node.js 初体验

在命令行工具中通过 node `JavaScript文件` 的方式执行代码。
<img src="/images/nodeautomation/18.jpg" style="width: 100%; display:Block; margin: 0 ;">

### 全局对象

```js
console.log(window); // window is not defined
```

在 Node.js 环境中是没有 window 的，所以 window 对象自然是未定义的。
在 Node.js 环境中全局对象为 global，在 global 对象中会存在一些和 window 对象中名字相同且作用
相同的方。

```js
global.console.log;
global.setInterval;
global.clearInterval;
global.setTimeout;
global.clearTimeout;
global.setImmediate;
```

在 Node.js 环境中声明的变量不会被添加到全局对象中，变量声明后只能在当前文件中使用。

```js
var message = "hello";
console.log(global.message); // undefined
```

