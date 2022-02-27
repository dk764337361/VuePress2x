# 对象扩展方法

## Object.assign()

Object.assign(参数一,参数二,参数三,......);

将多个源对象（参数二,参数三,......）中的属性复制到一个目标对象（参数一）中，返回目标对象（参数一）结果

```js
const source1 = {
  a: 123,
  b: 123,
};
const source2 = {
  b: 678,
  d: 789,
};
const target = {
  a: 456,
  c: 789,
};
const result = Object.assign(target, source1, source2);
console.log(target); //{a: 123, c: 789, b: 678, d: 789}
console.log(target === result); //true
```

```js
// 复制对象
function fun(obj) {
  // 希望内部更改时，不要改外部的对象
  const newObj = Object.assign({}, obj);
  newObj.name = "tom";
  console.log(newObj); //{name: 'tom', age: 18}
}
const obj = {
  name: "jack",
  age: 18,
};
fun(obj);
console.log(obj); //{name: 'jack', age: 18}
```

### 应用场景

```js
// 应用，在 options 对象参数接收时，简化
function Block(options) {
  //旧方法
  // this.width = options.width;
  //ES6方法
  Object.assign(this, options);
}
const block1 = new Block({ width: 100, height: 100, x: 50, y: 50 });
console.log(block1); //Block {width: 100, height: 100, x: 50, y: 50}
```

## Object.is()

```js
// 对象扩展方法
// Object.is 方法
console.log(
  0 == false,//true
  0 === false,//false
  +0 === -0,//true
  NaN === NaN,//false
  Object.is(+0, -0),//false
  Object.is(NaN, NaN)//true
);
```
