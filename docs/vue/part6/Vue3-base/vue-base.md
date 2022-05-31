# 新特性详解

## 官方文档传送门

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

::: warning 注意
Vue3 需要 VueCli v4.5.0+ 的支持
:::

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
    'standard'
  ],
  parser: 'vue-eslint-parser',
}
```

1. 给`msg`配置默认值

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
  setup() {
    console.log('setup')
    // 在setup里访问不了data()里的数据
    // console.log(this.dataValue)// 报错
    const setupValue = 'setup 示例内容' //无法修改
    return {
      setupValue,
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
}
</script>

<template>
  <div v-text="dataValue" />
  <div v-text="setupValue" />
</template>
```

::: warning 注意 1
在 setup 里访问不了 data()里的数据

```js
console.log(this.dataValue) // 报错
```

:::

::: warning 注意 2
setup()早于 beforeCreate()先执行

```
console： setup
          beforeCreate
```

:::
::: warning 注意 2
setup()里的数据不是响应式数据，在 Vue Devtools 工具里无法修改

```js
const setupValue = 'setup 示例内容' //无法修改
```

:::

## Setup 语法糖

配置 Volar 后，Setup 语法糖里无需 return,无需在外部写 created() {}、methods: {}、created() {}等生命周期函数，可以在`Setup`内部书写

<img src="/images/vue/458.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## ref 【响应式 API】

::: tip 提示
ref 可对任意类型数据进行响应式设置
:::

由于在 Vue3 中，setup()内部不能再访问 data()里的数据，this 不能再使用，且内部的数据不可被修改。Vue3 提供了`ref API`设置响应式数据

::: warning 注意
使用 ref API 不需要补充.value
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

## reactive【深度响应式 API】

由于 Vue3 的响应式是给予`Proxy`实现，`reactive`就是直接给予传入对象创建`Proxy`实例。

::: tip 提示
reactive 可对数据进行`深度`响应式设置,但对数据类型有要求，只能是`对象结构`。例如 set 结构、[数组对象结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)......
:::

::: warning 注意
使用 reactive API 不需要补充.value
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
    age: 18,
  },
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

## shallowReactive【浅度响应式 API】

::: warning 注意
shallowReactive API 对`对象数据`只能覆盖整体数据，而不能对`对象数据`内部数据进行读写。

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
    age: 18,
  },
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

## readonly【深度响应式 API】

`readonly` 用于创建对象的只读代理（对象内部数据也是只读），数据非响应式。

```vue
<!-- vite-project\src\App.vue -->

<script setup>
import { reactive, readonly } from 'vue'

const reactiveObj = reactive({
  count: 0,
  obj: {
    name: '刘德华',
    age: 18,
  },
})
const dataList = readonly(reactiveObj)
const handleCountChange = () => {
  dataList.count++
}
const handleObjChange = () => {
  dataList.obj.name = '新名词'
}
</script>

<template>
  <div v-text="dataList.count" />
  <button @click="handleCountChange">
    Count
  </button>
  <div v-text="dataList.obj.name" />
  <button @click="handleObjChange">
    Obj
  </button>
</template>

<style></style>
```

<img src="/images/vue/088.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## shallowReadonly【浅度响应式 API】

`shallowReadonly` 用于浅只读操作，对象数据的第一层数据不可修改，对象内部数据可修改（内部数据非响应式）

```vue
<!-- vite-project\src\App.vue -->

<script setup>
import { shallowReadonly } from 'vue'

const dataList = shallowReadonly({
  count: 0,
  obj: {
    name: '刘德华',
    age: 18,
  },
})
const handleCountChange = () => {
  dataList.count++
}
const handleObjChange = () => {
  dataList.obj.name = '新名词'
  console.log(dataList.obj.name)
}
</script>

<template>
  <div v-text="dataList.count" />
  <button @click="handleCountChange">
    Count
  </button>
  <div v-text="dataList.obj.name" />
  <button @click="handleObjChange">
    Obj
  </button>
</template>

<style></style>
```

<img src="/images/vue/089.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## 检测响应式 API 的方法

### isReactive()

### isReadonly()

### isProxy()

检查对象是否是由 reactive 或 readonly 创建的 proxy。

