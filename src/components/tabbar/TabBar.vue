<template>
  <div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {
name:'TabBar'
}
</script>

<style>
#tab-bar {
    /* 水平分布 */
    display: flex;
    /* 背景颜色 */
    background-color: #f6f6f6;
    /* 向下移 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /* x轴偏移量 y轴偏移量 模糊程度 颜色 */
    box-shadow: 0px -1px 1px rgba(100, 100, 100, .2);
}

</style>