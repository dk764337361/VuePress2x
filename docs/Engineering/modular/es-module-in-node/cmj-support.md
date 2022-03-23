# ES Modules 在 node 与 Common.js 交互

```
interoperability
└─── commonjs.js
└─── es-module.mjs
```

## 总结：
### 1. ES Modules中可以导入CommonJS模块
### 2. CommonJS始终只会导出一个默认成员
::: warning 注意
import不是解构对象
:::

```sh
node --experimental-modules es-module.mjs
```

- commonjs.js

```js
// CommonJS 模块始终只会导出一个默认成员

//写法一：
// module.exports = {
//   foo: 'commonjs exports value'
// }

//写法二：
// exports.foo = 'commonjs exports value'
```

- es-module.mjs

```js
// ES Module 中可以导入 CommonJS 模块

//正确写法
// import mod from './commonjs.js'
// console.log(mod)

//错误写法
// 不能直接提取成员，注意 import 不是解构导出对象
// import { foo } from './commonjs.js'
// console.log(foo)
```
### 3. CommonJS中不能导入ES Modules模块


```sh
node --experimental-modules commonjs.js
```

- commonjs.js

```js
// 不能在 CommonJS 模块中通过 require 载入 ES Module
const mod = require('./es-module.mjs')
console.log(mod) //抛出错误
```

- es-module.mjs

```js
// export const foo = 'es module export value'
```
