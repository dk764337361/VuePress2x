# css 的弊端

## 维护 css 的弊端

CSS 是一门非程序式语言,没有变量、函数、 SCOPE(作用域)等概念

- CSS 需要书写大量看似没有逻辑的代码,CSS 冗余度是比较高的。
- 不方便维护及扩展,不利于复用。
- CSS 没有很好的计算能力。
- 非前端开发工程师来讲,往往会因为缺少 CSS 编写经验而很难写岀组织良好且易于维护的 CSS 代码项目。

```html{12-16}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    /* rem 单位 */
    html {
      font-size: 50px;
    }
    /* 使用rem单位表示一些尺寸时，需要自己手动进行运算，css 不能自动进行运算 */
    img {
      width: 84 / 50rem;
    }
    /*width: 84 / 50rem; 并不能计算 */
    h2 {
      background-color: deeppink;
    }
    div {
      background-color: deeppink;
    }
    p {
      background-color: deeppink;
    }
  </style>
</head>
<body>
  <h2>二级标题</h2>
  <div>div</div>
  <p>段落内容</p>
</body>
</html>
```
