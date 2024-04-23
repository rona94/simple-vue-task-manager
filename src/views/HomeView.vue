<template>
  <div ref="task" class="home task-manager-wrap">
    <div v-for="status in tasksStatus" :key="status.id" class="task-manager" :data-status="status.status" :class="`task-manager--${status.status}`">
      <div class="box">
        <div class="box__title">{{ status.name }}</div>
        <div class="box__content">
          <template v-for="item in data" :key="item.id">
            <TaskList :id="item.id" :text="item.name" v-if="item.status == status.status" @click="openModal(item)" />
          </template>
        </div>
      </div>
    </div>

    <TaskModal 
      :visible="isModalVisible"
      @closeModal="closeModal">
      <template #content>
        <p class="modal-title">Task</p>
        <p class="modal-name">{{ modalTaskName }}</p>
        <p class="modal-label">
          <span class="modal-col">Assignee</span>
          <span class="modal-text">{{modalTaskBy}}</span>
        </p>
        <p class="modal-label">
          <span class="modal-col">Status</span>
          <span class="modal-text">{{modalTaskStatus}}</span>
        </p>
        <p class="modal-label">Description</p>
        <p class="modal-desc">{{ modalTaskDesc }}</p>
      </template>
    </TaskModal>
  </div>
</template>

<script>
// @ is an alias to /src
import TaskList from '@/components/TaskList.vue'
import TaskModal from '@/components/TaskModal.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      tasksStatus: [],
      data: [],
      isModalVisible: false,
      modalTaskName: "",
      modalTaskDesc: "",
      modalTaskBy: "",
      modalTaskStatus: "",
    }
  },
  components: {
    TaskList,
    TaskModal
  },
  methods: {
    fetchStatus() {
      fetch("http://localhost:8000/tasks_status")
      .then(res => res.json())
      .then(res => {
        this.tasksStatus = res
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
    openModal(data) {
      this.isModalVisible = true
      this.modalTaskName = data.name
      this.modalTaskDesc = data.description
      this.modalTaskStatus = data.status

      fetch("http://localhost:8000/users/"+data.task_by)
      .then(res => res.json())
      .then(res => {
        this.modalTaskBy = res.name
        console.log(res)
      })
      .catch(err => console.log(err))
    },
    closeModal(value) {
      this.isModalVisible = value
      this.modalTaskName = ""
      this.modalTaskDesc = ""
      this.modalTaskStatus = ""
      this.modalTaskBy = ""
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

<style scoped>

</style>