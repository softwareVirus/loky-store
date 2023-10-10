<template lang="pug">
div(:class="(isOrder ? 'product-shopping-card' : 'product-card') + ' ' + (!product.inStock ? 'disabled-gray' : '')")
  div(:class="isOrder ? 'product-header product-shopping-header' : 'product-header'")
    .product-buttons-container(v-if="isOrder")
      .product-buttons 
        IconButton(:isFilled="isFilled" @updateFavorite="handleFavoriteProduct" :useEmit="true")
        IconButton(:isCloseButton="true" :handleClose="deleteValue")
    img.product-image(src="@/assets/Untitled.png" v-if="!isOrder")
  .product-card-info
    p.product-title {{product.name}}
    p.product-cost(v-if="!isOrder") {{product.price}} USD
    p.product-cost(v-else) {{productSize}}
    TextButton(buttonContent="ADD TO CART" :direction="`/product/${product._id}`" v-if="!isOrder" :disabled="!product.inStock")
    .quantity-buttons(v-else)
      IconButtonNoPadding(:refValue="refValue" @updateRefValue="updateRefValue" :index="index")
      p.product-cost {{ isOrder ? quantity : product.price + ' USD' }}
      IconButtonNoPadding(:isPlusIcon="true" :refValue="refValue" @updateRefValue="updateRefValue" :index="index")
</template>
<script>
import TextButton from './text-button.vue'
import IconButton from './icon-button.vue';
import IconButtonNoPadding from './icon-button-no-padding.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'ProductCard',
  components: {
    TextButton,
    IconButton,
    IconButtonNoPadding
  },
  props: {
    product: {
      type: Object,
      required: true
    },
    productSize: {
      type: String,
      default: ""
    },
    isOrder: {
      type: Boolean,
      default: false
    },
    quantity: {
      type: String,
      required: false
    },
    refValue: {
      type: Array,
      default: []
    },
    updateList: {
      type: Function,
      default: () => { }
    },
    index: {
      type: Number,
      required: false
    }
  },
  setup(props) {
    const _id = ref(props.product._id)
    const store = useStore()
    const isFilled = ref(store.state.user !== null ? store.state.user.favoriteProducts.includes(_id.value) : false)
    const updateRefValue = (newList) => {
      console.log(newList)
      props.updateList(newList)
    }
    const handleFavoriteProduct = () => {
      store.dispatch('updateUserFavoriteProduct', props.product._id)
      console.log('here update')
      isFilled.value = !isFilled.value
    }
    const deleteValue = () => {
      console.log(props.refValue.length === 1 ? [] : props.refValue.slice(0, props.index).concat(props.refValue.slice(props.index+1, props.refValue.length)))
      props.updateList(props.refValue.length === 1 ? [] : props.refValue.slice(0, props.index).concat(props.refValue.slice(props.index+1, props.refValue.length)))
    }
    return {
      _id,
      updateRefValue,
      deleteValue,
      isFilled,
      handleFavoriteProduct
    }
  }
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

.disabled-gray {
  filter: grayscale(1);
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
