# 简答题

## 1. 描述 Vue 响应式原理。

- Vue 2.x 响应式基于 ES5 的 Object.defineProperty 实现。
  - 设置 data 后，遍历所有属性，转换为 Getter、Setter，从而在数据变化时进行视图更新等操作。
- Vue 3.x 响应式基于 ES6 的 Proxy 实现。

## 2. 描述 Vue 响应式原理中的 Vue 类、Observer 类、Dep 类、Watcher 类、Compiler 类。

1. Vue 类

- 功能：
  - 接收配置信息
  - 将 data 的属性转换成 Getter、Setter，并注入到 Vue 实例中。
  - 监听 data 中所有属性的变化，设置成响应式数据
  - 调用解析功能（解析模板内的插值表达式、指令等）

2. Observer 类

- 功能：
  - 通过数据劫持方式监视 data 中的属性变化，变化时通知消息中心 Dep。
  - 需要考虑 data 的属性也可能为对象，也要转换成响应式数据

3. Dep 类

- 为每个数据收集对应的依赖，存储依赖。
- 添加并存储订阅者。
- 数据变化时，通知所有观察者

4. Watcher 类

- 功能：
  - 实例化 Watch 时，往 dep 对象中添加自己
  - 当数据变化触发 dep， dep 通知所有对应的 Watcher 实例更新视图。

5. Compiler 类

- 功能：
  - 进行编译模板，并解析内部指令与插值表达式。
  - 进行页面的首次渲染
  - 数据变化后，重新渲染视图

## 3. 什么是 Virtural DOM。

Virtual DOM(虚拟 DOM)，是由普通的 JS 对象来描述 DOM 对象

## 4. Snabbdom 的使用流程

1. 导入需要的模块
2. init([]) 中注册模块
3. h() 函数的第二个参数处使用模块

## 5. Snabbdom 的核心介绍

- init() 设置模块，创建 patch() 函数
- 使用 h() 函数创建 JavaScript 对象(VNode)描述真实 DOM
- patch() 比较新旧两个 VNode
- 把变化的内容更新到真实 DOM 树
