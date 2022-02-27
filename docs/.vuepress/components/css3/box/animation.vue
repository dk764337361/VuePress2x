<template>
        <div class="box">
      <p class="tag1">form和to</p>
      <p class="tag2">0%与100%</p>
    </div>
</template>
<style scoped>
      * {
        margin: 0;
        padding: 0;
      }
      .box {
        position: relative;
        width: 300px;
        height: 200px;
        margin: 100px auto;
        border: 2px solid black;
      }
      .box p {
        text-align: center;
        line-height: 100px;
      }
      .tag1 {
        position: absolute;
        /* left: 50px;
        top: 50px; */
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: skyblue;
        /* 添加绑定动画 */
        animation: move1 3s ease infinite;
      }
      .tag2 {
        position: absolute;
        left: 200px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: skyblue;
        /* 添加绑定动画 */
        animation: move2 3s ease infinite;
      }
      @keyframes move1 {
        /* 动画过程，可以添加任意百分比出的动画细节 */
        /* 从头开始，最好保持跟默认样式的状态一致 */
        form {
          transform: translateY(0);
        }
        /* 到结束位置 */
        to {
          transform: translateY(100px);
        }
      }
      /* 百分比定义动画细节 */
      @keyframes move2 {
        /* 动画过程，可以添加任意百分比出的动画细节 */
        /* 从头开始，最好保持跟默认样式的状态一致 */
        0% {
          transform: translateY(0);
        }
        25% {
          transform: translateY(100px);
        }
        50% {
          transform: translateY(0);
        }
        75% {
          transform: translateY(-100px);
        }
        100% {
          transform: translateY(0);
        }
      }
</style>