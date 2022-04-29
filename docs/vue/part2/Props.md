# Props
## A: Props命名规则

### 1.父组件向子组件传值

- 建议 prop 命名使用 camelCase（驼峰命名法），父组件绑定时使用 kebab-case（例如aaa-bbb）。

<img src="/images/vue/155.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/156.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <my-component :item-title="item.title" :item-content="item.content">
      </my-component>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      Vue.component("my-component", {
        props: ["itemTitle", "itemContent"],
        template: `
           <div>
        <h3>{{itemTitle}}</h3>
        <p>{{itemContent}}</p>
      </div>
           `,
      });
      new Vue({
        el: "#app",
        data: {
          item: {
            title: "这是示例标题",
            content: "这是示例内容",
          },
        },
      });
    </script>
  </body>
</html>
```

### 2.练习常见操作：通过 v-for 创建组件

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
      <!-- 通过 v-for 遍历数据 items，创建组件并生成内容 -->
      <demo-item
        v-for="item in items"
        :item-title="item.title"
        :item-content="item.content"
        :key="item.title"
        :item="item"
      ></demo-item>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("demoItem", {
        props: ["itemTitle", "itemContent", "item"],
        template: `
        <div>
          <h3>{{ itemTitle }}</h3>
          <p> {{ itemContent }} </p>
        </div>
      `,
      });

      new Vue({
        el: "#app",
        data: {
          // 准备给子组件使用的数据
          items: [
            {
              title: "示例标题1",
              content: "示例内容1",
            },
            {
              title: "示例标题2",
              content: "示例内容2",
            },
            {
              title: "示例标题3",
              content: "示例内容3",
            },
          ],
        },
      });
    </script>
  </body>
</html>
```

<img src="/images/vue/023.gif" style="width: 100%; display:inline-block; margin: 0 ;">


## B: Props-单向数据流

### 1.父子组件间的所有 prop 都是单向下行绑定的。

### 2.如果子组件要处理 prop 数据，应当存储在 data 中后操作，或通过计算属性进行设置。

<img src="/images/vue/157.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/024.gif" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <my-component :initial-title="title"></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("my-component", {
        props: ["initialTitle"],
        template: `
        <div>
          {{title}}
          <button @click="fn()">按钮</button>
          </div>
        `,
        data() {
          return {
            title: this.initialTitle,
          };
        },
        methods: {
          fn() {
            console.log(this);
            this.title = "这是新的标题";
          },
        },
      });
      new Vue({
        el: "#app",
        data: {
          title: "这是示例标题",
        },
      });
    </script>
  </body>
</html>
```

### 3.注意，如果 prop 为数组或对象时，子组件操作将会影响到父组件的状态。

<img src="/images/vue/025.gif" style="width: 100%; display:inline-block; margin: 0 ;">

#### 如果不希望子组件操作对象内部数据

#### 方式一：把数据拷贝在 data

```html
<!-- - 方式一：把数据拷贝在 data -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <my-component :initial-title="title" :initial-obj="obj"></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("my-component", {
        props: ["initialTitle",'initialObj'],
        template: `
        <div>
          {{title}} ，名字是：{{obj}}
          <button @click="fn()">按钮</button>
          </div>
        `,
        data() {
          return {
            title: this.initialTitle, 
            obj:this.initialObj
          };
        },
        methods:{
          fn(){
            console.log(this);
            this.title='这是新的标题';
            // this.initialTitle='这是新的标题';  //不会影响父组件
            this.obj.name='jack'; //不会影响父组件
          },
        }
      });
      new Vue({
        el: "#app",
        data: {
          title: "这是示例标题",
          obj:{
            name:'willll',
            age:'18'
          }
        },
      });
    </script>
  </body>
</html>
```

#### 方式二：props 传递值时，不将对象整体传入

```html
<!-- - 方式二：props传递值时，不将对象整体传入 -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <my-component :initial-title="title" :obj-name="obj.name"></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("my-component", {
        props: ["initialTitle", "objName"],
        template: `
        <div>
          {{title}} ，名字是：{{objName}}
          <button @click="fn()">按钮</button>
          </div>
        `,
        data() {
          return {
            title: this.initialTitle, //把initialTitle接收到的title传给子组件的title
            obj: this.objData,
          };
        },
        methods: {
          fn() {
            // console.log(this);
            this.title = "这是新的标题";
            // this.initialTitle='这是新的标题';  //不会影响父组件
            this.obj.name = "jack"; //不会影响父组件
          },
        },
      });
      new Vue({
        el: "#app",
        data: {
          title: "这是示例标题",
          obj: {
            name: "willll",
            age: "18",
          },
        },
      });
    </script>
  </body>
