# CSS3 动画

CSS3中提供了子集的动画制作方法，这可以再许多网页中取代动画图片、Flash动画以及JavaScript。

CSS3动画制作分为两步：`创建动画、绑定动画`。

## 创建动画
### @keyframes规则

@keyframes规则中规定某项CSS样式，就能创建由从一种样式逐渐变化为另一种样式的效果。
可以改变任意多的样式任意多的次数。

需要使用`百分比`来规定变化发生的时间，或用关键词`"from"`和`"to"`，等同于0%和100%。
0%是动画的开始，100%是动画的完成。

### @keyframes书写方法
```css
@keyframes 动画名称{
    /* 动画过程，可以添加任意百分比出的动画细节 */
    form{

    }
    to{

    }
}
```

## 绑定（执行）动画

### animation属性

需要将@keyframes中创建的动画捆绑到某个选择器，否则不会产生动画效果。
animation属性用于对动画进行捆绑。

语法：
```css
div{
    animation:动画名称 过渡时间 速度曲线 动画次数 延时时间；
}
```
其中必须设置动画名称和过渡时间，其他属性值可以根据需求设置。

### animation单一属性

| 属性                    | 描述                                                  |
| ------------------------- | ------------------------------------------------------- |
| animation-name            | 规定@keyframes动画的名称。                      |
| animation-duration        | 规定动画完成一个周期所花费的秒或毫秒.默认是是0。 |
| animation-timing-function | 规定动画的速度曲线。 默认是“ease”。   |
| animation-delay           | 规定动画何时开始。默认是0。                |
| animation-iteration-count | 规定动画被播放的次数。默认是1。infinite表示无限次播放。 |

::: details 点击查看代码
```vue {23-74}
<template>
        <div class="box">
      <p class="tag1">form和to</p>
      <p class="tag2">0%与100%</p>
    </div>
</template>
<style scoped>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        position: relative;
        width: 300px;
        height: 200px;
        margin: 100px auto;
        border: 2px solid black;
      }
      .box p {
        text-align: center;
        line-height: 100px;
      }
      .tag1 {
        position: absolute;
        /* left: 50px;
        top: 50px; */
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: skyblue;
        /* 添加绑定动画 */
        animation: move1 3s ease infinite;
      }
      .tag2 {
        position: absolute;
        left: 200px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: skyblue;
        /* 添加绑定动画 */
        animation: move2 3s ease infinite;
      }
      @keyframes move1 {
        /* 动画过程，可以添加任意百分比出的动画细节 */
        /* 从头开始，最好保持跟默认样式的状态一致 */
        form {
          transform: translateY(0);
        }
        /* 到结束位置 */
        to {
          transform: translateY(100px);
        }
      }
      /* 百分比定义动画细节 */
      @keyframes move2 {
        /* 动画过程，可以添加任意百分比出的动画细节 */
        /* 从头开始，最好保持跟默认样式的状态一致 */
        0% {
          transform: translateY(0);
        }
        25% {
          transform: translateY(100px);
        }
        50% {
          transform: translateY(0);
        }
        75% {
          transform: translateY(-100px);
        }
        100% {
          transform: translateY(0);
        }
      }
</style>
```
:::

<animation />


## 浏览器兼容

IE10、Firfox以及Opera支持@keyframes规则和animation属性。

Chorme和Safari需要前缀`-webkit-`。

IE9以及更早的版本，不支持@keyframes规则和animation属性。
