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
  /* transform: skew(0,30deg); */
  /* transform: skew(20deg,30deg); */
  /* transform: skew(20deg,-30deg); */
  transform: skew(30deg);
}
</style>