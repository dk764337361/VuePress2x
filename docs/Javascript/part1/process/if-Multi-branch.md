# 多分支 if 语句

- 包含多个判断条件，对应多个分支。
- 语法：if……else if……else if……else……
- 如果……否则如果……否则如果…… 否则……

```js
结构：
    if (条件1) {
        满足条件1，执行的结构体
    } else if (条件2) {
        不满足条件1，满足条件2，执行的结构体
    } else if (条件3) {
        不满足条件1/2，满足条件3，执行的结构体
    } else {
        不满足前面所有条件，执行的结构体
    }
```
## 案例

利用多分支 if 语句细分班级成绩区间。

优秀：85-100

良好：75-84

及格：60-74

不及格：60以下

```js
// 用户输入
var s = parseFloat(prompt("请输入您的成绩", "67"));
// 利用多分支 if 语句进行判断
// if (s >= 85) {
//   alert("优秀");
// } else if (s < 85 && s >= 75) {
//   alert("良好");
// } else if (s < 75 && s >= 60) {
//   alert("及格");
// } else {
//   alert("不及格");
// }
// 简化
if (s >= 85) {
  alert("优秀");
} else if (s >= 75) {
  //如果程序能够判断到这里，说明 s 肯定是小于 85 的
  alert("良好");
} else if (s >= 60) {
  //如果程序能够判断到这里，说明 s 肯定是小于 75 的
  alert("及格");
} else {
  alert("不及格");
}
```

::: warning 注意事项
1. 多分支 if 语句中可以有多个 else if 的分支，但是 else 分支只能有一个，必须出现在最后，作为备用的选项，而且 else 也可以省略不写，表示前面条件如果都不满足，直接跳出不走任何分支。
2. 多分支 if 语句有跳楼现象：条件从上往下依次验证，如果满足了某个条件，会立即执行后面的结构体，执行完之后，不会再往后验证其他的条件了，而是从这一层直接跳楼跳出if语句，这就是跳楼现象。

:::