# 简答题

## 1.库与框架的区别是什么？

## 2.Vue.js 的核心特性有哪些？

- 数据驱动视图
- 组件化开发

## 3.什么是数据驱动视图？

- 单向数据绑定：数据变化会自动更新到对应元素中，无需手动操作 DOM，。

- 对于输入框等可输入元素，可设置双向数据绑定。

- 双向数据绑定是在数据绑定基础上，可自动将元素输入内容更新给数据，实现数据与元素内容的双向绑定。

## 4.MVVM 模型各部分含义是什么，在 Vue.js 中分别对应哪些功能？

- Model 层，代表数据
- View 层， 代表视图模板
- ViewModel 层，代表业务逻辑处理代码

## 5.el 选项的作用是什么，可以设置哪几种值？

### 作用：

- 用于选取一个 DOM 元素作为 Vue 实例的挂载目标。
- 只有挂载元素内部才会被 Vue 进行处理，外部为普通 HTML 元素。
- 代表 MVVM 中的 View 层（视图）

### 可以设置哪几种值？

可以为 CSS 选择器格式的字符串 或 HTMLElement 实例，但不能为 html 或 body

## 6.设置在 data 中的数据有什么特点？

- 用于存储 Vue 实例需要使用的数据，值为对象类型。
- data 中的数据可以通过 vm.$data.数据 或 vm.数据 访问。
- data 中的数据可以直接在视图中通过插值表达式访问。
- data 中的数据为响应式数据，在发生改变时，视图会自动更新。

## 7.Vue.set() 可以解决什么问题？

- data 中存在数组时，索引操作与 length 操作无法自动更新视图，这时可以借助 Vue.set() 方法替代操作。

## 8.插值表达式内有哪些书写要求？

- 挂载元素可以使用 Vue.js 的模板语法，模板中可以通过插值表达式为元素进行动态内容设置，
- 插值表达式只能书写在标签内容区域，可以与其它内容混合。
- 内部只能书写 JavaScript 表达式，不能书写语句。

## 9.methods 的作用是什么？

用于存储需要在 Vue 实例中使用的函数。

## 10.谈谈你对指令的理解。

框架把对 DOM 的操作封装成框架指令

## 11.常用的内容处理指令有哪些？

- v-once 指令
- v-text 指令
- v-html 指令

## 12.常用的属性绑定操作有哪些？

- v-bind 指令用于动态绑定 HTML 属性。
- Class 绑定
- Style 绑定

## 13.v-for 指令的注意点？

用于遍历数据渲染结构，常用的数组、对象、单个数值均可遍历。

## 14.v-if 与 v-show 的区别？

- v-show 用于元素的隐藏和显示
- v-if 用于元素的移除和创建

## 15.如何绑定事件？

- v-on
- v-model

## 16.谈谈你对双向数据绑定的理解？

- 当数据发生变化的时候，视图也就发生变化，当视图发生变化的时候，数据也会跟着同步变化

## 17.如何设置自定义指令？

- 自定义全局指令 directive
- 自定义局部指令 directives

## 18.过滤器通常用来做什么？

- 全局过滤器 filter 或局部过滤器 filters 用于进行文本内容格式化处理。

## 19.methods 与 computed 有哪些区别？

- computed 具有缓存型，methods 没有。
- computed 通过属性名访问，methods 需要调用。
- computed 仅适用于计算操作。

## 20.如何设置侦听器？

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>

    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          title: "这是内容",
          obj: {
            content1: "内容1",
            content1: "内容2",
          },
        },
        watch: {
          title(val, oldVal) {
            console.log("title被修改了", val, oldVal);
          },
          obj: {
            deep: true,
            handler() {
              console.log("obj被修改了");
            },
          },
        },
      });
    </script>
  </body>
</html>
```
