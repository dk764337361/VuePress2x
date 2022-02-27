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
.box1 h2 + p { /*样式没发生作用*/
  background-color: skyblue;
}
.box1 div + p {
  background-color: skyblue;
}
p + p {
  color: gold;
}
</style>