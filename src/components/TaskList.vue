<template>
    <div :id="`task-list--${id}`" class="task-list" draggable="true">
      <p class="task-list__title">{{ text }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TaskList',
    props: {
      id: String,
      text: String
    }
  }
  </script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.task-list {
  border: 1px solid #fff;
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  height: 50px;
  max-height: 50px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  cursor: move;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}
.task-list__title {
  margin: 0;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.task-list--temp {
  background-color: rgba(255,255,255,0.5);
  border-style: dashed;
}
</style>
  