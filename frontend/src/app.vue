<template lang="pug">
#app

  nav#navbar 
    #navbar-box
      #navbar-container
        #navbar-logo 
          Logo(
            width=45
            height=36
          )
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
            router-link(to='/cart/:id') Cart(0)


  router-view
</template>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  color: #FF4D00;
}

#navbar {
  min-height: 64px;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 9;
  background: white;
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

<script>
import Logo from './components/logo.vue';
export default {
  components: {
    Logo,
  }
}
</script>