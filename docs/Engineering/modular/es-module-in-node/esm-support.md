# ES Modules 在 node 支持情况

::: warning 注意
node>8 版本才能使用 ES Modules 和 Common.js
:::

[nodejs 在 github](https://github.com/nodejs/node/tree/master/lib/internal/modules)

<img src="/images/nodeautomation/96.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```
01-esm-support
└─── index.mjs
└─── module.mjs
└─── package.json
```

```sh
cnpm i
node --experimental-modules index.mjs
yarn add lodash
```

- index.mjs

```js
// 第一，将文件的扩展名由 .js 改为 .mjs；
// 第二，启动时需要额外添加 `--experimental-modules` 参数；

import { foo, bar } from "./module.mjs";

console.log(foo, bar);

// 此时我们也可以通过 esm 加载内置模块了
import fs from "fs";
fs.writeFileSync("./foo.txt", "es module working");

// 也可以直接提取模块内的成员，内置模块兼容了 ESM 的提取成员方式
import { writeFileSync } from "fs";
writeFileSync("./bar.txt", "es module working");

// 对于第三方的 NPM 模块也可以通过 esm 加载
import _ from "lodash";
_.camelCase("ES Module");

// 不支持，因为第三方模块都是导出默认成员
// import { camelCase } from 'lodash'
// console.log(camelCase('ES Module'))
```

- module.mjs

```js
export const foo = "hello";

export const bar = "world";
```

- package.json

```json
{
  "dependencies": {
    "lodash": "^4.17.15"
  }
}
```
