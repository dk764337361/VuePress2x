# 用 babel 使低版本 node 中运行 ES Modules 代码

<img src="/images/nodeautomation/98.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/nodeautomation/99.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```
05-babel
└─── .babelrc
└─── index.js
└─── module.js
└─── package.json
```
- index.js

```js
// 对于早期的 Node.js 版本，可以使用 Babel 实现 ES Module 的兼容

import { foo, bar } from './module.js'

console.log(foo, bar)
```

- module.js
```js
export const foo = 'hello'

export const bar = 'world'

```

```sh
# node是8版本
yarn add @babel/node @babel/core @babel/preset-env --dev
yarn babel-node
yarn babel-node index.js
```
## 方法一：
```sh
# 使用babel配置
方法1:使用命令 yarn babel-node index.js --presets=ababel/preset-env
方法2. 或配置.babelrc文件后是使用 yarn babel-node index.js
```

- .babelrc

```
{
"presets":["@babel/preset-env"]
}

```

## 方法二：

```sh
yarn remove ababel/preset-env
yarn add @babel/plugin-transform-modules-commonjs --dev
```

- .babelrc

```
{
  "plugins": [
    "@babel/plugin-transform-modules-commonjs"
  ]
}

```


