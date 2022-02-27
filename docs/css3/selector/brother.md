# 兄弟选择器

| 选择器              |                   | 简介                                                 |
| ------------------ | ----------------- | ------------------------------------------------------ |
| 相邻兄弟选择器      | element1+element2 | 匹配同一个父元素中紧跟在element1后面的一个element2元素 |
| 其他兄弟选择器      | element1~element2 | 匹配同一个父元素中紧跟在element1后面的所有element2元素 |


## 相邻兄弟选择器
用于选择紧接在另一个元素后的兄弟元素，而二者有相同的父元素。

书写语法：E1+E2。

::: warning
- 选中的是紧跟在E1之后的同级元素。
- 只能选中紧跟在后面的一个E2元素。
- 二者有相同的父元素
:::

```vue
<template>
  <div class="box1">
    <h2>我是二级标题</h2>
    <div>我是div</div>
    <p>段落1</p>
    <p>段落2</p>
    <p>段落3</p>
    <p>段落4</p>
  </div>
</template>
<style scoped>
.box1 h2 + p {  /*样式没发生作用，因为隔着div*/
  background-color: skyblue;
}
.box1 div + p { /*样式发生作用，起作用的是“段落1” */
  background-color: skyblue;
}
p + p { /*除了“段落1”之外所有P标签，样式都发生作用 */
  color: gold;
}
</style>
```

<css3Selectorbrother1 />

## 其他兄弟选择器
`其他兄弟选择器`匹配同一个父元素中在`element1`后面所有的`element2`元素。

书写语法：E1~E2。

::: warning
- 选择`element1`之后出现的所有`element2`。

- 两种元素必须拥有相同的父元素，但是`element2`不必直接紧随`element1`
:::


```vue
<template>
  <div class="box1">
    <p>段落0</p>
    <h2>我是二级标题</h2>
    <p>段落1</p>
    <p>段落2</p>
    <p>段落3</p>
    <p>段落4</p>
  </div>
</template>
<style scoped>
.box1 h2 ~ p {
  background-color: yellowgreen;
}
</style>
```


<css3Selectorcbrother2 />
