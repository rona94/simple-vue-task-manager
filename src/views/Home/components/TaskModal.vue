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
              <InputForm 
                type="select" 
                :value="user.id" 
                name="task_by"
                :lists="users"
                @update="handleInputUpdate" />
            </span>
          </p>
          <p class="modal-label">
            <span class="modal-col">Status</span>
            <span class="modal-text input-label-input">
              <InputForm 
                type="select" 
                :value="data.status_id" 
                name="status_id"
                :lists="tasks_status"
                @update="handleInputUpdate" />
            </span>
          </p>
          <p class="modal-label">Description</p>
          <InputForm 
            type="textarea" 
            :value="data.description" 
            name="description"
            @update="handleInputUpdate" />
          <CommentBox :id="id" />
        </template>
    </TaskModal>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex'
  import TaskModal from '@/components/TaskModal.vue'
  import InputForm from './InputForm.vue'
  import CommentBox from './CommentBox.vue'
  
  export default {
    props: ["visible", "id"],
    data() {
      return {
        isModalVisible: this.visible,
        isNameEdit: false,
      }
    },
    components: {
      TaskModal,
      InputForm,
      CommentBox,
    },
    watch: {
        visible(newValue) {
          this.isModalVisible = newValue
          
          if(newValue) {
            this.fetchTask(this.id)
          }
        },
        data(newValue) {
          this.fetchUser(newValue.task_by)
        }
    },
    computed: {
      ...mapGetters({data: "getTask", user: "getUser", users: "getUsers", tasks_status: "getTasksStatus"})
    },
    methods: {
      ...mapActions(["fetchTask", "fetchUser", "updateTask"]),
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
      },
      handleInputUpdate(type, value) {
        const data = {
          id: this.id,
          data: {
            [type]: value
          }
        }
        this.updateTask(data)
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