```vue
<!-- vite-project\src\App.vue -->

<script setup>
import {
  isReactive,
  isReadonly,
  reactive,
  readonly,
  ref,
  shallowReadonly,
  isProxy,
  shallowReactive,
} from 'vue'

const count = ref(0)
const dataList = reactive({
  count: 0,
  obj: {
    name: '刘德华',
    age: 18,
  },
})

const dataList2 = shallowReactive({
  name: 'rose',
})

const testData = readonly({
  title: '测试数据',
})
const testData2 = shallowReadonly({
  title: '测试数据',
})

//  - isReactive()
console.log('isReactive:' + isReactive(count.value)) // false
console.log('isReactive:' + isReactive(count)) // false
console.log('isReactive:' + isReactive(dataList)) // true
console.log('isReactive:' + isReactive(testData)) // false

// - isReadonly()
console.log('isReadonly:' + isReadonly(count.value)) // false
console.log('isReadonly:' + isReadonly(count)) // false
console.log('isReadonly:' + isReadonly(dataList)) // false
console.log('isReadonly:' + isReadonly(testData)) // true

// - shallowReadonly()
console.log('shallowReadonly:' + isReadonly(testData2)) // true

// - isProxy
console.log('isProxy:' + isProxy(dataList)) // true
console.log('isProxy:' + isProxy(dataList)) // true
console.log('isProxy:' + isProxy(testData)) // true
console.log('isProxy:' + isProxy(testData2)) // true
console.log('isProxy:' + isProxy(count)) // false
console.log('isProxy:' + isProxy(count.value)) // false

console.log(dataList)
console.log(count)
</script>

<template />

<style></style>
```

## toRefs 属性响应式处理

toRefs 用于将`（整个）响应式对象`转换为普通对象，且属性均为 ref 类型(响应式)

::: tip 提示
最大的作用是解决`响应式函数`通过`解构`出来的属性数据不具有响应式
:::

```vue
<script setup>
import { reactive, toRefs } from 'vue'

// const dataList = reactive({
//   count: 0,
//   str: '示例'
// })

// const { count, str } = toRefs(dataList)
// const handleCountChange = () => count.value++

// 封装一个函数（组合式API函数）
const userSomeData = () => {
  const someData = reactive({
    count: 0,
    str: '示例',
  })

  // 数据处理
  someData.count += 3
  someData.str += '123'

  // 将被外界需要的数据返回
  return toRefs(someData)
}

// 外界使用功能
// eslint-disable-next-line prefer-const
let { count } = userSomeData()
const handleCountChange = () => count.value++
</script>

<template>
  <div v-text="count" />
  <button @click="handleCountChange">
    Count
  </button>
</template>

<style></style>
```

<img src="/images/vue/091.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## toRef 属性响应式处理

toRef 用于将响应式对象的`（某个）特定属性`转换为 ref，且属性均为 ref 类型(响应式)

```vue
<script setup>
import { reactive, toRef } from 'vue'

const dataList = reactive({
  count: 0,
  str: '示例',
})

const count = toRef(dataList, 'count')
const handleCountChange = () => count.value++
</script>

<template>
  <div v-text="count" />
  <div v-text="dataList.count" />
  <button @click="handleCountChange">
    Count
  </button>
</template>

<style></style>
```

<img src="/images/vue/090.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## [toRaw](https://v3.cn.vuejs.org/api/basic-reactivity.html#toraw) 响应式数据转换普通数据

返回 reactive 或 readonly 代理的原始对象,用于临时使用

