# Virtual-DOM

<!-- <img src="/images/vue/441.jpg" style="width: 100%; display:inline-block; margin: 0 ;"> -->

## 目标

- 了解什么是虚拟 DOM，以及虚拟 DOM 的作用
- 使用 Snabbdom 库实现 Virtual-DOM
  - Snabbdom 的基本使用
  - Snabbdom 的源码解析

## 什么是 Virtual DOM

- Virtual DOM(虚拟 DOM)，是由普通的 JS 对象来描述 DOM 对象

```js
{
    sel: "div",
    data: {},
    children: undefined,
    text: "Hello Virtual DOM",
    elm: undefined,
    key: undefined
}
```

- 真实 DOM 成员

```html
<body>
  <div id="app"></div>
  <script>
    let element = document.querySelector('#app')
    let s = ''
    for (var key in element) {
      s += key + ','
    }
    console.log(s)
  </script>
</body>
```

<img src="/images/vue/442.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 为什么要使用 Virtual DOM

- 前端开发刀耕火种的时代(DOM 书写复杂、性能开销大)
- MVVM 框架解决视图和状态同步问题
- 模板引擎可以简化视图操作，没办法跟踪状态
- 虚拟 DOM 跟踪状态变化
- 参考 github 上 `virtual-dom` 的动机描述
  - 虚拟 DOM 可以维护程序的状态，跟踪上一次的状态
  - 通过比较前后两次状态差异更新真实 DOM

### 案例演示

- 通过演示对比效果
  - [JQ 操作普通 DOM 方式](https://codesandbox.io/s/jquery-dom-demo-yr65q)
  - [virtual-dom 操作方式](https://codesandbox.io/s/virtual-dom-demo-obk5t)

## 虚拟 DOM 的作用

- 维护视图和状态的关系
- 复杂视图情况下提升渲染性能
- 跨平台
  - 浏览器平台渲染 DOM
  - 服务端渲染 SSR(Nuxt.js/Next.js)
  - 原生应用(Weex/React Native)
  - 小程序(mpvue/uni-app)等

<img src="/images/vue/443.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

## 主流虚拟 DOM 库
- [Snabbdom](https://github.com/snabbdom/snabbdom)
  - Vue.js 2.x 内部使用的虚拟 DOM 就是改造的 Snabbdom
  - 大约 200 SLOC (single line of code)
  - 通过模块可扩展
  - 源码使用 TypeScript 开发
  - 最快的 Virtual DOM 之一
- [virtual-dom](https://github.com/Matt-Esch/virtual-dom)
  - 此库太久没更新
