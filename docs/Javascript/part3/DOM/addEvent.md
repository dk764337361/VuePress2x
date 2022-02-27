# 掌握更多 DOM 事件操作方法
- 更多事件类型
  - MDN web 事件参考：https://developer.mozilla.org/zh-CN/docs/Web/Events

## 注册事件

### 方法一：element.addEventListener()

- element.addEventListener() 方法。
- 参数：
  - 第一个参数：事件类型的字符串（直接书写”click”，不需要加 on）
  - 第二个参数：事件函数
- 同一个元素可以多次绑定事件监听，同一个事件类型可以注册多个事件函数

::: warning 注意
兼容性问题：不支持 IE9 以下的浏览器
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
    <input type="button" value="点击" id="btn" />
    <script>
      var btn = document.getElementById("btn");
      // DOM0 级事件
      // 绑定事件的方式
      // btn.onclick = function () {
      //   alert(1);
      // };
      // 绑定多次相同的事件
      // btn.onclick = function () {
      //   alert(2);
      // };

      // DOM 2 级事件绑定方式
      btn.addEventListener("click", function() {
        alert(1);
      });
      // 多次绑定相同的事件类型，事件会根据书写的顺序进行一个事件排队
      btn.addEventListener("click", clickEvent);
      function clickEvent() {
        alert(2);
      }
      // 方法不支持 IE 9 以下的浏览器
    </script>
  </body>
</html>
```

### 方法二：element.attachEvent()

element.attachEvent() 方法。

- 参数：
  - 第一个参数：事件类型的字符串（需要加 on）
  - 第二个参数：事件函数
- 同一个元素可以多次绑定事件监听，同一个事件类型可以注册多个事件函数

::: warning 注意

- 兼容性问题：只支持 IE10 及以下的浏览器
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
    <input type="button" value="点击" id="btn" />
    <script>
      var btn = document.getElementById("btn");
      // DOM 2 级事件绑定方式
      // 兼容：IE 10 及以下浏览器
      // IE8 及以下的浏览器处理事件队列时，会出现顺序错乱
      btn.attachEvent("onclick", function() {
        alert(3);
      });
      btn.attachEvent("onclick", clickEvent);
      function clickEvent() {
        alert(4);
      }
    </script>
  </body>
</html>
```

## 注册事件的兼容写法

- 自定义一个注册事件函数
- 参数：事件源，事件类型（不加 on），事件函数
- IE9 及以上的浏览器，使用 addEventListener 方法
- IE9 以下的浏览器，使用 attachEvent 方法
- 判断浏览器时，不需要判断它的版本，可以检测浏览器能力
- 浏览器能力检测：将某个方法的调用作为 if 语句的判断条件，如果浏览器认识该方法返回 true，否则返回 false。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="button" value="点击" id="btn" />
    <script>
      var btn = document.getElementById("btn");
      // 调用函数
      addEvent(btn, "click", function() {
        alert(1);
      });
      // DOM 2 级事件绑定方式
      // 自己制作一个兼容所有浏览器的绑定事件的函数
      // 参数：事件源，事件类型，事件函数
      function addEvent(ele, type, fn) {
        // IE 9 及以上的浏览器和其他浏览器，使用 addEventListener 方法
        // IE 9 以下的浏览器，使用 attachEvent 方法
        // 浏览器能力检测
        if (ele.addEventListener) {
          ele.addEventListener(type, fn);
        } else if (ele.attachEvent) {
          ele.attachEvent("on" + type, fn);
        }
      }
    </script>
  </body>
</html>
```

## 移除事件

### 方法一：element.onclick = null

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="button" value="点击" id="btn" />
    <script>
      var btn = document.getElementById("btn");
      // 绑定事件
      btn.onclick = function() {
        alert(1);
      };
      // 解除绑定方法
      btn.onclick = null;
    </script>
  </body>
</html>
```

### 方法二：element.removeEventListener()

- element.removeEventListener() 方法。
- 参数：
- 第一个参数：事件类型的字符串（直接书写”click”，不需要加 on）
- 第二个参数：事件函数引用名

