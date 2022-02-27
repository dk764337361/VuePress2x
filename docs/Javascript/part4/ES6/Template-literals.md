# 模板字符串字面量

## 新字符串字面量：``

- 新字符串字面量：` `` `,可以回车换行而不报错，甚至可以通过插值表达式`${变量/方法}`进行插值。

```js
// 模板字符串
const str = `this
is a \`string`;
console.log(str);
```

```js
const name = "tom";
const str = `hey, ${name},${1 + 1},${Math.random()}`;
console.log(str);
```
