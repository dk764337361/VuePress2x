# ES Modules 导出导入成员用法

将导入的结果直接作为当前模块的导出成员

```
export-import
    ├─── components
    │    ├── avatar.js
    │    └── button.js
    │    └── index.js
    ├─── app.js
    └───  index.html
    └───  module.js
```

- index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>ES Module 导出与导入 - 导出导入成员</title>
  </head>
  <body>
    <script type="module" src="app.js"></script>
  </body>
</html>
```

- index.js

```js
//写法一：
// import { Button } from './button.js'
// import { Avatar } from './avatar.js'
// export { Button, Avatar }

//写法二：
export { default as Button } from "./button.js";
export { Avatar } from "./avatar.js";
```

- avatar.js

```js
export var Avatar = "Avatar Component";
```

- button.js

```js
var Button = "Button Component";
export default Button;
```
