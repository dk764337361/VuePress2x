# 事项编辑

## A.触发编辑(双击)

### 1.双击时进行记录正在编辑的 todo，并保存原始 todo 内容。

  <img src="/images/vue/115.jpg" style="width: 40%; display:inline-block; margin: 0 ;">
  <img src="/images/vue/116.jpg" style="width: 60%; display:inline-block; margin: 0 ;">

### 2. 正在被编辑的 li 需要设置类名 editing。

<!-- <img src="/images/vue/117.jpg" style="width: 100%; display:inline-block; margin: 0 ;"> -->

```html
<!-- 事项的li -->
<li
  v-for="todo in todos"
  :key="todo.id"
  :class="{completed:todo.completed, editing:todo === editingTodo}"
>
  <div class="view">
    <input class="toggle" type="checkbox" v-model="todo.completed" />
    <label @dblclick="editTodo(todo)">{{todo.title}}</label>
    <!-- 删除按钮 -->
    <button class="destroy" @click="removeTodo(todo)"></button>
  </div>
  <input class="edit" v-model="todo.title" />
</li>
```

### 3. 自动获取焦点

#### 触发编辑后，输入框无法自动获取焦点，可通过自定义指令实现。

<img src="/images/vue/118.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/119.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## B.取消编辑(ESC 键)

### 4.点击 esc 键取消编辑，还原事项内容与状态。

<img src="/images/vue/120.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/121.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

## C.保存编辑(回车或失去焦点)
<img src="/images/vue/019.gif" style="width: 100%; display:inline-block; margin: 0 ;">

### 5.点击回车键或失去焦点时保存编辑。

<img src="/images/vue/122.jpg" style="width: 100%; display:inline-block; margin: 0 ;">
<img src="/images/vue/123.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 6.当编辑内容为空时保存，应当删除 todo 。

<img src="/images/vue/124.jpg" style="width: 100%; display:inline-block; margin: 0 ;">

### 7.回车也会失去焦点，为避免重复触发事件，需进行检测。

<!-- <img src="/images/vue/125.jpg" style="width: 100%; display:inline-block; margin: 0 ;"> -->

```js
methods:{
    //......
		//用于保存编辑
  editDone(todo) {
    //上一次编辑editingTodo等于null,下次（失去焦点）判断时，如果为假就不执行后续代码
    if(!this.editingTodo) return;
    this.editingTodo = null;
    todo.title = todo.title.trim();
    if (!todo.title) {
    this.removeTodo(todo);
    }
  },
},
```

