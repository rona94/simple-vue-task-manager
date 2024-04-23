<template>
  <div>
    <div class="task-header">
      <button class="btn" @click="isModalVisible = true">Add Task</button>
    </div>
    <div ref="task" class="home task-manager-wrap">
      <div v-for="status in tasksStatus" :key="status.id" class="task-manager" :data-status="status.status" :class="`task-manager--${status.status}`">
        <div class="box">
          <div class="box__title">{{ status.name }}</div>
          <div class="box__content">
            <template v-for="item in data" :key="item.id">
              <TaskList :id="item.id" :text="item.name" v-if="item.status == status.status && item.task_by == taskBy" @click="openModalTask(item)" />
            </template>
          </div>
        </div>
      </div>
    </div>

    <TaskModal 
      :visible="isModalVisible"
      @closeModal="closeModal">
      <template #content>
        <form @submit.prevent="addTask">
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
            <button class="btn pull-right" @click="isModalVisible = true">Add Task</button>
          </div>
        </form>
      </template>
    </TaskModal>

    <TaskModal 
      :visible="isModalTaskVisible"
      @closeModal="closeModalTask">
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
      taskBy: 2,
      isModalVisible: false,
      isModalTaskVisible: false,
      users: [],
      modalMessage: "",
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
    fetchUsers() {
      fetch("http://localhost:8000/users")
      .then(res => res.json())
      .then(res => {
        this.users = res
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
    openModalTask(data) {
      this.isModalTaskVisible = true
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
    closeModalTask(value) {
      this.isModalTaskVisible = value
      this.modalTaskName = ""
      this.modalTaskDesc = ""
      this.modalTaskStatus = ""
      this.modalTaskBy = ""
    },
    closeModal(value) {
      this.isModalVisible = value
      this.modalMessage = ""
    },
    addTask(e) {
      const { name, assigned, desc } = e.target
     
      if(name.value.trim() == "" || assigned.value == "" || desc.value.trim() == "") {
        this.modalMessage = "Please fill all the fields"
        this.modalMessageStatus = "error"
        return
      }

      fetch("http://localhost:8000/tasks", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": name.value,
          "status": "assigned",
          "taskBy": assigned.value,
          "description": desc.value
        })
      })
      .then(res => res.json())
      .then(res => {
        this.isModalVisible = false
        this.modalMessage = ""

        this.fetchData()
        console.log(res)
      })
      .catch(err => {
        this.modalMessage = err
        console.log(err)
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
    this.fetchUsers()
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