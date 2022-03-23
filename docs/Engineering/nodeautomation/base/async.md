# 异步编程

## CPU 与存储器

目标: 了解程序运行过程中 CPU 和存储器起到了什么作用或者说扮演了什么角色.

### CPU

中央处理器，计算机核心部件，负责运算和指令调用。

开发者编写的 JavaScript 代码在被编译为机器码以后就是通过 CPU 执行的。

### 存储器

内存：用于临时存储数据，断电后数据丢失。由于数据读写速度快，计算机中的应用都是在内存中运行的。

磁盘：用于持久存储数据，断电后数据不丢失。内部有磁头依靠马达转动在盘片上读写数据, 速度比内存慢。

计算机应用程序在没有运行时是存储在磁盘中的，当我们启动应用程序后，应用程序会被加载到内存中运行，应用程序中的指令会被中央处理器 CPU 来执行。

### 什么是 I/O

`I` 就是 Input 表示输入，`O` 就是 Output 表示输出，`I/O` 操作就是输入输出操作。什么样的操作属于 I/O 操作呢 ?

比如数据库的读写操作就是 `I/O` 操作，因为数据库文件是存储在磁盘中的，而我们编写的程序是运行在内存中的，将内存中的数据写入数据库对于内存来说就是输出，查询数据库中的数据就是将磁盘中的数据读取到内存中，对于内存来说就是输入。

### I/O 模型

从数据库中查询数据(将磁盘中的文件内容读取到内存中)，由于磁盘的读写速度比较慢，查询内容越多花费时间越多。无论 I/O 操作需要花费多少时间，在 I/O 操作执行完成后，CPU 都是需要获取到操作结果
的，那么问题就来了，CPU 在发出 I/O 操作指令后是否要等待 I/O 操作执行完成呢 ? 这就涉及到 I/O 操作模型了，I/O 操作的模型有两种。

- 第一种是 CPU 等待 I/O 操作执行完成获取到操作结果后再去执行其他指令，这是同步 I/O 操作 (阻塞 I/O)。
- 第二种是 CPU 不等待 I/O 操作执行完成，CPU 在发出 I/O 指令后，内存和磁盘开始工作，CPU 继续执行其他指令。当 I/O 操作完成后再通知 CPU I/O 操作的结果是什么。这是异步 I/O 操作 (非阻塞 I/O) 。
- `同步 I/O` 在代码中的表现就是代码暂停执行等待 I/O 操作，I/O 操作执行完成后再执行后续代码。
- `异步 I/O` 在代码中的表现就是代码不暂停执行，I/O 操作后面的代码可以继续执行，当 I/O 操作执行完成后通过回调函数的方式通知 CPU，说 I/O 操作已经完成了，基于 I/O 操作结果的其他操作可以执行了
  (通知 CPU 调用回调函数)。

同步 I/O 和 异步 I/O 区别就是是否等待 I/O 结果。

Node 采用的就是异步非阻塞 I/O 模型。

```js
//异步操作。
//先请求fs
//再读取x.txt文件，
//再输出“Hello”
//再通过回调函数输出data
const fs = require("fs");
fs.readFile("./x.txt", "utf-8", function(error, data) {
  console.log(data);
});
console.log("Hello");
```

```js
//同步操作
//先请求fs
//再等待读取y.txt文件完成后，再输出data
const fs = require("fs");
const data = fs.readFileSync("./y.txt", { encoding: "utf-8" });
console.log(data);
```

## 进程与线程

每当我们运行应用程序时，操作系统都会创建该应用程序的实例对象，该实例对象就是应用程序的进程，操作系统会按照进程为单位为应用程序分配资源，比如内存，这样程序才能够在计算机的操作系统
中运行起来。

<img src="/images/nodeautomation/30.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

线程被包裹在进程之中，是进程中的实际运作单位，一条线程指的就是进程中的一个单一顺序的控制流。也就是说，应用程序要做的事情都存储在线程之中。可以这样认为，一条线程就是一个待办列表，
供 CPU 执行。

