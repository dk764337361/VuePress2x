
# 继承性
如果一个标签没有设置过一些样式，它的某个祖先级曾经设置过，在浏览器中该标签也加载了这些样式，这些样式都是从祖先级继承而来，这种现象就是继承性。

通过以下案例查看哪些css样式属性可以被继承：
```html
    <style>
      *{
        margin: 0;
        padding: 0;
      }
      .box{
        width: 200px;
        height: 200px;
        border: 10px solid red;
        background-color: skyblue;
        font-size: 20px;
        font-family: '微软雅黑';
        color: red;
      }
    </style>
    <div class="box">
      <p>文字内容</p>
      <p>文字内容</p>
      <p>文字内容</p>
      <p>文字内容</p>
    </div>
```
<img src="/images/html5/006.png" style="width: 100%; display: block; margin: 0 ;">

## 作用：
继承性是一个很好的性质，可以将页面中出现最多的文字样式设置给一个较大的祖先级标签比如 `<body>`，后期所有的后代标签都可以从 `<body>` 进行继承。
```css
body{font‐size: 14px; font‐family: "微软雅黑"; color: red; }
```

