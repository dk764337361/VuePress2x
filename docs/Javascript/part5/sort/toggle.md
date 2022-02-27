# jQuery 切换效果方法

## hide()、show()、toggle()

<img src="/images/Javascript/JQ/toggle.gif" style="width: 40%; display:inline-block; margin: 0 ;">

- `hide()`：元素隐藏，隐藏的前提必须是元素 `display:block`；
- `show()`：元素显示，显示的前提必须是元素 `display:none`;
- `toggle()`：在元素隐藏和显示之间进行切换。
- 这三个方法可以设置元素的显示和隐藏效果，在过程中还可以出现过渡动画。

### 参数

- 如果不传参数：直接显示和隐藏，没有过渡动画。
- 如果传递参数：
  - 单词格式：`"slow"`,`"normal"`, `"fast"`
  - 数字格式的时间，单位是毫秒，在规定时间之内会出现显示或隐藏的动画。
  - 过渡时间内，伴随着宽度和高度以及透明度的变化。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      img {
        display: block;
        width: 320px;
        height: 480px;
      }
    </style>
  </head>

  <body>
    <input type="button" value="隐藏" id="btn1" />
    <input type="button" value="显示" id="btn2" />
    <input type="button" value="切换" id="btn3" /><br />
    <img src="images/cat.jpg" id="pic" />

    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 获取元素
      var $pic = $("#pic");
      var $btn1 = $("#btn1");
      var $btn2 = $("#btn2");
      var $btn3 = $("#btn3");

      // 添加点击事件，让图片实现显示和隐藏
      $btn1.click(function() {
        // $pic.hide();
        $pic.hide("slow");
        // $pic.hide(1000);
      });
      $btn2.click(function() {
        // $pic.show();
        $pic.show("normal");
        // $pic.show(1000);
      });
      $btn3.click(function() {
        // $pic.toggle();
        $pic.toggle("fast");
        // $pic.toggle(2000);
      });
    </script>
  </body>
</html>
```

## slideDown()、slideUp()

<img src="/images/Javascript/JQ/slideDown02.gif" style="width: 30%; display:inline-block; margin: 0 ;">

- slideDown()：滑动显示（方向不一定）
- slideUp()：滑动隐藏
- slideToggle()：滑动切换
- 让元素在 display 属性的 block 和 none 之间进行切换。

### 参数

- 如果不传参数：默认的过渡时间为 400 毫秒。
- 如果传递参数：
  - 单词格式："slow","normal", "fast"
  - 数字格式的时间，单位是毫秒，在规定时间之内会出现显示或隐藏的动画。

::: warning 注意

- 如果滑动的元素没有设置宽高，没有滑动效果。
- 如果元素设置了高度和宽度，会进行上下垂直方向的滑动。
- 动画的效果：高度属性在 0 到设置值之间的变化，没有透明度动画。
- 如果元素设置了绝对或者固定定位，偏移量方向如果是 bottom 参与了，滑动方向会发生变化。
  :::

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      img {
        /* position: fixed;
            bottom: 10px; */
        display: block;
        width: 320px;
        height: 480px;
      }
    </style>
  </head>

  <body>
    <input type="button" value="滑动隐藏" id="btn1" />
    <input type="button" value="滑动显示" id="btn2" />
    <input type="button" value="滑动切换" id="btn3" /><br />
    <img src="images/cat.jpg" id="pic" />

    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 获取元素
      var $pic = $("#pic");
      var $btn1 = $("#btn1");
      var $btn2 = $("#btn2");
      var $btn3 = $("#btn3");

      // 添加点击事件，让图片实现滑动显示和隐藏
      $btn1.click(function() {
        // $pic.slideUp()
        $pic.slideUp(1000);
      });
      $btn2.click(function() {
        // $pic.slideDown()
        $pic.slideDown(1000);
      });
      $btn3.click(function() {
        // $pic.slideToggle()
        $pic.slideToggle(1000);
      });
    </script>
  </body>
</html>
```

::: warning 注意

- 如果元素设置了绝对或者固定定位，偏移量方向如果是 bottom 参与了，滑动方向会发生变化。

如下所示：
:::

```css{2-3}
img {
  position: fixed;
  bottom: 10px;
  display: block;
  width: 320px;
  height: 480px;
}
```

<img src="/images/Javascript/JQ/slideDown01.gif" style="width: 30%; display:inline-block; margin: 0 ;">

## fadeIn() 和 fadeOut() 方法

- fadeIn()：淡入，透明度逐渐增大最终显示。
- fadeOut()：淡出，透明度逐渐降低最终隐藏。
- fadeToggle()：切换效果。
- fadeTo()：淡入或淡出到某个指定的透明度。
- 动画效果，执行的是透明度动画。也是在 display 属性的 block 和 none 之间切换。

### 参数

- 如果不传参数：默认的过渡时间为 400 毫秒。
- 如果传递参数：
  - 单词格式："slow","normal", "fast"
  - 数字格式的时间，单位是毫秒，在规定时间之内会出现显示或隐藏的动画。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      img {
        display: block;
        width: 320px;
        height: 480px;
      }
    </style>
  </head>

  <body>
    <input type="button" value="淡出隐藏" id="btn1" />
    <input type="button" value="淡入显示" id="btn2" />
    <input type="button" value="淡入淡出切换" id="btn3" />
    <input type="button" value="fadeTo 0.5" id="btn4" /><br />
    <img src="images/cat.jpg" id="pic" />

    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 获取元素
      var $pic = $("#pic");
      var $btn1 = $("#btn1");
      var $btn2 = $("#btn2");
      var $btn3 = $("#btn3");
      var $btn4 = $("#btn4");

      // 添加点击事件，让图片实现淡入显示和淡出隐藏
      $btn1.click(function() {
        $pic.fadeOut("slow");
      });
      $btn2.click(function() {
        $pic.fadeIn(1000);
      });
      $btn3.click(function() {
        $pic.fadeToggle();
      });
      $btn4.click(function() {
        $pic.fadeTo(500, 0.5); //500毫秒，透明度0.5
      });
    </script>
  </body>
</html>
```
