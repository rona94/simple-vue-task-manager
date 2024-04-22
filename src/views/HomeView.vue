<template>
  <div ref="task" class="home task-manager-wrap">
    <div class="task-manager task-manager--assigned">
      <div class="box">
        <div class="box__title">Assigned</div>
        <div class="box__content">
          <TaskList id="1" text="Title 1" />
          <TaskList id="2" text="Title 2" />
        </div>
      </div>
    </div>

    <div class="task-manager task-manager--ongoing">
      <div class="box">
        <div class="box__title">On Going</div>
        <div class="box__content">
          <TaskList id="3" text="Title 3" />
          <TaskList id="4" text="Title 4" />
        </div>
      </div>
    </div>

    <div class="task-manager task-manager--completed">
      <div class="box">
        <div class="box__title">Completed</div>
        <div class="box__content">
          <TaskList id="5" text="Title 5" />
          <TaskList id="6" text="Title 6" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TaskList from '@/components/TaskList.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      clicked: false,
      dragged: false,
      position: {x: 0, y:0}
    }
  },
  components: {
    TaskList
  },
  mounted() {
    let task = document.querySelectorAll(".task-manager .box__content")
    let taskList = document.querySelectorAll(".task-manager .task-list");

    taskList.forEach(element => {
      element.addEventListener('dragstart', function (e) { 
        this.dragged = false
        this.clicked = true 
        e.dataTransfer.clearData();
        e.dataTransfer.setData("text/plain", e.target.id);
      });
      
      // element.addEventListener("drop", (e) => {
      //   e.preventDefault();
        
      //   const data = e.dataTransfer.getData("text");
      //   const source = document.getElementById(data);
      //   // e.currentTarget.appendChild(source);
      //   console.log(e)
      //   e.currentTarget.parentNode.insertBefore(source, e.currentTarget.nextSibling)

      //   // parentNode.insertBefore(newNode, referenceNode);
      // })
    })

    task.forEach(element => {
      element.addEventListener("dragover", (e) => {
        // console.log("dragOver");
        e.preventDefault();
      });
      element.addEventListener("drop", (e) => {
        e.preventDefault();
        
        const data = e.dataTransfer.getData("text");
        const source = document.getElementById(data);
        e.currentTarget.appendChild(source);
      });
    })
  }
}
</script>

<style scoped>
.task-manager-wrap {
  display: flex;
}
.task-manager {
  padding: 15px;
  height: 500px;
  flex-grow: 1;
  max-width: 33.333%;
  box-sizing: border-box;
}
.task-manager .box {
  background-color: var(--color-gray);
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}
.box__title {
  padding: 12px 15px;
  text-align: center;
  font-weight: bold;
  color: #fff;
}
.task-manager--assigned .box__title {
  background: rgb(240, 64, 64);
}
.task-manager--ongoing .box__title {
  background: rgb(243, 174, 35);
}
.task-manager--completed .box__title {
  background: var(--color-green);
}
.box__content {
  padding: 15px;
  height: calc(100% - 46px);
}
</style>