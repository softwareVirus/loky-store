import { createStore } from 'vuex'
import axios from 'axios'
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL
axios.defaults.headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Cache: 'no-cache',
}
export const store = createStore({
  state: {
    logoSize: false,
    cartProducts: [],
    user: null,
    errorMessage: null,
    isErrorMessageOpen: false,
    numberOfCart: 0,
    contacts: [
      {
        _id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        content:
          'Lorem ipsum askduıasjd lkajsd kljsakljsa dlkajsas sa jlas jlasj kjdasjkdsa kjdsj kads jklad kjlaskjaskldjalskdlk as djaslkj dlksajdlk askldjaslkjdlkas jdkaslkdja skld alkjdlka ldsakjalks as as jlk...',
      },
      { _id: 2, name: 'Jane Smith', email: 'jane@example.com', content: 'Dolor sit...' },
      { _id: 3, name: 'John Doe', email: 'john@example.com', content: 'Lorem ipsum...' },
      { _id: 4, name: 'Jane Smith', email: 'jane@example.com', content: 'Dolor sit...' },
      { _id: 5, name: 'John Doe', email: 'john@example.com', content: 'Lorem ipsum...' },
      { _id: 6, name: 'Jane Smith', email: 'jane@example.com', content: 'Dolor sit...' },
      { _id: 7, name: 'John Doe', email: 'john@example.com', content: 'Lorem ipsum...' },
      { _id: 8, name: 'Jane Smith', email: 'jane@example.com', content: 'Dolor sit...' },
      { _id: 9, name: 'John Doe', email: 'john@example.com', content: 'Lorem ipsum...' },
      { _id: 10, name: 'Jane Smith', email: 'jane@example.com', content: 'Dolor sit...' },
      { _id: 11, name: 'John Doe', email: 'john@example.com', content: 'Lorem ipsum...' },
      { _id: 12, name: 'Jane Smith', email: 'jane@example.com', content: 'Dolor sit...' },
      { _id: 13, name: 'John Doe', email: 'john@example.com', content: 'Lorem ipsum...' },
      { _id: 14, name: 'Jane Smith', email: 'jane@example.com', content: 'Dolor sit...' },
      { _id: 101, name: 'Jane Smith', email: 'jane@example.com', content: 'Dolor sit...' },
      { _id: 112, name: 'John Doe', email: 'john@example.com', content: 'Lorem ipsum...' },
      { _id: 122, name: 'Jane Smith', email: 'jane@example.com', content: 'Dolor sit...' },
      { _id: 133, name: 'John Doe', email: 'john@example.com', content: 'Lorem ipsum...' },
      { _id: 142, name: 'Jane Smith', email: 'jane@example.com', content: 'Dolor sit...' },
      { _id: 103, name: 'Jane Smith', email: 'jane@example.com', content: 'Dolor sit...' },
      { _id: 114, name: 'John Doe', email: 'john@example.com', content: 'Lorem ipsum...' },
      { _id: 125, name: 'Jane Smith', email: 'jane@example.com', content: 'Dolor sit...' },
      { _id: 136, name: 'John Doe', email: 'john@example.com', content: 'Lorem ipsum...' },
      { _id: 148, name: 'Jane Smith', email: 'jane@example.com', content: 'Dolor sit...' },
      // Add more items as needed
    ],
    products: [
      {
        _id: '1',
        name: 'Alfabe',
        dimensions: ['S', '55'],
        imageSrc: [
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
        ],
        size: ['S', 'M'],
        price: 25,
        releaseYear: 2022,
        releaseMonth: 'January',
        inStock: true,
        detail:
          'Sıcak havaları özetleyen Pure Loky bu yazın vazgeçilmezi olmaya aday. Hiç esmeyen havaların “moda ikonu” modeli çok sınırlı sayıda şimdi satışta.',
      },
      {
        _id: '2',
        name: 'Rise',
        dimensions: ['S', '55'],
        imageSrc: [
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
        ],
        size: ['L'],
        price: 35,
        releaseYear: 2021,
        releaseMonth: 'March',
        inStock: false,
        detail:
          'Sıcak havaları özetleyen Pure Loky bu yazın vazgeçilmezi olmaya aday. Hiç esmeyen havaların “moda ikonu” modeli çok sınırlı sayıda şimdi satışta.',
      },
      {
        _id: '3',
        name: 'New world',
        dimensions: ['S', '55'],
        imageSrc: [
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
        ],
        size: ['S', 'XL'],
        price: 45,
        releaseYear: 2020,
        releaseMonth: 'December',
        inStock: true,
        detail:
          'Sıcak havaları özetleyen Pure Loky bu yazın vazgeçilmezi olmaya aday. Hiç esmeyen havaların “moda ikonu” modeli çok sınırlı sayıda şimdi satışta.',
      },
      {
        _id: '4',
        name: 'New world',
        dimensions: ['S', '55'],
        imageSrc: [
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
        ],
        size: ['S', 'M'],
        price: 25,
        releaseYear: 2022,
        releaseMonth: 'January',
        inStock: true,
        detail:
          'Sıcak havaları özetleyen Pure Loky bu yazın vazgeçilmezi olmaya aday. Hiç esmeyen havaların “moda ikonu” modeli çok sınırlı sayıda şimdi satışta.',
      },
      {
        _id: '5',
        name: 'New world',
        dimensions: ['S', '55'],
        imageSrc: [
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
        ],
        size: ['L'],
        price: 35,
        releaseYear: 2021,
        releaseMonth: 'March',
        inStock: false,
        detail:
          'Sıcak havaları özetleyen Pure Loky bu yazın vazgeçilmezi olmaya aday. Hiç esmeyen havaların “moda ikonu” modeli çok sınırlı sayıda şimdi satışta.',
      },
      {
        _id: '6',
        name: 'New world',
        dimensions: ['S', '55'],
        imageSrc: [
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
        ],
        size: ['S', 'XL'],
        price: 45,
        releaseYear: 2020,
        releaseMonth: 'December',
        inStock: true,
        detail:
          'Sıcak havaları özetleyen Pure Loky bu yazın vazgeçilmezi olmaya aday. Hiç esmeyen havaların “moda ikonu” modeli çok sınırlı sayıda şimdi satışta.',
      },
      {
        _id: '7',
        name: 'New world',
        dimensions: ['S', '55'],
        imageSrc: [
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
        ],
        size: ['S', 'M'],
        price: 25,
        releaseYear: 2022,
        releaseMonth: 'January',
        inStock: true,
        detail:
          'Sıcak havaları özetleyen Pure Loky bu yazın vazgeçilmezi olmaya aday. Hiç esmeyen havaların “moda ikonu” modeli çok sınırlı sayıda şimdi satışta.',
      },
      {
        _id: '8',
        name: 'New world',
        dimensions: ['S', '55'],
        imageSrc: [
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
        ],
        size: ['L'],
        price: 35,
        releaseYear: 2021,
        releaseMonth: 'March',
        inStock: false,
        detail:
          'Sıcak havaları özetleyen Pure Loky bu yazın vazgeçilmezi olmaya aday. Hiç esmeyen havaların “moda ikonu” modeli çok sınırlı sayıda şimdi satışta.',
      },
      {
        _id: '9',
        name: 'New world',
        dimensions: ['S', '55'],
        imageSrc: [
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
        ],
        size: ['S', 'XL'],
        price: 45,
        releaseYear: 2020,
        releaseMonth: 'December',
        inStock: true,
        detail:
          'Sıcak havaları özetleyen Pure Loky bu yazın vazgeçilmezi olmaya aday. Hiç esmeyen havaların “moda ikonu” modeli çok sınırlı sayıda şimdi satışta.',
      },
      {
        _id: '10',
        name: 'New world',
        dimensions: ['S', '55'],
        imageSrc: [
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
        ],
        size: ['S', 'M'],
        price: 25,
        releaseYear: 2022,
        releaseMonth: 'January',
        inStock: true,
        detail:
          'Sıcak havaları özetleyen Pure Loky bu yazın vazgeçilmezi olmaya aday. Hiç esmeyen havaların “moda ikonu” modeli çok sınırlı sayıda şimdi satışta.',
      },
      {
        _id: '11',
        name: 'New world',
        dimensions: ['S', '55'],
        imageSrc: [
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
        ],
        size: ['L'],
        price: 35,
        releaseYear: 2021,
        releaseMonth: 'March',
        inStock: false,
        detail:
          'Sıcak havaları özetleyen Pure Loky bu yazın vazgeçilmezi olmaya aday. Hiç esmeyen havaların “moda ikonu” modeli çok sınırlı sayıda şimdi satışta.',
      },
      {
        _id: '12',
        name: 'New world',
        dimensions: ['S', '55'],
        imageSrc: [
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
          {
            image: require('@/assets/Untitled.png'),
            alt: 'Image 1',
          },
        ],
        size: ['S', 'XL'],
        price: 45,
        releaseYear: 2020,
        releaseMonth: 'December',
        inStock: true,
        detail:
          'Sıcak havaları özetleyen Pure Loky bu yazın vazgeçilmezi olmaya aday. Hiç esmeyen havaların “moda ikonu” modeli çok sınırlı sayıda şimdi satışta.',
      },
    ],
    orders: [
      {
        orderCart: {
          id: '6516f5d51cb40a5c6c703552',
          name: 'Puky Tea Lee',
        },
        user: {
          id: '651010fe2cb4e35bb8d6cfaf',
          name: 'İbrahim Halil Sakli',
        },
        quantity: 2,
        totalPrice: 25,
        orderDate: '06/15/2018',
      },
      {
        orderCart: {
          id: '6516f5d51cb40a5c6c703552',
          name: 'Rock Lee',
        },
        user: {
          id: '651010fe2cb4e35bb8d6cfaf',
          name: 'İbrahim Halil Sakli',
        },
        quantity: 2,
        totalPrice: 25,
        orderDate: '06/15/2018',
      },
    ],
    users: [],
  },
  mutations: {
    setLogoSize(state, newValue) {
      state.logoSize = newValue
    },
    setProducts(state, products) {
      state.products = products
    },
    setUser(state, user) {
      console.log(user)
      state.user = user
    },
    setUsers(state, users) {
      state.users = users
    },
    setContacts(state, contacts) {
      state.contacts = contacts
    },
    setIsErrorMessageOpen(state, isOpen) {
      state.isErrorMessageOpen = isOpen
    },
    setErrorMessage(state, content) {
      state.errorMessage = content
    },
    setOrders(state, orders) {
      state.orders = orders
    },
  },
  actions: {
    updateLogoSize({ commit }, newLogoSize) {
      commit('setLogoSize', newLogoSize)
    },
    handleErrorMessage({ commit }, content) {
      commit('setIsErrorMessageOpen', true)
      commit('setErrorMessage', content)
    },
    async createProduct({ commit, state }, product) {
      const createdProduct = await axios.post('/product/create_product', product)
      if (createdProduct.status >= 400) throw new Error('Product not created')
      commit('setProducts', [
        ...state.products,
        {
          name: product.name,
          dimensions: product.dimensions,
          imageSrc: product.imageSrc,
          sizes: product.sizes,
          price: product.price,
          releaseYear: product.releaseYear,
          releaseMonth: product.releaseMonth,
          inStock: product.inStock,
          detail: product.detail,
        },
      ])
      return true
    },
    async updateProduct({ commit, state }, product) {
      const updatedProduct = await axios.put('/product/update_product', product)
      if (updatedProduct.status >= 400) throw new Error('Product not updated')
      commit(
        'setProducts',
        state.products.map(item => {
          if (item._id === product._id) return product
          return item
        })
      )
      return true
    },
    async fetchProducts({ commit }) {
      return new Promise(async (resolve, reject) => {
        const productList = await axios.post('/product/list_products')
        if (productList.status >= 400) reject('Products not listed')
        commit('setProducts', productList.data)
        resolve(true)
      })
    },
    async fetchProduct(_, id) {
      return new Promise(async (resolve, reject) => {
        const product = await axios.get('/product/get_product/' + id)
        if (product.status >= 400) reject('Product not listed')
        resolve(product.data)
      })
    },
    async deleteProduct({ commit }, product) {
      const deletedProduct = await axios.delete(`/product/delete_product/${product._id}`)
      if (deletedProduct.status >= 400) throw new Error('User delete failed')
      const updatedProductList = this.state.products.filter(item => item._id !== product._id)
      commit('setProducts', updatedProductList)
    },
    async fetchUsers({ commit }) {
      return new Promise(async (resolve, reject) => {
        const users = await axios.post('/users/list_users')
        if (users.status >= 400) reject('User fetching failed')
        commit('setUsers', users.data)
        resolve(true)
      })
    },
    async fetchUser(_, id) {
      return new Promise(async (resolve, reject) => {
        const user = await axios.get(`/users/get_user/${id}`)
        if (user.status >= 400) reject('User not found!')
        resolve(user.data)
      })
    },
    async createUser({ commit, state }, user) {
      return new Promise(async (resolve, reject) => {
        try {
          const createdUser = await axios.post('/auth/signup', user)
          console.log(createdUser)
          if (createdUser.status >= 400) {
            resolve('User not created')
            return
          }

          commit('setUser', createdUser.data)
          resolve(true)
        } catch (e) {
          reject(e)
        }
      })
    },
    async updateUser({ commit }, user) {
      const updatedUser = await axios.put('/users/update_user', user)
      if (updatedUser.status >= 400) throw new Error('User update failed')
      const updatedUserList = this.state.users.map(item => {
        if (item._id === updatedUser.data._id) {
          return user
        }
        return item
      })
      commit('setUsers', updatedUserList)
      console.log(updatedUser.status)
      return updatedUser.status
    },
    async deleteUser({ commit }, user) {
      console.log(user._id)
      const deletedUser = await axios.delete(`/users/delete_user/${user._id}`)
      if (deletedUser.status >= 400) throw new Error('User delete failed')
      const updatedUserList = this.state.users.filter(item => item._id !== user._id)
      commit('setUsers', updatedUserList)
    },
    async updateUserFavoriteProduct({ commit, state }, id) {
      try {
        const updatedUser = await axios.put('/users/update_user_favorite_products', {
          _id: state.user._id,
          favoriteProduct: id,
        })
        if (updatedUser.status >= 400) throw new Error('Adding favorite product failed')
        console.log(updatedUser.data)
        commit('setUser', updatedUser.data)
        return true
      } catch (e) {
        return false
      }
    },
    async createContact({ commit, state }, contact) {
      const createdContact = await axios.post('/contact/create_contact', {
        ...contact,
        user: state.user,
      })
      console.log('here')
      if (createdContact.status >= 400) throw new Error('Contact not created')
      console.log(createdContact)
    },
    async fetchContacts({ commit }) {
      return new Promise(async (resolve, reject) => {
        const contacts = await axios.get('/contact/list_contacts')
        if (contacts.status >= 400) reject('Contact fetching failed')
        commit('setContacts', contacts.data)
        resolve(true)
      })
    },
    async deleteContact({ commit, state }, contact) {
      const deletedContact = await axios.delete(`/contact/delete_contact/${contact._id}`)
      if (deletedContact.status >= 400) throw new Error('Contact deleting failed')
      commit(
        'setContacts',
        state.contacts.filter(item => item._id !== contact._id)
      )
    },
    async createOrder(_, orders) {
      return new Promise(async (resolve, reject) => {
        console.log(orders)
        const response = await axios.post('/order/create_order', orders)
        if (response.status >= 400)
          resolve({
            status: 400,
            message: 'Order not created',
          })
        resolve({
          status: 200,
        })
      })
    },
    async fetchOrders({ commit }) {
      const orders = await axios.get('/order/list_orders')
      if (orders.status >= 400) throw new Error('Orders fetching failed')
      commit('setOrders', orders.data)
    },
    async deleteOrder({ commit, state }, order) {
      console.log('here')
      const deletedOrder = await axios.delete(`/order/delete_order/${order._id}`)
      if (deletedOrder.status >= 400) throw new Error('Order deleting failed')
      commit(
        'setOrders',
        state.orders.filter(item => item._id !== order._id)
      )
    },
    async login({ commit, state }, user) {
      return new Promise(async (resolve, reject) => {
        const userLogin = await axios.post('/auth/login/password', user)
        if (userLogin.data === 'Error') {
          resolve('Login is not succesful')
          return
        }
        commit('setUser', userLogin.data)
        resolve(state.user)
      })
    },
    async fetchSession({ commit }) {
      return new Promise(async resolve => {
        let user = null
        console.log(store.state.user)
        try {
          user = await axios.get('/auth/session')
          console.log(user)
          if (user.status >= 400) resolve(null)
          user = user.data
        } catch (e) {
          console.log(e)
        }
        if (user && user.firstName !== undefined) commit('setUser', user)
        resolve(user)
      })
    },
    async logout({ commit }) {
      const logout = await axios.post('/auth/logout')
      if (logout.status < 400) commit('setUser', null)
      localStorage.clear()
    },
  },
  modules: {},
})
export default async function main() {
  try {
    let user = await store.dispatch('fetchSession')
    console.log('here2')
    if (user === null) {
      console.log(user)
      localStorage.clear()
      return store
    } else if (localStorage.getItem('productList:' + user._id) == null) {
      localStorage.setItem('productList:' + user._id, '[]')
    }
    store.state.numberOfCart = JSON.parse(localStorage.getItem('productList:' + user._id)).length
    console.log(store.state.numberOfCart, 'here')
  } catch (e) {
    console.log(e)
  }
  console.log('here')
  return store
}
