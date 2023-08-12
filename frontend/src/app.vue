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
            router-link(to='/contact') 
              span(@click.navtive="updateLogoSize") Contact
        .navbar-link-container
          .navbar-link-item 
            router-link(to='/sign-in') Sign in
          .navbar-link-item 
            router-link(to='/cart/:id') Cart(0)
  router-view
</template>

<script>
import Logo from './components/logo.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  components: {
    Logo,
  },
  setup(props) {
    const store = useStore()
    const logoSize = ref(false)

    const updateLogoSize = () => {
      store.commit('updateLogoSize', true)
    }

    return {
      logoSize,
      updateLogoSize,
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

#navbar-box {
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
}

#navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1376px;
  width: 100%;
  margin: 0 auto;
}

.navbar-link-container {
  display: flex;
  gap: 1rem;
}

#navbar-middle-link {
  position: relative;
  left: 551px;
}

.navbar-link-item > a {
  text-decoration: none;
  font-weight: 500;
  font-size: 24px;
  color: inherit;
}

#navbar-logo {
  position: absolute;
  top: 13px;
}
</style>
