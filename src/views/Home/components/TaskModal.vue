<template>
    <TaskModal 
        :visible="isModalVisible"
        @closeModal="closeModal">
        <template #content>
          <p class="modal-title">Task</p>
          <p class="modal-name">{{ data.name }}</p>
          <p class="modal-label">
            <span class="modal-col">Assignee</span>
            <span class="modal-text input-label-input">
              <select ref="name" name="name">
                <option value="Lyn" selected>Lyn</option>
                <option value="Rona">Rona</option>
              </select>
            </span>
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
        isNameEdit: false,
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
      handleDblClick(e, type) {
        if(type=="name") {
          this.isNameEdit = true
          this.$nextTick(() => 
            this.$refs.name.focus()
          )
        }
      }
    },
  }
  </script>
  
<style scoped>
.input-label-edit {
  cursor: pointer;
  -webkit-touch-callout: none; 
  -webkit-user-select: none; 
  -khtml-user-select: none; 
  -moz-user-select: none;
  -ms-user-select: none; 
  user-select: none;
}
.input-label-edit,
.input-label-input > * {
  font-size: 16px;
  color: #333;
}
.input-label-input > select {
  border: 0;
  font-size: 15px;
  font-weight: normal;
}
.input-label-input > select {
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>