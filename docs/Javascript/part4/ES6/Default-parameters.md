# 参数默认值

```js
// 函数参数的默认值
function foo(bar, enable = true) {
  // enable = enable || true
  // enable = enable === undefined ? true : enable
  console.log("foo invoked enable:");
  console.log(enable);
}
foo("bar");
```
