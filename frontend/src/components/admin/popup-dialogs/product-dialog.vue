<template lang="pug">
.product-container
    .close-button-box
        IconButton(:isCloseButton="true" className="no-bgcolor" :handleClose="handleClose")
    .product-info-box
        h3 Name: 
        p.product-user {{ productItem.name }}
    .product-info-box-vertical
        h3(style="margin: 0") Image: 
        img( v-for="(images) in productItem.imageSrc" :src="images.image" :alt="images.alt" style="width: 45%; max-width: 8rem;")
    .product-info-box        
        h3 Dimensions: 
        p.product-user {{ productItem.dimensions.join(', ') }}
    .product-info-box        
        h3 Sizes: 
        p.product-user {{ productItem.sizes.join(', ') }}
    .product-info-box        
        h3 Release Date: 
        p.product-user {{ productItem.releaseMonth + ' ' + productItem.releaseYear }}
    .product-info-box        
        h3 Stock Situation: 
        p.product-user {{ productItem.inStock ? 'Yes' : 'No' }}
    h3 Detail: 
    p.product-user(style="text-indent: 3em; margin: -1rem 0;") {{ productItem.detail }}
</template>
<script>
import { useStore } from 'vuex';
import IconButton from '../../icon-button.vue'
import { ref } from 'vue'

export default {
    name: "ProductDialog",
    props: {
        productId: {
            type: String,
            required: true
        },
        handleClose: {
            type: Function,
            required: true
        }
    },
    components: {
        IconButton
    },
    async setup(props) {
        const store = useStore()
        const productItem = ref(await (store.dispatch('fetchProduct', props.productId)))
        console.log(productItem)
        return { productItem }
    }
}
</script>
<style lang="css">
.product-user {
    overflow-wrap: break-word;
    tab-size: 2;
}

.product-info-box>h3,
.product-info-box>p {
    margin: 0;
}

.product-info-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.product-info-box-vertical {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
}

.product-container {
    background-color: white;
    border-radius: 0.5rem;
    max-width: 30vw;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 1rem 3rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.product-container>h3 {
    margin: 0;
}

.close-button-box {
    display: flex;
    justify-content: flex-end;
}
</style>