import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    logoSize: false,
  },
  getters: {
    logoSize(state) {
      return state.logoSize
    },
  },
  mutations: {
    updateLogoSize(state, newValue) {
      console.log(newValue)
      state.logoSize = newValue
    },
  },
  actions: {
    async fetchUsers() {
      return (await axios.get('/api/users')).data
    },
  },
  modules: {},
})
