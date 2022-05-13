# 响应式原理

## 数据驱动

- 在学习 Vue.js 的过程中，我们经常看到三个概念：
  - 数据驱动（vue 特点）
  - 数据响应式（数据驱动的具体实现方式）
  - 双向数据绑定（数据驱动的具体实现方式）

## 核心原理分析

### 回顾 defineProperty

- Vue 2.x 版本与 Vue 3.x 版本的响应式实现有所不同，我们将分别讲解。
  - Vue 2.x 响应式基于 ES5 的 Object.defineProperty 实现。
  - Vue 3.x 响应式基于 ES6 的 Proxy 实现。

```js
  <script>
    var obj = {
      name: 'william',
      age: 18
    }

    // Object.defineProperty() 操作演示与回顾
    Object.defineProperty(obj, 'gender', {
      value: '男',
      writable: true, //是否可读写，默认值为false
      enumerable: true, //是否可（枚举）被遍历，默认值为false
      configurable: true //是否可重新配置，默认值为false
    })

    // 重新配置
    Object.defineProperty(obj, 'gender', {
      enumerable: false
    })

    for (var k in obj) {
      console.log(k, obj[k]) //K：属性名，obj[k]：属性值
    }
  </script>
```

<img src="/images/vue/431.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

::: danger 注意
Object.defineProperty()里的 get ()和 set()方法不可与 value、writable 属性冲突，不可共同使用。

但与 enumerable、configurable 属性不冲突，可共同使用
:::

```js
  <script>
    var obj = {
      name: 'william',
      age: 18
    }
    var genderValue = '男'
    Object.defineProperty(obj, 'gender', {
      get () {
        console.log('任意获取时需要的自定义操作')
        return genderValue
      },
      set (newValue) {
        console.log('任意设置时需要的自定义操作')
        genderValue = newValue
      }
    })
  </script>
```

<img src="/images/vue/430.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

## Vue2 响应式原理-demo

- Vue 2.x 的数据响应式通过 Object.defineProperty() 实现的

  - 设置 data 后，遍历所有属性，转换为 Getter、Setter，从而在数据变化时进行视图更新等操作。

- 下面我们来通过一段代码实现数据绑定的基础效果
  - 数据变化，自动更新到视图

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">原始内容</div>
    <script>
      // 声明数据对象，模拟 Vue 实例的 data 属性
      let data = {
        msg: 'hello',
      }
      // 模拟 Vue 实例的对象
      let vm = {}
      // 通过数据劫持的方式，将 data 的属性设置为 getter/setter
      Object.defineProperty(vm, 'msg', {
        // 可遍历
        enumerable: true,
        // 可配置
        configurable: true,
        get() {
          console.log('访问了属性')
          return data.msg
        },
        set(newValue) {
          // 更新数据
          data.msg = newValue
          // 数据更改，更新视图中 DOM 元素的内容
          document.querySelector('#app').textContent = data.msg
        },
      })
    </script>
  </body>
</html>
```

<img src="/images/vue/081.gif" style="width: 100%; display:inline-block; margin: 0 ;">

- 上述版本只是雏形，问题如下：
  - 操作中只监听了一个属性，多个属性无法处理
  - 无法监听数组变化（Vue 中同样存在）
  - 无法处理属性也为对象的情况
- 下面我们来进行改进

### 改进-处理多个属性的情况

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">原始内容</div>
    <script>
      // 声明数据对象，模拟 Vue 实例的 data 属性
      let data = {
        msg1: 'hello',
        msg2: 'world',
      }
      // 模拟 Vue 实例的对象
      let vm = {}

      // 遍历被劫持对象的所有属性
      Object.keys(data).forEach((key) => {
        // 通过数据劫持的方式，将 data 的属性设置为 getter/setter
        Object.defineProperty(vm, key, {
          enumerable: true,
          configurable: true,
          get() {
            console.log('访问了属性')
            return data[key]
          },
          set(newValue) {
            // 更新数据
            data[key] = newValue
            // 数据更改，更新视图中 DOM 元素的内容
            document.querySelector('#app').textContent = data[key]
          },
        })
      })
    </script>
  </body>
</html>
```

