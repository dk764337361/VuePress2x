# ES Modules 导出

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

- module.js

```js
// export var name = 'foo module'

// export function hello () {
//   console.log('hello')
// }

// export class Person {}

var name = "foo module";

function hello() {
  console.log("hello");
}

class Person {}

// export {
//   // name as default,
//   hello as fooHello
// }

// export default name

// var obj = { name, hello, Person }

export { name, hello, Person };
```

- app.js

```js
// import { default as fooName } from './module.js'
// console.log(fooName)

import { name, hello, Person } from "./module.js";
console.log(name, hello, Person);
```

## 导入导出注意事项

- module.js

```js
var name = "jack";
var age = 18;

// var obj = { name, age } //不是对象字面量写法，只是类似字面量写法

// export default { name, age }  //export导出可以是一个值(对象、函数......)或一个变量。

// 这里的 `{ name, hello }` 不是一个对象字面量，
// 它只是语法上的规则而已
export { name, age };

// export name // 错误的用法
// export 'foo' // 同样错误的用法

setTimeout(function() {
  name = "ben";
}, 1000);
```
