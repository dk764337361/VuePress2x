# 视口

视口（viewport）就是浏览器显示页面内容的屏幕区域。视口可以分为布局视口、视觉视口和理想视口。

## 布局视口 layout viewport

- 一般移动设备的浏览器都默认设置了一个布局视口， 用于解决早期的 PC 端页面在手机上显示的问题。
- iOS, Android 基本都将这个视口分辨率设置为 980px, 所以 PC 上的网页大多都能在手机上呈现，
  只不过元素看上去很小，一般默认可以通过手动缩放网页。

<img src="/images/mobile/mobilebase/001.png" style="width: 100%; display: block; margin: 0 ;">

## 视觉视口 visual viewport

- 字面意思， 它是用户正在看到的网站的区域。 注意：是网站的区域
- 我们可以通过缩放去操作视觉视口， 但不会影响布局视口， 布局视口仍保持原来的宽度。

<img src="/images/mobile/mobilebase/002.png" style="width: 100%; display: block; margin: 0 ;">

## 理想视口 ideal viewport

- 为了使网站在移动端有最理想的浏览和阅读宽度而设定
- 理想视口， 对设备来讲， 是最理想的视口尺寸
- 需要手动添写 `<meta>` 视口标签通知浏览器操作

`<meta>` 视口标签的主要目的：布局视口的宽度应该与理想视口的宽度一致，简单理解就是设备有多宽，我们布局的视口就多宽

### `<meta>`视口标签

```css
    <meta
      name="viewport"
      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
    />
```

| 属性          | 解释说明                                                 | 标准的 viewport 参数设置 |
| ------------- | -------------------------------------------------------- | ------------------------ |
| width         | 宽度设置的是 viewport 宽度，可以设置 device-width 特殊值 | 视口宽度和设备保持一致   |
| initial-scale | 初始缩放比，大千 0 的数字                                | 视口的默认缩放比例 1.0   |
| maximum-scale | 最大缩放比，大于 0 的数字                                | 最大允许的缩放比例 1.0   |
| minimum-scale | 最小缩放比，大千 0 的数字                                | 最小允许的缩放比例 1.0   |
| user-scalable | 用户是否可以缩放，yes 或 no (1 或 0)                     | 不允许用户自行缩放       |