### 改进-检测数组方法

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">原始内容</div>
    <script>
      // 声明数据对象，模拟 Vue 实例的 data 属性
      let data = {
        msg1: 'hello',
        msg2: 'world',
        arr: [1, 2, 3],
      }
      // 模拟 Vue 实例的对象
      let vm = {}

      // --- 添加数组方法支持 ---
      const arrMethodName = [
        'push',
        'pop',
        'shift',
        'unshift',
        'splice',
        'sort',
        'reverse',
      ]

      // 用于存储处理结果的对象，准备替换掉数组实例的原型指针 __proto__
      const customProto = {}

      // 为了避免数组实例无法再使用其他的数组方法
      customProto.__proto__ = Array.prototype

      arrMethodName.forEach((method) => {
        customProto[method] = function() {
          // 确保原始功能可以使用（this 为数组实例）
          // console.log(this);
          // console.log(arguments);
          // console.log(method);
          const result = Array.prototype[method].apply(this, arguments)
          // 进行其他自定义功能设置，例如，更新视图
          document.querySelector('#app').textContent = this
          return result
        }
      })

      // 遍历被劫持对象的所有属性
      Object.keys(data).forEach((key) => {
        // 检测是否为数组
        if (Array.isArray(data[key])) {
          // 将当前数组实例的 __proto__ 更换为 customProto 即可
          data[key].__proto__ = customProto
        }

        // 通过数据劫持的方式，将 data 的属性设置为 getter/setter
        Object.defineProperty(vm, key, {
          enumerable: true,
          configurable: true,
          get() {
            console.log('访问了属性')
            return data[key]
          },
          set(newValue) {
            // 更新数据
            data[key] = newValue
            // 数据更改，更新视图中 DOM 元素的内容
            document.querySelector('#app').textContent = data[key]
          },
        })
      })
    </script>
  </body>
</html>
```

### 改进-封装与检测对象与递归

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">原始内容</div>
    <script>
      // 声明数据对象，模拟 Vue 实例的 data 属性
      let data = {
        msg1: 'hello',
        msg2: 'world',
        arr: [1, 2, 3],
        obj: {
          name: 'jack',
          age: 18,
        },
      }
      // 模拟 Vue 实例的对象
      let vm = {}

      // 封装为函数，用于对数据进行响应式处理
      const createReactive = (function() {
        const arrMethodName = [
          'push',
          'pop',
          'shift',
          'unshift',
          'splice',
          'sort',
          'reverse',
        ]
        const customProto = {}
        customProto.__proto__ = Array.prototype
        arrMethodName.forEach((method) => {
          customProto[method] = function() {
            const result = Array.prototype[method].apply(this, arguments)
            document.querySelector('#app').textContent = this
            return result
          }
        })

        // 需要进行数据劫持的主体功能，也是递归时需要的功能
        return function(data, vm) {
          // 遍历被劫持对象的所有属性
          Object.keys(data).forEach((key) => {
            // 检测是否为数组
            if (Array.isArray(data[key])) {
              // 将当前数组实例的 __proto__ 更换为 customProto 即可
              data[key].__proto__ = customProto
            } else if (typeof data[key] === 'object' && data[key] !== null) {
              // 检测是否为对象，如果为对象，进行递归操作
              vm[key] = {}
              createReactive(data[key], vm[key])
              return
            }

            // 通过数据劫持的方式，将 data 的属性设置为 getter/setter
            Object.defineProperty(vm, key, {
              enumerable: true,
              configurable: true,
              get() {
                console.log('访问了属性')
                return data[key]
              },
              set(newValue) {
                // 更新数据
                data[key] = newValue
                // 数据更改，更新视图中 DOM 元素的内容
                document.querySelector('#app').textContent = data[key]
              },
            })
          })
        }
      })()

      createReactive(data, vm)
    </script>
  </body>
</html>
```

