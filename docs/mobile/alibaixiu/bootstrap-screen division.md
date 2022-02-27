# 阿里百秀-屏幕划分工作

## 案例：阿里百秀移动端首页（已下线）

<img src="/images/mobile/bootstrap/015.png" style="width: 100%; display:inline-block; margin: 0 ;">

## 技术选型

- 方案：我们采取响应式页面开发方案
- 技术：bootstrap框架
- 设计图：本设计采用1280px设计尺寸

## 案例：需求分析

### 1.页面布局分析
<img src="/images/mobile/bootstrap/016.png" style="width: 100%; display:inline-block; margin: 0 ;">

### 2.屏幕划分分析

1. 屏幕缩放发现中屏幕和大屏幕布局是一致的。因此我们列定义为co-md-就可以了,md是大于等于970以上的
2. 屏幕缩放发现小屏幕布局发生变化,因此我们需要为小屏幕根据需求改变布局
3. 屏幕缩放发现超小屏幕布局又发生变化,因此我们需要为超小屏幕根据需求改变布局
4. 策略:我们先布局md以上的pc端布局,最后根据实际需求在修改小屏幕和超小屏幕的特殊布局样式
