<template>
  <div class="BoxTransition"> <img src="/images/CSS3/sea.jpg" alt=""></div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.BoxTransition {
  margin-top: 100px;
  width: 350px;
  height: 263px;
  border: 2px solid black;
}
.BoxTransition img:hover {
  /* 先位移后旋转 */
  /* transform: translate(150px) rotate(40deg); */
  /* 先旋转后位移 */
  transform: rotate(40deg) translate(150px);
}
</style>