## 回顾 Proxy

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      const data = {
        msg1: '内容',
        arr: [1, 2, 3],
        obj: {
          name: 'william',
          age: 18,
        },
      }

      const p = new Proxy(data, {
        get(target, property, receiver) {
          console.log(target, property, receiver)
          return target[property]
        },
        set(target, property, value, receiver) {
          console.log(target, property, value, receiver)
          target[property] = value
        },
      })
    </script>
  </body>
</html>
```

<img src="/images/vue/432.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## Vue 3 响应式原理

- Vue 3.x 与 Vue 2.x 的区别为数据响应式是通过 Proxy 实现的，
  - 其他相同，下面我们来进行原理演示。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">原始内容</div>
    <script>
      const data = {
        msg: 'hello',
        content: 'world',
        arr: [1, 2, 3],
        obj: {
          name: 'william',
          age: 18,
        },
      }

      const vm = new Proxy(data, {
        get(target, key) {
          return target[key]
        },
        set(target, key, newValue) {
          // 数据更新
          target[key] = newValue
          // 视图更新
          document.querySelector('#app').textContent = target[key]
        },
      })
    </script>
  </body>
</html>
```

## 相关设计模式

设计模式（design pattern）是针对软件设计中普遍存在的各种问题所提出的解决方案。

### 观察者模式

- 观察者模式（Observer pattern）指的是在对象间定义一个一对多（被观察者与多个观察者）的关联，当一个对象改变了状态，所有其他相关的对象会被通知并且自动刷新。

- 核心概念：
  - 观察者 Observer
  - 被观察者（观察目标）Subject

<img src="/images/vue/433.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script>
      // 被观察者 (观察目标)
      //   1 添加观察者
      //   2 通知所有观察者
      class Subject {
        constructor() {
          // 存储所有的观察者
          this.observers = []
        }
        // 添加观察者功能
        addObserver(observer) {
          // 检测传入的参数是否为 观察者 实例
          if (observer && observer.update) {
            this.observers.push(observer)
          }
        }
        // 通知所有观察者
        notify() {
          // 调用观察者列表中每个观察者的更新方法
          this.observers.forEach((observer) => {
            observer.update()
          })
        }
      }

      // 观察者
      //   1 当观察目标发生状态变化时，进行"更新"
      class Observer {
        update() {
          console.log('事件发生了，进行相应的处理...')
        }
      }

      // 功能测试
      const subject = new Subject()
      const ob1 = new Observer()
      const ob2 = new Observer()

      // 将观察者添加给要观察的观察目标
      subject.addObserver(ob1)
      subject.addObserver(ob2)

      // 通知观察者进行操作（某些具体的场景下）
      subject.notify()
    </script>
  </body>
</html>
```

### 发布-订阅模式

- 发布-订阅模式（Publish-subscribe pattern）可认为是为观察者模式解耦的进阶版本，特点如下：

  - 在发布者与订阅者之间添加消息中心，所有的消息均通过消息中心管理，而发布者与订阅者不会直接联系，实现了两者的解耦。

- 核心概念：
  - 消息中心 Dep
  - 订阅者 Subscriber
  - 发布者 Publisher

<img src="/images/vue/434.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
    <script>
      // 创建了一个 Vue 实例（消息中心）
      const eventBus = new Vue()

      // 注册事件（设置订阅者）
      eventBus.$on('dataChange', () => {
        console.log('事件处理功能1')
      })

      eventBus.$on('dataChange', () => {
        console.log('事件处理功能2')
      })

      // 触发事件（设置发布者）
      eventBus.$emit('dataChange')
    </script>
  </body>
</html>
```

- 观察者模式是由观察者与观察目标组成的，适合组件内操作。
  - 特性：特殊事件发生后，观察目标统一通知所有观察者。
- 发布/订阅模式是由发布者与订阅者以及消息中心组成，更加适合消息类型复杂的情况。
  - 特性：特殊事件发生，消息中心接到发布指令后，会根据事件类型给对应的订阅者发送信息。

