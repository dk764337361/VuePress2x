# html 兼容写法
html 中可以使用条件注释的方法，对 IE 进行特殊处理。
`条件注释`通过注释演变而来：普通的浏览器认为内部内容为注释，不进行加载，而指定的浏览器会正常加载代码
内容

## html 条件注释写法

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>Document</title>
</head>
<body>
	<!--[if lte IE 8]>
		<h2>您的浏览器版本过低，不支持新特性，请更新浏览器</h2>
	<![endif]-->
	<!--注释内容-->
	<!--[if lte IE 9]>
		<h2>小于等于 IE9 的浏览器可以看到</h2>
	<![endif]-->
	<!--[if lt IE 8]>
		<h2>小于 IE8 的浏览器可以看到</h2>
	<![endif]-->
	<!--[if gte IE 8]>
		<h2>大于等于 IE8 的浏览器可以看到</h2>
	<![endif]-->
	<!--[if IE 7]>
		<h2>只有 IE7 浏览器可以看到</h2>
	<![endif]-->
</body>
</html>
```



举例说明：
```css
<!--[if lte IE 9]>
<h2>小于等于IE9的浏览器可以看到</h2>
<![endif]-->
```
其中：书写时，两个标签前面都要加！，中括号内的每个单词必须用空格分隔。
```
if 如果
endif 结束如果
lte 比较符号，小于等于
IE 浏览器的品牌名称
9 表示版
```

比较符号：
```
lt less than 小于
lte less than or equal 小于等于
gt greater than 大于
gte greater than or equal 大于等于
```

::: tip 提示
相等设置，不需要加任何比较符号即可。
:::

