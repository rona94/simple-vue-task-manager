import axios from 'axios'

export default {
  state: {
    tasks: [],
    tasks_status: []
  },
  getters: {
    getTasks: (state) => {
      return state.tasks 
    },
    getTasksStatus: (state) => {
      return state.tasks_status 
    }
  },
  mutations: {
    SAVE_TASKS: (state, data) => {
      state.tasks = data
    },
    SAVE_TASKS_STATUS: (state, data) => {
      state.tasks_status = data
    }
  },
  actions: {
    fetchTasks({commit}) {
      axios
      .get('http://localhost:8000/tasks')
      .then(res => {
        commit('SAVE_TASKS', res.data)
      })
      .catch(error => {
        throw new Error(`API ${error}`);
      })
    },
    updateTask({commit}, data) {
      console.log(commit,data)
      axios
      .patch(
        'http://localhost:8000/tasks/'+data.id, 
        data.data
      )
    },
    fetchTasksStatus({commit}) {
      axios
      .get('http://localhost:8000/tasks_status')
      .then(res => {
        commit('SAVE_TASKS_STATUS', res.data)
      })
      .catch(error => {
        throw new Error(`API ${error}`);
      })
    },
    addTask({commit}, data) {
      console.log(commit, data)
      axios.post('http://localhost:8000/tasks', data)
    }
  },
}