## Vue 响应式原理模拟

### 整体分析

- 要模拟 Vue 实现响应式数据，首先我们观察一下 Vue 实例的结构，分析要实现哪些属性与功能。

<img src="/images/vue/435.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

- Vue
  - 目标：将 data 数据注入到 Vue 实例，便于方法内操作。
- Observer（发布者）
  - 目标：数据劫持，监听数据变化，并在变化时通知 Dep
- Dep（消息中心）
  - 目标：存储订阅者以及管理消息的发送
- Watcher（订阅者）
  - 目标：订阅数据变化，进行视图更新
- Compiler
  - 目标：解析模板中的指令与插值表达式，并替换成相应的数据

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
      <p>{{ msg1 }}</p>
      <p v-text="msg2"></p>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
    <script>
      const vm = new Vue({
        el: '#app',
        data: {
          msg1: '内容1',
          msg2: '内容2',
        },
      })
      console.log(vm)
    </script>
  </body>
</html>
```

### Vue 类

- 功能：
  - 接收配置信息
  - 将 data 的属性转换成 Getter、Setter，并注入到 Vue 实例中。
  - - 监听 data 中所有属性的变化，设置成响应式数据
  - - 调用解析功能（解析模板内的插值表达式、指令等）

<img src="/images/vue/436.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```
miniVue
├─── js
│   │
│   └── Vue.js
└── index.html
```

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
    <script src="./js/Vue.js"></script>
    <script>
      const vm = new Vue({
        el: '#app',
        // el: document.querySelector('#app'),
        data: {
          msg1: '内容1',
          msg2: '内容2',
        },
      })
    </script>
  </body>
</html>
```

```js
// Vue.js
class Vue {
  constructor(options) {
    // 1 存储属性
    this.$options = options || {}
    this.$data = options.data || {}
    // 判断 el 值的类型，并进行相应处理
    const { el } = options
    this.$el = typeof el === 'string' ? document.querySelector(el) : el

    // 2 将 data 属性注入到 Vue 实例中
    _proxyData(this, this.$data)
  }
}

// 将 data 的属性注入到 Vue 实例
function _proxyData(target, data) {
  Object.keys(data).forEach((key) => {
    Object.defineProperty(target, key, {
      enumerable: true,
      configurable: true,
      get() {
        return data[key]
      },
      set(newValue) {
        data[key] = newValue
      },
    })
  })
}
```

### Observer 类

```
miniVue
├─── js
│   └── Observer.js
│   └── Vue.js
└── index.html
```

- 功能：
  - 通过数据劫持方式监视 data 中的属性变化，变化时通知消息中心 Dep。
  - 需要考虑 data 的属性也可能为对象，也要转换成响应式数据

<img src="/images/vue/437.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

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
    <script src="./js/Observer.js"></script>
    <script src="./js/Vue.js"></script>
    <script>
      const vm = new Vue({
        el: '#app',
        // el: document.querySelector('#app'),
        data: {
          msg1: '内容1',
          msg2: '内容2',
          obj: {
            name: 'william',
            age: 18,
          },
        },
      })
    </script>
  </body>
</html>
```

```js
// js\Observer.js
class Observer {
  // 接收传入的对象，将这个对象的属性转换为Getter/Setter
  constructor(data) {
    this.data = data
    // 遍历数据
  }
  // 封装用于数据遍历的方法
  walk(data) {
    Object.keys(data).forEach((key) => this.convert(key, data[key]))
  }
  // 封装用于将对象转换为响应式数据的方法
  convert(key, value) {
    defineReactive(this.data, key, value)
  }
}

function defineReactive(data, key, value) {
  // 检测是否为对象，如果是，创建一个新的Observer 实例进行管理
  observer(value)

  //进行数据劫持
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('获取了属性')
      return value
    },
    set(newValue) {
      console.log('设置了属性')
      if (newValue === value) return
      value = newValue
      observer(value)
    },
  })
}