</html>
```


## C: Props-类型

- Props 传入的类型是不受限制的

### 1.Prop 可以设置类型检查，这时需要将 props 更改为一个带有验证需求的对象，并指定对应类型。

<img src="/images/vue/158.jpg" style="width: 70%; display:block; margin: 0 ;">
<img src="/images/vue/159.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/160.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

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
      <my-component
        :par-str="str"
        :par-num="num"
        :par-arr="arr"
        :par-obj="obj"
        :par-any="any"
      >
      </my-component>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      Vue.component("myComponent", {
        //如果要设置props的具体规则，需要更改为对象写法
        props: {
          parStr: String,
          parNum: Number,
          parArr: Array,
          parObj: Object,
          parAny: null, //undefined或null，不限类型的值
        },
        template: `
            <div>
          {{parStr}}
          {{parNum}}
          {{parArr}}
          {{parObj}}
          {{parAny}}
        </div>
            `,
      });
      new Vue({
        el: "#app",
        data: {
          num: 100,
          str: "abc",
          arr: [1, 2, 3],
          obj: {
            content1: "示例内容1",
            content2: "示例内容2",
          },
          any: false, //可以传入任意类型
        },
      });
    </script>
  </body>
</html>
```

### 2.prop 还可以同时指定多个类型，通过数组方式保存即可。

<img src="/images/vue/161.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

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
      <my-component
        :par-str="str"
        :par-num="num"
        :par-arr="arr"
        :par-obj="obj"
        :par-any="any"
        :par-data="str"
      >
      </my-component>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      Vue.component("myComponent", {
        //如果要设置props的具体规则，需要更改为对象写法
        props: {
          parStr: String,
          parNum: Number,
          parArr: Array,
          parObj: Object,
          parAny: null, //undefined或null，不限类型的值
          parData: [String, Boolean],
        },
        template: `
            <div>
          {{parStr}}
          {{parNum}}
          {{parArr}}
          {{parObj}}
          {{parAny}}
          {{parData}}
        </div>
            `,
      });
      new Vue({
        el: "#app",
        data: {
          num: 100,
          str: "abc",
          arr: [1, 2, 3],
          obj: {
            content1: "示例内容1",
            content2: "示例内容2",
          },
          any: false, //可以传入任意类型
        },
      });
    </script>
  </body>
</html>
```
<img src="/images/vue/162.jpg" style="width: 100%; display:inline-block; margin: 0 ;">


## D: props 验证

- 当 prop 需要设置多种规则时，可以将 prop 的值设置为选项对象。

### 1.类型检测功能通过 type 选项设置

<img src="/images/vue/163.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <my-component :par-str="str" :par-data="arr"></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("MyComponent", {
        props: {
          parStr: {
            type: String,
          },
          parData: {
            type: [Array, Object],
          },
        },
        templata: `<div></div>`,
      });
      new Vue({
        el: "#app",
        data: {
          str: "示例内容",
          arr: [1, 2, 3],
          obj: {
            content1: "内容1",
            content2: "内容2",
          },
        },
      });
    </script>
  </body>
</html>
```

### 2.required 用于设置数据为必填项。

<img src="/images/vue/164.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <my-component
        :par-str="str"
        :par-data="arr"
        :par-num="num"
      ></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("MyComponent", {
        props: {
          parStr: {
            type: String,
          },
          parData: {
            type: [Array, Object],
          },
          parNum: {
            type: Number,
            required: true,
          },
        },
        template: `<div></div>`,
      });
      new Vue({
        el: "#app",
        data: {
          str: "示例内容",
          arr: [1, 2, 3],
          obj: {
            content1: "内容1",
            content2: "内容2",
          },
          num: 100,
        },
      });
    </script>
  </body>
</html>
```

### 3.default 用于给可选项指定默认值，当父组件未传递数据时生效。

- 当当父组件传递了数据，便会使用传递的数据代替默认值。
  <img src="/images/vue/165.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <my-component
        :par-str="str"
        :par-data="arr"
        :par-num="num"
        :par-num2="2000"
      ></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("MyComponent", {
        props: {
          parStr: {
            type: String,
          },
          parData: {
            type: [Array, Object],
          },
          parNum: {
            type: Number,
            required: true,
          },
          parNum2: {
            type: Number,
            default: 100,
          },
        },
        template: `<div>{{parStr}}</div>`,
      });
      new Vue({
        el: "#app",
        data: {
          str: "示例内容",
          arr: [1, 2, 3],
          obj: {
            content1: "内容1",
            content2: "内容2",
          },
          num: 100,
        },
      });
    </script>
  </body>
</html>
```

### 4.注意：当默认值为数组或对象时，必须为工厂函数返回的形式。

