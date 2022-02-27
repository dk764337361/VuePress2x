<template>
  <form action="">
    <p>
      邮件：<input type="email" name="email" /><br />
      手机号码：<input type="tel" name="tel" value="case" /><br />
      <input type="radio" name="male" class="icon-dan" />男性
      <input type="radio" name="female" class="icon-dan" />女性
    </p>
    <p>
      <input type="checkbox" class="icon-duo" />运动
      <input type="checkbox" class="icon-duo" />代码
    </p>
    <p>
      <input type="reset" value="清除按钮" />
      <input type="submit" value="提交按钮" />
    </p>
  </form>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
input[name] {
  margin-bottom: 40px;
}
input[name="email"] {
  width: 300px;
  height: 30px;
}
input[name="female"] {
  width: 30px;
  height: 30px;
}
input[class^="icon"] {
  width: 50px;
  height: 50px;
}
input[type$="mit"] {
  width: 100px;
  height: 40px;
  font: 20px/40px "宋体";
  color: red;
}
input[type*="se"] {
  width: 100px;
  height: 40px;
  font: 20px/40px "宋体";
  color: yellowgreen;
}
</style>