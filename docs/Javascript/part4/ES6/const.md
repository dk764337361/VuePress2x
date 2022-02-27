# const 常量

- 特点：在 let 的基础上增加了一个【只读】效果

```js
const name = "zs";
name = "ls"; //报错
```

```js
// 声明的时候必须同时赋初值
const name ;
name = "zs";//报错
```

```js
const obj = {};
obj.name = "zs"; //允许更改，更改的是{}的值，不报错
obj = {}; //报错
```
## 总结

最佳实践：不用 var，主用 const，配合 let
