# 状态栏信息展示

<img src="/images/vue/015.gif" style="width: 100%; display:inline-block; margin: 0 ;">

## 个数展示

<img src="/images/vue/099.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/100.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 单位处理

### 方法一：

<img src="/images/vue/101.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```html
<span class="todo-count"
  ><strong>{{remaining}}</strong> {{ pluralize() }} left</span
>
```

### 方法二：（效率高）

<img src="/images/vue/102.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/103.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