<img src="/images/nodeautomation/31.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### JS 单线程 OR 多线程 ?

在 Node.js 代码运行环境中，它为 JavaScript 代码的执行提供了一个主线程，通常我们所说的单线程指的就是这个主线程，主线程用来执行所有的同步代码。但是 Node.js 代码运行环境本身是由 C++ 开发
的，在 Node.js 内部它依赖了一个叫做 libuv 的 c++ 库，在这个库中它维护了一个线程池，默认情况下在这个线程池中存储了 4 个线程，JavaScript 中的异步代码就是在这些线程中执行的，所以说
JavaScript 代码的运行依靠了不止一个线程，所以 JavaScript 本质上还是多线程的。
<img src="/images/nodeautomation/32.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 主线程池（单线程、同步操作）

```js
const crypto = require("crypto");
const NUM_REQUESTS = 2;
for (let i = 0; i < NUM_REQUESTS; i++) {
  crypto.pbkdf2Sync("srcret", "salt", 10000, 512, "sha512"); //pbkdf2Sync是node的加密函数
}
```

<img src="/images/nodeautomation/33.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### C++线程池（多线程、异步操作）

```js
const crypto = require("crypto");
const NUM_REQUESTS = 2;
for (let i = 0; i < NUM_REQUESTS; i++) {
  crypto.pbkdf2("srcret", "salt", 10000, 512, "sha512"); //pbkdf2是node的加密函数
}
```

<img src="/images/nodeautomation/34.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 基于回调函数的异步编程

### 1. 什么是回调函数?

回调函数是指通过函数参数的方式将一个函数传递到另一个函数中，参数函数就是回调函数。

```js
function A() {
  console.log("A is running");
}
function B(callback) {
  console.log("B Start");
  callback(); // A is running
  console.log("B End");
}
B(A);
```

我们经常将回调函数写成 callback，实际上它是 call then back 的简写，含义是调用后返回，就是在主函数中调用参数函数，参数函数调用完成后返回主函数继续执行主函数中的代码。

::: tip 思考
为什么在 B 函数中不直接调用 A 函数而要通过参数的方式传递进去 ?
:::

通常在编写应用程序时，B 函数都是语言内部或者其他开发者定义好的，我们看不到内部代码或者说不能直接在他内部代码中插入我们的代码，而我们又想介入程序的执行，此时就可以通过回调函
数的方式将我们的逻辑传递给 B 函数，B 函数在内部再来调用这个回调函数。

### 2. 回调函数传递参数

在主函数中调用回调函数时，可以为回调函数传递参数。

```js
function A(arg) {
  console.log("A is running");
  console.log(arg);
}
function B(callback) {
  console.log("B Start");
  callback("我是B函数传递给A函数的参数"); // A is running
  console.log("B End");
}
B(A);
```

### 3. 回调函数在异步编程中的应用

在异步编程中，异步 API 执行的结果就是通过回调函数传递参数的方式传递到上层代码中的。

```js
const fs = require("fs");
fs.readFile("./index.html", "utf-8", function(error, data) {
  if (error) console.log("发生了错误");
  console.log(data);
});
```

### 4. 回调地狱

回调地狱是回调函数多层嵌套导致代码难以维护的问题。

基于回调函数的异步编程一不小心就会产生回调地狱的问题。

