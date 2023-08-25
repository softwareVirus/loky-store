<template lang="pug">
#app

  nav#navbar 
    #navbar-box
      #navbar-container
        #navbar-logo 
          Logo(:logoSize="logoSize")
        .navbar-link-container#navbar-middle-link
          .navbar-link-item 
            router-link(to='/products') Products
          .navbar-link-item 
            router-link(to='/cargo') Cargo
          .navbar-link-item 
            router-link(to='/contact') Contact
        .navbar-link-container
          .navbar-link-item 
            router-link(to='/sign-in') Sign in
          .navbar-link-item 
            router-link(to='/user-basket') Cart(0)
  router-view
</template>

<script>
import Logo from './components/logo.vue'
import { ref, computed, watch  } from 'vue'
import { useStore } from 'vuex'
import { useRouter} from 'vue-router'

export default {
  components: {
    Logo,
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const logoSize = ref(false)
    console.log(router.currentRoute.value.fullPath ,router)
    watch(() => router.currentRoute.value.fullPath, (newRef, oldRef) => {
      const routeValue = newRef.slice(1,newRef.length).split('/')[0]
      console.log(routeValue)
      if(routeValue !== undefined) {
        if(routeValue == 'contact' || routeValue == 'sign-in' || routeValue == 'sign-up') {
          store.dispatch('updateLogoSize', true)
          return;
        }
        store.dispatch('updateLogoSize', false)
        
      }
      console.log(newRef,oldRef)
    })
    return {
      logoSize,
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

a {
  text-decoration: none;
}

.navbar-link-item > a {
  font-weight: 500;
  font-size: 24px;
  color: inherit;
}

#navbar-logo {
  position: relative;
}
</style>
