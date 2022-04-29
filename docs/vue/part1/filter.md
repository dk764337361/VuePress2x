# 过滤器

过滤器用于进行文本内容格式化处理。
过滤器可以在插值表达式和 v-bind 中使用。

## 全局过滤器 filter

### 全局过滤器可以在任意 Vue 实例中使用

<img src="/images/vue/070.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

### 过滤器能在`插值表达式`和 v-bind 中使用，通过`管道符|`连接数据

<img src="/images/vue/071.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

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
      <p v-bind:title="value  | filterA">这是标签</p>
      <p>{{ value2 | filterA }}</p>
    </div>
    <div id="app2">
      <p>{{ value | filterA }}</p>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.filter("filterA", function(value) {
        // console.log(value);
        return value.split("-").join("");
      });

      new Vue({
        el: "#app",
        data: {
          value: "a-b-c",
          value2: "x-y-z",
        },
      });
      new Vue({
        el: "#app2",
        data: {
          value: "q-w-e",
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/072.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 可以将一个数据传入到多个过滤器中进行处理。

<img src="/images/vue/073.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <p>{{ value | filterA | filterB }}</p>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      Vue.filter("filterA", function(value) {
        console.log("filterA:", value);
        return value.split("-").join("");
      });
      Vue.filter("filterB", function(value) {
        console.log("filterB:", value);
        return value[0].toUpperCase() + value.slice(1);
      });
      new Vue({
        el: "#app",
        data: {
          value: "a-b-c",
          value2: "x-y-z",
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/075.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 一个过滤器可以传入多个参数。

<img src="/images/vue/074.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

<img src="/images/vue/077.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/076.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

## 局部过滤器 filters

### 局部过滤器只能在当前 Vue 实例中使用。

<img src="/images/vue/078.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <p>{{ content | filterA }}</p>
      <p>{{ content2 | filterA }}</p>
    </div>
    <div id="app2">
      <p>{{ content | filterA }}</p>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          content: "a-p-p-1",
          content2: "a-p-p-1",
        },
        filters: {
          filterA: function(value) {
            // console.log(value)
            return value.split("-").join("");
          },
        },
      });
      new Vue({
        el: "#app2",
        data: {
          content: "a-p-p-2",
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/079.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 可以将一个数据传入到多个过滤器中进行处理。

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
      <p>{{ content | filterA | filterB}}</p>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          content: "a-p-p-1",
        },
        filters: {
          filterA: function(value) {
            // console.log(value)
            return value.split("-").join("");
          },
          filterB: function(value) {
            // console.log(value)
            return value
              .split("")
              .reverse()
              .join("");
          },
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/080.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 一个过滤器可以传入多个参数。

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
      <p>{{ content | filterA | filterB}}</p>
      <p>{{ content | filterA | filterC('lagou-') }}</p>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          content: "a-p-p-1",
        },
        filters: {
          filterA: function(value) {
            // console.log(value)
            return value.split("-").join("");
          },
          filterB: function(value) {
            // console.log(value)
            return value
              .split("")
              .reverse()
              .join("");
          },
          filterC: function(value, prefix) {
            // console.log(value)
            return prefix + value;
          },
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/081.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

### 当全局过滤器与局部过滤器重名时,局部过滤器会生效

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
      <p>{{ content | filterA }}</p>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.filter("filterA", function(value) {
        //全局过滤器 filterA 设置反转字符串功能
        return value
          .split("")
          .reverse()
          .join("");
      });
      new Vue({
        el: "#app",
        data: {
          content: "a-b-c-d-e-f",
        },
        filters: {
          filterA(value) {
            // console.log(value)
            return value.split("-").join("");
          },
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/082.jpg" style="width: 50%; display:inline-block; margin: 0 ;">



