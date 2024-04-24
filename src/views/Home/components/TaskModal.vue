<template>
    <TaskModal 
        :visible="isModalVisible"
        @closeModal="closeModal">
        <template #content>
          <p class="modal-title">Task</p>
          <p class="modal-name">{{ data.name }}</p>
          <p class="modal-label">
            <span class="modal-col">Assignee</span>
            <span class="modal-text">{{ user.name }}</span>
          </p>
          <p class="modal-label">
            <span class="modal-col">Status</span>
            <span class="modal-text">{{ data.status }}</span>
          </p>
          <p class="modal-label">Description</p>
          <p class="modal-desc">{{ data.description }}</p>
        </template>
    </TaskModal>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex'
  import TaskModal from '@/components/TaskModal.vue'
  
  export default {
    props: ["visible", "id"],
    data() {
      return {
        isModalVisible: this.visible,
      }
    },
    components: {
      TaskModal
    },
    watch: {
        visible(newValue) {
          this.isModalVisible = newValue
        },
        id(newValue) {
          this.fetchTask(newValue)
        },
        data(newValue) {
          this.fetchUser(newValue.task_by)
        }
    },
    computed: {
      ...mapGetters({data: "getTask", user: "getUser"})
    },
    methods: {
      ...mapActions(["fetchTask", "fetchUser"]),
      closeModal(value) {
        this.$emit("closeModal", value)
      },
    },
  }
  </script>
  
  <style scoped>
  </style>