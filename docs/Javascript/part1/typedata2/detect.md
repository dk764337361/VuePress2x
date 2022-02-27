# 检测数据类型

- 使用 typeof 的方法进行数据检测。
- 检测方式：在 typeof 后面加小括号 () 执行，将要检测的数据放在小括号内部。

```html
<head>
  <script>
    console.log(typeof 1);
    console.log(typeof "汉字内容");
    console.log(typeof undefined);
    console.log(typeof true);
    console.log(typeof false);
    console.log(typeof null);

    //   或简单写法
    //   console.log(typeof 1);
    //   console.log(typeof "汉字内容");
    //   console.log(typeof undefined);
    //   console.log(typeof true);
    //   console.log(typeof false);
    //   console.log(typeof null);
  </script>
</head>
```

<img src="/images/Javascript/010.png" style="width: 30%; display: block;">

## 变量的数据类型

- JavaScript 语言是一门动态类型的语言，变量并没有一个单独的数据类型，而是会随着内部存储数据的变化，数据类型也会发生变化。
- 变量的数据类型，与内部存储数据有关。
- 将来使用变量时，需要知道内部存储的数据是什么类型，避免程序出错。

```html
<script>
  // 定义变量
  var a = 1;
  console.log(type(a));
  // 变量赋值发生变化
  a = "haha";
  console.log(typeof a);
</script>
```

## 提示

- 如何使用谷歌浏览器控制台，快速的查看数据类型？
- 字符串的颜色是黑色的，数值类型是蓝色的，布尔类型也是蓝色的，undefined和null是灰色的