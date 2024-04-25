import axios from "@/config/axios.js"

export default {
  state: {
    task: {},
    tasks: [],
    tasks_status: []
  },
  getters: {
    getTask: (state) => {
      return state.task 
    },
    getTasks: (state) => {
      return state.tasks 
    },
    getTasksStatus: (state) => {
      return state.tasks_status 
    }
  },
  mutations: {
    SAVE_TASK: (state, data) => {
      state.task = data
    },
    SAVE_TASKS: (state, data) => {
      state.tasks = data
    },
    SAVE_TASKS_STATUS: (state, data) => {
      state.tasks_status = data
    }
  },
  actions: {
    fetchTask({commit}, id) {
      axios
      .get('/tasks/'+id)
      .then(res => {
        commit('SAVE_TASK', res.data)
      })
      .catch(error => {
        throw (`API ${error}`);
      })
    },
    fetchTasks({commit}) {
      axios
      .get('/tasks')
      .then(res => {
        commit('SAVE_TASKS', res.data)
      })
      .catch(error => {
        throw (`API ${error}`);
      })
    },
    fetchTasksStatus({commit}) {
      axios
      .get('/tasks_status')
      .then(res => {
        commit('SAVE_TASKS_STATUS', res.data)
      })
      .catch(error => {
        throw (`API ${error}`);
      })
    },
    updateTask({commit}, data) {
      console.log(commit,data)
      axios
      .patch(
        '/tasks/'+data.id, 
        data.data
      )
    },
    addTask({commit}, data) {
      console.log(commit, data)
      axios.post('/tasks', data)
    }
  },
}
