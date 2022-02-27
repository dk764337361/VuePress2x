# 模板字符串标签函数

```js
// 模板字符串标签函数
// const str = console.log`hello JavaScript`

const name = "zs";
const gender = true;
function myTagFunc(strings, name, gender) {
  console.log(strings, name, gender); //(3) ['hi, ', ' is a ', '', raw: Array(3)] 'zs' true
  // 处理一下 性别
  const sex = gender ? "man" : "woman";
  return strings[0] + name + strings[1] + sex + strings[2];
}
const str = myTagFunc`hi, ${name} is a ${gender}`;
console.log(str); //hi, zs is a man
```
