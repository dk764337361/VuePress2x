# 子级选择器

用于选取带有特定父元素的元素。
## 书写语法：

`element1` `>` `element2`

`（父级选择器）` `>` `（子级选择器）`

```css
div>p {
    color: red;
}
```
::: warning
如果element2元素不是父元素element1的直接子元素，则不会被选择。

必须满足父子级关系才能选中标签。
:::

::: tip 
比较一下后代选择器与子级选择器的区别
:::

```vue
<template>
  <div class="box1">
    <p>这是box1中的P标签元素</p>
    <p>这是box1中的P标签元素</p>
  </div>
  <div class="box2">
    <p>这是box2中的P标签元素</p>
    <p>这是box2中的P标签元素</p>
    <div class="inner">
      <p>这是inner中的P标签元素</p>
    </div>
  </div>
</template>
<style scoped>
.box1 p {  /* 后代选择器*/
  background-color: skyblue;
}
.box2 > p {  /*子级选择器 */
  background-color: yellowgreen;
}
.inner >p {
    color: gold;
}
</style>
```

<css3SelectorcChild />
