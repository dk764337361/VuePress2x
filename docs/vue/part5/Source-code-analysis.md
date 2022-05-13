# Snabbdom 库 源码解析

## 如何学习源码

- 宏观了解
- 带着目标看源码
- 看源码的过程要不求甚解
- 调试
- 参考资料

## Snabbdom 的核心

- `init()` 设置模块，创建 patch() 函数
- 使用 `h()` 函数创建 JavaScript 对象(VNode)描述真实 DOM
- `patch()` 比较新旧两个 VNode
- 把变化的内容更新到真实 DOM 树

### 源码地址

- https://github.com/snabbdom/snabbdom
- 当前版本：v2.1.0
- 克隆代码

```sh
git clone -b v2.1.0 --depth=1 https://github.com/snabbdom/snabbdom.git
```

### 修改源码错误

```js
// examples\reorder-animation\index.js

 h('div.btn.rm-btn', {
      on: {
        click () {
          remove(movie)
        }
      }
    }, 'x'),


 // h('a.btn.rank', { class: { active: sortBy === 'rank' }, on: { click: [changeSort, 'rank'] } }, 'Rank'),
 // h('a.btn.title', { class: { active: sortBy === 'title' }, on: { click: [changeSort, 'title'] } }, 'Title'),
 // h('a.btn.desc', { class: { active: sortBy === 'desc' }, on: { click: [changeSort, 'desc'] } }, 'Description'),
 h('a.btn.rank', {
   class: { active: sortBy === 'rank' },
   on: {
     click () {
       changeSort('rank')
     }
   }
 }, 'Rank'),
 h('a.btn.title', {
   class: { active: sortBy === 'title' },
   on: {
     click () {
       changeSort('title')
     }
   }
 }, 'Title'),
 h('a.btn.desc', {
   class: { active: sortBy === 'desc' },
   on: {
     click () {
       changeSort('desc')
     }
   }
 }, 'Description'),
```

## h 函数介绍

- 作用：创建 VNode 对象
- Vue 中的 h 函数

<img src="/images/vue/444.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 函数重载

- 参数个数或参数类型不同的函数
- JavaScript 中没有重载的概念
- TypeScript 中有重载，不过重载的实现还是通过代码调整参数。

### 函数重载-参数个数

<img src="/images/vue/445.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 函数重载-参数类型

<img src="/images/vue/446.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

## vnode

vnode 里定义了虚拟节点里应该有哪些属性

## patch 整体过程分析

- patch(oldVnode, newVnode)
- 把新节点中变化的内容渲染到真实 DOM，最后返回新节点作为下一次处理的旧节点
- 对比新旧 VNode 是否相同节点(节点的 key 和 sel 相同)
- 如果不是相同节点，删除之前的内容，重新渲染
- 如果是相同节点，再判断新的 VNode 是否有 text，如果有并且和 oldVnode 的 text 不同，直接更新文本内容
- 如果新的 VNode 有 children，判断子节点是否有变化，

## init 函数

## patch 函数

## patchVnode

## updateChildren 整体分析

## Diff 算法

- 虚拟 DOM 中的 Diff 算法
- 查找两颗树每一个节点的差异

<img src="/images/vue/447.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

- Snabbdom 根据 DOM 的特点对传统的 diff 算法做了优化
  - DOM 操作时候很少会跨级别操作节点
  - 只比较同级别的节点

<img src="/images/vue/448.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 执行过程

- 在对开始和结束节点比较的时候，总共有四种情
  - oldStartVnode / newStartVnode (旧开始节点 / 新开始节点)
  - oldEndVnode / newEndVnode (旧结束节点 / 新结束节点)
  - oldStartVnode / newEndVnode (旧开始节点 / 新结束节点)
  - oldEndVnode / newStartVnode (旧结束节点 / 新开始节点)

<img src="/images/vue/449.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

#### 1. 新旧开始节点

- 如果新旧开始节点是 sameVnode (key 和 sel 相同)
  - 调用 patchVnode() 对比和更新节点
    - 把旧开始和新开始索引往后移动 oldStartIdx++ / newStartIdx++

<img src="/images/vue/450.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

#### 2. 旧开始节点 / 新结束节点

- 调用 patchVnode() 对比和更新节点
- 把 oldStartVnode 对应的 DOM 元素，移动到右边，更新索引

<img src="/images/vue/451.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

#### 3. 旧结束节点 / 新开始节点

- 调用 patchVnode() 对比和更新节点
- 把 oldEndVnode 对应的 DOM 元素，移动到左边，更新索引

<img src="/images/vue/452.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

#### 4. 非上述四种情况

<img src="/images/vue/453.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- 遍历新节点，使用 newStartNode 的 key 在老节点数组中找相同节点
- 如果没有找到，说明 newStartNode 是新节点
  - 创建新节点对应的 DOM 元素，插入到 DOM 树中
- 如果找到了
  - 判断新节点和找到的老节点的 sel 选择器是否相同
  - 如果不相同，说明节点被修改了
    - 重新创建对应的 DOM 元素，插入到 DOM 树中
  - 如果相同，把 elmToMove 对应的 DOM 元素，移动到左边

### 循环结束

- 当老节点的所有子节点先遍历完 (oldStartIdx > oldEndIdx)，循环结束
- 新节点的所有子节点先遍历完 (newStartIdx > newEndIdx)，循环结束

#### 1. oldStartIdx > oldEndIdx

- 如果老节点的数组先遍历完(oldStartIdx > oldEndIdx)
  - 说明新节点有剩余，把剩余节点批量插入到右边

<img src="/images/vue/454.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

#### 2. newStartIdx > newEndIdx
- 如果新节点的数组先遍历完(newStartIdx > newEndIdx)
  - 说明老节点有剩余，把剩余节点批量删除

<img src="/images/vue/455.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## updateChildren

### 调试 updateChildren

#### 调试带 key 的情况

#### 节点对比过程

<img src="/images/vue/456.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

#### Key 的意义
