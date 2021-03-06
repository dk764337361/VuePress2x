# ES Modules 特性

- 自动采用严格模式，忽略'use strict'
- 每个 ESM 模块都是单独的私有作用域
- ESM 是通过 CORS 去请求外部 JS 模块
- ESM 的 script 标签会延迟执行脚本

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>ES Module - 模块的特性</title>
  </head>
  <body>
    <!-- 通过给 script 添加 type = module 的属性，就可以以 ES Module 的标准执行其中的 JS 代码了 -->
    <script type="module">
      console.log("this is es module"); //this is es module
    </script>

    <!-- 1. ESM 自动采用严格模式，忽略 'use strict' -->
    <script type="module">
      console.log(this); //undefined
    </script>

    <!-- 2. 每个 ES Module 都是运行在单独的私有作用域中 -->
    <script type="module">
      var foo = 100;
      console.log(foo); //100
    </script>
    <script type="module">
      console.log(foo); //Uncaught ReferenceError: foo is not defined
    </script>

    <!-- 3. ESM 是通过 CORS 的方式请求外部 JS 模块的 -->
    <!-- <script type="module" src="https://unpkg.com/jquery@3.4.1/dist/jquery.min.js"></script> -->

    <!-- 4. ESM 的 script 标签会延迟执行脚本 -->
    <script defer src="demo.js"></script>
    <p>需要显示的内容</p>
  </body>
</html>
```