[使用案例](/vue/part6/project/Shopping&Orders.html#_3-%E7%82%B9%E5%87%BB%E5%88%97%E8%A1%A8-%E9%80%89%E5%8F%96%E6%95%B0%E6%8D%AE)

## computed

计算属性用于减少视图中的复杂逻辑

```vue
<script setup>
import { computed, ref } from 'vue'

const num = ref(0)
const count = computed(() => {
  console.log('执行了计算属性')
  return `物品的个数为：${num.value}`
})

const handleCountChange = () => num.value++
</script>

<template>
  <div v-text="count" />
  <div v-text="count" />
  <div v-text="count" />
  <button @click="handleCountChange">
    Count
  </button>
</template>

<style></style>
```

<img src="/images/vue/092.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 计算属性的 getter 和 setter

```vue
<script setup>
import { computed, ref } from 'vue'

const num = ref(0)

const count = computed({
  get: () => {
    console.log('执行了计算属性的get')
    return `物品的个数为：${num.value}`
  },
  set: (newValue) => {
    console.log(`执行了计算属性的set,被修改的新数据为：${newValue}`)
  },
})

const handleCountChange = () => {
  // set
  count.value = 3
  // get
  num.value = count.value
}
</script>

<template>
  <div v-text="count" />
  <button @click="handleCountChange">
    Count
  </button>
</template>

<style></style>
```

<img src="/images/vue/093.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## watch 侦听器【响应式 API】

侦听器用于侦听数据变化并执行相应代码

- 参数一：匿名函数。设置要监听的数据
- 参数二：回调函数。用于监听数据数据变化
- 参数三：对 watch 的配置
  - deep: false // 深度嵌套对象或数组监听，默认 false
  - immediate: false // 立即监听（此时未触发数据更改，返回 undefined），默认 false
  - flush: 'pre'
    - 'pre'：默认为 'pre'：
    - 'post'：当数据变化后，updata 也结束，进行 DOM 进行处理
    - 'sync'：为每个更改都强制触发侦听器，尽管这通常是不推荐的

### 侦听响应式对象的某个源

```vue
<script setup>
import { reactive, watch } from 'vue'

// 侦听某个源（reactive 中的某个属性(普通数据)）
const dataList = reactive({
  count: 0,
  num: 10,
})
watch(
  // 参数一：watch 的return 返回值
  () => dataList.num,
  // 参数二：watch 的回调函数
  (newValue, oldValue) => {
    console.log(`num的值变了：${newValue}-${oldValue}`)
  }
)

const handleNumChange = () => dataList.num++
</script>

<template>
  <div v-text="dataList.num" />
  <button @click="handleNumChange">
    Count
  </button>
</template>

<style></style>
```

<img src="/images/vue/094.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 侦听单个数据源

```vue
<script setup>
import { reactive, watch, ref } from 'vue'

// 侦听单个源（响应式数据）
const dataList = reactive({
  count: 0,
  num: 10,
})
const count = ref(0)
watch(
  // 参数一：watch 的return 返回值
  // - 监听整个对象（单个源）
  dataList,
  // - 单个源
  // count,
  // 参数二：watch 的回调函数
  (newValue, oldValue) => {
    console.log('num的值变了：', newValue, oldValue)
  }
)

const handleNumChange = () => dataList.num++
</script>

<template>
  <div v-text="dataList.num" />
  <button @click="handleNumChange">
    Count
  </button>
</template>

<style></style>
```

<img src="/images/vue/095.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 侦听多个数据源

```vue
<script setup>
import { reactive, watch, ref } from 'vue'

// 侦听多个源
const data = reactive({
  num: 0,
})
const count = ref(0)

watch(
  [() => data.num, count],
  ([newNum, newCount], [oldNum, oldCount]) => {
    console.log('num的变化了', newNum, oldNum)
    console.log('count的变化了', newCount, oldCount)
  },
  // 参数三：对watch的配置
  {
    deep: true, // 深度嵌套对象或数组监听，默认false
    immediate: true, // 立即监听（此时未触发数据更改，返回undefined），默认false
    flush: 'sync',
    //   - 'pre'：默认为 'pre'：
    //   - 'post'：当数据变化后，updata也结束，进行DOM进行处理
    //   - 'sync'：为每个更改都强制触发侦听器，尽管这通常是不推荐的
  }
)

const handleNumChange = () => {
  data.num++
  count.value++
}
</script>

<template>
  <div v-text="data.num" />
  <div v-text="count" />
  <button @click="handleNumChange">
    Count
  </button>
</template>

<style></style>
```

<img src="/images/vue/096.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## watchEffect

::: tip 与 watchh 的区别

- 无需设置数据，自动对回调内的数据进行依赖收集的一种侦听器。和 watch 参数三的`flush`的`immediate`属性类似。
- 无法获得状态前后的值
  :::

- 参数一：回调函数。用于监听数据数据变化
- 参数二：和 watch 的参数三相同

```vue
<script setup>
import { reactive, ref, watchEffect } from 'vue'

const data = reactive({
  num: 0,
})

const count = ref(0)

watchEffect(() => {
  console.log(`使用了 count: ${count.value}与num:${data.num}`)
})

const handleDataChange = () => {
  count.value++
  data.num++
}
</script>

<template>
  <div v-text="data.num" />
  <div v-text="count" />
  <button @click="handleDataChange">
    Count
  </button>
</template>

<style></style>
```

<img src="/images/vue/097.gif" style="width: 100%; display:inline-block; margin: 0 ;">
