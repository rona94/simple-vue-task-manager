<template>
  <div ref="task" class="home task-manager-wrap">
    <div v-for="status in tasks_status" :key="status.id" class="task-manager" :data-status="status.status" :class="`task-manager--${status.status}`">
      <div class="box">
        <div class="box__title">{{ status.name }}</div>
        <div class="box__content">
          <template v-for="item in data" :key="item.id">
            <TaskList :id="item.id" :text="item.name" v-if="item.status == status.status && item.task_by == task_by" />
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
      task_by: "Rona"
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
    async updateData(id, status) {
      fetch("http://localhost:8000/tasks/"+id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status
        })
      })
    },
    onLoad() {
      let task = document.querySelectorAll(".task-manager .box__content")
      let taskList = document.querySelectorAll(".task-manager .task-list");

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
    },
    onDrop(e) {
      e.preventDefault();
      
      const data = e.dataTransfer.getData("text");
      const source = document.getElementById(data);

      const id = data.replace("task-list--", "")
      const status = e.target.closest(".task-manager").getAttribute("data-status")
      this.updateData(id, status)

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
