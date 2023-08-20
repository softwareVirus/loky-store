<template lang="pug">
div(:class="isSizes ? 'order-card-info' : 'order-card-info quantity-info'")
    h3.order-card-info-title {{ isSizes ? 'Sizes' : 'Quantity' }}
    .order-card-info-content 
        template(v-if="isSizes")
            DimensionButton(
                v-for="(item,index) in buttons" 
                :key="item" 
                :content="item" 
                :selectedClass="buttonIndex == index ? 'active' : ''"
                :clickButton="handleSelect"
                :isSizesButton="true"
                :index="index"
            ) {{item}}
        template(v-else)
            h5#quantity 2
</template>
<script>
import DimensionButton from './dimension-button.vue'
import { ref } from 'vue'
export default {
  name: 'OrderCardInfo',
  components: {
    DimensionButton,
  },
  props: {
    isSizes: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const buttons = ref(['S', 'M', 'L', 'XL', 'XXL'])
    const buttonIndex = ref(null)
    const handleSelect = index => {
      if (buttonIndex.value === index) {
        buttonIndex.value = null
      } else {
        buttonIndex.value = index
      }
    }
    return {
      buttonIndex,
      buttons,
      handleSelect,
    }
  },
}
</script>
<style lang="css">
.order-card-info {
  display: flex;
  border: 1px solid var(--bg-textColor-secondary);
  padding: 4px 6px;
  width: 340px;
  max-height: 46px;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-top: 12px;
}
.order-card-info-title {
  font-size: 14px;
  line-height: 16.8px;
  margin: 0;
  margin-left: 6px;
  color: var(--bg-textColor-thirth);
  font-weight: 400;
}
.order-card-info-content {
  display: flex;
  gap: 3px;
  align-items: center;
  height: 38px;
}
.quantity-info {
  width: 184px !important;
  height: 46px !important;
  padding: 14px 12px !important;
}
#quantity {
  color: var(--bg-textColor-secondary);
  margin: 0;
  font-weight: 400;
}
</style>
