# 使用 VueCli 创建项目

## 搭建项⽬架构

- 线上项⽬演示地址：
  - 前台⾸⻚：http://edufront.lagou.com/#/
  - 后台登录⻚：http://eduboss.lagou.com/#/login
- Github 仓库：地址
- VS Code 插件：
  - Vetur：⽀持 .vue ⽂件语法⾼亮

<img src="/images/vue/277.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## 创建项目

1. 创建项⽬

```sh
vue create edu-boss-fed
```

2. ⼿动选择预设

```sh
Vue CLI v4.5.9
? Please pick a preset:
  Default ([Vue 2] babel, eslint)
  Default (Vue 3 Preview) ([Vue 3] babel, eslint)
> Manually select features
```

3. 选择以下选项。（Vuex 在项⽬中讲解并使⽤）

```sh
Vue CLI v4.5.9
? Please pick a preset: Manually select features
? Check the features needed for your project:
( ) Choose Vue version
 (*) Babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
 (*) Router
 (*) Vuex
 (*) CSS Pre-processors
>(*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing
```

4. 不使⽤ Vue Router 的 history 模式

```sh
Vue CLI v4.5.9
? Please pick a preset: Manually select features
? Check the features needed for your project: Babel, Router, Vuex,
  CSS Pre-processors, Linter
? Use history mode for router? (Requires proper server setup for i
  ndex fallback in production) (Y/n) n
```

5. 选择 CSS 预处理器

```sh
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): (Use arrow keys)
> Sass/SCSS (with dart-sass)
  Less
  Stylus
```

6. 选择代码格式校验与⻛格

```sh
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CS
S Modules are supported by default): Sass/SCSS (with dar
t-sass)
? Pick a linter / formatter config:
  ESLint with error prevention only
  ESLint + Airbnb config
> ESLint + Standard config
  ESLint + Prettier
```

7. 选择什么时候执⾏ lint 功能

```sh
? Pick additional lint features:
  (*) Lint on save
 >(*) Lint and fix on commit
```

8. 选择将配置信息放在什么位置

```sh
? Where do you prefer placing config for Babel, ESLint, etc.? (Usearrow keys)
  > In dedicated config files
    In package.json
```

9. 选择是否存储当前预设

```sh
? Save this as a preset for future projects? (y/N) n
```

10. 等待安装完毕

```sh
Vue CLI v5.0.4
✨  Creating project in D:\LaGou\Practise\edu-boss-fed.
🗃  Initializing git repository...
⚙️  Installing CLI plugins. This might take a while...


added 842 packages in 23s
🚀  Invoking generators...
📦  Installing additional dependencies...


added 190 packages in 9s
⚓  Running completion hooks...

📄  Generating README.md...

🎉  Successfully created project edu-boss-fed.
👉  Get started with the following commands:

 $ cd edu-boss-fed
 $ npm run serve

```

11. 进⼊项⽬⽬录，启动预览服务器

```sh
cd edu-boss-fed
npm run serve
```
