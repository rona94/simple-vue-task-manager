<template>
    <TaskModal 
          :visible="isModalVisible"
          @closeModal="closeModal">
          <template #content>
            <form @submit.prevent="submitTaskForm">
              <p class="modal-title">Add Task</p>
              <p class="modal-message error" v-if="modalMessage != ''">{{modalMessage}}</p>
              <div>
                <label for="name">Name</label>
                <input id="name" type="text" name="name" class="input" />
              </div>
  
              <div>
                <label for="assigned">Assigned To</label>
                <select id="assigned" class="input">
                  <option value="" disabled selected>select assigned to</option>
                  <option :value="user.id" v-for="user in users" :key="user.id">{{ user.name }}</option>
                </select> 
              </div>
  
              <div>
                <label for="desc">Description</label>
                <textarea id="desc" name="" cols="30" rows="10" class="textarea"></textarea>
              </div>
  
              <div>
                <button class="btn pull-right" @click="isAddModalVisible = true">Add Task</button>
              </div>
            </form>
          </template>
    </TaskModal>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex'
  import TaskModal from '@/components/TaskModal.vue'
  
  export default {
    props: ["visible"],
    data() {
      return {
        isModalVisible: this.visible,
        modalMessage: "",
      }
    },
    components: {
        TaskModal,
    },
    watch: {
        visible(newValue) {
          this.isModalVisible = newValue
        }
    },
    computed: {
        ...mapGetters({users: "getUsers"})
    },
    methods: {
        ...mapActions(["addTask", "fetchUsers"]),
      closeModal(value) {
        this.modalMessage = ""
        this.$emit("closeModal", value)
      },
      submitTaskForm(e) {
        const { name, assigned, desc } = e.target
        
        if(name.value.trim() == "" || assigned.value == "" || desc.value.trim() == "") {
            this.modalMessage = "Please fill all the fields"
            return
        }

        const data = {
            "name": name.value,
            "status": "assigned",
            "task_by": assigned.value,
            "description": desc.value
        }

        this.addTask(data)
        .then(() => {
            this.modalMessage = ""
            this.$emit("closeModal", false)
        })
        .catch(err => {
            this.modalMessage = err
            console.log(err)
        })
      },
    },
    mounted() {
        this.fetchUsers()
    }
  }
  </script>
  
  <style scoped>
  .modal-message {
    text-align: center;
    margin: 0;
  }
  .modal-message.error {
    color: rgb(240, 64, 64);
  }
  </style>