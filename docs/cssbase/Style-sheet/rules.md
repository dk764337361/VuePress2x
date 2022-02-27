# 样式规则


（1）所有的 css 代码都必须书写在 `<head>` 标签内部的一对 `<style>` 标签内。

（2）css 在给某个标签设置样式前，必须使用选择器先选中标签。

（3）css 样式的属性，属性名和属性值的键值对写法为 k:v;。

（4）给每个选择器添加的样式属性都必须写在一对大括号 {} 之内。
```html
<style type="text/css"> 
    div { 
        width: 200px; 
    } 
</style>
```
（5）给一个标签添加所需要的样式时，只需要将属性名和属性值直接一一罗列出来，css 每条属性都会加载到浏览器上。
```css
div { 
    width: 200px; 
    height: 200px; 
    background‐color: skyblue; 
    margin‐bottom: 10px; 
}
```
（6）分号必要性：每条属性后面的分号必须写，如果不写，会导致后面所有的代码加载错误。

（7）css 中所有属性与属性之间对空格、换行、缩进不敏感。

div{width:200px;height:200px;background‐color:skyblue;margin‐bottom:10px;}
等价于：
```css
div { 
    width: 200px; 
    height: 200px; 
    background‐color: skyblue; 
    margin‐bottom: 10px; 
}
```
:::tip
书写代码时，最好进行换行、合理缩进，有利于读取代码。 上传代码时，为了减少代码量，可以压缩代码。
:::