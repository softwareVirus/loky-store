<template lang="pug">
div(:class="isSizes ? 'order-card-info' : 'order-card-info quantity-info'")
    h3.order-card-info-title {{ isSizes ? 'Sizes' : 'Quantity' }}
    .order-card-info-content 
        template(v-if="isSizes")
            DimensionButton(
                v-for="(item,index) in buttons" 
                :key="'15x'+item+index" 
                :content="item" 
                :selectedClass="buttonIndex == index ? 'active' : ''"
                :clickButton="handleSelect"
                :isSizesButton="true"
                :index="index"
                :disabled="!sortedButtonList.includes(item)"
                @updateRefValue="updateRefValue"
                :refValue="refValue"
            ) {{item}}
        template(v-else)
            h5#quantity {{ quantity }}
</template>
<script>
import DimensionButton from './dimension-button.vue'
import { ref, computed } from 'vue'
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
    buttonList: {
      type: Array,
      default: []
    },
    quantity: {
      type: Number,
      default: 0
    },
    refValue: {
      type: String,
      default: null
    },
    updateSelectedSize: {
      type: Function,
      default: () => {}
    }
  },
  setup(props) {
    const buttons = ['S', 'M', 'L', 'XL', 'XXL']
    const sortedButtonList = computed(() => props.buttonList.sort(function(a,b) {
      return buttons.indexOf(a) - buttons.indexOf(b)
    }))
    const buttonIndex = ref(props.refValue != null ? buttons.indexOf(props.refValue) : null)
    const handleSelect = index => {
      if (buttonIndex.value === index) {
        buttonIndex.value = null
      } else {
        buttonIndex.value = index
      }
    }
    const updateRefValue = (newValue) => {
      props.updateSelectedSize(newValue)
    }
    return {
      buttonIndex,
      sortedButtonList,
      handleSelect,
      buttons,
      updateRefValue
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
