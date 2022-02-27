# A标签的伪类
清除浮动时，我们接触到了伪类:after，现在我们来详细了解一下伪类的概念，并学习几个a标签常用的伪类。

## 伪类概念
伪类和类之间有一定的相似之处，也存在明显的区别。

- 普通的类：必须给标签设置对应的 class 属性值，才能选中标签，而且类选择器后面添加的属性，会立即加载到浏览器之上。

- 伪类：不需要给标签添加任何属性，伪类名都是语法提前规定好的，书写时伪类必须搭配其他选择器使用，伪类选择器后面添加的样式不一定立即加载到浏览器之上，只有用户触发了对应的行为，伪类的样式才会立即加载。

- 伪类选择器的权重与普通的类选择器相同。

- 伪类选择器写法：前面是普通的选择器，后面紧跟**:伪类名**。

`<a>` 标签可以根据用户行为不同，划分为四种状态，通过`<a>` 标签的伪类可以将四种状态选中设置为不同的样式效果，用户触发对应行为，就可以加载对应的样式。

```css
a:link { 			/*访问前状态*/
    color: gray;
}
a:visited { 		/*访问后状态*/ 
    color: cyan; 
}
a:hover { 			/*鼠标悬浮状态*/ 
    color: red;
}
a:active { 			/*鼠标点击状态*/ 
    color: yellow; 
}
```

## 书写顺序
`<a>` 标签上可能会同时触发 2 到 3 个状态，每个状态的属性都会进行加载，相同的属性之间会发生层叠。

伪类的权重是相同的，只能根据书写顺序，后写的层叠先写的，所以伪类书写顺序非常重要。

要想让每个伪类的状态正常加载，书写顺序必须是：访问前link、访问后visited、鼠标移上hover、鼠标点击active。

为了方便记忆，利用爱恨准则：love hate。

```css
a:link { 			
    color: gray;
}
a:visited { 		
    color: cyan; 
}
a:hover { 			
    color: red;
}
a:active { 			
    color: yellow; 
}
```

## 实际应用
一般会将访问前和访问后状态设置为一样的效果，保证了页面的统一性，可以选择性的设置鼠标移上和鼠标点击状态。
```css
a:link,a:visited { 
    color: #666; 
}
a:hover { 
    color: #f00; 
}
```

更加常用的一种设置方式如下：

`<a>` 标签任何普通的选择器，可以同时选中四种状态，可以将四种状态设置为相同的样式，属性可以设置所有的 `<a>` 默认显示样式的属性，包括盒模型、文字等。

a:hover 伪类选择器：设置鼠标移上时不一样的样式属性。
```css
a {
    display: block; 
    width: 150px; 
    height: 50px; 
    background‐color: skyblue;
    font: bold 20px/50px "微软雅黑";
    text‐align: center; 
    color: #fff; 
    text‐decoration: none; 
}
a:hover { 
    background‐color: yellowgreen; 
}
```

鼠标移上前：<img src="/images/css/062.png" style="width: 20%; display: inline-block; margin: 0 ;">

鼠标移上：<img src="/images/css/063.png" style="width: 20%; display: inline-block; margin: 0 ;">

鼠标离开：<img src="/images/css/062.png" style="width: 20%; display: inline-block; margin: 0 ;">