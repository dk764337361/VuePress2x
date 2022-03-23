# ES Modules 导入用法

```sh
cnpm i browser-sync -g
browser-sync . --files **/*.js
```

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>ES Module 导出与导入</title>
  </head>
  <body>
    <script type="module" src="app.js"></script>
  </body>
</html>
```


- app.js

```js
// import { name } from './module'//错误写法
// import { name } from './module.js'//正确写法，需补充完整文件后缀
// console.log("123"+name)

// import { lowercase } from './utils'//错误写法
// import { lowercase } from './utils/index.js'//正确写法，需补充完整路径
// console.log(lowercase('HHH'))

// import { name } from 'module.js'//错误写法
// import { name } from './module.js'//正确写法，不能省略`./`
// import { name } from '/04-import/module.js'//正确写法
// import { name } from 'http://localhost:3000/04-import/module.js'//正确写法，方便后续从CDN引用其他JS库
// console.log(name)

// --------------

// import {} from './module.js' //当{}内部为空时，表示只会执行这个文件，并不会提取任何成员
// import './module.js'//简写，只会执行这个文件，并不会提取任何成员。方便后续调用子功能模块

// ---------------

// import * as mod from './module.js'  //用`*`导入所有成员放到一个对象中
// console.log(mod)

// ---------------
// 动态加载模块
// 方法一：行不通
// var modulePath = './module.js'
// import { name } from modulePath
// console.log(name)
// if (true) {
//   import { name } from './module.js'
// }

// 方法二：ES Modules提供了一个全局的import函数，加载文件完成后，调用一个回调函数
//import出来的值，通过形参拿到。
// import('./module.js').then(function (module) {
//   console.log(module)
// })

// ----------------
// 导出默认成员
// import { name, age, default as title } from './module.js'
import abc, { name, age } from './module.js' //上面简写。adc为导出的默认成员
console.log(name, age, abc)
```