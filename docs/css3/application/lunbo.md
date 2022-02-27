# CSS3轮播图应用
## 轮播图一
运用了CSS3选择器+过渡动画，选择白色input时切换到对应的图片

<lunbo1 />

::: details 点击查看代码
```html
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .carousel {
        position: relative;
        width: 800px;
        height: 500px;
        margin: 50px auto;
        border: 2px solid black;
        overflow: hidden;
      }
      .carousel input {
        display: none;
      }
      .carousel .pic {
        position: absolute;
        left: 0;
        width: 5000px;
        height: 500px;
        transition: all 2s ease-in 0s;
      }
      .carousel .pic img {
        float: left;
        width: 800px;
        height: 500px;
      }
      .carousel .page {
        position: absolute;
        left: 100px;
        bottom: 50px;
        width: 200px;
        height: 20px;
      }
      .carousel .page label {
        float: left;
        width: 20px;
        height: 20px;
        margin-right: 20px;
        background-color: skyblue;
      }
      /* 通过判断哪个 input标签被选中，让后面的兄弟发生样式变化 */
      .carousel #page1:checked ~ .pic {
        left: 0;
      }
      .carousel #page2:checked ~ .pic {
        left: -800px;
      }
      .carousel #page3:checked ~ .pic {
        left: -1600px;
      }
    </style>
    <div class="carousel">
      <input type="radio" name="slider" id="page1" checked="checked" />
      <input type="radio" name="slider" id="page2" />
      <input type="radio" name="slider" id="page3" />
      <div class="pic">
        <img src="images/01.jpg" alt="" />
        <img src="images/02.jpg" alt="" />
        <img src="images/03.jpg" alt="" />
      </div>
      <div class="page">
        <label for="page1"></label>
        <label for="page2"></label>
        <label for="page3"></label>
      </div>
    </div>
```
:::

## 轮播图二
运用了CSS3动画，达到无缝切换效果

::: details 点击查看代码
```html
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      .carousel {
        position: relative;
        width: 800px;
        height: 500px;
        margin: 50px auto;
        border: 2px solid black;
        overflow: hidden;
      }
      .carousel .pic {
        position: absolute;
        left: 0;
        width: 5000px;
        height: 500px;
        /* 添加绑定动画 */
        animation: move 6s linear infinite;
      }
      .carousel .pic img {
        float: left;
        width: 800px;
        height: 500px;
      }
      /* 百分比定义动画细节 */
      @keyframes move {
        /* 动画过程，可以添加任意百分比出的动画细节 */
        /* 从头开始，最好保持跟默认样式的状态一致 */
        0% {
          transform: translateX(0);
        }
        33.33% {
          transform: translateX(-800px);
        }
        66.66% {
          transform: translateX(-1600px);
        }
        100% {
          transform: translateX(-2400px);
        }
      }
    </style>
    <div class="carousel">
      <div class="pic">
        <img src="images/01.jpg" alt="" />
        <img src="images/02.jpg" alt="" />
        <img src="images/03.jpg" alt="" />
        <img src="images/01.jpg" alt="" />
      </div>
    </div>
```
:::
<lunbo2 />
