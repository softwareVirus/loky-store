<template lang="pug">
#order-card 
    .order-card-header
        h3.order-card-title Pure Loky Tee
        button.order-card-button #[FavoriteIcon]
    Accordion(title="Details" content="Sıcak havaları özetleyen Pure Loky bu yazın vazgeçilmezi olmaya aday. Hiç esmeyen havaların “moda ikonu” modeli çok sınırlı sayıda şimdi satışta.")
    Accordion(title="Dimensions" :isButtonDisplay="true" content="Göğüs")
    OrderCardInfo
    .quantity-container 
        QuantityButton(:handleQuantity="() => {}")
        OrderCardInfo(:isSizes="false")
        QuantityButton(:handleQuantity="() => {}" :isIncrease="true")
    FilledButton(content="Add to cart — $94.50" :isRightArrow="false" :style="style")
</template>
<script>
import Accordion from './accordion.vue'
import FavoriteIcon from './favorite-icon.vue'
import OrderCardInfo from './order-card-info.vue'
import QuantityButton from './quantity-button.vue'
import FilledButton from '../filled-button.vue'
import { ref } from 'vue'
export default {
  name: 'OrderCard',
  components: {
    Accordion,
    FavoriteIcon,
    OrderCardInfo,
    QuantityButton,
    FilledButton,
  },
  setup() {
    const style = ref({ 
      width: '340px', 
      height: '46px', 
      fontWeight: '500', 
      margin: '0 auto', 
      marginTop: '12px' 
    })

    return {
      style,
    }
  },
}
</script>
<style lang="css">
#order-card {
  width: 388px;
  position: absolute;
  right: 32px;
  bottom: 40px;
  background-color: white;
  padding-bottom: 24px;
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
</style>
