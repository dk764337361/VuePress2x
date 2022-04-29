# 表单输入绑定 v-model

- 用于给 `<input>` 、`<textarea>` 及 `<select>` 元素设置双向数据绑定。

## 体验双向数据绑定的效果

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
      <p>元素内容为：{{ value }}</p>
      <input type="text" v-model="value" />
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          value: "",
        },
      });
    </script>
  </body>
</html>
```

## 输入框绑定

输入框分为单行输入框 input 与多行输入框 textarea。

<img src="/images/vue/056.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
<img src="/images/vue/057.jpg" style="width: 40%; display:inline-block; margin: 0 ;">
<img src="/images/vue/003.gif" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <p>input 输入框的内容为： {{ value1 }}</p>
      <input type="text" v-model="value1" />

      <p>textarea 输入框的内容为： {{ value2 }}</p>
      <textarea v-model="value2"></textarea>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          value1: "",
          value2: "",
        },
      });
    </script>
  </body>
</html>
```

## 单选按钮绑定

单选按钮的双向数据绑定方式如下：

<img src="/images/vue/058.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
<img src="/images/vue/059.jpg" style="width: 40%; display:inline-block; margin: 0 ;">
<img src="/images/vue/002.gif" style="width: 40%; display:inline-block; margin: 0 ;">

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
      <p>radio 的内容为： {{ value3 }}</p>
      <input type="radio" id="one" value="1" v-model="value3" />
      <label for="one">选项1</label>

      <input type="radio" id="two" value="2" v-model="value3" />
      <label for="two">选项2</label>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          value3: "",
        },
      });
    </script>
  </body>
</html>
```

## 复选框绑定

复选框绑定分为单个选项与多个选项两种情况，书写方式不同。

<img src="/images/vue/060.jpg" style="width: 70%; display:inline-block; margin: 0 ;">
<img src="/images/vue/061.jpg" style="width: 30%; display:inline-block; margin: 0 ;">
<img src="/images/vue/001.gif" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <!-- 单个复选框进行双向数据绑定的演示 -->
      <p>单个复选框的值： {{ value4 }}</p>
      <input type="checkbox" value="选项内容" id="one" v-model="value4" />
      <label for="one">选项内容</label>

      <!-- 多个复选框进行双向数据绑定的演示 -->
      <p>多个复选框的值：{{ value5 }}</p>
      <input type="checkbox" id="cb1" value="选项1" v-model="value5" />
      <label for="cb1">选项1</label>
      <input type="checkbox" id="cb2" value="选项2" v-model="value5" />
      <label for="cb2">选项2</label>
      <input type="checkbox" id="cb3" value="选项3" v-model="value5" />
      <label for="cb3">选项3</label>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          value4: "",
          value5: [],
        },
      });
    </script>
  </body>
</html>
```

## 选择框绑定

选择框绑定分为单选绑定与多选绑定两种情况，书写方式不同。

<img src="/images/vue/062.jpg" style="width: 70%; display:inline-block; margin: 0 ;">
<img src="/images/vue/063.jpg" style="width: 30%; display:inline-block; margin: 0 ;">
<img src="/images/vue/004.gif" style="width: 50%; display:inline-block; margin: 0 ;">

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
      <!-- 单选选择框 -->
      <p>单选选择框的内容: {{ value6 }}</p>
      <select v-model="value6">
        <option value="">请选择</option>
        <option value="1">选项1</option>
        <option value="2">选项2</option>
        <option value="3">选项3</option>
      </select>

      <!-- 多选选择框 -->
      <p>多选选择框的内容：{{ value7 }}</p>
      <select v-model="value7" multiple>
        <option value="1">选项1</option>
        <option value="2">选项2</option>
        <option value="3">选项3</option>
      </select>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          value6: "",
          value7: [],
        },
      });
    </script>
  </body>
</html>
```

## v-model 指令小结

- input 输入框：绑定字符串值。
- textarea 输入框：绑定字符串值。
- radio：绑定字符串值。
- checkbox：单个绑定布尔值，多个绑定数组。
- select：单选绑定字符串，多选绑定数组。
