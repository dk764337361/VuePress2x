# 伪元素选择器

| 选择器          |            | 介绍                            |
| --------------- | ---------- | ------------------------------- |
| E::before       | 之前       | 在 E 元素内部的前面插入一个元素 |
| E::after        | 之后       | 在 E 元素内部的后面插入一个元素 |
| E::first-letter | 第一个字母 | 选择到了 E 容器内的第一个字母   |
| E::first-line   | 第一行     | 选择到了 E 容器内的第一行文本   |

::: warning 提示
`E::first-letter` 在制作字围效果时，可以节省过多`span`标签的书写。
:::

## H5 写法和传统写法区别

- HTML2.1： 单冒号 E:before
- HTML5： 双冒号 E::before
- 浏览器对以上写法都能识别。

## 伪元素的注意事项

- 伪元素只能给`双标签`添加，不能给`单标签`添加。
- 伪元素的冒号前不能有空格，如`E ::after` 这个写法是错误的。
- 伪元素里面必须写上属性 `content: "";`
- before 和 after 创建一个元素，但属于`行内元素`。
- 因为在`DOM`里看不见刚才创建的元素，所以我们称之为`伪元素`。

<img src="/images/CSS3/001.png" style="width: 30%; display: block; margin: 0 ;">

::: details 点击查看代码

```vue
<template>
  <div class="box">
    <p class="ps0">这是第一行段落</p>
    <p class="ps1">这是第二行段落</p>
    <p></p>
    <p></p>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.box {
  width: 400px;
  padding: 10px;
  border: 1px solid #000;
}
.box p {
  width: 300px;
  height: 50px;
  margin-bottom: 10px;
  background-color: skyblue;
}
/* 给box盒子内部提娜佳伪元素 */
.box::before {
  content: "1";
  display: block; /*需要处理成块级元素才能设置高宽*/
  width: 200px;
  height: 50px;
  background-color: gold;
  margin-bottom: 10px;
}
.ps0::first-letter {
  color: red;
  font-size: 30px;
}
.ps1::first-line {
  color: yellow;
}
</style>
```

:::
<pseudoelement1 />
