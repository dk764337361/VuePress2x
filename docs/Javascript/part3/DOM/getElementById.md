# 根据 ID 获取元素

DOM 获取页面元素

## 获取页面元素

- 为什么要获取页面元素？
- 例如：想要操作页面上的某部分(显示/隐藏，动画)，需要先获取到该部分对应的元素，才进行后续操作。

## 根据 id 获取元素

- 方法：调用 document 对象的 getElementById 方法。
- 参数：字符串类型的 id 的属性值。
- 返回值：对应 id 名的元素对象。

```html
<p id="para">text0</p>
<p id="para">text1</p>
<p id="box">text2</p>
<p>text3</p>
<p>text4</p>
```

```js
// 根据 id 获取元素
var para = document.getElementById("para");
// console.log(typeof para);
// 补充：在控制台打印具体的对象
// console.dir(para);
```

::: warning 注意 1

- 注意 1：由于 id 名具有唯一性，部分浏览器支持直接使用 id 名访问元素，但不是标准方式，<Badge type="danger" text="不推荐使用" vertical="middle" />

```js
para.style.background = "pink"; //不推荐直接使用 id 名
```

:::

::: warning 注意 2

代码执行顺序，如果 js 在 html 结构之前，会导致结构未加载，不能获取对应 id 的元素。
  :::
