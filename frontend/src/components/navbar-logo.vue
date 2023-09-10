<template lang="pug">
Logo(:width="width" :height="height")
</template>
<script>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import Logo from './logo.vue'
export default {
  name: 'NavbarLogo',
  components: {
    Logo
  },
  setup(props) {
    const width = ref(45)
    const height = ref(36)
    const store = useStore()
    watch(
      () => store.state.logoSize,
      (value, s) => {
        if (!value) {
          width.value = 45
          height.value = 36
        } else {
          width.value = 483
          height.value = 386
        }
      }
    )
    return {
      myvalue: computed(() => store.getters.logoSize),
      width,
      height,
    }
  },
}
</script>
<style lang="css">
.logo {
  transition: all 0.3s ease-in;
}
</style>
