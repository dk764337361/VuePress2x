# rem单位

## 思考
1. 页面布局文字能否随看屏幕大小变化而变化?
2. 流式布局和flex布局主要针对于宽度布局，那高度如何设置？
3. 怎么样让屏幕发生变化的时候元素高度和宽度等比例缩放？

## rem单位
- rem (root em) 是一个相对单位类似于 em, em 是父元素字体大小。
- 不同的是 rem 的基准是相对于 `<html>` 元素的字体大小。
- 比如， 根元素 (html) 设置 font-size=12px；非根元素设置 width:2rem， 转换成 px 表示就是 24px。
- rem 的优势：父元素文字大小可能不一致， 但是整个页面只有一个 `<html>`，可以很好的来控制整个页面的元素大小比例。

```html
  <div class="box">
    <p></p>
  </div>
```

```css{7,10-12}
    .box {
      width: 200px;
      height: 200px;
      background-color: pink;
      font-size: 20px;
    }
    .box p {
      /* em：相对单位，参考的是父级元素的字号大小的倍数，如果是 2em 表示字号的2倍 */
      width: 5em;
      height: 4em;
      background-color: skyblue;
    }
```
<img src="/images/mobile/rem/001.png" style="width: 100%; display:block; margin: 0 ;">

- 子级设置rem，参考的是页面中html元素（font-size: 30px;），更改font-size可以实现整体`宽度`等比例缩放
```css
    html {
      font-size: 20px;
    }
    .box {
      width: 200px;
      height: 200px;
      background-color: pink;
      font-size: 30px;
    }
    .box p {
      /* rem：相对单位，参考的是根元素 html 的字号大小的倍数，如果是 2rem 表示 html 元素字号的 2 倍 */
      width: 5rem;
      height: 4rem;
      background-color: skyblue;
    }
```

- 父级和子级都设置rem，参考的是页面中html元素（font-size: 20px;），更改font-size可以实现整体`字体`等比例缩放
```css
    html {
      font-size: 20px;
    }
    .box {
      width: 10rem;
      height: 10rem;
      background-color: pink;
      font-size: 20px;
    }
    .box p {
      /* rem 优势：参考元素是 html ，一个页面中只有一个 html 元素，可以实现整体控制 */
      width: 5rem;
      height: 4rem;
      background-color: skyblue;
    }
```