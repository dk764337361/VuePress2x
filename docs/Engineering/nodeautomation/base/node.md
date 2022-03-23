## Node.js 概述

### Node.js 是什么

Node.js 不是一门编程语言，它是一个执行 JavaScript 代码的工具。工具是指可以安装在计算机操作系统之上的软件。

### 为什么浏览器和 Node.js 都可以运行 JavaScript

因为浏览器和 Node.js 都内置了 JavaScript V8 Engine。
它可以将 JavaScript 代码编译为计算机能够识别的机器码。

<img src="/images/automation/01.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 浏览器中运行的 JavaScript 和 Node.js 中运行的 JavaScript 有区别吗

在内置了 JavaScript V8 Engine 以后实际上只能执行 ECMAScript，就是语言中的语法部分。

浏览器为了能够让 JavaScript 操作浏览器窗口以及 HTML 文档，所以在 JavaScript V8 Engine 中添加了控制它们的 API, 就是 DOM 和 BOM. 所以 JavaScript 在浏览器中运行时是可以控制浏览器窗口对象和 DOM 文档对象的。

和浏览器不同，在 Node.js 中是没有 DOM 和 DOM 的，所以在 Node.js 中不能执行和它们相关的代码，比如 `window.alert()` 或者`document.getElementById()`。 DOM 和 BOM 是浏览器环境中特有的。在 Node.js 中，作者向其中添加了很多系统级别的 API，比如对操作系统中的文件和文件夹进行操作。获取操作系统信息，比如系统内存总量是多少，系统临时目录在哪，对系统的进程进行操作等等。

<img src="/images/automation/02.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

JavaScript 运行在浏览器中控制的是浏览器窗口和 DOM 文档。

JavaScript 运行在 Node.js 中控制的操作系统级别的内容。

<img src="/images/automation/03.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 为什么浏览器中的 JavaScript 不能控制系统级别的 API ?

浏览器是运行在用户的操作系统中的，如果能控控制系统级别的 API 就会存在安全问题。 Node.js 是运行在远程的服务器中的，访问的是服务器系统 API，不存在这方面的安全问题。

### Node.js 能够做什么

我们通常使用它来构建服务器端应用和创建前端工程化工具。
JavaScript 运行在浏览器中我们就叫它客户端 JavaScript。
JavaScript 运行在 Node.js 中我们就叫它服务器端 JavaScript。

## 系统环境变量

系统环境变量是指在操作系统级别上定义的变量，变量中存储了程序运行时所需要的参数。

<img src="/images/automation/04.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

比如在使用 webpack 构建前端应用时就使用到了系统环境变量，因为 webpack 需要根据系统环境变量判断当前为开发环境还是生产环境，根据环境决定如何构建应用。

在开发环境的操作系统中定义 NODE_ENV 变量，值为 development，在生产环境的操作系统中定义 NODE_ENV 变量，值为 production。webpack 在运行时通过 process.env.NODE_ENV 获取变量的值，从而得出当前代码的运行环境是什么。

环境变量 PATH：系统环境变量 PATH 中存储的都是应用程序路径。当要求系统运行某一个应用程序又没有告诉它程序的完整路径时，此时操作系统会先在当前文件夹中查找应用程序，如果查找不到就会去系统环境变量 PATH 中指定的路径中查找。

<img src="/images/automation/05.jpg" style="width: 100%; display:inline-block; margin: 0 ;">


