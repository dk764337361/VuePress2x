# 综合案例

## 今日团

### 固定导航与返回顶部

<video src="/images/Javascript/JQ/case1.mp4" controls="controls" loop="loop" height="500"></video>

```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8" />
    <title></title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .w {
        width: 1191px;
        margin: 0 auto;
      }
      .box1 {
        height: 935px;
      }
      .box2 {
        height: 107px;
      }
      .box2.active {
        position: fixed;
        top: 0;
      }

      .top {
        width: 50px;
        height: 50px;
        font: bold 50px/50px "宋体";
        text-align: center;
        color: #fff;
        background-color: blue;
        cursor: pointer;
        position: fixed;
        bottom: 20px;
        right: 0;
        display: none;
      }
    </style>
  </head>
  <body>
    <div class="w">
      <div class="box1">
        <img src="img/01.png" alt="" />
      </div>
      <!-- 今日团 -->
      <div class="box2" id="box2">
        <img src="img/02.png" alt="" />
      </div>
      <div class="box3">
        <img src="img/03.png" alt="" />
      </div>
      <div class="box4">
        <img src="img/04.png" alt="" />
      </div>
    </div>
    1111
    <div class="top" id="backTop">▲</div>
    <script src="lib/jquery-1.12.4.js"></script>
  </body>
</html>
```

```js
// 固定导航和返回顶部
var $box2 = $("#box2");
var $backTop = $("#backTop");
// 1.获取一下今日团距离文档顶部的距离
var v1 = $box2.offset().top;
// console.log(v1)
// 2.给整个文档添加滚动事件
$(document).scroll(function() {
  // 3.在事件内部判断卷走的距离是否大于等于今日团距离顶部的间距
  var v2 = $(this).scrollTop();
  if (v2 >= v1) {
    // 4.给今日团进行固定，让返回顶部按钮出现
    $box2.addClass("active");
    $backTop.show();
  } else {
    // v2 低于 v1 恢复默认
    $box2.removeClass("active");
    $backTop.hide();
  }
});
// 5.返回顶部，添加点击事件
// $backTop.click(function () {
//     // 让页面滚动到顶部
//     // 直接跳转到顶部
//     $(document).scrollTop(0);
// })
// 以运动方式返回顶部
$backTop.click(function() {
  // 让页面滚动到顶部
  // 滚动的元素要选择 html 或 body
  // 直接使用 document ，它是没有 scrollTop 属性的
  $("html,body").animate({ scrollTop: 0 }, 500);
});
```

## 京东-楼梯效果

<video src="/images/Javascript/JQ/case2.mp4" controls="controls" loop="loop" height="500"></video>


### 判断处于哪个楼层让对应的导航的 li 标签高亮显示

### 给导航添加点击事件

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="index.css">
</head>
<body>
	<div class="top">
		<img src="img/top1.png" alt="" />
	</div>
	<div class="louceng">
			<div class="jd jia">
					<img src="img/jia.png" alt="" />
				</div>
			<div class="jd dian">
					<img src="img/dian.png" alt="" />
			</div>
			<div class="jd fu">
				<img src="img/fu.png" alt="" />
			</div>
			<div class="jd mei">
				<img src="img/mei.png" alt="" />
			</div>
	</div>
	<div class="bottom">
		<img src="img/bottom.png" alt="" />
	</div>
	<!-- 侧边栏 -->
	<div class="subnav">
		<ul>
			<li>家电通讯</li>
			<li>电脑数码</li>
			<li>服饰精品</li>
			<li>美容珠宝</li>
		</ul>
		<div class="back">返回</div>

	</div>
	<script src="lib/jquery-1.12.4.js"></script>
	<script src="index2.js"></script>
</body>
</html>
```

- index.js

```js
var $lis = $(".subnav ul li");
// 获取第1层距离顶部的高度
var v1 = $(".jia").offset().top;
// 获取第2层距离顶部的高度
var v2 = $(".dian").offset().top;
// 获取第3层距离顶部的高度
var v3 = $(".fu").offset().top;
// 获取第4层距离顶部的高度
var v4 = $(".mei").offset().top;
// 添加页面滚动事件
$(document).scroll(function () {
  // 判断卷走的距离是否大于等于第一层距离顶部的高度
  // 如果大于让侧边栏导航显示，否则隐藏
  var v = $(this).scrollTop();
  if (v >= v1) {
    $(".subnav").show();
  } else {
    $(".subnav").hide();
  }

  // 在滚动过程中，需要判断处于哪个楼层
  // 让对应的导航的 li 标签高亮显示，其他的默认
  if (v >= v1) {
    $lis.eq(0).addClass("current").siblings().removeClass("current");
  } 
  if (v >= v2) {
    $lis.eq(1).addClass("current").siblings().removeClass("current");
  }
  if (v >= v3) {
    $lis.eq(2).addClass("current").siblings().removeClass("current");
  }
  if (v >= v4) {
    $lis.eq(3).addClass("current").siblings().removeClass("current");
  }
})

// 给导航添加点击事件
$lis.click(function () {
  // 获取用户点击的楼层的下标
  var idx = $(this).index();
  // 找到对应的楼层，获取这个楼层距离顶部的高度
  var value = $(".louceng .jd").eq(idx).offset().top;
  // 给页面添加一个运动效果，运动到指定的楼层位置
  $("html,body").animate({"scrollTop": value},500)
})
```

### 优化

- index.js

```js
var $lis = $(".subnav ul li");
var $jds = $(".louceng .jd");
// 使用数组存储每一层距离顶部的高度
var arr = [];
// 遍历所有的楼层，记住每一层 的 高度
$jds.each(function (i) {
  // 每一项都要存储自己的高度到数组中
  arr[i] = $(this).offset().top;
})
console.log(arr)
// 添加页面滚动事件
$(document).scroll(function () {
  // 判断卷走的距离是否大于等于第一层距离顶部的高度
  // 如果大于让侧边栏导航显示，否则隐藏
  var v = $(this).scrollTop();
  if (v >= arr[0]) {
    $(".subnav").show();
  } else {
    $(".subnav").hide();
  }

  // 在滚动过程中，需要判断处于哪个楼层
  // 让对应的导航的 li 标签高亮显示，其他的默认
  $jds.each(function (i) {
    if (v >= arr[i]) {
      $lis.eq(i).addClass("current").siblings().removeClass("current");
    } 
  })
})

// 给导航添加点击事件
$lis.click(function () {
  // 获取用户点击的楼层的下标
  var idx = $(this).index();
  // 找到对应的楼层，获取这个楼层距离顶部的高度
  var value = arr[idx];
  // 给页面添加一个运动效果，运动到指定的楼层位置
  $("html,body").animate({"scrollTop": value},500)
})
```