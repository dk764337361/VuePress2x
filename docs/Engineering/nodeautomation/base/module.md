# Node.js 模块系统

## 模块概述

在 Node.js 环境中，默认就支持模块系统，该模块系统遵循 CommonJS 规范。

一个 JavaScript 文件就是一个模块，在模块文件中定义的变量和函数默认只能在模块文件内部使用，如果需要在其他文件中使用，必须显式声明将其进行导出。
<img src="/images/nodeautomation/19.jpg" style="width: 100%; display:Block; margin: 0 ;">

## 模块成员导出

在每一个模块文件中，都会存在一个 module 对象，即模块对象。在模块对象中保存了和当前模块相关信息。

在模块对象中有一个属性 exports，它的值是一个对象，模块内部需要被导出的成员都应该存储在到这个对象中。

```js
Module {
exports: {}
}
```

```js
// logger.js
const url = "http://mylogger.io/log";
function log(message) {
  console.log(message);
}
module.exports.endPoint = url;
module.exports.log = log;
```

## 模块成员导入

在其他文件中通过 require 方法引入模块，require 方法的返回值就是对应模块的 module.exports 对象。

::: tip 提示
在导入模块时，模块文件后缀 .js 可以省略，文件路径不可省略。
:::

require 方法属于同步导入模块，模块导入后可以立即使用。

```js
// app.js
const logger = require("./logger")
console.log(logger) // { endPoint: 'http://mylogger.io/log', log: [Function:
log] }
console.log(logger.endPoint) // http://mylogger.io/log
logger.log('Hello Module') // Hello Node
```

## 导入导出需要注意的事

通过 require 方法引入模块时会执行该模块中的代码。

```js
// logger.js
console.log("running...");
// app.js
require("./logger"); // running...
```

在导入其他模块时，建议使用 const 关键字声明常量，防止模块被重置。

```js
// app.js
var logger = require("./logger");
logger = 1;
logger.log("Hello"); // logger.log is not a function
```

```js
// app.js
const logger = require("./logger");
logger = 1; // Assignment to constant variable.
logger.log("Hello");
```

有时在一个模块中只会导出一个成员，为方便其他模块使用，可以采用以下导入方式。

```js
// logger.js
module.exports = function(message) {
  console.log(message);
};
// app.js
const logger = require("./logger");
logger("Hello");
```

## 模块包装函数 Module Wrapper Function

Node.js 是如何实现模块的，为什么在模块文件内部定义的变量在模块文件外部访问不到?

每一个模块文件中都会有 module 对象和 require 方法，它们是从哪来的？

在模块文件执行之前，模块文件中的代码会被包裹在模块包装函数当中，这样每个模块文件中的代码就都拥有了自己的作用域，所以在模块外部就不能访问模块内部的成员了。

```js
(function(exports, require, module, __filename, __dirname) {
  // entire module code lives here
});
```

从这个模块包装函数中可以看到，module 和 require 实际上模块内部成员, 不是全局对象 global 下面的属性。

- \_\_filename：当前模块文件名称。
- \_\_dirname：当前文件所在路径。
- exports：引用地址指向了 module.exports 对象，可以理解为是 module.exports 对象的简写形式。

```js
exports.endPoint = url;
exports.log = log;
```

在导入模块时最终导入的是 module.exports 对象，所以在使用 exports 对象添加导出成员时不能修改引用地址。

```js
exports = log; //这是错误的写法.
```

```js
//logger.js
const url = "http://www.example.com";

function log(message) {
  console.log(message);
}

console.log("文件名：" + __filename);
console.log("文件路径：" + __dirname);

//正确写法
exports.endPoint = url;
exports.log = log;

//错误写法
// exports = {
//   endPoint: url,
//   log: log
// }
```

## Node.js 内置模块

在 Node.js 安装完成后，会内置一些非常有用的模块。

- Path：模块内提供了一些和路径操作相关的方法。
- File system：文件操作系统，提供了和操作文件相关的方法。

在引入内置模块时, 使用的是模块的名字，前面不需要加任何路径。

### Path 模块

```js
//module_path.js
const path = require("path");
console.log(path.parse(__filename)); //parse()解析函数
// {
// root: '/',
// dir: '/Users/administrators/Desktop/node_test',
// base: 'app.js',
// ext: '.js',
// name: 'app'
// }
```

### File system 模块

```js
//module_fs.js
const fs = require("fs");

const result = fs.readdirSync("./");

//同步方法
console.log(result);

//异步方法
fs.readdir("./", function(error, files) {
  console.log(files);
});
```
