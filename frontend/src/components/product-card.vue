<template lang="pug">
.product-card
    img.product-image(src="@/assets/Untitled.png")
    .product-card-info
        p.product-title {{productTitle}}
        p.product-cost {{productCost}}
        TextButton(buttonContent="ADD TO CART" direction="/products/:id")
</template>
<script>
import TextButton from './text-button.vue'
export default {
  name: 'ProductCard',
  components: {
    TextButton,
  },
  props: {
    productTitle: {
      type: String,
      required: true,
    },
    productCost: {
      type: String,
      required: true,
    },
  },
}
</script>
<style lang="css">
.minimap img {
  width: 86px !important;
}

.minimap .product-card {
  gap: 0.6px !important;
  width: 86px !important;
}

.minimap .product-title,
.minimap .product-cost {
  line-height: 4.4px !important;
  font-size: 2.8px !important;
}

.minimap #product-info-container {
  gap: 4.8px !important;
}

.product-image {
  width: 430px;
}

.product-title,
.product-cost {
  color: inherit;
  line-height: 22px;
  font-size: 14px;
  margin: 0;
}

.product-card-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-card {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 430px;
}
</style>
