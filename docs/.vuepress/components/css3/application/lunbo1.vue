<template>
  <div class="carousel">
    <input type="radio" name="slider" id="page1" checked="checked" />
    <input type="radio" name="slider" id="page2" />
    <input type="radio" name="slider" id="page3" />
    <div class="pic">
      <img src="/images/CSS3/lunbo1/01.jpg" alt="" />
      <img src="/images/CSS3/lunbo1/02.jpg" alt="" />
      <img src="/images/CSS3/lunbo1/03.jpg" alt="" />
    </div>
    <div class="page">
      <label for="page1"></label>
      <label for="page2"></label>
      <label for="page3"></label>
    </div>
  </div>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.carousel {
  position: relative;
  width: 800px;
  height: 500px;
  margin: 50px auto;
  border: 2px solid black;
  overflow: hidden;
}
.carousel input {
  display: none;
}
.carousel .pic {
  position: absolute;
  left: 0;
  width: 5000px;
  height: 500px;
  transition: all 2s ease-in 0s;
}
.carousel .pic img {
  float: left;
  width: 800px;
  height: 500px;
}
.carousel .page {
  position: absolute;
  left: 100px;
  bottom: 50px;
  width: 200px;
  height: 20px;
}
.carousel .page label {
  float: left;
  width: 20px;
  height: 20px;
  margin-right: 20px;
  background-color: white;
}
/* 通过判断哪个 input标签被选中，让后面的兄弟发生样式变化 */
.carousel #page1:checked ~ .pic {
  left: 0;
}
.carousel #page2:checked ~ .pic {
  left: -800px;
}
.carousel #page3:checked ~ .pic {
  left: -1600px;
}
</style>