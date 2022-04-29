# Vue.js 生命周期

[生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)

- Vue.js 生命周期指的是 Vue 实例的生命周期。
- Vue 实例的生命周期，指的是实例从创建到运行，再到销毁的过程。

## 生命周期函数

- 通过设置生命周期函数，可以在生命周期的特定阶段执行功能。
- 生命周期函数也称为生命周期钩子。

## 创建阶段：

- beforeCreate：实例初始化之前调用。
- created： 实例创建后调用。
- beforeMount：实例挂载之前调用。
- mounted： 实例挂载完毕。
  ::: tip 特点
  每个实例只能执行一次。
  :::

## 运行阶段：

- beforeUpdate：数据更新后，视图更新前调用。
- updated： 视图更新后调用。

  ::: tip 特点
  按需调用。
  :::

## 销毁阶段：

- beforeDestroy：实例销毁之前调用。
- destroyed： 实例销毁后调用。

  ::: tip 特点
  每个实例只能执行一次。

  :::
