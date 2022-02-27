# CSS hack

开发人员书写一份代码上传到服务器，一份代码提供所有用户下载，用户的浏览器不同，
会出现渲染效果不同。为了保证所有用户浏览器加载效果相同，需要在同一份代码中书
写不同的结构给不同的浏览器，这种方法就叫做 hack 方法（Hacker 黑客）。
hack 方法就是在同一份代码中给不同的浏览器书写不同的 css，保证最终加载效果一致

<table>
<tr>
<th>标题</th>
<th>hack 符号</th>
<th>兼容浏览器</th>
</tr>
<tr>
<td rowspan="5">属性</td>
<td>- _ (属性名前面)</td>
<td>IE6 及以下</td>
</tr>
<tr>
<td>! $ & * ( ) = % + @ , . / ` [ ] # ~ ? : &lt; &gt; |
(属性名前面)</td>
<td>IE7 及以下</td>
</tr>
<tr>
<td>\0/ (属性值后面)</td>
<td>仅 IE8</td>
</tr>
<tr>
<td>\0 (属性值后面)</td>
<td>IE8 及以上</td>
</tr>
<tr>
<td>\9 (属性值后面</td>
<td>IE10 及以下</td>
</tr>
<tr>
<td rowspan="5">选择器</td>
<td>* html .selector {}</td>
<td>IE6 及以下</td>
</tr>
<tr>
<td>.selector, {}</td>
<td>IE7 及以下</td>
</tr>
<tr>
<td>html > body .selector {}</td>
<td>不兼容 IE6 及以下</td>
</tr>
<tr>
<td>html > /**/ body .selector {}
head ~ /* */ body .selector {}</td>
<td>不兼容 IE6 及以下</td>
</tr>
</table>


## css 属性的 hack

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>Document</title>
	<style>		
		*{
			margin: 0;
			padding: 0;
		}
		.box{
			width: 100px;
			height: 100px;
			background-color: rgb(0, 183, 255);
			/*IE6及以下*/
			_background-color: pink;
			/*IE7及以下*/
			/* ?background-color: green; */
			/*IE8*/
			/* background-color: gold\0/; */
			/*IE8及以上*/
			/* background-color: red\0; */
			/*IE10及以下*/
			/* background-color: red\9; */
		}		
	</style>

</head>
<body>
	
	<div class="box"></div>
	
</body>
</html>
```


## css 选择器的 hack

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
	<title>Document</title>
	<style>		
		*{
			margin: 0;
			padding: 0;
		}
		.box{
			width: 100px;
			height: 100px;
			background-color: skyblue;			
		}
		/** html .box{
			width: 200px;
			height: 200px;
			background-color: yellowgreen;
		}*/
		/*.box{
			_width: 200px;
			_height: 200px;
			_background-color: yellowgreen;
		}*/		

		/*IE7及以下*/
		/*.box,{
			width: 200px;
			height: 200px;
			background-color: pink;
		}*/

		/*除了IE6*/
		html>body .box{
			border: 3px solid red;
		}

		/*除了IE67*/
		/* html>body .box{
			border: 4px solid green;
		} */
	</style>

</head>
<body>	
	<div class="box"></div>	
</body>
</html>
```