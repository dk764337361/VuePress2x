# 代码格式校验

- 为什么
  - 不同的工程师，写的代码风格不同
  - 项目代码提交时，需要保持统一的代码格式
- 如何实现（ 通过工具完成代码格式校验 ）
  - 提供编码规范
  - 根据编码规范，自动检查代码

## 使用 ESLint 校验 JS 风格

[eslint 官网](https://eslint.org/)

### 步骤

- 初始化项目（ npm init --yes ）
- 安装 ESLint （ npm i eslint -g ）
- 当前根目录初始化配置文件 （ eslint --init ）
  <img src="/images/nodeautomation/72.jpg" style="width: 100%; display:block; margin: 0 ;">
- 检查 JS 代码格式
  - 单个文件 （eslint `path/filename.js`）
  - 整个目录（eslint `path/dirname`）

### 文件目录

```
case
 ├─── script
 │   ├── main.js
 ├─── style
 │   ├── main.less
 ├── .gitignore
 ├── .eslintrc.json
 └── package.json
 └── index.html
```

### 给`.eslintrc.json`配置

```json
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "indent": ["error", 2], //必须缩进两个字符
    "quotes": ["error", "double"] //double:必须使用双引号
  }
}
```

### 执行命令

```sh
eslint .\script\main.js
```

## 使用 StyleLint 校验 CSS 风格

[StyleLint 官网](https://stylelint.io/)

### 步骤

- 初始化项目（ npm init --yes ）
- 安装 StyleLint （ npm install --global stylelint ）
- 安装检测标准 （ npm install --global stylelint-configstandard）
- 创建配置文件 （ .stylelintrc.json ）
- 检查 CSS 代码格式
  - 单个文件 （ stylelint path/filename.css ）
  - 整个项目（ stylelint \*_/_.css ） 前 2 个`*`号代表匹配任何目录，后面`*`号代表匹配任何 css 文件

### 文件目录

```
case
 ├─── script
 │   ├── main.js
 ├─── style
 │   ├── main.less
 ├── .gitignore
 ├── .eslintrc.json
 ├── .stylelintrc.json
 └── package.json
 └── index.html
```

### 给`.stylelintrc.json`配置

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "block-no-empty": true
  }
}
```

### 执行命令

```sh
stylelint style/main.css
或
stylelint style/*.css
```
