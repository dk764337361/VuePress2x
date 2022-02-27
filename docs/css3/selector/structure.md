# 结构伪类选择器

| 选择器        | 简介                                                        |
| ---------------- | ------------------------------------------------------------- |
| E: first-child   | 匹配父元素中的第一个子元素E                      |
| E: last-child    | 匹配父元素中最后一个E元素                         |
| E:nth-child(n)   | 匹配父元素中的第n个子元素E,同时需要满足两个条件 |
| E: first-of-type | 指定类型E的第一个                                     |
| E:last-of-type   | 指定类型E的最后一个                                  |
| E:nth-of-type(n) | 匹配同类型中的第n个同级兄弟元素E,会忽略其他同级的非同类型元素 |

## E:first-child、E:last-child、E:nth-child(n)

### E:nth-child(n)
:::tip 
nth-child(n)中的n可以是数字，关键字和公式
:::
- n如果是数字，就是选择第N个
- 常见的关键字 ：even（偶数）、odd（奇数）
- 常见的公式如下(如果n是公式，则从0开始计算，n是从0，1，2，3......一直递增)
- 但是第0元素或者超出了元素的个数会被忽略

| 公式 | 取值                                        |
| ---- | --------------------------------------------- |
| 2n   | 偶数                                        |
| 2n+  | 奇数                                        |
| 5n   | 从第5个开始(包含第5个)到最后,5 6 7 8 9 ...... |
| -n+5 | 前5个(包含第5个),5 4 3 2 1 0 ......     |

::: details 点击查看代码
```vue
<template>
  <div class="box1">
    <h2>box1的二级标题</h2>
    <P>段落0</P>
    <P>段落1</P>
    <P>段落2</P>
    <P>段落3</P>
    <P>段落4</P>
  </div>
  <div class="box2">
    <h2>.box2 p:nth-child(odd) </h2>
    <P>段落0</P>
    <P>段落1</P>
    <P>段落2</P>
    <P>段落3</P>
    <P>段落4</P>
  </div>
  <div class="box3">
    <h2>.box3 p:nth-child(n+4)</h2>
    <P>段落0</P>
    <P>段落1</P>
    <P>段落2</P>
    <P>段落3</P>
    <P>段落4</P>
    <P>段落5</P>
    <P>段落6</P>
    <P>段落7</P>
  </div>
</template>
<style scoped>
.box1,.box2, .box3{
    border: 2px solid black;
    margin-top: 15px;
}
.box1 :first-child {  
  background-color: skyblue;
}
.box1 :last-child {  
  background-color: gold;
}
/*选中的是：第三个子元素（从h2开始计算）且是P标签*/
.box1 p:nth-child(3) {   
  background-color:yellow;
}
/*选中的是：奇数且是P标签*/
.box2 p:nth-child(odd) {   
  background-color:red;
}
 /*选中的是：从第4个子元素（从h2开始计算）开始且是P标签*/
.box3 p:nth-child(n+4) {  
  background-color:pink;
}
</style>
```
:::

<img src="/images/CSS3/034.png" style="width: 50%; display:inline-block; margin: 0 ;">


## E:first-of-type、E:last-of-type、E:nth-of-type(n)

::: details 点击查看代码
```vue
<template>
<h3>box1:</h3>
  <div class="box1">
    <h2>第一个h2标签</h2>
    <P>段落0</P>
    <h2>第二个h2标签</h2>
    <P>段落1</P>
    <P>段落2</P>
    <P>段落3</P>
    <P>段落4</P>
  </div>
<h3>box2:</h3>
  <div class="box2">
    <h2>第一个h2标签</h2>
    <P>段落0</P>
    <h2>第二个h2标签</h2>
    <P>段落1</P>
    <P>段落2</P>
    <P>段落3</P>
    <P>段落4</P>
  </div>
</template>
<style scoped>
.box1,.box2, .box3{
    border: 2px solid black;
    margin-top: 15px;
}
.box1 p:first-of-type {   
  background-color: skyblue;
}
.box1 p:last-of-type {   
  background-color: blue;
}
.box1 h2:first-of-type {   
  background-color: red;
}

/*比较 E:nth-child(n) 和 E:nth-of-type(n)的不同*/
.box2 p:nth-child(3) {    /*样式不生效，因为被第二个h2标签隔断了*/
  color: red;
}
.box2 p:nth-of-type(3) {   
  color: pink;
}
</style>
```
:::
<img src="/images/CSS3/035.png" style="width: 50%; display:inline-block; margin: 0 ;">

