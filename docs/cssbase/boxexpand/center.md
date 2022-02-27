# center居中

- 文本水平居中：text-align(单、多行)

```css
text-align: center;
```

- `单行`文本垂直居中：让`line-height`等于盒子高度

```css
height: 200px;
line-height: 200px;
text-align: center;
```

<img src="/images/css/022.png" style="width: auto; display: block; margin: 10px auto;">
<img src="/images/css/023.png" style="width: 70%; display: block; margin: 0 ;">

- `多行`文本垂直居中：让盒子`height`自适应文本高度 `或` 设置盒子内文本的`padding`内边距上下值相同。
  <img src="/images/css/024.png" style="width: 40%; display: block; margin: 0 ;">

```html{7,15}
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      .box2 {
        width: 300px;
        /* height: auto; */
        margin: 80px auto;
        border: 8px solid deeppink;
        background-color: rgb(13, 228, 41);
      }
      .box2 p {
        width: auto;
        text-align: center;
        padding: 20px 20px;
      }
    </style>
  </head>
  <body>
    <div class="box2">
      <p>
        温柔让3让如23如3如3如如入户65温柔让3让如23如3如3如如入户65温柔让3让如23如3如3如
      </p>
    </div>
  </body>
</html>
```

- 元素居中：

 垂直居中：子元素不变，父元素设置`padding`。

```css
padding: 50px 0;
```

- 水平居中：针对类似 `<div>、<p>`样式上必须独占一行的盒子，`如果子盒子宽度低于父盒子宽度`，可以设置子盒子的 margin 值，水平方向的值都设置为 auto。

```css
margin: 0 auto;
```

原因：auto 只在水平方向有作用，水平方向的 margin 如果设置为 auto，边距会自动无限增大，直到撑满整个父元素除了子元素宽度之外剩余的区域，如果两个水平方向都是 auto，两边都要无限大，只能达到一个平衡，两边距离相同，导致盒子居中。
:::
<img src="/images/css/025.png" style="width: 40%; display: block; margin: 0 ;">

```html{9}
//垂直居中：子元素不变，父元素设置`padding`
<html lang="en">
  <head>
    <style>
      .box {
        width: 400px;
        /* height: auto; */
        /* margin: 80px auto; */
        padding: 50px 0;
        border: 8px solid rgb(10, 248, 30);
      }
      .box2 {
        width: 200px;
        height: 200px;
        text-align: center;
        border: 8px solid deeppink;
        padding: 50px 50px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="box2">
        温柔让3让如23如3如3如如入户65温柔让3让如23如3如3如如入户65温柔让3让如23如3如3如
      </div>
    </div>
  </body>
</html>
```

<img src="/images/css/026.png" style="width: 40%; display: block; margin: 0 ;">

```html{10,14}
//水平居中：针对类似 `
<div>
  ``
  <p>
    ` 样式上必须独占一行的盒子， 如果子盒子宽度低于父盒子宽度，可以设置子盒子的
    margin 值，水平方向的值都设置为 auto。
    <html lang="en">
      <head>
        <style>
          .box {
            width: 400px;
            /* height: auto; */
            /* margin: 80px auto; */
            padding: 50px 0;
            border: 8px solid rgb(10, 248, 30);
          }
          .box2 {
            margin: 0 auto;
            width: 200px;
            height: 200px;
            text-align: center;
            border: 8px solid deeppink;
            padding: 50px 50px;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <div class="box2">
            温柔让3让如23如3如3如如入户65温柔让3让如23如3如3如如入户65温柔让3让如23如3如3如
          </div>
        </div>
      </body>
    </html>
  </p>
</div>
```
