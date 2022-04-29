# 代码规范与⻛格指南

- 规范的代码具有更好的阅读性、更好的可维护性，更利于多⼈协作开发。

  - 常⻅的“代码标准”(VueCLI 手动选择插件时已包含)
    - [JavaScript Standard Style](https://standardjs.com/)
    - [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

- 如果希望团队开发者都遵守同⼀个代码规范，不能只靠⼝头约定，⽽是要通过⼯具进⾏约束，ESLint 是⾮
  常流⾏的代码校验⼯具。

- 配置⽂件`.eslintrc` 内容如下：

```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential", // eslint-plugin-vue ： VUE的官方eslint插件
    "@vue/standard", // @vue/eslint-config-standa ：standardjs官方eslint插件
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
```

- eslint-plugin-vue
  - Vue 官⽅提供的 ESLint 插件。
  - 官⽅⽂档：https://eslint.vuejs.org/
  - ⽤于查找 `<template>` 、`<script>` 、.vue ⽂件中的：
    - 语法错误
    - Vue.js 指令的错误⽤法
    - 违反 Vue ⻛格指南的代码

* @vue/eslint-config-standard
  - 官⽅⽂档：https://standardjs.com/readme-zhcn.html
  - 是⼀种⽆需配置，可便捷的统⼀代码⻛格的⽅式，具体⻅官⽅⽂档细则。
    - 主要注意，代码不能有分号。
      设置完毕后，在 `npm run serve` 的服务器启动时保存代码会⾃动对代码进⾏ lint，也可以通过 `npm run lint` 命令执⾏ ESLint 的代码校验与修复。

## 自定义校验规则

- ESLint 官⽹ `->` ⽤户指南 `->` 规则 中提供了每种规则的⽤法以及⽀持的选项。
- ESLint 中⽂官⽅⽂档：`https://cn.eslint.org/`
  - ⾸先得到规则名称（常⻅于报错时，示例为代码添加 ; 报错）

<img src="/images/vue/278.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- ESLint 配置⽂件的 rules 属性可以对规则进⾏⾃定义设置，例如关闭分号的报错。

```js
// .eslintrc
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 'semi': 'off' // 关闭加分号报错
    // 'semi': ['error', 'always'] // 开启不加分号报错
  },
};
```

::: warning 注意
修改 ESLint 配置⽂件后，需要重启（静态⽂件服务器）⽣效。

如果修改规则后，重启却不⽣效，可以将 node_modules/.cache 的规则缓存⽬录删除后重启即可。

:::


