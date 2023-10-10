import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    logoSize: false,
    cartProducts: []
  },
  mutations: {
    setLogoSize(state, newValue) {
      state.logoSize = newValue
    },
    setProducts(state, products) {
      state.cartProducts = products
    } 
  },
  actions: {
    updateLogoSize({ commit }, newLogoSize){
       commit('setLogoSize', newLogoSize)
    },
    addProductToCart({ commit, state }, product) {
      if(state.cartProducts.map(item => item.id).includes(product.id)) {
        return false
      }
      commit("setProducts", [...state.cartProducts, product]);
      return true;
    },
    removeProductFromCart({ commit, state }, product) {
      if(state.cartProducts.map(item => item.id).includes(product.id) == false) {
        return false
      }
      commit("setProducts", state.cartProducts.filter(item => item.id != product.id))
      return true;
    },
    async fetchUsers() {
      return (await axios.get('/api/users')).data
    },
  },
  modules: {},
})