function observer(value) {
  if (typeof value === 'object' && value !== null) {
    return new Observer(value)
  }
}
```

### Dep 类

- Dep 是 Dependency 的简写，含义为“依赖”，指的是 Dep 用于收集与管理订阅者与发布者之间的依赖关系。
- 功能：
  - \*为每个数据收集对应的依赖，存储依赖。
  - 添加并存储订阅者。
  - 数据变化时，通知所有观察者

<img src="/images/vue/438.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```js
// js\Dep.js
class Dep {
  constructor() {
    // 存储订阅者
    this.subs = []
  }
  // 添加订阅者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  // 通知订阅者的方法
  notify() {
    // 遍历订阅者，并执行更新功能即可
    this.subs.forEach((sub) => {
      sub.update()
    })
  }
}
```

```js{19-20,39-40}
// js\Observer.js
class Observer {
  // 接收传入的对象，将这个对象的属性转换为Getter/Setter
  constructor(data) {
    this.data = data
    // 遍历数据
  }
  // 封装用于数据遍历的方法
  walk(data) {
    Object.keys(data).forEach((key) => this.convert(key, data[key]))
  }
  // 封装用于将对象转换为响应式数据的方法
  convert(key, value) {
    defineReactive(this.data, key, value)
  }
}

function defineReactive(data, key, value) {
  // 创建消息中心
  const dep = new Dep()

  // 检测是否为对象，如果是，创建一个新的Observer 实例进行管理
  observer(value)

  //进行数据劫持
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('获取了属性')
      return value
    },
    set(newValue) {
      console.log('设置了属性')
      if (newValue === value) return
      value = newValue
      observer(value)

      // * 数据变化时，通知消息中心
      dep.notify()
    },
  })
}

function observer(value) {
  if (typeof value === 'object' && value !== null) {
    return new Observer(value)
  }
}
```

### Watcher 类

- 功能：
  - 实例化 Watch 时，往 dep 对象中添加自己
  - 当数据变化触发 dep， dep 通知所有对应的 Watcher 实例更新视图。

<img src="/images/vue/439.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

```
miniVue
├─── js
│   └── Watcher.js.js
│   └── Dep.js
│   └── Observer.js
│   └── Vue.js
└── index.html
```

```html{10,11}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="./js/Watcher.js"></script>
    <script src="./js/Dep.js"></script>
    <script src="./js/Observer.js"></script>
    <script src="./js/Vue.js"></script>
    <script>
      const vm = new Vue({
        el: '#app',
        // el: document.querySelector('#app'),
        data: {
          msg1: '内容1',
          msg2: '内容2',
          obj: {
            name: 'william',
            age: 18,
          },
        },
      })
    </script>
  </body>
</html>
```

```js
// js\Watcher.js
class Watcher {
  constructor(vm, key, cb) {
    // 当前 Vue 实例
    this.vm = vm
    // 订阅者的属性名
    this.key = key
    // 数据变化后，要执行的回调
    this.cb = cb

    //触发Getter 前，将当前订阅者实例存储给Dep类
    Dep.target = this

    // 记录属性更改之前的值，用于进行更新状态检测（导致了js\Observer.js的属性Getter 的触发）
    this.oldValue = vm[key]

    // 操作完毕后清除target，用于存储下一个Watcher 实例
    Dep.target = null
  }
  // 封装数据变化时更新视图的功能
  update() {
    const newValue = this.vm[this.key]
    // 如果数据不变，无需更新
    if (newValue === this.oldValue) return
    // 数据改变，调佣更新后的回调
    this.cb(newValue)
  }
}
```

```js{32-33}
// js\Observer.js
class Observer {
  // 接收传入的对象，将这个对象的属性转换为Getter/Setter
  constructor(data) {
    this.data = data
    // 遍历数据
    this.walk(data)
  }
  // 封装用于数据遍历的方法
  walk(data) {
    Object.keys(data).forEach((key) => this.convert(key, data[key]))
  }
  // 封装用于将对象转换为响应式数据的方法
  convert(key, value) {
    defineReactive(this.data, key, value)
  }
}

