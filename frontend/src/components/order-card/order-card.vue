<template lang="pug">
#order-card 
  .order-card-header
    h3.order-card-title {{ product.name }}
    button.order-card-button(@click.prevent="handleFavoriteProduct") 
      FavoriteIcon(:isFilled="isFavorite")
  Accordion(title="Details" :content="product.detail")
  Accordion(title="Dimensions" :isButtonDisplay="true" content="Göğüs" :buttonList="product.dimensions" :refValue="selectedDimension" :updateSelectedDimension="updateSelectedDimension")
  OrderCardInfo(:buttonList="product.sizes" :refValue="selectedSize" :updateSelectedSize="updateSelectedSize")
  .quantity-container 
    QuantityButton(:handleQuantity="handleDecreaseQuantity" :disabled="quantity <= 0")
    OrderCardInfo(:isSizes="false" :quantity="quantity")
    QuantityButton(:handleQuantity="handleIncreaseQuantity" :isIncrease="true")
  FilledButton(:content="'Add to cart — $'+quantity*product.price" :isRightArrow="false" :style="style" :disabled="quantity == 0" :handleOpen="handleAddToCart")
</template>
<script>
import Accordion from './accordion.vue'
import FavoriteIcon from './favorite-icon.vue'
import OrderCardInfo from './order-card-info.vue'
import QuantityButton from './quantity-button.vue'
import FilledButton from '../filled-button.vue'
import { ref, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'OrderCard',
  props: {
    product: {
      type: Object,
      default: {}
    }
  },
  components: {
    Accordion,
    FavoriteIcon,
    OrderCardInfo,
    QuantityButton,
    FilledButton,
  },
  async setup(props) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const routeId = route.params.id
    const defaultItems = JSON.parse(localStorage.getItem(routeId))
    const style = ref({
      width: '340px',
      height: '46px',
      fontWeight: '500',
      margin: '0 auto',
      marginTop: '12px'
    })
    const quantity = ref(0)
    const selectedSize = ref(null)
    const selectedDimension = ref(null)
    if (defaultItems) {
      quantity.value = defaultItems.quantity
      selectedDimension.value = defaultItems.selectedDimension
      selectedSize.value = defaultItems.selectedSize
    }
    const isFavorite = ref(store.state.user !== null ? store.state.user.favoriteProducts.includes(routeId) : false)

    const updateSelectedSize = (newValue) => {
      selectedSize.value = newValue
      console.log(selectedSize.value)
    }

    const updateSelectedDimension = (newValue) => {
      selectedDimension.value = newValue
      console.log(selectedDimension.value)
    }

    const handleFavoriteProduct = async () => {
      let isError = await store.dispatch('updateUserFavoriteProduct', routeId)
      if (!isError) {
        store.dispatch('handleErrorMessage', 'You have to login to save your favorite product!')
        return;
      }
      isFavorite.value = !isFavorite.value
    }
    const handleIncreaseQuantity = () => {
      quantity.value += 1
    }
    const handleDecreaseQuantity = () => {
      quantity.value -= 1
    }
    const handleBeforeUnmountOrUnload = (q, d, s) => {
      localStorage.removeItem(routeId)
      localStorage.setItem(routeId, JSON.stringify({
        _id: routeId,
        quantity: q,
        selectedDimension: d,
        selectedSize: s
      }))
    }
    window.onbeforeunload = () => handleBeforeUnmountOrUnload(quantity.value, selectedDimension.value, selectedSize.value)
    onBeforeUnmount(() => localStorage.removeItem(routeId))

    const handleAddToCart = () => {
      if (selectedDimension.value === null || selectedSize.value === null) {
        store.dispatch('handleErrorMessage', 'There is no selected size or dimension!')
        return;
      }
      if (store.state.user === null) {
        store.dispatch('handleErrorMessage', 'You have to login to add your product to cart!')
        return;
      }
      console.log(store.state.user)
      let list = JSON.parse(localStorage.getItem('productList:' + store.state.user._id))
      console.log(list)
      list = list !== null ? list : []
      let isIncludeProduct = list.map(x => x.product._id + " " + x.dimension + x.size).indexOf(routeId + " " + selectedDimension.value + selectedSize.value)
      if (isIncludeProduct !== -1) {
        list[isIncludeProduct] = {
          product: props.product,
          dimension: selectedDimension.value,
          size: selectedSize.value,
          quantity: quantity.value
        }
      }
      localStorage.setItem('productList:' + new String(store.state.user._id), JSON.stringify(isIncludeProduct !== -1 ? list : [...list, {
        product: props.product,
        dimension: selectedDimension.value,
        size: selectedSize.value,
        quantity: quantity.value
      }]))
      store.state.numberOfCart += 1
      router.push('/user-basket')
    }
    return {
      style,
      quantity,
      handleDecreaseQuantity,
      handleIncreaseQuantity,
      isFavorite,
      handleFavoriteProduct,
      selectedDimension,
      selectedSize,
      handleAddToCart,
      updateSelectedSize,
      updateSelectedDimension
    }
  },
}
</script>
<style lang="css">
#order-card {
  width: 388px;
  background-color: white;
  padding-bottom: 24px;
    position: absolute;
}

.order-card-title {
  margin: 0;
}

.order-card-header {
  padding: 24px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: #0000001a 1px solid;
}

.order-card-button {
  cursor: pointer;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  height: 24px;
}

.quantity-container {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 340px;
  margin: 0 auto;
}

@media (min-width: 601px) {
  #order-card {
    right: 32px;
    bottom: 40px;
  }
}

@media (max-width: 600px) {
  #order-card {
    width: 100%;
    bottom: 0;
    backdrop-filter: saturate(180%) blur(20px);
  }
}
</style>
