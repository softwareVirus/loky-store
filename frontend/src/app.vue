<template lang="pug">
#app

  nav#navbar(v-if="!isAdminRouter")
    #navbar-box
      #navbar-container
        router-link(to='/products')
          #navbar-logo  
            NavbarLogo(:logoSize="logoSize")
        .navbar-link-container#navbar-middle-link
          .navbar-link-item 
            router-link(to='/products') Products
          .navbar-link-item 
            router-link(to='/cargo') Cargo
          .navbar-link-item 
            router-link(to='/contact') Contact
        .navbar-link-container
          .navbar-link-item(v-if="user === null")
            router-link(to='/sign-in') Sign in
          .navbar-link-item(v-else) {{ user.firstName + " " + user.lastName}}
          .navbar-link-item(v-if="user !== null")
            router-link(to='/user-basket') Cart({{ numberOfCart }})
          .navbar-link-item(v-if="user !== null")
            a(@click.prevent="handleLogout") Logout
  Suspense
    router-view
    template(#fallback)
      .loading-container
        .loading-box
          Loading
          p Loading
ErrorMessage
</template>

<script>
import ErrorMessage from './components/error-message.vue'
import NavbarLogo from './components/navbar-logo.vue'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Loading from './components/loading.vue'
export default {
  components: {
    NavbarLogo,
    Loading,
    ErrorMessage
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const isAdminRouter = ref(false)
    const logoSize = ref(false)
    const user = computed(() => store.state.user)
    const numberOfCart = computed(() => store.state.numberOfCart)
    watch(() => router.currentRoute.value.fullPath, (newRef, oldRef) => {
      const routeValue = newRef.slice(1, newRef.length).split('/')[0]
      isAdminRouter.value = newRef.slice(1, newRef.length).split('/')[0] === 'admin'
      if (routeValue !== undefined) {
        if (routeValue == 'contact' || routeValue == 'sign-in' || routeValue == 'sign-up') {
          store.dispatch('updateLogoSize', true)
          return;
        }
        store.dispatch('updateLogoSize', false)

      }
      console.log(newRef, oldRef)
    })
    const handleLogout = () => {
      store.dispatch('logout')
    }
    return {
      logoSize,
      user,
      isAdminRouter,
      handleLogout,
      numberOfCart
    }
  },
}
</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  color: #ff4d00;
}

:root {
  --bg-color-primary: #ff4d00;
  --bg-color-secondary: #FF4D0080;
  --bg-color-table-transparent: #CCCCCCAA;
  --bg-textColor-secondary: #2d2d2d;
  --bg-textColor-thirth: #7b7b7b;
}

#navbar {
  min-height: 64px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 9;
  background: transparent;
  width: 100%;
}

#navbar-middle-link {
  position: absolute;
  left: calc(50% - 8.75rem);
}

#navbar-box {
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
}

#navbar-container {
  display: flex;
  justify-content: space-between;
  max-width: 1376px;
  width: 100%;
  max-height: 32px;
  margin: auto auto;
}

.navbar-link-container {
  display: flex;
  gap: 1rem;
}

::-webkit-scrollbar {
  height: 0.4rem;
  width: 0.6rem;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #FF4D0080;

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--bg-color-primary);
}

a {
  text-decoration: none;
}

.navbar-link-item {
  font-weight: 500;
  font-size: 24px;
  color: inherit;
}

.navbar-link-item>a {
  font-weight: 500;
  font-size: 24px;
  color: inherit;
  cursor: pointer;
}

#navbar-logo {
  position: relative;
}

.loading-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-container {
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
