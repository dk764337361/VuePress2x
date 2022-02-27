# 排序案例-排他思想

在一些事件中，希望自己是特殊的，而它的兄弟们是默认的。

- 排他方法
  - jQuery 中可以让 this 特殊设置，让兄弟 siblings 设置成默认。

## Tab 栏

- 自己的级别的排他：给自己 this 添加 current 类名，让其他的兄弟删除 current 类。
- 对应的部分的排他：给对应位置的元素添加 current，其他的兄弟删除 current 类。
- 找对应关系，使用的是自己的 index() 下标，让另一组中下标相同的项作为对应项。
- 通过选中另一组的对应项利用 eq() 方法选择下标项。

<img src="/images/Javascript/JQ/tab-simple.gif" style="width: 50%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      ul {
        list-style: none;
      }
      .tab {
        width: 310px;
        height: 190px;
        border-top: 2px solid #206f96;
        margin: 100px;
        float: left;
      }
      .tab .title {
        width: 309px;
        height: 30px;
        border-left: 1px solid #cfcfcf;
        overflow: hidden;
      }
      .tab .title span {
        float: left;
        width: 102px;
        height: 29px;
        border-right: 1px solid #cfcfcf;
        border-bottom: 1px solid #cfcfcf;
        background-color: #f5f5f5;
        font: 14px/29px "SimSun";
        text-align: center;
      }
      .tab .title span.current {
        height: 30px;
        background-color: #fff;
      }

      .tab .title span a {
        color: #252525;
        text-decoration: none;
      }
      .tab .detail {
        height: 143px;
        padding: 17px 0 0 9px;
        font: 14px/27px "SimSun";
      }
      .tab .detail ul {
        display: none;
      }

      .tab .detail ul.current {
        display: block;
      }
      .tab .detail ul li a {
        color: #252525;
        text-decoration: none;
      }
      .tab .detail ul li.first {
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="tab">
      <div class="title">
        <span class="current"><a href="#">新闻</a></span>
        <span><a href="#">图片</a></span>
        <span><a href="#">军事</a> <a href="#">航空</a></span>
      </div>
      <div class="detail">
        <ul class="current">
          <li class="first">
            <a href="#">习近平离京访问捷克并出席核安全峰会</a>
          </li>
          <li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
          <li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
          <li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
          <li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
        </ul>
        <ul>
          <li class="first">
            <a href="#">2习近平离京访问捷克并出席核安全峰会</a>
          </li>
          <li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
          <li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
          <li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
          <li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
        </ul>
        <ul>
          <li class="first">
            <a href="#">3习近平离京访问捷克并出席核安全峰会</a>
          </li>
          <li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
          <li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
          <li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
          <li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
        </ul>
      </div>
    </div>
    <script src="js/jquery-1.12.4.min.js"></script>
    <script>
      // 获取所有的 span
      var $span = $(".tab .title span");
      // 添加鼠标移上事件
      $span.mouseenter(function() {
        // 利用变量存储 this 的下标
        var idx = $(this).index();
        // 自己级别的排他
        $(this)
          .addClass("current")
          .siblings()
          .removeClass("current");
        // 对应级别的排他
        $(".tab .detail ul")
          .eq(idx)
          .addClass("current")
          .siblings()
          .removeClass("current");
      });
    </script>
  </body>
</html>
```
## Tab 栏优化

### 问题
- 以上方式在一个 tab 栏效果中没有问题。
- 在一个网页中，可能会出现多个相同 tab 栏结构，只有第一个 tab 栏中的列表项会进行切换。
- 解决方法：span 和 ul 的查找全部使用链式调用，通过节点关系查找。
  
<img src="/images/Javascript/JQ/tab-problem.gif" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<!DOCTYPE html
	PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>Document</title>
	<style>
		* {
			margin: 0;
			padding: 0;
		}

		ul {
			list-style: none;
		}

		.tab {
			width: 310px;
			height: 190px;
			border-top: 2px solid #206f96;
			margin: 100px;
			float: left;
		}

		.tab .title {
			width: 309px;
			height: 30px;
			border-left: 1px solid #cfcfcf;
			overflow: hidden;
		}

		.tab .title span {
			float: left;
			width: 102px;
			height: 29px;
			border-right: 1px solid #cfcfcf;
			border-bottom: 1px solid #cfcfcf;
			background-color: #f5f5f5;
			font: 14px/29px "SimSun";
			text-align: center;
		}

		.tab .title span.current {
			height: 30px;
			background-color: #fff;
		}

		.tab .title span a {
			color: #252525;
			text-decoration: none;
		}

		.tab .detail {
			height: 143px;
			padding: 17px 0 0 9px;
			font: 14px/27px "SimSun";
		}

		.tab .detail ul {
			display: none;
		}

		.tab .detail ul.current {
			display: block;
		}

		.tab .detail ul li a {
			color: #252525;
			text-decoration: none;
		}

		.tab .detail ul li.first {
			font-weight: bold;
		}
	</style>
</head>

<body>
	<div class="tab">
		<div class="title">
			<span class="current"><a href="#">新闻</a></span>
			<span><a href="#">图片</a></span>
			<span><a href="#">军事</a> <a href="#">航空</a></span>
		</div>
		<div class="detail">
			<ul class="current">
				<li class="first"><a href="#">习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
			<ul>
				<li class="first"><a href="#">2习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
			<ul>
				<li class="first"><a href="#">3习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
		</div>
	</div>
	<div class="tab">
		<div class="title">
			<span class="current"><a href="#">新闻</a></span>
			<span><a href="#">图片</a></span>
			<span><a href="#">军事</a> <a href="#">航空</a></span>
		</div>
		<div class="detail">
			<ul class="current">
				<li class="first"><a href="#">习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
			<ul>
				<li class="first"><a href="#">2习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
			<ul>
				<li class="first"><a href="#">3习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
		</div>
	</div>
	<div class="tab">
		<div class="title">
			<span class="current"><a href="#">新闻</a></span>
			<span><a href="#">图片</a></span>
			<span><a href="#">军事</a> <a href="#">航空</a></span>
		</div>
		<div class="detail">
			<ul class="current">
				<li class="first"><a href="#">习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
			<ul>
				<li class="first"><a href="#">2习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
			<ul>
				<li class="first"><a href="#">3习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
		</div>
	</div>
	<div class="tab">
		<div class="title">
			<span class="current"><a href="#">新闻</a></span>
			<span><a href="#">图片</a></span>
			<span><a href="#">军事</a> <a href="#">航空</a></span>
		</div>
		<div class="detail">
			<ul class="current">
				<li class="first"><a href="#">习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
			<ul>
				<li class="first"><a href="#">2习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
			<ul>
				<li class="first"><a href="#">3习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
		</div>
	</div>
	<div class="tab">
		<div class="title">
			<span class="current"><a href="#">新闻</a></span>
			<span><a href="#">图片</a></span>
			<span><a href="#">军事</a> <a href="#">航空</a></span>
		</div>
		<div class="detail">
			<ul class="current">
				<li class="first"><a href="#">习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
			<ul>
				<li class="first"><a href="#">2习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
			<ul>
				<li class="first"><a href="#">3习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
		</div>
	</div>
	<div class="tab">
		<div class="title">
			<span class="current"><a href="#">新闻</a></span>
			<span><a href="#">图片</a></span>
			<span><a href="#">军事</a> <a href="#">航空</a></span>
		</div>
		<div class="detail">
			<ul class="current">
				<li class="first"><a href="#">习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
			<ul>
				<li class="first"><a href="#">2习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
			<ul>
				<li class="first"><a href="#">3习近平离京访问捷克并出席核安全峰会</a></li>
				<li><a href="#">习近平在捷克发文 热议 出访专题 这三年</a></li>
				<li><a href="#">李克强:亚洲国家较含蓄 更需开放交流 在博鳌</a></li>
				<li><a href="#">张德江会客 江泽民为《世界名曲45首》作序</a></li>
				<li><a href="#">酒店枕头下现近万现金 房客怒投诉:没换枕套</a></li>
			</ul>
		</div>
	</div>
	<script src="js/jquery-1.12.4.min.js"></script>
	<script>
		// 获取所有的 span
		var $span = $(".tab .title span");
		// 添加鼠标移上事件
		$span.mouseenter(function () {
			// 利用变量存储 this 的下标
			var idx = $(this).index();
			// 自己级别的排他
			// 查找所有对应 ul 时候，不要单独选择所有 ul，要通过当前的 this 的节点关系查找
			// 链式调用方式，找到自己父级中的兄弟中的所有子级 ul
			$(this).addClass("current")
				.siblings().removeClass("current")
				.parent().siblings().children().eq(idx).addClass("current")
				.siblings().removeClass("current");
		})
	</script>
</body>
</html>
```