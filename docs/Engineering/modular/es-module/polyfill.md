# polyfill 解决 ES Modules 的兼容性

原理：将浏览器不认识的ES Modules交由babel转换，通过ajax请求回来的代码，再通过babel转换

```
polyfill
    └───  index.html
    └───  module.js
```

1. 从[unpkg 前端公共 CDN](https://unpkg.com/browse/browser-es-module-loader@0.4.1/dist/)引用`browser-es-module-loader.js`和`babel-browser-build.js`

2. 在 NPM 安装[promise-polyfill](https://github.com/taylorhakes/promise-polyfill)或引用[unpkg 中的 promise-polyfill](https://unpkg.com/promise-polyfill@8.2.3/dist/polyfill.min.js)解决 IE 不支持 ES6 中的 promise 问题

::: tip 提示
```js
<script nomodule src=""></script>
```
中的`nomodule`属性表示仅在不支持ES Modules 的浏览器（IE）中运行，仅仅适合开发环境，生产环境效率很差。
:::

- index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>ES Module 浏览器环境 Polyfill</title>
</head>
<body>
  <script nomodule src="https://unpkg.com/promise-polyfill@8.1.3/dist/polyfill.min.js"></script>
  <script nomodule src="https://unpkg.com/browser-es-module-loader@0.4.1/dist/babel-browser-build.js"></script>
  <script nomodule src="https://unpkg.com/browser-es-module-loader@0.4.1/dist/browser-es-module-loader.js"></script>
  <script type="module">
    import { foo } from './module.js'
    console.log(foo)
  </script>
</body>
</html>

```

- module.js
```js
```
