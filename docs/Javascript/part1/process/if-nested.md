# if 语句嵌套

- if 语句的结构体部分，代码可以是任意的代码，甚至是另外一组 if 语句。
- 也就是 if 语句内部嵌套了 if 语句。
- 如果想执行内部 if 语句的某个分支，必须满足外部 if 语句的条件，同时还要满足内部 if 语句的某个条件。
- 优点：可以简化多分支 if 语句。

## 案例

- 利用 if 语句嵌套判断一个人是否退休。
- 男性：60 岁退休
- 女性：55 岁退休

```js
    // 用户输入
    var sex = prompt("请输入您的性别","男");
    var age = parseInt(prompt("请输入您的年龄","45"));
    // 根据输入的数据，判断是否退休
    // if (sex === "男" && age >= 60) {
    //   alert("恭喜你，可以享受人生了");
    // } else if (sex === "男" && age < 60) {
    //   alert("忍忍吧，还要坚持坚持");
    // } else if (sex === "女" && age >= 55) {
    //   alert("恭喜你，幸福人生开始了");
    // } else {
    //   alert("太难了，还得继续坚持");
    // }

    // 化简条件
    // if (sex === "男" && age >= 60) {
    //   alert("恭喜你，可以享受人生了");
    // } else if (sex === "男") {  //隐含条件：要么不是男性，要么年龄小于60
    //   alert("忍忍吧，还要坚持坚持");
    // } else if (age >= 55) {   //隐含条件：肯定不是男性
    //   alert("恭喜你，幸福人生开始了");
    // } else {
    //   alert("太难了，还得继续坚持");
    // }

    // 替换方法：if 语句的嵌套
    // 好处：逻辑清晰，不容易出错。缺点：代码过多。
    // 外层的 if 语句只判断性别
    // 内层的 if 语句只判断年龄
    if (sex === "男") {
      // 男性，年龄需要大于60岁
      if (age >= 60) {
        alert("恭喜你，可以享受人生了");
      } else {
        alert("忍忍吧，还要坚持坚持");
      }
    } else {
      // 女性，年龄需要大于55岁
      if (age >= 55) {
        alert("恭喜你，幸福人生开始了");
      } else {
        alert("太难了，还得继续坚持");
      }
    }
```