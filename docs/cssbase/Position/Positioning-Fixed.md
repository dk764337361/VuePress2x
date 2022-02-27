# 固定定位

属性值：fixed，固定的意思。

参考元素：浏览器窗口。

参考点：浏览器窗口的四个顶点。跟偏移量组合方向有关。

由于浏览器窗口的四个顶点位置不会发生变化，会导致固定定位的元素会始终显示在定位位置。

# 固定定位的性质：
固定定位的元素脱离标准流，让出标准流位置；

可以设置宽高，根据偏移量属性可以任意设置在浏览器窗口的位置。

固定定位的元素会始终显示在浏览器窗口上。

```
.backtop { 
    position: fixed; 
    width: 100px; 
    height: 50px; 
    right: 50px; 
    bottom: 50px; 
    background‐color: #ccc; 
    font: bold 20px/50px "Arial"; 
    text‐align: center; 
    color: #333; 
    text‐decoration: none;
}
```
<img src="/images/css/097.png" style="width: 50%; display: block; margin: 0 ;">


