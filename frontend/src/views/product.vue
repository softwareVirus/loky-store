<template lang="pug">
#product-pictures-background
    img.product-bg-image(src="@/assets/Untitled.png")
    img.product-bg-image(src="@/assets/Back.png")
    img.product-bg-image(src="@/assets/Untitled.png")
OrderCard 
</template>
<script>
import OrderCard from '../components/order-card/order-card.vue'
export default {
  name: 'Product',
  components: {
    OrderCard,
  },
}
</script>
<style lang="css">
.product-bg-image {
  height: 100vh;
}
#product-pictures-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow-x: auto;
  display: flex;
}
#product-pictures-background::-webkit-scrollbar {
  display: none;
}
</style>
