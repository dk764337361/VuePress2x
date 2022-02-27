# 字符串的扩展方法

- includes()
- startsWith() 判断以什么开头，如果是则返回 true
- endsWith() 判断以什么结尾，如果是则返回 true

```js
// 字符串扩展方法
const msg = "Error: foo is not defined.";
console.log(msg.startsWith("Error"));
console.log(msg.endsWith("."));
console.log(msg.includes("foo"));
```
