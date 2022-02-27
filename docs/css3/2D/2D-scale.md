# 2D 转换-缩放

## 缩放 scale()

transform 的属性值为 scale()时，可以实现元素缩放效果。

### 书写语法：
| 值 | 说明 |
| ---------- | ----------------------------------- |
| scale(x,y) | x,y 分别为改变元素的宽度和高度的倍数 |
| scale(n) | 只有一个数值，表示水平方向的位移 |
| scaleX(n) | 只改变元素的宽度 |
| scaleY(n) | 只改变元素的高度 |

<img src="/images/CSS3/019.png" style="width: 30%; display: block; margin: 0 ;">

```html
    <style>
      .box1 {
        margin: 300px;
        width: 400px;
        height: 400px;
        border: 2px solid red;
      }
      .box1 img {
        /* width: 400px;
        height: 400px; */
        /* transform: scale(1,2); */
        transform: scale(0.7);
        /* transform: scaleY(1.5); */
        /* transform: scaleX(1.5); */
      }
    </style>
  </head>
  <body>
    <div class="box1">
      <img src="../images/head.jpg" alt="" />
    </div>
  </body>
```