function defineReactive(data, key, value) {
  // 创建消息中心
  const dep = new Dep()

  // 检测是否为对象，如果是，创建一个新的Observer 实例进行管理
  observer(value)

  //进行数据劫持
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('获取了属性')
      // * js\Watcher.js 在触发Getter时 添加订阅者
      Dep.target && dep.addSub(Dep.target)
      return value
    },
    set(newValue) {
      console.log('设置了属性')
      if (newValue === value) return
      value = newValue
      observer(value)

      // * 数据变化时，通知消息中心
      dep.notify()
    },
  })
}

function observer(value) {
  if (typeof value === 'object' && value !== null) {
    return new Observer(value)
  }
}
```

### Compiler 类

- 功能：
  - 进行编译模板，并解析内部指令与插值表达式。
  - 进行页面的首次渲染
  - 数据变化后，重新渲染视图

<img src="/images/vue/440.jpg" style="width: 50%; display:inline-block; margin: 0 ;">

#### CompileText(node)处理

<img src="/images/vue/082.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```js
// js\Compiler.js

class Compiler {
  constructor(vm) {
    this.vm = vm
    this.el = vm.$el

    // 初始化模板编译方法
    this.compile(this.el)
  }
  // 基础模板方法
  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach((node) => {
      // 检测节点类型（文本节点、元素节点）
      if (isTextNode(node)) {
        // 编译文本节点内容
        this.compileText(node)
      } else if (isElementNode(node)) {
        // 编译文本节点内容
        // this.compileText(node)
      }
    })
  }
  //封装文本节点编译方法
  compileText(node) {
    const reg = /\{\{(.+?)\}\}/g
    // 去除内容中不必要的空格与换行
    const value = node.textContent.replace(/\s/g, '')
    // 声明数据存储多段文本
    const tokens = []
    // 记录已经操作过的位置的索引
    let lastIndex = 0
    // 记录当前提取内容的初始索引
    let index
    let result
    while ((result = reg.exec(value))) {
      // 本次提取内容的初始索引
      index = result.index
      // 处理普通文本
      if (index > lastIndex) {
        // 将中间部分的内容存储到 tokens 中
        tokens.push(value.slice(lastIndex, index))
      }
      // 处理插值表达式内容(去除空格的操作可省略)
      const key = result[1].trim()
      // 根据 key 获取对应属性值，存储到 tokens
      tokens.push(this.vm[key])
      // 更新 lastIndex
      lastIndex = index + result[0].length
      // 创建订阅者 Watcher 实时订阅数据变化
      const pos = tokens.length - 1
      new Watcher(this.vm, key, (newValue) => {
        // 数据变化，修改 tokens 中的对应数据
        tokens[pos] = newValue
        node.textContent = tokens.join('')
      })
    }
    if (tokens.length) {
      // 页面初始渲染
      node.textContent = tokens.join('')
    }
  }
}

// 判断节点是否为元素节点
function isElementNode(node) {
  return node.nodeType === 1
}

// 判断节点是否为文本节点
function isTextNode(node) {
  return node.nodeType === 3
}
```

#### compileElement 处理

<img src="/images/vue/083.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      这是msg1:{{ msg1 }} 这是msg2:{{ msg2 }}
      <p v-text="msg1" class="text"></p>
      <p>{{ msg1 }}</p>
      <p>{{ msg2 }}</p>
      <input type="text" v-model="msg2" />
    </div>
    <script src="./js/Watcher.js"></script>
    <script src="./js/Dep.js"></script>
    <script src="./js/Compiler.js"></script>
    <script src="./js/Observer.js"></script>
    <script src="./js/Vue.js"></script>
    <script>
      const vm = new Vue({
        el: '#app',
        // el: document.querySelector('#app'),
        data: {
          msg1: '内容1',
          msg2: '内容2',
          obj: {
            name: 'william',
            age: 18,
          },
        },
      })
    </script>
  </body>
</html>
```