::: danger 注意
没有办法移除一个匿名函数，所以在注册事件时需要单独声明一个有函数名的事件函数。
:::

::: warning 注意

兼容性问题：不支持 IE9 以下的浏览器
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
    <input type="button" value="点击" id="btn" />
    <script>
      var btn = document.getElementById("btn");

      // 绑定事件
      btn.addEventListener("click", fun);
      btn.addEventListener("click", fun2);
      // 解除绑定(必须绑定事件之后才能解除绑定)
      btn.removeEventListener("click", fun);

      function fun() {
        alert(2);
      }
      function fun2() {
        alert(3);
      }
    </script>
  </body>
</html>
```

### 方法三：element.detachEvent()

- 参数：
  - 第一个参数：事件类型的字符串（需要加 on）
  - 第二个参数：事件函数

::: danger
没有办法移除一个匿名函数，所以在注册事件时需要单独声明一个有函数名的事件函数。
:::

::: warning 注意
兼容性问题：只支持 IE10 及以下的浏览器
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
    <input type="button" value="点击" id="btn" />
    <script>
      var btn = document.getElementById("btn");

      // 绑定事件
      btn.attachEvent("onclick", fun);
      // 解除绑定
      btn.detachEvent("onclick", fun);
      function fun() {
        alert(2);
      }
      function fun2() {
        alert(3);
      }
    </script>
  </body>
</html>
```

## 移除事件的兼容写法

- 自定义一个移除事件函数
- 参数：事件源，事件类型（不加 on），事件函数
- IE9 及以上的浏览器，使用 removeEventListener 方法
- IE9 以下的浏览器，使用 detachEvent 方法

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <input type="button" value="点击" id="btn" />
    <script>
      var btn = document.getElementById("btn");
      // 调用函数
      addEvent(btn, "click", fun);
      // 移除事件
      removeEvent(btn, "click", fun);
      function fun() {
        alert(1);
      }
      // DOM 2 级事件绑定方式
      // 自己制作一个兼容所有浏览器的绑定事件的函数
      // 参数：事件源，事件类型，事件函数
      function addEvent(ele, type, fn) {
        // IE 9 及以上的浏览器和其他浏览器，使用 addEventListener 方法
        // IE 9 以下的浏览器，使用 attachEvent 方法
        // 浏览器能力检测
        if (ele.addEventListener) {
          ele.addEventListener(type, fn);
        } else if (ele.attachEvent) {
          ele.attachEvent("on" + type, fn);
        }
      }

      // 兼容所有浏览器的 解除绑定事件的函数
      // 参数：事件源，事件类型，事件函数
      function removeEvent(ele, type, fn) {
        // 浏览器能力检测
        if (ele.removeEventListener) {
          ele.removeEventListener(type, fn);
        } else if (ele.detachEvent) {
          ele.detachEvent("on" + type, fn);
        }
      }
    </script>
  </body>
</html>
```

::: tip 建议
将自己封装的一些常用函数和方法，放到一个单独的 .js 文件中。
:::
例如：封装到`common.js`

```js
// 定义一个获取元素的函数
function my$(id) {
  return document.getElementById(id);
}

// DOM 2 级事件绑定方式
// 自己制作一个兼容所有浏览器的绑定事件的函数
// 参数：事件源，事件类型，事件函数
function addEvent(ele, type, fn) {
  // IE 9 及以上的浏览器和其他浏览器，使用 addEventListener 方法
  // IE 9 以下的浏览器，使用 attachEvent 方法
  // 浏览器能力检测
  if (ele.addEventListener) {
    ele.addEventListener(type, fn);
  } else if (ele.attachEvent) {
    ele.attachEvent("on" + type, fn);
  }
}

// 兼容所有浏览器的 解除绑定事件的函数
// 参数：事件源，事件类型，事件函数
function removeEvent(ele, type, fn) {
  // 浏览器能力检测
  if (ele.removeEventListener) {
    ele.removeEventListener(type, fn);
  } else if (ele.detachEvent) {
    ele.detachEvent("on" + type, fn);
  }
}
```
