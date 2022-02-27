# rem适配flexible.js方案总结


## 需要改动地方

因为使用了`flexible.js`之后，`index.css`中不需要设置`common.less`和` @baseFont: 50px`,请注释掉
```css
// 导入公共的 common.less 文件
 //@import "common";

// 后续的尺寸都需要使用 rem 单位
 //@baseFont: 50px;
```

## cssrem插件配合less使用
[VScode：px转rem插件](../suning/flexible.md/#px转rem插件)配合less使用，逐一替换。

<img src="/images/mobile/rem/026.png" style="width: 100%; display:block; margin: 0 ;">
