<template>
  <div ref="task" class="home task-manager-wrap">
    <div v-for="status in tasksStatus" :key="status.id" class="task-manager" :data-status-id="status.id" :class="`task-manager--${status.status}`">
        <div class="box">
          <div class="box__title">{{ status.name }}</div>
          <div class="box__content">
            <template v-for="item in data" :key="item.id">
              <TaskList :id="item.id" :text="item.name" v-if="item.status_id == status.id" @click="openModal(item.id)" />
            </template>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TaskList from '@/components/TaskList.vue'

export default {
  props: ["data"],
  components: {
    TaskList,
  },
  computed: {
    ...mapGetters({tasksStatus: "getTasksStatus"})
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
    ...mapActions(["fetchTasksStatus", "updateTask"]),
    async updateData(id, statusID) {
      const data = {
        id,
        data: { 
          status_id: statusID 
        }
      }

      this.updateTask(data)
    },
    openModal(value) {
      this.$emit("openModal", value)
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
      const statusID = e.target.closest(".task-manager").getAttribute("data-status-id")
      this.updateData(id, statusID)

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
  }
}
</script>