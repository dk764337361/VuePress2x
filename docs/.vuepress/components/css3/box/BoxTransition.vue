<template>
  <div class="BoxTransition"></div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.BoxTransition {
  width: 100px;
  height: 100px;
  background-color: chartreuse;
  /*过渡属性：属性 过渡时间 时间曲线 延迟时间*/
  transition: all 2s ease-in 0s;
  /* Safari前缀-webkit */
  -webkit-transition: all 2s ease-in 0s;
}
.BoxTransition:hover {
  width: 300px;
}
</style>