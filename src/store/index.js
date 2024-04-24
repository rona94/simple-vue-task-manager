import { createStore } from 'vuex'
import tasksStore from './modules/tasksStore'
import userStore from './modules/userStore'

export default createStore({
  modules: {
    tasksStore,
    userStore
  }
})
