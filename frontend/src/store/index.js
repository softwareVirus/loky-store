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
    setLogoSize(state, newValue) {
      state.logoSize = newValue
    },
  },
  actions: {
    updateLogoSize: ({ commit }, newLogoSize) => commit('updateLogoSize', newLogoSize),
    async fetchUsers() {
      return (await axios.get('/api/users')).data
    },
  },
  modules: {},
})
