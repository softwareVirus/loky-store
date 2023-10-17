<template lang="pug">
#product-quarter-container(:class="products.map(item => item.inStock ? '' : 'x').join('').length === products.length ? 'disabled-gray' : ''")
    div#product-quarter-title
        p#product-year {{ products[0].releaseYear }} |&nbsp; 
        span#product-quarter {{ products[0].releaseMonth }}
    div#product-info-container
      template(v-for="product in products")
        ProductCard(:product="product")
</template>
<script>
import ProductCard from './product-card.vue'
export default {
  name: 'ProductQuarter',
  components: {
    ProductCard,
  },
  props: {
    products: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    console.log(props.products, 'here')
  }
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

.disabled-gray {
  filter: grayscale(1);
}

#product-year,
#product-quarter {
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.8rem;
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

@media (max-width: 1020px) {
  #product-info-container {
    flex-direction: column;
  }

  #product-quarter-container {
    width: fit-content;
    margin: 0 auto;
  }
}
</style>
