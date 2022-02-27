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