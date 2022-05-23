# Vue3 学习 前期准备

## Vue3 文档

[官方文档](https://staging-cn.vuejs.org/guide/quick-start.html)

[Github 仓库](https://github.com/vuejs-translations/docs-zh-cn)

## VsCode-Vue3 官方插件

### Volar

Volar 和 Vetur 都用于 VsCode 解析 Vue 语法格式。

Volar 用于替代 Vue2 使用的 Vetur，用于为 Vue3 版本语法进行语言支持。

::: tip 建议
使用 Volar 时，需禁用 Vetur。
:::

#### 插件配置

文件-首选项-设置-扩展-Volar

<img src="/images/vue/457.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### Vue Devtools

- 5.x 支持 Vue2
- 6.x 兼容 Vue2，支持 Vue3

::: tip 建议
使用 6.x 版本时，禁用 5.x 版本
:::

## 项目构建工具

### VueCli

- VueCli v4.5.0+,支持 Vue3

#### 安装

```sh
npm install -g @vue/cli
# or
yarn global add @vue/cli
```

#### 查看版本

```sh
vue --version
# 版本低于4.5.0时升级
npm update -g @vue/cli
```

#### 项目创建

```sh
vue create study-vue3-by-cli
```

```sh
Vue CLI v5.0.4
? Please pick a preset:
> Default ([Vue 3] babel, eslint)
  Default ([Vue 2] babel, eslint)
  Manually select features
```

```sh
npm run serve
```

### Vite

[Vite 官方文档](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

```sh
npm create vite@latest
```

```sh
Need to install the following packages:
  create-vite@latest
Ok to proceed? (y) y
√ Project name: ... vite-project
√ Select a framework: » vue
√ Select a variant: » vue

Scaffolding project in D:\LaGou\Practise\vite-project...

Done. Now run:

  cd vite-project
  npm install
  npm run dev
```

## Eslint

代码检查和代码风格处理

### 安装

```sh
# 8.0+
npm i eslint -D
# 7.32.0
npm i eslint@7.32.0 -D
```

### 初始化配置

```sh
npx eslint --init
```

```sh
----------------------------------------------------------
? How would you like to use ESLint? ...
  To check syntax only
  To check syntax and find problems
> To check syntax, find problems, and enforce code style
----------------------------------------------------------
? What type of modules does your project use? ...
> JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these
----------------------------------------------------------
? Which framework does your project use? ...
  React
> Vue.js
  None of these
----------------------------------------------------------
? Does your project use TypeScript? » No
----------------------------------------------------------
? Where does your code run? ...  (Press <space> to select, <a> to toggle all, <i> to invert selection)
√ Browser
√ Node
----------------------------------------------------------
? How would you like to define a style for your project? ...
> Use a popular style guide
  Answer questions about your style
  Inspect your JavaScript file(s)
----------------------------------------------------------
? Which style guide do you want to follow? ...
  Airbnb: https://github.com/airbnb/javascript
> Standard: https://github.com/standard/standard
  Google: https://github.com/google/eslint-config-google
  XO: https://github.com/xojs/eslint-config-xo
----------------------------------------------------------
? What format do you want your config file to be in? ...
> JavaScript
  YAML
  JSON
----------------------------------------------------------
? Would you like to install them now with npm? » Yes
----------------------------------------------------------
......此处省略一万字
Successfully created .eslintrc.js file in D:\xxx\xxxx\xxxx\xxxx
```

### 配置.eslintrc 文件

[Vue 提供的 Eslint 配置 的官方文档](https://eslint.vuejs.org/user-guide/#usage)

```js
module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
}
```

### 配置 package.json 文件

```json
  "scripts": {
// ......
    "lint": "eslint ./src/**/*.{js,vue}  --fix"
  }
```

### 问题修复

```sh
$ npm run lint
> vite-project@0.0.0 lint> eslint ./src/**/*.{js,vue}  --fix

D:\LaGou\Practise\vite-project\src\components\HelloWorld.vue
  4:1  error    'defineProps' is not defined                 no-undef
  5:3  warning  Prop 'msg' requires default value to be set  vue/require-default-prop
```

[官方文档给出此问题的修复说明](https://eslint.vuejs.org/user-guide/#faq)

defineProps 之所以会出现报错，原因是 defineProps 此变量在编译时会自动被其他插件自动解析，而无需 import 导入。

但是 eslint 和 Vue 并无强关联，需要进行配置。

1. 安装插件

```sh
npm install --save-dev eslint vue-eslint-parser
```

2. 配置.eslintrc 文件

```js
module.exports = {
  extends: [
      ......
    'eslint:recommended',
  ],
  parser: 'vue-eslint-parser',
}
```

3. 给`msg`配置默认值

```js
// vite-project\src\components\HelloWorld.vue
defineProps({
  msg: {
    type: String,
    required: true,
    default: 'abc',
  },
})
```

## 组合式 API

组合式 API：代码的组织方式

- `Options API` ，简称`选项式 API`，Vue2+特性
- `Composition API` ，简称`组合式 API`，Vue3+新特性

```vue
<!-- Options API -->
<script>
export default {
  name: 'PageIndex',
  props: {},
  components: {},
  data() {
    return {}
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {},
  methods: {},
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
}
</script>
```

## Setup 基础用法

```vue
<script>
// vite-project\src\App.vue

export default {
  name: 'APP',
  // Vue3兼容Vue2的写法，但不推荐两版本写法组合使用
  // data () {
  //   return {
  //     dataValue: 'data 示例内容'
  //   }
  // },
  setup () {
    console.log('setup')
    // 在setup里访问不了data()里的数据
    // console.log(this.dataValue)// 报错
    const setupValue = 'setup 示例内容' //无法修改
    return {
      setupValue
    }
  },
  beforeCreate () {
    console.log('beforeCreate')
  }
}
</script>

<template>
  <div v-text="dataValue" />
  <div v-text="setupValue" />
</template>

```

::: warning 注意1
在setup里访问不了data()里的数据
```js
console.log(this.dataValue)// 报错
```
:::

::: warning 注意2
setup()早于beforeCreate()先执行
```
console： setup
          beforeCreate
```          
:::
::: warning 注意2
setup()里的数据不是响应式数据，在Vue Devtools工具里无法修改
```js
const setupValue = 'setup 示例内容' //无法修改
```
:::

## Setup 语法糖

配置Volar后，Setup 语法糖里无需return,无需在外部写created() {}、methods: {}、created() {}等生命周期函数，可以在`Setup`内部书写

<img src="/images/vue/458.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## ref 响应式API

::: tip 提示
ref 可对任意类型数据进行响应式设置
:::

由于在Vue3中，setup()内部不能再访问data()里的数据，this不能再使用，且内部的数据不可被修改。Vue3提供了`ref API`设置响应式数据

::: warning 注意
使用ref API不需要补充.value
:::

```vue
<!-- vite-project\src\App.vue -->

<script setup>
// 注意1：引入ref
import { ref } from 'vue'

// 注意2：设置响应式数据，需要用ref()进行包裹需要设置的数据
const setupValue = ref('setup 示例内容')
const count = ref(0)
const arr = ref([1, 2])


const handleClick = () => {
// 注意3：修改数据需要补充.value
  setupValue.value = '新的内容'
}
const handleCountChage = () => {
  count.value++
}
const handleArrChange = () => {
  // arr.value[0] = 10
  // arr.value.push(1)
  // arr.value = []
  arr.value.length = 0
}
</script>

<template>
  <div v-text="setupValue" />
  <button @click="handleClick">
    修改字符串
  </button>
  <div v-text="count" />
  <button @click="handleCountChage">
    修改数字
  </button>
  <div v-text="arr" />
  <button @click="handleArrChange">
    修改数组
  </button>
</template>

```

<img src="/images/vue/085.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## reactive 深度-响应式API

由于Vue3的响应式是给予`Proxy`实现，`reactive`就是直接给予传入对象创建`Proxy`实例。

::: tip 提示
reactive 可对数据进行`深度`响应式设置,但对数据类型有要求，只能是`对象结构`。例如set结构、[数组对象结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)......
:::


::: warning 注意
使用reactive API不需要补充.value
:::


```vue
<!-- vite-project\src\App.vue -->


<script setup>
import { reactive, ref } from 'vue'

const count = ref(0)
// ref()相当于返回一个Proxy对象
// const count= new Proxy({
//   value:0
// })
const dataList = reactive({
  // 自动脱ref()
  count,
  arr: [],
  obj: {
    name: '开发区彭于晏',
    age: 18
  }
})

const handleCount1Change = () => count.value++
// 注意1：使用reactive API不需要补充.value
const handleCount2Change = () => dataList.count++
const handleAgeChange = () => dataList.obj.age++
</script>

<template>
  <div v-text="dataList.count" />
  <button @click="handleCount1Change">
    Count1
  </button>
  <button @click="handleCount2Change">
    Count2
  </button>
  <div v-text="dataList.obj.age" />
  <button @click="handleAgeChange">
    Age
  </button>
</template>

<style></style>

```

<img src="/images/vue/086.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## shallowReactive 浅度-响应式API

::: warning 注意
shallowReactive API对`对象数据`只能覆盖整体数据，而不能对`对象数据`内部数据进行读写。

`对象数据`里的整体数据不是响应式数据
:::

```vue
<!-- vite-project\src\App.vue -->

<script setup>
import { shallowReactive } from 'vue'

const dataList = shallowReactive({
  count: 0,
  obj: {
    name: '刘德华',
    age: 18
  }
})
const handleCountChange = () => {
  dataList.count++
}
const handleObjChange = () => {
  // dataList.obj = { a: 1, b: 2, c: 3 }
  dataList.obj.age = 15
}
</script>

<template>
  <div v-text="dataList.count" />
  <button @click="handleCountChange">
    Count
  </button>
  <div v-text="dataList.obj" />
  <button @click="handleObjChange">
    Obj
  </button>
</template>

<style></style>

```

<img src="/images/vue/087.gif" style="width: 100%; display:inline-block; margin: 0 ;">
