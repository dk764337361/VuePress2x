# Snabbdom库 介绍

## 配置 parcel

- parcel 和 webpack 一样，但功能比不过 webpack。只不过 parcel 做好了很多易于配置 Snabbdom 的配置，从而使用它做此示例的打包工具

### 安装 parcel

```sh
# 创建项目目录
md snabbdom-demo
# 进入项目目录
cd snabbdom-demo
# 创建 package.json
npm init -y
# 本地安装parcel
npm install parcel-bundler -D
```

### 配置 scripts

- package.json

```json
  "scripts": {
    "dev":"parcel index.html --open",
    "build":"parcel build index.html"
  },
```

### 目录结构

```
|-- snabbdom-demo
    |-- index.html
    |-- package.json
    |-- src
        |-- 01-BasicUsage.js
```

## Snabbdom 基本使用

### Snabbdom 文档

- 看文档的意义
  - 学习任何一个库都要先看文档
  - 通过文档了解库的作用
  - 看文档中提供的示例，自己快速实现一个 demo
  - 通过文档查看 API 的使用
- Snabbdom 文档，当前版本<Badge type="tip" text="v2.1.0" vertical="top" />
  - [Snabbdom 官方文档](https://github.com/snabbdom/snabbdom)
  - [Snabbdom 的官方中文文档](https://github.com/snabbdom/snabbdom/blob/master/README-zh_CN.md)

### 导入 Snabbdom

#### 安装 Snabbdom

```sh
# Snabbdom v2.1.0版本
npm intall snabbdom@2.1.0
# 或
# Snabbdom v3.5.0版本
npm intall snabbdom
```

#### 导入 Snabbdom

- Snabbdom 的两个核心函数 init 和 h()

  - init() 是一个高阶函数，返回 patch()
  - h() 返回虚拟节点 VNode，这个函数我们在使用 Vue.js 的时候见过

- Snabbdom v2.1.0 版本的`文档导入`的方式

```js
// Snabbdom v2.1.0
import { init } from 'snabbdom/init'
import { h } from 'snabbdom/h'
const patch = init([])
```

- Snabbdom v2.1.0 版本的`实际导入`的方式
  - parcel/webpack 4 不支持 package.json 中的 exports 字段

```js
import { h } from 'snabbdom/build/package/h'
import { init } from 'snabbdom/build/package/init'
```

- Snabbdom v3.5.0 版本的`文档导入`的方式

```js
// Snabbdom v3.5.0
import { init, h } from 'snabbdom'

console.log(init)
console.log(h)

//   console.log(init);
// ƒ init(modules, domApi, options) {
//   var cbs = {
//     create: [],
//     update: [],
//     remove: [],
//     destroy: [],
//     pre: [],
//     post: []
//   };
//   var api = domApi !== undefined ? domApi : _htmldomapi.… ƒ h(sel, b, c) {
//   var data = {};
//   var children;
//   var text;
//   var i;

//   if (c !== undefined) {
//     if (b !== null) {
//       data = b;
//     }

//     if (is.array(c)) {
//       children = c;
//     } else if (i…

// -----------------------------------

//   console.log(h);
// ƒ h(sel, b, c) {
//   var data = {};
//   var children;
//   var text;
//   var i;

//   if (c !== undefined) {
//     if (b !== null) {
//       data = b;
//     }

//     if (is.array(c)) {
//       children = c;
//     } else if (i…
```

### 示例-一级节点

```
|-- snabbdom-demo
    |-- index.html
    |-- package.json
    |-- src
        |-- 01-BasicUsage.js
```

```html
<!-- index.html -->
<body>
  <div id="app">默认内容</div>
  <script src="./src/01-BasicUsage.js"></script>
</body>
```

```js
// src\01-BasicUsage.js

import { init, h } from 'snabbdom'

//   console.log(init);
//   console.log(h);

// 1通过h函数创建VNode(虚拟节点)

let vNode = h('div#box.container', '新内容')

// 获取挂载元素

const dom = document.querySelector('#app')

// 2 通过init 函数得到patch函数
const patch = init([])

// 3 通过pactch ，将vNode 渲染到DOM
let oldVNode = patch(dom, vNode)

// 4 创建新的VNode ，更新给oldNode
vNode = h('p#text.abc', '这是p标签的内容')
patch(oldVNode, vNode)
```

### 示例-包含子节点

```
|-- snabbdom-demo
    |-- index.html
    |-- package.json
    |-- src
        |-- 01-BasicUsage.js
        |-- 02-hasChildren.js
```

```html
<!-- index.html -->
<body>
  <div id="app">默认内容</div>
  <!-- <script src="./src/01-BasicUsage.js"></script> -->
  <script src="./src/02-hasChildren.js"></script>
</body>
```

```js
// src\02-hasChildren.js

import { init, h } from 'snabbdom'

const patch = init([])

// 创建包含子节点的VNode
//   - 参数2的数组为子节点列表，内部就应该传vNode
let vNode = h('div#container', [h('h1', '标题文本'), h('p', '内容文本')])

// 获取挂载元素

const dom = document.querySelector('#app')

// 渲vNode
const oldVNode = patch(dom, vNode)

// patch(oldVNode,h('div#abc','测试内容'))
patch(oldVNode, h('!')) // '!'代表生成空白注释
```

## Snabbdom 模块的使用

### 模块的作用

- Snabbdom 的核心库（init、h 函数）并不能处理 DOM 元素的属性/样式/事件等，可以通过注册 Snabbdom 默认提供的模块来实现
- Snabbdom 中的模块可以用来扩展 Snabbdom 的功能
- Snabbdom 中的模块的实现是通过注册全局的钩子函数来实现的

### 官方提供的模块

- attributes
- props
- dataset （处理自定义的属性，明确以 data 开头）
- class （用于类的切换处理）
- style （用于常规 style 处理）
- eventlisteners

### 模块的使用步骤

1. 导入需要的模块
2. `init([])` 中注册模块
3. h() 函数的第二个参数处使用模块

```
|-- snabbdom-demo
    |-- index.html
    |-- package.json
    |-- src
        |-- 01-BasicUsage.js
        |-- 02-hasChildren.js
        |-- 03-modules.js
```

```html
<!-- index.html -->
<body>
  <div id="app">默认内容</div>
  <!-- <script src="./src/01-BasicUsage.js"></script> -->
  <!-- <script src="./src/02-hasChildren.js"></script> -->
  <script src="./src/03-modules.js"></script>
</body>
```

```js
// 03-modules.js

// 1. 导入模块（注意拼写，导入的名称不要拼错）
import {
  init,
  // classModule,
  // propsModule,
  styleModule,
  eventListenersModule,
  h,
} from 'snabbdom'
// console.log(styleModule);

// 2. 注册模块（为patch 函数添加模块对应的能力）
const patch = init([
  // // 通过传入模块初始化 patch 函数
  // classModule, // 开启 classes 功能
  // propsModule, // 支持传入 props
  styleModule, // 支持内联样式同时支持动画
  eventListenersModule, // 添加事件监听
])

// 3. 使用模块
let vNode = h(
  'div#box',
  {
    style: {
      backgroundColor: 'green',
      height: '200px',
      width: '200px',
    },
  },
  [
    h(
      'h1#title',
      {
        style: {
          color: '#fff',
        },
        on: {
          click() {
            console.log('点击了h1标签')
          },
        },
      },
      '这是标题内容'
    ),
    h('p', '这是内容文本'),
  ]
)

// 挂载元素
const dom = document.getElementById('app')

// 传入一个空的元素节点 - 将产生副作用（修改该节点）
patch(dom, vNode)
```

<img src="/images/vue/084.gif" style="width: 100%; display:inline-block; margin: 0 ;">


