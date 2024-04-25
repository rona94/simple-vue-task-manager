<template>
  <div>
    <div class="task-header">
      <button class="btn" @click="isAddModalVisible = true">Add Task</button>
    </div>
    <TaskList :data="data" @openModal="openModal" />
    <TaskModal :id="taskModalID" :visible="isModalVisible" @closeModal="closeModal" />
    <AddModal :visible="isAddModalVisible" @closeModal="closeAddModal" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TaskModal from './components/TaskModal.vue'
import AddModal from './components/AddModal.vue'
import TaskList from './components/TaskList.vue'

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
    ...mapGetters({data: "getTasks"})
  },
  methods: {
    ...mapActions(["fetchTasks"]),
    openModal(id) {
      this.isModalVisible = true
      this.taskModalID = id
    },
    closeModal(value) {
      this.isModalVisible = value
      this.fetchTasks()
    },
    closeAddModal(value) {
      this.isAddModalVisible = value
      this.fetchTasks()
    },
  },
  mounted() {
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
</style>