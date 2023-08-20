<template lang="pug">
#product-quarter-container
    div#product-quarter-title
        p#product-year 2023 | #[span#product-quarter Q4]
    div#product-info-container
        ProductCard(productTitle="Pure Loky Tee" productCost="45 USD")
        ProductCard(productTitle="Pure Loky Tee" productCost="45 USD")
</template>
<script>
import ProductCard from './product-card.vue'
export default {
  name: 'ProductQuarter',
  components: {
    ProductCard,
  },
}
</script>
<style lang="css">
.minimap #product-year,
.minimap #product-quarter {
  font-size: 4.8px !important;
  font-weight: 500 !important;
  line-height: 5.8px !important;
}

.minimap #product-quarter-title {
  margin-bottom: 3px !important;
}

#product-year,
#product-quarter {
  font-size: 24px;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0em;
  text-align: left;
  margin: 0;
}

#product-quarter {
  font-style: italic;
  font-weight: 400;
}

#product-quarter-title {
  display: flex;
  margin-bottom: 15px;
}

#product-info-container {
  display: flex;
  gap: 24px;
}
</style>
