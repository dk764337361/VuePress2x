# Flex 布局原理

- flex是flexble Box的缩写，意为“弹性布局”，用来为盒状模型提供最大的灵活性，任何一个容器都可以指定为flex布局。
- 当我们为父盒子设为flex布局以后，子元素 的float、clear和vertical-align属性将失效。
- 伸缩布局=弹性布局=伸缩盒布局=弹性盒布局=flex布局

- 采用Flex布局的元素，称为flex容器（flex container），简称“容器”。
它的所有子元素自动称为容器成员，称为Flex项目（flex item），简称“项目”。



体验中 `div`就是flex父容器。<img src="/images/mobile/flex/002.png" style="width: 50%; display:inline-block; margin: 0 ;">

体验中 `span`就是子容器（flex项目）。

子容器可以`横向排列`也可以`纵向排列`.

## 总结

Flex 布局原理：通过给父盒子添加flex属性，来控制子盒子的位置和排列方式。