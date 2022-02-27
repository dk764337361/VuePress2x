# Background
CSS 中除了布局类属性，还需要添加一些背景类的内容进行页面的修饰，从而让网页变得更加的美观。

CSS 中通过 background 属性来设置背景，它是一个综合属性，可以拆分成多个单一属性。

[background­-color](../css/readme.md#background­-color)

[background-­image](../css/readme.md#background-­image)

[background-­repeat](../css/readme.md#background-­repeat)

[background-­position](../css/readme.md#background-­position)

[background­-attachment](../css/readme.md#background­-attachment)

[综合写法](../css/readme.md#综合写法)

## background­-color

作用：在盒子区域添加背景颜色的修饰。

::: warning
加载区域：在 border 及以内加载背景颜色。
:::



属性值：颜色名、颜色值。

颜色值：rgb 模式、十六进制模式、rgba 模式。

rgba 模式：在 rgb 基础上增加了一个不透明度的设置，不透明度 alpha 取值范围在 0­-1 之间，0 表示完全透明，1 表示完全不透明，0.5 表示半透明。

书写方式：rgba(红色，绿色，蓝色，不透明度)

<img src="/images/css/064.png" style="width: 20%; display: inline-block; margin: 0 ;">
<img src="/images/css/065.png" style="width: 20%; display: inline-block; margin: 0 ;">


```css
background‐color: rgba(0,255,0,0.4);
```

## background-­image

作用：给盒子添加图片的背景修饰。

加载范围：默认的加载到边框及以内部分。后期如果图片不重复加载，加载从 border 以内开始。

属性值：url(图片路径)

url：uniform resource locator，统一资源定位符，小括号内部书写查找图片的路径。


## background-­repeat
作用：设置添加的背景图是否要在盒子中重复进行加载。

根据属性值不同，有四种重复加载方式：

| 属性值 | 作用                                                           |
| --------- | ---------------------------------------------------------------- |
| repeat    | 重复，默认属性值，表示会使用背景图片重复加载填满整个盒子背景区域 |
| no-repeat | 不重复，无论背景图是否大于盒子范围，都只加载一次图片 |
| repeat-x  | 水平重复，使背景图片水平重复加载铺满第一行，垂直方向不重复 |
| repeat-y  | 垂直重复                                                     |



- 如果图片不重复，从 border 以内开始加载，不包含boder。

```css
background-repeat:no-repeat
```
- repeat 重复，默认属性值，表示会使用背景图片重复加载填满整个盒子背景区域
```css
background-repeat:repeat(boder包含图片显示 )
```

<img src="/images/css/066.png" style="width: 20%; display: inline-block; margin: 0 ;">
<img src="/images/css/067.png" style="width: 20%; display: inline-block; margin: 0 ;">



```html{7-9}
    <style>
        .box{
            width: 200px;
            height: 200px;
            background-image: url(images/logo.jpg);
            background-size: 200px;
            /* no-repeat让图片在boder里面显示 */
            /* background-repeat: no-repeat;   */
            background-repeat: repeat;
            padding: 30px;
            margin: 50px;
            border: 2px dashed red;

        }
    </style>
</head>
<body>
    <div 
```

- 背景图和背景颜色可以同时设置，背景图会压盖背景颜色，没有背景图的区域会显示背景颜色。
<img src="/images/css/068.png" style="width: 20%; display: inline-block; margin: 0 ;">


## background-­position

作用：主要用于设置不重复的图片在背景区域的加载开始位置。

属性值：分为三种写法，单词表示法、像素表示法、百分比表示法。不论哪种写法，属性值都有两个，值之间用空格分隔。

第一个属性值：表示背景图片在水平方向的位置。

第二个属性值：表示背景图片在垂直方向的位置

### 单词表示法
属性值都是使用代表方向的单词进行书写。

水平方向可选单词：left、center、right

垂直方向可选单词：top、center、bottom

单词表示图片与盒子背景区域进行对应方向的对齐。

```css
background‐position: right bottom;
```
<img src="/images/css/069.png" style="width: 40%; display: inline-block; margin: 0 ;">

### 像素表示法
使用像素值作为背景定位的属性值。

第一个属性值：像素是几，表示背景图片左上角针对 border 以内的左上顶点水平方向位移的距离。

第二个属性值：像素是几，表示背景图片左上角针对 border 以内的左上顶点垂直方向位移的距离。

```css
background-position: 150px 40px;
```
<img src="/images/css/070.png" style="width: 40%; display: inline-block; margin: 0 ;">

像素值区分正负，正负代表位移方向不同：

正数：表示图片针对盒子的原点向右、向下移动。

负数：表示图片针对盒子的原点向左、向上移动。

```css
background-position: -28px -34px;
```

<img src="/images/css/071.png" style="width: 40%; display: inline-block; margin: 0 ;">

可以利用属性值为负数，制作在小盒子中显示大的背景图的一部分。

制作方法，需要使用 FW 软件量取尺寸，读取数据。

第一步：在设计图中，使用切片工具制作一个想要显示区域大小的切片，让切片左上顶点位于想要加载的背景部分。

<img src="/images/css/072.png" style="width: 40%; display: inline-block; margin: 0 ;">

第二步：读取属性栏的切片数据，其中宽、高就是要加载的盒子的宽高，x 和 y 的数值表示移动的距离的绝对值，直接将数值加负号赋值给背景定位属性。

<img src="/images/css/073.png" style="width: 40%; display: inline-block; margin: 0 ;">


```css
      .house {
        width: 125px;
        height: 83px;
        border: 5px solid #f00;
        background-image: url(images/072.png);
        background-repeat: no-repeat;
        background-position: -45px -28px;
      }
```

<img src="/images/css/074.png" style="width: 40%; display: inline-block; margin: 0 ;">

#### 百分比表示法
百分比表示法使用百分比数字作为属性值。

100%代表的数值：

水平方向，等价于盒子的border以内的背景区域宽度减去图片的宽度。

垂直方向，等价于盒子的border以内的背景区域高度减去图片的高度。

<img src="/images/css/075.png" style="width: 40%; display: inline-block; margin: 0 ;">

::: tip

垂直方向100%=400(盒子宽高)+20（padding上下）+20（padding左右）-248(图片宽高)=192px。

水平方向同理。

:::

## background­-attachment

背景附着 background­-attachment


作用：设置的是背景图片是否要随着页面或者盒子的滚动而滚动。

属性值有两个：

- scroll 滚动的，表示背景图片与盒子保持相对位置不变，随着页面的滚动而滚走。

```css
background‐attachment: scroll;
```
- fixed 固定的，属性值为 fixed 之后，背景图的定位的参考点就从盒子 border 以内的左上顶点变为了浏览器窗口的左上顶点，页面滚动时，浏览器窗口的左上顶点是不变的，导致背景图固定在浏览器窗口的某个位置，不会随着页面滚动而滚走。

```css
background‐attachment: fixed;
```

## 综合写法
background 属性可以将五个单一属性的值进行合写。

属性值：可以有 1­5 个属性值，值之间用空格进行分隔，背景定位的两个属性(center、top)值算一个属性值，不能被分开也不能颠倒顺序。五个属性值之间可以互换位置。

```css
background: url(images/bg4.jpg) no‐repeat center top fixed #fff;
```
如果属性值没有设置完全，其他没有设置的单一属性会按照默认值加载。
```css
background: pink;
```
如果想去层叠综合属性中的一部分，其他的属性保持不变，最好使用单一属性写法进行层叠。
```css
background: url(images/bg4.jpg) no‐repeat center top fixed #fff; 
background‐attachment: scroll;
```