```js{23-25,68-111,124-128}
// js\Compiler.js

class Compiler {
  constructor(vm) {
    this.vm = vm
    this.el = vm.$el

    // 初始化模板编译方法
    this.compile(this.el)
  }
  // 基础模板方法
  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach((node) => {
      // 检测节点类型（文本节点、元素节点）
      if (isTextNode(node)) {
        // 编译文本节点内容
        this.compileText(node)
      } else if (isElementNode(node)) {
        // 编译元素节点内容
        this.compileElement(node)
      }
      // 检测当前节点是否存在子节点
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  // 封装文本节点编译方法
  compileText(node) {
    const reg = /\{\{(.+?)\}\}/g
    // 去除内容中不必要的空格与换行
    const value = node.textContent.replace(/\s/g, '')
    // 声明数据存储多段文本
    const tokens = []
    // 记录已经操作过的位置的索引
    let lastIndex = 0
    // 记录当前提取内容的初始索引
    let index
    let result
    while ((result = reg.exec(value))) {
      // 本次提取内容的初始索引
      index = result.index
      // 处理普通文本
      if (index > lastIndex) {
        // 将中间部分的内容存储到 tokens 中
        tokens.push(value.slice(lastIndex, index))
      }
      // 处理插值表达式内容(去除空格的操作可省略)
      const key = result[1].trim()
      // 根据 key 获取对应属性值，存储到 tokens
      tokens.push(this.vm[key])
      // 更新 lastIndex
      lastIndex = index + result[0].length
      // 创建订阅者 Watcher 实时订阅数据变化
      const pos = tokens.length - 1
      new Watcher(this.vm, key, (newValue) => {
        // 数据变化，修改 tokens 中的对应数据
        tokens[pos] = newValue
        node.textContent = tokens.join('')
      })
    }
    if (tokens.length) {
      // 页面初始渲染
      node.textContent = tokens.join('')
    }
  }
  // 封装元素节点处理方法
  compileElement(node) {
    // 获取属性节点
    Array.from(node.attributes).forEach((attr) => {
      // 保存属性名称，并检测属性的功能
      let attrName = attr.name
      if (!isDirective(attrName)) return
      // 获取指令的具体名称
      attrName = attrName.slice(2)
      // 获取指令的值，代表响应式数据的名称
      let key = attr.value
      // 封装 update 方法，用于进行不同指令的功能分配
      this.update(node, key, attrName)
    })
  }
  // 用于进行指令分配的方法
  update(node, key, attrName) {
    // 名称处理
    let updateFn = this[attrName + 'Updater']
    // 检测并调用
    updateFn && updateFn.call(this, node, key, this.vm[key])
  }
  // v-text 处理
  textUpdater(node, key, value) {
    // 给元素设置内容
    node.textContent = value
    // 订阅数据变化
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue
    })
  }
  // v-model 处理
  modelUpdater(node, key, value) {
    // 给元素设置数据
    node.value = value
    // 订阅数据变化
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })
    // 监听 input 事件，实现双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }
}

// 判断节点是否为元素节点
function isElementNode(node) {
  return node.nodeType === 1
}

// 判断节点是否为文本节点
function isTextNode(node) {
  return node.nodeType === 3
}

// 判断属性名是否为指令
function isDirective(attrName) {
  return attrName.startsWith('v-')
}
```

## 功能回顾与总结

- Vue 类
  - 把 data 的属性注入到 Vue 实例
  - 调用 Observer 实现数据响应式处理
  - 调用 Compiler 编译模板
- Observer
  - 将 data 的属性转换成 Getter/Setter
  - 为 Dep 添加订阅者 Watcher
  - 数据变化发送时通知 Dep
- Dep
  - 收集依赖，添加订阅者（watcher）
  - 通知订阅者
- Watcher
  - 编译模板时创建订阅者，订阅数据变化
  - 接到 Dep 通知时，调用 Compiler 中的模板功能更新视图
- Compiler
  - 编译模板，解析指令与插值表达式
  - 负责页面首次渲染与数据变化后重新渲染

<img src="/images/vue/441.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
