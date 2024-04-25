import axios from "@/config/axios.js"

export default {
  state: {
    comments: [],
  },
  getters: {
    getComments: (state) => {
      return state.comments
    },
  },
  mutations: {
    SAVE_COMMENTS: (state, data) => {
      state.comments = data
    },
  },
  actions: {
    fetchComments({commit}) {
      axios
      .get('/comments')
      .then(res => {
        commit('SAVE_COMMENTS', res.data)
      })
      .catch(error => {
        throw (`API ${error}`);
      })
    },
    addComment({commit}, data) {
      console.log(commit, data)
      console.log(data)
      axios.post('/comments', data)
    }
  },
}