<img src="/images/vue/166.jpg" style="width: 70%; display:inline-block; margin: 0 ;">

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
      <my-component
        :par-str="str"
        :par-data="arr"
        :par-num="num"
        :par-num2="2000"
        :par-arr="arr"
      ></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("MyComponent", {
        props: {
          parStr: {
            type: String,
          },
          parData: {
            type: [Array, Object],
          },
          parNum: {
            type: Number,
            required: true,
          },
          parNum2: {
            type: Number,
            default: 100,
          },
          parArr: {
            type: Array,
            // default:100, //报错
            // default:[1,2,3] //报错

            default: function() {
              return [1, 2, 3];
            },
            // default() {
            //   return [1, 2, 3];
            // },
          },
        },
        template: `<div>{{parStr}}</div>`,
      });
      new Vue({
        el: "#app",
        data: {
          str: "示例内容",
          arr: [10, 20, 30],
          obj: {
            content1: "内容1",
            content2: "内容2",
          },
          num: 100,
        },
      });
    </script>
  </body>
</html>
```

### 5.validator 用于给传入的 prop 设置校验函数，return 值为 false 时 Vue.js 会发出警告。

<img src="/images/vue/167.jpg" style="width: 70%; display:inline-block; margin: 0 ;">


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
      <my-component
        :par-str="str"
        :par-data="arr"
        :par-num="num"
        :par-num2="2000"
        :par-arr="arr"
        par-content="lagou hello world"
      ></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("MyComponent", {
        props: {
          parStr: {
            type: String,
          },
          parData: {
            type: [Array, Object],
          },
          parNum: {
            type: Number,
            required: true,
          },
          parNum2: {
            type: Number,
            default: 100,
          },
          parArr: {
            type: Array,
            // default:100, //报错
            // default:[1,2,3] //报错

            default: function() {
              return [1, 2, 3];
            },
            // default() {
            //   return [1, 2, 3];
            // },
          },
          parContent: {
            type: String,
            validator(value) {
              console.log(this);
              return value.startsWith("lagou");  //startsWith()函数：以什么开头
            },
          },
        },
        template: `<div>{{parStr}}</div>`,
      });
      new Vue({
        el: "#app",
        data: {
          str: "示例内容",
          arr: [10, 20, 30],
          obj: {
            content1: "内容1",
            content2: "内容2",
          },
          num: 100,
        },
      });
    </script>
  </body>
</html>
```

::: warning 注意
验证函数中无法使用实例的 data、methods 等功能。
:::



## E: 非 props 属性

### 1.当父组件给子组件设置了属性，但此属性在 props 中不存在，这时会自动绑定到子组件的根元素上。

<img src="/images/vue/168.jpg" style="width: 50%; display:inline-block; margin: 0 ;">
<img src="/images/vue/169.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

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
      <my-component
        :title="'示例标题内容'"
        style="height: 200px;"
        class="colorRed"
        data-index="2"
      ></my-component>
    </div>
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("MyComponent", {
        template: `
         <div>这是组件的内容</div> 
        `,
      });
      new Vue({
        el: "#app",
        data: {},
      });
    </script>
  </body>
</html>
```

### 2.如果组件根元素已经存在了对应属性，则会替换组件内部的值。

- class 与 style 是例外，当内外都设置时，属性会自动合并。

<img src="/images/vue/170.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <my-component
        :title="'示例标题内容'"
        style="height: 200px;"
        class="colorRed"
        data-index="2"
      ></my-component>
    </div>

    <script src="lib/vue.js"></script>
    <script>
      Vue.component("MyComponent", {
        template: `
         <div 
         data-index="8" 
         title="旧的title"
         class="abc"
         style="width: 200px;"
         ><p>这是组件的内容</p></div> 
        `,
      });
      new Vue({
        el: "#app",
        data: {},
      });
    </script>
  </body>
</html>
```
<img src="/images/vue/172.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 3. 如果不希望继承父组件设置的属性，可以设置 inheritAttrs:false，但只适用于普通属性，class 与 style 不受影响。

<img src="/images/vue/171.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

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
      <my-component
        :title="'示例标题内容'"
        style="height: 200px;"
        class="colorRed"
        data-index="2"
      ></my-component>
    </div>
    
    <script src="lib/vue.js"></script>
    <script>
      Vue.component("MyComponent", {
        inheritAttrs:false,
        template: `
         <div 
         data-index="8" 
         title="旧的title"
         class="abc"
         style="width: 200px;"
         ><p>这是组件的内容</p></div> 
        `,
      });
      new Vue({
        el: "#app",
        data: {},
      });
    </script>
  </body>
</html>

```
<img src="/images/vue/173.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
