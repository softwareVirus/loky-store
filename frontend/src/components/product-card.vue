<template lang="pug">
div(:class="productCost == null ? 'product-shopping-card' : 'product-card'")
  div(:class="productCost == null ? 'product-header product-shopping-header' : 'product-header'")
    .product-buttons-container(v-if="productCost == null")
      .product-buttons 
        IconButton
        IconButton(:isCloseButton="true")
    img.product-image(src="@/assets/Untitled.png" v-if="productCost != null")
  .product-card-info
    p.product-title {{productTitle}}
    p.product-cost(v-if="productCost != null") {{productCost}}
    p.product-cost(v-else) {{productSize}}
    TextButton(buttonContent="ADD TO CART" direction="/products/:id" v-if="productCost != null")
    .quantity-buttons(v-else)
      IconButtonNoPadding
      p.product-cost {{ 2 }}
      IconButtonNoPadding(:isPlusIcon="true")
</template>
<script>
import TextButton from './text-button.vue'
import IconButton from './icon-button.vue';
import IconButtonNoPadding from './icon-button-no-padding.vue';
export default {
  name: 'ProductCard',
  components: {
    TextButton,
    IconButton,
    IconButtonNoPadding
  },
  props: {
    productTitle: {
      type: String,
      required: true,
    },
    productCost: {
      type: String,
      default: null
    },
    productSize: {
      type: String,
      default: ""
    }
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

.quantity-buttons {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.product-image {
  width: 430px;
  position: relative;
  top: 0;
}

.product-title,
.product-cost {
  color: inherit;
  line-height: 23px;
  font-size: 14px;
  margin: 0;
}

.product-shopping-header {
  height: 382px !important;
  background-image: url("~@/assets/Untitled.png");
  background-size: 350px !important;
  width: 350px !important;
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

.product-shopping-card {
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 350px;
}

.product-buttons-container {
  position: relative;
  display: flex;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  justify-content: flex-end;
}

.product-buttons {
  display: flex;
  gap: 0.5rem;
}
</style>
