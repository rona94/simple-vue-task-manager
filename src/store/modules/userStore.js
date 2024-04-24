import axios from 'axios'

export default {
  state: {
    users: [],
    user: {},
  },
  getters: {
    getUsers: (state) => {
      return state.users
    },
    getUser: (state) => {
      return state.user
    } 
  },
  mutations: {
    SAVE_USERS: (state, data) => {
      state.users = data
    },
    SAVE_USER: (state, data) => {
      state.user = data
    }
  },
  actions: {
    fetchUsers({commit}) {
      axios
      .get('http://localhost:8000/users')
      .then(res => {
        commit('SAVE_USERS', res.data)
      })
      .catch(error => {
        throw new Error(`API ${error}`);
      })
    },
    fetchUser({commit}, id) {
      axios
      .get('http://localhost:8000/users/'+id)
      .then(res => {
        commit('SAVE_USER', res.data)
      })
      .catch(error => {
        throw new Error(`API ${error}`);
      })
    }
  },
}
