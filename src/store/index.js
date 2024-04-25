import { createStore } from 'vuex'
import tasksStore from './modules/tasksStore'
import userStore from './modules/userStore'
import commentStore from './modules/commentStore'

export default createStore({
  modules: {
    tasksStore,
    userStore,
    commentStore
  }
})
