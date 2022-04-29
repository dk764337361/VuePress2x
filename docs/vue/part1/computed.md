# 计算属性 computed

- Vue.js 的视图不建议书写复杂逻辑，这样不利于维护。

<img src="/images/vue/083.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

- 封装函数是很好的方式，但有时重复的计算会消耗不必要的性能。

<img src="/images/vue/084.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
<img src="/images/vue/085.jpg" style="width: 40%; display:inline-block; margin: 0 ;">

### 计算属性使用时为属性形式，访问时会自动执行对应函数。

<img src="/images/vue/086.jpg" style="width: 60%; display:inline-block; margin: 0 ;">
<img src="/images/vue/087.jpg" style="width: 40%; display:inline-block; margin: 0 ;">

## methods 与 computed 区别

- computed 具有缓存型，methods 没有。
- computed 通过属性名访问，methods 需要调用。
- computed 仅适用于计算操作。

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
      <p>{{ getSum() }}</p>
      <p>{{ getSum() }}</p>
      <p>{{ getSum() }}</p>
      <p>{{ getResult }}</p>
      <p>{{ getResult }}</p>
      <p>{{ getResult }}</p>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          arr: [1, 2, 3, 4, 5],
        },
        methods: {
          getSum() {
            console.log("执行了methods函数");
            var arr = this.arr;
            var sum = 0;
            for (var i = 0; i < arr.length; i++) {
              sum += arr[i];
            }
            return sum;
          },
        },
        computed: {
          getResult() {
            console.log("执行了计算属性");
            var arr = this.arr;
            var sum = 0;
            for (var i = 0; i < arr.length; i++) {
              sum += arr[i];
            }
            return sum;
          },
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/088.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 案例：比较那个更高效

- 准备一个数组，根据数组数据创建列表。
  - 要求：当数据大于 10 时创建 li，否则不创建。
- 思考以下三种实现方式：
  - v-if 与 v-for 结合
  - v-for 与 methods 结合
  - v-for 与 计算属性结合

### 方案一：v-if 与 v-for 结合

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
      <ul>
        <!-- 不推荐v-if与v-for同事应用于同一个元素 -->
        <li v-if="item>10" v-for="item in arr">{{ item }}</li>
      </ul>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          arr: [1, 11, 2, 33, 3, 33, 4, 44, 5, 55],
        },
      });
    </script>
  </body>
</html>
```

### 方案二：v-for 与 methods 结合

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
      <ul>
        <li v-for="item in fn()">{{ item }}</li>
      </ul>
      <ul>
        <li v-for="item in fn()">{{ item }}</li>
      </ul>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          arr: [1, 11, 2, 33, 3, 33, 4, 44, 5, 55],
        },
        methods: {
          fn() {
            console.log("函数代码执行了");
            //遍历arr,找到大于10的数据
            var resultArr = [];
            for (var i = 0; i < this.arr.length; i++) {
              if (this.arr[i] > 10) {
                resultArr.push(this.arr[i]);
              }
            }
            return resultArr;
          },
        },
      });
    </script>
  </body>
</html>
```

### 方案三：v-for 与 计算属性结合

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
      <ul>
        <li v-for="item in result">{{ item }}</li>
      </ul>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      new Vue({
        el: "#app",
        data: {
          arr: [1, 11, 2, 33, 3, 33, 4, 44, 5, 55],
        },
        computed: {
          result() {
            console.log("执行了代码");
            // Array.prototype.filter() ES5新语法
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            return this.arr.filter((item) => item > 10);
          },
        },
      });
    </script>
  </body>
</html>
```

## 计算属性的 setter(更新数据)

- 计算属性默认只有 getter，Vue.js 也允许给计算属性设置 setter 。

<img src="/images/vue/089.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <p>{{ fullName }}</p>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      var vm = new Vue({
        el: "#app",
        data: {
          firstName: "张",
          lasttName: "三",
        },
        computed: {
          //默认书写方式
          // fullName() {
          //   return this.firstName + this.lasttName;
          // },

          //分开书写getter与setter
          fullName: {
            get() {
              return this.firstName + this.lasttName;
            },
            set(newValue) {
              // console.log(newValue);
              var nameArr = newValue.split(" ");
              this.firstName = nameArr[0];
              this.lasttName = nameArr[1];
            },
          },
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/090.jpg" style="width: 100%; display:inline-block; margin: 0 ;">



