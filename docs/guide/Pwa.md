# PWA
<NpmBadge package="@vuepress/plugin-pwa" />
<NpmBadge package="@vuepress/plugin-pwa-popup" />

## 安装插件
```bash
yarn add @vuepress/plugin-pwa@next
yarn add @vuepress/plugin-pwa-popup@next
```

VuePress 默认支持 [PWA](https://segmentfault.com/a/1190000012353473)，在`docs/.vuepress/config.js`中添加

```js
module.exports = {
  head: [
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    // ...其他标签
  ],
  plugins: [
    //bash: yarn add @vuepress/pwa@next
    //插件`@vuepress/pwa`使你的 VuePress 站点成为一个 渐进式 Web 应用 (PWA)
    [
      "@vuepress/pwa",
      {
        // skipWaiting: true,
      },
      // console.log("你的PWA小可爱打包中")
    ],
    //bash: yarn add @vuepress/plugin-pwa-popup@next
    //插件`@vuepress/plugin-pwa-popup`提供一个弹窗组件，允许用户手动刷新 PWA Service Worker
    //该插件必须和@vuepress/pwa插件一起使用，并且 skipWaiting 配置项不能设置为 true 。
    [
      "@vuepress/plugin-pwa-popup",
      {
        locales: {
          "/": {
            message: "发现新内容可用",
            buttonText: "刷新",
          },
        },
      },
    ],
  ]
},
```

## 创建 Manifest 文件
在`.vuepress/public`中 创建 `Manifest` 文件,
通常是 `.vuepress/public/manifest.webmanifest` ：

```json
{
  "name": "VuePress",
  "short_name": "VuePress",
  "description": "Vue-powered Static Site Generator",
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#fff",
  "theme_color": "#3eaf7c",
  "icons": [
    {
      "src": "/images/icons/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/images/icons/android-chrome-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    }
  ]
}
```
::: tip

一些工具可以帮助你做这些事。比如 [Favicon Generator](https://realfavicongenerator.net/)  可以帮助你生成图标以及一个 Manifest 文件样例。
:::

最后在 iPhone 的 safrai 浏览器中打开本网站，点击 `+添加到主屏幕` 就能在桌面看到一个像原生 App 一样的图标（感觉自己写了一个 App 有木有 :smile:）
<img src="/images/guide/pwa01.png" style="width: 70%; display:inline-block; margin: 0 ;"><img src="/images/guide/pwa03.jpg" style="width: 30%; display:inline-block; margin: 0 ;">
<img src="/images/guide/pwa02.jpg" style="width: 100%; display:block; margin: 0 ;">