<img src="/images/nodeautomation/35.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```js
//回调地狱
const fs = require("fs");
fs.readFile("./x.txt", "utf-8", function(error, x) {
  fs.readFile("./y.txt", "utf-8", function(error, y) {
    fs.readFile("./z.txt", "utf-8", function(error, z) {
      console.log(x);
      console.log(y);
      console.log(z);
    });
  });
});
```

```js
//正常代码
const x = fs.readFile("./x.txt", "utf-8");
const y = fs.readFile("./y.txt", "utf-8");
const z = fs.readFile("./z.txt", "utf-8");
console.log(x);
console.log(y);
console.log(z);
```

## 基于 Promise 的异步编程

### 1. Promise 概述

Promise 是 JavaScript 中异步编程解决方案，可以解决回调函数方案中的回调地狱问题。可以将 Promise 理解为容器，用于包裹异步 API 的容器，当容器中的异步 API 执行完成后，
Promise 允许我们在容器的外面获取异步 API 的执行结果，从而避免回调函数嵌套。

Promise 翻译为承诺，表示它承若帮我们做一些事情，既然它承若了它就要去做，做就会有一个过程，就会有一个结果，结果要么是成功要么是失败。

所以在 Promise 中有三种状态, 分别为等待(pending)，成功(fulfilled)，失败(rejected)。

默认状态为等待，等待可以变为成功，等待可以变为失败。

状态一旦更改不可改变，成功不能变回等待，失败不能变回等待，成功不能变成失败，失败不能变成成功。

### 2. Promise 基础语法

```js
const fs = require("fs");
const promise = new Promise(function(resolve, reject) {
  fs.readFile("./x.txt", "utf-8", function(error, data) {
    if (error) {
      // 将状态从等待变为失败
      reject(error);
    } else {
      // 将状态从等待变为成功
      resolve(data);
    }
  });
});
promise
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log(error);
  });
