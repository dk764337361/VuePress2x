# 事项状态切换

## 单个事项切换

- 单个事项切换通过 v-model 的设置已经实现了，体会双向数据绑定的好处。

## 多个事项切换

### 单个事项操作

- 单个事项切换会导致 toggle-all 状态变化，我们可以通过 remaining 来进行判断：

<img src="/images/vue/016.gif" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/104.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/105.jpg" style="width: 100%; display:inline-block; margin: 0 ;">


### 全部切换选框操作

- 设置 v-model 后，主动操作 toggle-all 相当于设置 allDone 数据，这时需要给 allDone 设置 setter 来处理。
<img src="/images/vue/017.gif" style="width: 100%; display:inline-block; margin: 0 ;">
  
<img src="/images/vue/106.jpg" style="width: 100%; display:inline-block; margin: 0 ;">



