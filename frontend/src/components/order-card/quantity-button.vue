<template lang="pug">
button.quantity-button(@click="handleQuantity")
    PlusIcon(v-if="isIncrease" color="#2D2D2D")
    MinusIcon(v-else color="#2D2D2D")
</template>
<script>
import PlusIcon from './plus-icon.vue'
import MinusIcon from './minus-icon.vue'
export default {
  name: 'QuantityButton',
  components: {
    PlusIcon,
    MinusIcon,
  },
  props: {
    isIncrease: {
      type: Boolean,
      default: false,
    },
    handleQuantity: {
      type: Function,
      required: true,
    },
  },
}
</script>
<style lang="css">
.quantity-button {
  padding: 11px 21px;
  border: 1px solid var(--bg-textColor-secondary);
  background-color: white;
  cursor: pointer;
  max-height: 46px;
  transition: all 0.2s ease-in;
}
.quantity-button:hover {
  background-color: #2d2d2d35;
}
</style>