```

### 3. 通过 Promise 链式调用特性解决回调函数

```js
const fs = require("fs");
function readFile(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, "utf-8", function(error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}
readFile("./x.txt")
  .then(function(x) {
    console.log(x);
    return readFile("./y.txt");
  })
  .then(function(y) {
    console.log(y);
    return readFile("./z.txt");
  })
  .then(function(z) {
    console.log(z);
  })
  .catch(function(error) {
    console.log(error);
  })
  .finally(function() {
    console.log("finally");
  });
```

### 4. 使用 Promise.all 方法执行并发异步操作

```js
const fs = require("fs");

// fs.readFile("./x.txt", "utf-8", function (error, x) {
//   fs.readFile("./y.txt", "utf-8", function (error, y) {
//     fs.readFile("./z.txt", "utf-8", function (error, z) {
//       console.log(x)
//       console.log(y)
//       console.log(z)
//     })
//   })
// })

function readFile(path) {
  return new Promise(function(resovle, reject) {
    fs.readFile(path, "utf-8", function(error, result) {
      if (error) {
        reject(error);
      } else {
        resovle(result);
      }
    });
  });
}

Promise.all([
  readFile("./x.txt"),
  readFile("./y.txt"),
  readFile("./z.txt"),
]).then(function(result) {
  console.log(result);
});
```

## 基于异步函数的异步编程

Promise 虽然解决了回调地狱的问题，但是代码看起来仍然不简洁。

使用异步函数简化代码提高异步编程体验。

### 1. 异步函数概述

```js
const fs = require("fs");
function readFile(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, "utf-8", function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
}
async function getFileContent() {
  let x = await readFile("./x.txt");
  let y = await readFile("./y.txt");
  let z = await readFile("./z.txt");
  return [x, y, z];
}
getFileContent().then(console.log);
```

async 声明异步函数的关键字，异步函数的返回值会被自动填充到 Promise 对象中。

await 关键字后面只能放置返回 Promise 对象的 API。

await 关键字可以暂停函数执行，等待 Promise 执行完后返回执行结果。

await 关键字只能出现在异步函数中。

### 2. util.promisify

在 Node.js 平台下，所有异步方法使用的都是基于回调函数的异步编程。为了使用异步函数提高异步编程体验，可以使用 util 模块下面的 promisify 方法将基于回调函数的异步 API 转换成返回 Promise 的 API。

```js
const fs = require("fs");
const promisify = require("util").promisify;
const readFile = promisify(fs.readFile);

async function run() {
  let x = await readFile("./x.txt", "utf-8");
  let y = await readFile("./y.txt", "utf-8");
  let z = await readFile("./z.txt", "utf-8");
  return [x, y, z];
}

run().then((result) => console.log(result));

const fn = async () => {};
```

## Event Loop 机制概述

1. 为什么要学习事件循环机制?

2. 学习事件循环可以让开发者明白 JavaScript 的运行机制是怎么样的。

3. 事件循环机制做的是什么事情？

   事件循环机制用于管理异步 API 的回调函数什么时候回到主线程中执行。

   Node.js 采用的是异步 I/O 模型。同步 API 在主线程中执行，异步 API 在底层的 C++ 维护的线程中执行，异步 API 的回调函数在主线程中执行。

::: tip 思考
在 JavaScript 应用运行时，众多异步 API 的回调函数什么时候能回到主线程中调用呢？
:::
这就是事件循环机制做的事情，管理异步 API 的回调函数什么时候回到主线程中执行。

4. 为什么这种机制叫做事件循环？

因为 Node.js 是事件驱动的。事件驱动就是当什么时候做什么事情，做的事情就定义在回调函数中，可以将异步 API 的回调函数理解为事件处理函数，所以管理异步 API 回调函数什么时候回到主线程中调用的机制叫做事件循环机制。

### Event Loop 的六个阶段

事件循环是一个循环体，在循环体中有六个阶段，在每个阶段中，都有一个事件队列，不同的事件队列存储了不同类型的异步 API 的回调函数

<img src="/images/nodeautomation/36.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

1. Timers：用于存储定时器的回调函数(setInterval, setTimeout)。
2. Pending callbacks：执行与操作系统相关的回调函数，比如启动服务器端应用时监听端口操作的回调函数就在这里调用。
3. Idle, prepare：系统内部使用。
4. IO Poll：存储 I/O 操作的回调函数队列，比如文件读写操作的回调函数。
   如果事件队列中有回调函数，执行它们直到清空队列。

   否则事件循环将在此阶段停留一段时间以等待新的回调函数进入，这个等待取决于以下两个条件：

   - 1. setImmediate 队列(check 阶段)中存在要执行的回调函数.
   - 2. timers 队列中存在要执行的回调函数. 在这种情况下, 事件循环将移至 check 阶段, 然后移至 Closing callbacks 阶段, 并最终从 timers 阶段进入下一次循环。

5. Check：存储 setImmediate API 的回调函数。
6. Closing callbacks：执行与关闭事件相关的回调，例如关闭数据库连接的回调函数等。
   循环体会不断运行以检测是否存在没有调用的回调函数，事件循环机制会按照先进先出的方式执行他们
   直到队列为空。

## 宏任务与微任务

宏任务：setInterval, setTimeout, setImmediate, I/O

微任务：Promise.then Promise.catch Promise.finally, process.nextTick

### 微任务与宏任务的区别

1. 微任务的回调函数被放置在微任务队列中，宏任务的回调函数被放置在宏任务队列中。
2. 微任务优先级高于宏任务。
   当微任务事件队列中存在可以执行的回调函数时，事件循环在执行完当前阶段的回调函数后会暂停进入事件循环的下一个阶段，事件循环会立即进入微任务的事件队列中开始执行回调函数，当微任务队列中的回调函数执行完成后，事件循环再进入到下一个阶段开始执行回调函数。

nextTick 的优先级高于 microTask，在执行任务时，只有 nextTick 中的所有回调函数执行完成后才会开始执行 microTask。

不同阶段的宏任务的回调函数被放置在了不同的宏任务队列中，宏任务与宏任务之间没有优先级的概念，他们的执行顺序是按照事件循环的阶段顺序进行的。

### Event Loop 代码解析

在 Node 应用程序启动后，并不会立即进入事件循环，而是先执行输入代码，从上到下开始执行，同步 API 立即执行，异步 API 交给 C++ 维护的线程执行，异步 API 的回调函数被注册到对应的事件队列中。
当所有输入代码执行完成后，开始进入事件循环。

```js
console.log("start");
setTimeout(() => {
  console.log("setTimeout 1");
}, 0);
setTimeout(() => {
  console.log("setTimeout 2");
}, 0);
console.log("end");
//start
//end
//setTimeout 1
//setTimeout 2
```

```js
setTimeout(() => console.log("1"), 0);
setImmediate(() => console.log("2"));
function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() - start < delay) {
    continue;
  }
}
sleep(1000);
// 1 2
```

```js
setTimeout(() => console.log("1"), 0);
setImmediate(() => console.log("2"));
// 2 1 或 1 2
```

```js
const fs = require("fs");
fs.readFile("./index.html", () => {
  setTimeout(() => console.log("1"), 0);
  setImmediate(() => console.log("2"));
});
// 2 1
```

```js
setTimeout(() => console.log("1"), 50);
process.nextTick(() => console.log("2"));
setImmediate(() => console.log("3"));
process.nextTick(() => console.log("4"));
// 2 4 3 1
```

```js
setTimeout(() => console.log(1));
setImmediate(() => console.log(2));
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
(() => console.log(5))();
// 5 3 4 1 2
```

```js
process.nextTick(() => console.log(1));
Promise.resolve().then(() => console.log(2));
process.nextTick(() => console.log(3));
Promise.resolve().then(() => console.log(4));
// 1 3 2 4
```

```js
setTimeout(() => console.log("1"), 50);
process.nextTick(() => console.log("2"));
setImmediate(() => console.log("3"));
process.nextTick(() =>
  setTimeout(() => {
    console.log("4");
  }, 1000)
);
// 2 3 1 4
```

### process.nextTick 与 setImmediate()

1. process.nextTick()

此方法的回调函数优先级最高(比微任务中级别最高)，会在事件循环之前被调用。

如果你希望异步任务尽可能早地执行，那就使用 process.nextTick。

```js
const fs = require("fs");
function readFile(fileName, callback) {
  if (typeof fileName !== "string") {
    return callback(new TypeError("filename 必须是字符串类型"));
  }
  fs.readFile(filename, function(err, data) {
    if (err) return callback(err);
    return callback(null, data);
  });
}
```

此段代码的问题在于 readFile 方法根据传入的参数类型，callback 可能会在主线程中直接被调用，callback 也可能在事件循环的 IO 轮询阶段被调用，这可能会导致不可预测的问题发生。如何使
readFile 方法变成完全异步的呢？

```js{4-6}
const fs = require("fs");
function readFile(fileName, callback) {
  if (typeof fileName !== "string") {
    return process.nextTick(
      callback,
      new TypeError("filename 必须是字符串类型")
    );
  }
  fs.readFile(fileName, (err, data) => {
    if (err) return callback(err);
    return callback(null, data);
  });
}
```

经过以上更改以后，无论 fileName 参数是否是字符串类型，callback 都不会在主线程中直接被调用。

1. setImmediate()

setImmediate 表示立即执行，它是宏任务，回调函数会被会放置在事件循环的 check 阶段。

在应用中如果有大量的计算型任务，它是不适合放在主线程中执行的，因为计算任务会阻塞主线程，主线程一旦被阻塞，其他任务就需要等待，所以这种类型的任务最好交给由 C++ 维护的线程去
执行。

可以通过 setImmediate 方法将任务放入事件循环中的 check 阶段，因为代码在这个阶段执行不会阻塞主线程，也不会阻塞事件循环。

```js
function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() - start < delay) {
    continue;
  }
  console.log("ok");
}
```

```js
console.log("start");
sleep(2000);//阻塞主线程
console.log("end");

//start
//ok
//end
```

```js
console.log("start");
setImmediate(sleep, 2000); //不阻塞主线程
console.log("end");

//start
//end
//ok
```

::: tip 结论
Node 适合 I/O 密集型任务，不适合 CPU 密集型任务，因为主线程一旦阻塞，程序就卡住了。
:::