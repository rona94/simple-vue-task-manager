<template>
  <div>
    <div class="task-header">
      <button class="btn" @click="isAddModalVisible = true">Add Task</button>
    </div>
    <div ref="task" class="home task-manager-wrap">
      <div v-for="status in tasksStatus" :key="status.id" class="task-manager" :data-status="status.status" :class="`task-manager--${status.status}`">
        <div class="box">
          <div class="box__title">{{ status.name }}</div>
          <div class="box__content">
            <template v-for="item in data" :key="item.id">
              <TaskList :id="item.id" :text="item.name" v-if="item.status == status.status" @click="openModal(item.id)" />
            </template>
          </div>
        </div>
      </div>

      <TaskModal :id="taskModalID" :visible="isModalVisible" @closeModal="closeModal" />
      <AddModal :visible="isAddModalVisible" @closeModal="closeAddModal" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TaskList from '@/components/TaskList.vue'
import TaskModal from './components/TaskModal.vue'
import AddModal from './components/AddModal.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      isModalVisible: false,
      taskModalID: 0,

      isAddModalVisible: false,
    }
  },
  components: {
    TaskList,
    TaskModal,
    AddModal,
  },
  computed: {
    ...mapGetters({tasksStatus: "getTasksStatus", data: "getTasks"})
  },
  watch: {
    data() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.onLoad()
        }, 100)
      })
    },
  },
  methods: {
    ...mapActions(["fetchTasksStatus", "fetchTasks", "updateTask"]),
    async updateData(id, status) {
      const data = {
        id,
        data: { status }
      }
      this.updateTask(data)
    },
    openModal(id) {
      this.isModalVisible = true
      this.taskModalID = id
    },
    closeModal(value) {
      this.isModalVisible = value
    },
    closeAddModal(value) {
      this.isAddModalVisible = value
      this.fetchTasks()
    },
    onLoad() {
      let task = this.$refs.task.querySelectorAll(".box__content")
      let taskList = this.$refs.task.querySelectorAll(".task-list");

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
    this.fetchTasksStatus()
    this.fetchTasks()
  }
}
</script>

<style scoped>
.task-header {
  padding: 0 15px;
  display: flex;
  justify-content: flex-end;
}
.modal-message {
  text-align: center;
  margin: 0;
}
.modal-message.error {
  color: rgb(240, 64, 64);
}
</style>