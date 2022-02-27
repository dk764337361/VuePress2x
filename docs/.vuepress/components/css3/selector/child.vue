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

