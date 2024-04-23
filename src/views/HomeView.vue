<template>
  <div ref="task" class="home task-manager-wrap">
    <div v-for="status in tasks_status" :key="status.id" class="task-manager" :class="`task-manager--${status.status}`">
      <div class="box">
        <div class="box__title">{{ status.name }}</div>
        <div class="box__content">
          <template v-for="item in data" :key="item.id">
            <TaskList :id="item.id" :text="item.name" v-if="item.status == status.status" />
          </template>
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
      tasks_status: [],
      data: [],
    }
  },
  components: {
    TaskList
  },
  methods: {
    fetchStatus() {
      fetch("http://localhost:8000/tasks_status")
      .then(res => res.json())
      .then(res => {
        this.tasks_status = res
      })
      .catch(err => console.log(err))
    },
    fetchData() {
      fetch("http://localhost:8000/tasks")
      .then(res => res.json())
      .then(res => {
        this.data = res

        this.$nextTick(() => {
          this.onLoad()
        })
      })
      .catch(err => console.log(err))
    },
    updateData() {
      fetch("http://localhost:8000/tasks")
      .then(res => res.json())
      .then(res => {
        this.data = res

        this.$nextTick(() => {
          this.onLoad()
        })
      })
      .catch(err => console.log(err))
    },
    onLoad() {
      let task = document.querySelectorAll(".task-manager .box__content")
      let taskList = document.querySelectorAll(".task-manager .task-list");

      console.log(taskList)
      taskList.forEach(element => {
        element.addEventListener('dragstart', this.onDragStart);
      })

      task.forEach(element => {
        element.addEventListener("dragover", this.onDragOver);
        element.addEventListener("drop", this.onDrop);
      })
    },
    onDragStart(e) {
      e.dataTransfer.clearData();
      e.dataTransfer.setData("text/plain", e.target.id);
    },
    onDragOver(e) {
      e.preventDefault();

      // let element = document.querySelector(".task-list--temp");
      // if(element)
      //   element.parentNode.removeChild(element);
      

      // if(e.target.classList.contains('task-list')) {
      //   // if(e.offsetY <= e.target.offsetHeight/2) {
      //   //   e.target.parentNode.insertBefore(source, e.target)
      //   // }
      //   // else {
      //   //   e.target.parentNode.insertBefore(source, e.target.nextSibling)
      //   // }
      // }
      // else {
      //   let taskListTemp = document.createElement("div")
      //   taskListTemp.className = "task-list task-list--temp"
      //   e.currentTarget.appendChild(taskListTemp);
      // }
    },
    onDrop(e) {
      e.preventDefault();
      
      const data = e.dataTransfer.getData("text");
      const source = document.getElementById(data);

      if(e.target.classList.contains('task-list')) {
        if(e.offsetY <= e.target.offsetHeight/2) {
          e.target.parentNode.insertBefore(source, e.target)
        }
        else {
          e.target.parentNode.insertBefore(source, e.target.nextSibling)
        }
      }
      else {
        e.currentTarget.appendChild(source);
      }
    },
  },
  mounted() {
    this.fetchStatus()
    this.fetchData()
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