# ES Modules in node.js 新版本进一步支持

```
04-new-version
└─── common.cjs
└─── index.js
└─── module.js
└─── package.json
```

## 在 package.json 中配置 ES Modules

```json
{
  "type": "module"
}
```
## 新版本支持特性:
### ES Modules 文件无需再像以前配置.mjs 后缀名

- index.js

```js
// Node v12 之后的版本，可以通过 package.json 中添加 type 字段为 module，
// 将默认模块系统修改为 ES Module
// 此时就不需要修改文件扩展名为 .mjs 了

import { foo, bar } from "./module.js";

console.log(foo, bar);
```

- module.js

```js
export const foo = "hello";

export const bar = "world";
```

### 需要将 CommonJS 文件扩展名修改为 .cjs

- common.cjs

```js
// 如果需要在 type=module 的情况下继续使用 CommonJS，
// 需要将文件扩展名修改为 .cjs

const path = require("path");

console.log(path.join(__dirname, "foo"));
```
