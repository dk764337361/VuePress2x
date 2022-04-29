# 自定义指令

[官方文档：自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html#ad)

- 指令用于简化 DOM 操作，相当于对基础 DOM 操作的一种封装。
- 当我们希望使用一些内置指令不具备的 DOM 功能时，可以进行自定义指令设置。

## 自定义全局指令 directive

### 指令参数

- el 参数：是指用于该指令的元素节点
- binding 参数：是指“该自定义指令的相关信息”

### 案例：输入框自动获取焦点

- 指的是可以被任意 Vue 实例或组件使用的指令。

  <img src="/images/vue/065.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/066.jpg" style="width: 40%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/067.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <input type="text" v-focus.a.b="100+1" />
    </div>
    <!-- <div id="app2">
      <input type="text" v-focus />
    </div> -->

    <script src="lib/vue.js"></script>
    <script>
      Vue.directive(
        //directive自定义全局指令
        "focus",
        {
          //inserted vue的钩子函数
          //el节点元素，binding
          inserted(el, binding) {
            console.log(el);
            console.log(binding);
            el.focus(); //JS内置方法：focus()让元素获取焦点
          },
        }
      );
      new Vue({
        el: "#app",
        data: {},
      });
      // new Vue({
      //   el: "#app2",
      //   data: {},
      // });
    </script>
  </body>
</html>
```

## 自定义局部指令 directives

- 指的是可以在当前 Vue 实例或组件内使用的指令。

  <img src="/images/vue/068.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/066.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <input type="text" v-focus.a.b="100+1" />
    </div>
    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {},
        directives: {
          focus: {
            inserted(el) {
              el.focus();
            },
          },
        },
      });
    </script>
  </body>
</html>
```

### 注意

::: warning 注意
自定义局部函数只能用在局部 Vue 实例中
:::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <input type="text" v-focus.a.b="100+1" />
    </div>
    <div id="app2">
      <input type="text" v-focus.a.b="100+1" />
    </div>
    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {},
        directives: {
          focus: {
            inserted(el) {
              el.focus();
            },
          },
        },
      });

      new Vue({
        el: "#app2",
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/069.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 钩子函数详解

[官方文档-钩子函数](https://cn.vuejs.org/v2/guide/custom-directive.html#%E9%92%A9%E5%AD%90%E5%87%BD%E6%95%B0)
