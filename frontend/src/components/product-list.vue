<template lang="pug">
div.products-container#list(ref="dragWrapperCarosuel")
  template(v-for="product in products" :key="'list'+product[0]._id")
    ProductQuarter(:products="product")
</template>
<script>
import ProductQuarter from './product-quarter.vue'
import { ref, onMounted } from 'vue'
export default {
  name: 'ProductList',
  components: {
    ProductQuarter,
  },
  props: {
    getRef: {
      type: Function,
      default: () => {},
    },
    products: {
      type: Array,
      default: []
    }
  },
  setup(props) {
    const dragWrapperCarosuel = ref(null)
    console.log(props.products,'let')
    onMounted(() => {
      props.getRef(dragWrapperCarosuel.value)
    })
    return {
      dragWrapperCarosuel,
    }
  },
}
</script>
<style lang="css">
.minimap .products-container {
  gap: 4.8px !important;
  margin: 50px auto 0 !important;
  width: auto !important;
  margin-left: 6.1px;
}

.products-container {
  display: flex;
  gap: 24px;
  margin-left: 32px;
  position: relative;
  top: 37px;
  width: calc(100% - 32px);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.products-container::-webkit-scrollbar {
  display: none;
}
</style>
