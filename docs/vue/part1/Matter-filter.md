# 事项筛选

## A.记录筛选类别

### 1.在 data 中声明数据存储当前显示的事项类别，并在点击筛选按钮时更改显示的事项类别：

<img src="/images/vue/020.gif" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/126.jpg" style="width: 40%; display:inline-block; margin: 0 ;">
<img src="/images/vue/127.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## B.点击更改类别

### 2.设置用于筛选不同类别事项的函数，并统一存储。

<img src="/images/vue/128.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 3.设置计算属性处理 todoType，并设置给视图。

<img src="/images/vue/129.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/130.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 4.之前使用过的数据筛选函数也可以通过 filters 进行统一设置。

<img src="/images/vue/131.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```js
computed:{
//用于获取待办事项个数
remaining() {
	// 方法一：
	// 写法一:
	// return this.todos.filter(function (todo) {
	// 	return !todo.completed;
	// }).length;
	// 写法二:
	// return this.todos.filter((todo) => !todo.completed).length   
    
    // 方法二：
	// 写法一:
	// return filters['active'](this.todos).length;
	// 写法二:
	return filters.active(this.todos).length;
},
}
```

<img src="/images/vue/132.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

```js
//用于删除已完成事项
removeCompleted() {
	// 方法一：
	// this.todos = this.todos.filter((todo) => !todo.completed);
	// 方法二：
	this.todos=filters['active'](this.todos);//赛选后更新的写法
},
```
