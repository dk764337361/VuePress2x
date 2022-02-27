# 层叠性

::: warning 思考问题
同一个标签可以被多个选择器选中，如果选择器后面设置了相同的样式属性，标签最终该加载哪个？或者，在继承性中，如果多个祖先都设置了相同的文字样式，后代中该继承哪个祖先级的？
:::

- 解决方法：就是使用层叠性去解决冲突。多个选择器在进行对比的过程中，最终只有一个属性会成功加载，它会层叠、覆盖掉其他的属性。
  <img src="/images/html5/010.png" style="width: 100%; display: block; margin: 0 ;">

接下来我们分情况来分析层叠性如何发挥作用：

## （1）如果选择器都选中标签自身。

### 第一步：比较多个选择器的权重，权重高的层叠权重低的。

- 基础选择器的权重：根据选择范围，范围越大权重越小，

`*` < `标签选择器` < `类选择器` < `id选择器`。

```css
* {
  color: red;
}
p {
  color: green;
}
.para {
  color: blue;
}
#ps {
  color: gold;
}
```

答案：金色

- 位置越靠上表示选择器权重越大 (在浏览器的控制面板中)：
  <img src="/images/html5/008.png" style="width: 30%; display: block; margin: 0 ;">

- 高级选择器权重比较方法：
  依次比较组成高级选择器的 id 的个数，类的个数，标签的个数

比较顺序：( id 个数, 类的个数, 标签的个数 )

（如果前面能够比较出大小就不再比较后面，如果前面相等就往后比较，直到比较出大小）。

```html
<style>
  .box1 #box2 .box3 p {
    /*1,2,1*/
    color: red;
  }
  .box1 #box2 #box3 p {
    /*2,1,1*/
    color: green;
  }
  .box1 .box2 #box3 .para {
    /*1,3,0*/
    color: blue;
  }
</style>
<div class="box1" id="box1">
  <div class="box2" id="box2">
    <div class="box3" id="box3">
      <p class="para" id="ps">看文字颜色听谁的？</p>
    </div>
  </div>
</div>
```

答案：绿色

### 第二步：如果选择器权重都相同

- 需要比较 CSS 中代码的书写顺序，后写的层叠先写的。

```css
.box1 #box2 .box3 p {
  color: red;
}
.box1 .box2 #box3 p {
  color: green;
}
#box1 .box2 .box3 p {
  /*选择器权重相同，蓝色顺序是最后，层叠前面*/
  color: blue;
}
```

答案：蓝色

## (2) 如果选择器选中的是祖先元素，文字的样式可以被继承。

### 第一步：比较就近原则，

- 比较选择器选中的祖先级在 HTML 结构中距离目标标签的远近，近的层叠远的。

```html
<style>
  #box1 {
    color: red;
  }
  .box1 .box2 {
    color: green;
  }

  /* 选中了距离 p 最近的 div，层叠前面的 */
  .box1 .box2 .box3 {
    color: blue;
  }
</style>
<div class="box1" id="box1">
  <div class="box2" id="box2">
    <div class="box3" id="box3">
      <p class="para" id="ps">看文字颜色听谁的？</p>
    </div>
  </div>
</div>
```

答案：蓝色
浏览器控制台层叠效果：
<img src="/images/html5/009.png" style="width: 30%; display: block; margin: 0 ;">

### 第二步：如果选中的祖先级距离目标一样近（同一个祖先级），

- 比较选择器权重，权重大的层叠小的。

```css
#box1 .box2 .box3 {
  /*1,2,0*/
  color: red;
}
#box1 #box2 .box3 {
  /*2,1,0*/
  color: green;
}
.box1 .box2 .box3 {
  /*0,3,0*/
  color: blue;
}
```

答案：绿色

### 第三步：如果距离一样近，权重也相同，

- 最后比较 CSS 中的书写顺序，后面的层叠前面的。

```css
#box1 .box2 .box3 {
  color: red;
}
.box1 #box2 .box3 {
  color: green;
}
.box1 .box2 #box3 {
  /*权重相同，后面的层叠前面*/
  color: blue;
}
```

答案：蓝色

## (3) important 关键字

如果在比较选择器权重的过程中，遇见一个 important 关键字，可以将某条 CSS 样式属性的权重提升到最大。

书写位置：在某个 css 属性的属性值后面空格加 !important 。

::: warning 注意：
- ① 就近原则中，不需要比较选择器权重，所有 important 会失效。
  :::
```html
<style>
.box2 {
    color: green !important;
  }
.box2 .box3 {
    color: blue;
  }
</style>
<div class="box1" id="box1">
  <div class="box2" id="box2">
    <div class="box3" id="box3">
      <p class="para" id="ps">看文字颜色听谁的？</p>
    </div>
  </div>
</div>
```
答案：蓝色

::: warning 注意：
- ② important 不能提升选择器的权重，只能提升某条属性的权重到最大。
  :::
```css
#box1 .box2 .box3 p {
  color: red;
}
.box1 #box2 #box3 p {
  color: green;
}
.box1 .box2 .box3 p {
  color: blue !important;
}
```
答案：蓝色

浏览器控制台层叠效果：

  <img src="/images/html5/011.png" style="width: 30%; display: block; margin: 0 ;">

## (4) 行内式权重

### 行内式样式与内嵌式或外链式样式比较

- 行内式的权重最高。

但是，与 important 关键字相比权重要低。

```html
<style type="text/css">
  #box1 .box2 .box3 p {
    color: red;
  }
  .box1 #box2 #box3 p {
    color: green;
  }
  #box1 #box2 div.box3 p {
    color: blue;
  }
</style>
<p class="ps" id="op" style="color: yellow;">看文字颜色听谁的？</p>
<!-- 行内样式权重最高 -->
```

答案：黄色
<img src="/images/html5/012.png" style="width: 30%; display: block; margin: 0 ;">

### 行内式与 important 相比：

- 行内样式权重最高

```html
<style type="text/css">
  #box1 .box2 .box3 p {
    color: red;
  }
  .box1 #box2 #box3 p {
    color: green !important; /*important将color属性权重提升到最高，高于行内式*/
  }
  #box1 #box2 div.box3 p {
    color: blue;
  }
</style>
<p class="ps" id="op" style="color: yellow;">看文字颜色听谁的？</p>
<!-- 行内样式权重最高 -->
```

答案：绿色

浏览器控制台层叠效果：
<img src="/images/html5/013.png" style="width: 30%; display: block; margin: 0 ;">
