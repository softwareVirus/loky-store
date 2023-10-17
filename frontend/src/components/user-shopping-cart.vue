<template lang="pug">
.shopping-cart-container 
    div
        .shopping-cart-header 
            PrimaryButton(content="Back to shop")
            .shopping-cart-number-info
                h2.shopping-cart-title There are 2 items in your cart
                p.shopping-cart-content You can proceed to the payment page by#[br] clicking the checkout button
        .shopping-cart-list-container(ref="shoppingCartRef" @wheel="handleWheel") 
            div.shopping-cart-list 
                ProductCart(productTitle="Puke Free" productSize="XXL")
                ProductCart(productTitle="Puke Free" productSize="XXL")
                ProductCart(productTitle="Puke Free" productSize="XXL")
                ProductCart(productTitle="Puke Free" productSize="XXL")
                ProductCart(productTitle="Puke Free" productSize="XXL")
                ProductCart(productTitle="Puke Free" productSize="XXL")
    ShoppingCartFooter
</template>
<script>
import EmptyShoppingCart from './empty-shopping-cart.vue';
import ShoppingCartFooter from './shopping-cart-footer.vue';
import ProductCart from '../components/product-card.vue';
import PrimaryButton from './primary-button.vue';
import { ref } from 'vue'
export default {
    name: 'UserShoppingCart',
    components: {
        EmptyShoppingCart,
        ShoppingCartFooter,
        ProductCart,
        PrimaryButton
    },
    setup(props) {
        const shoppingCartRef = ref(null);

        const handleWheel = (e) => {
            console.log(e)
            shoppingCartRef.value.scrollLeft += e.deltaY
        }
        return {
            shoppingCartRef,
            handleWheel
        }
    }
}
</script>
<style lang="css">
.shopping-cart-header {
    display: none;
    padding: 0 32px;
    margin-top: 30px;
}
@media (max-width: 600px) {
    .shopping-cart-header {
        display: none;
    }
}

.shopping-cart-title {
    margin: 0
}

.shopping-cart-content {
    margin: 0;
    margin-top: 12px;
}
.shopping-cart-number-info {
    margin: 0 auto;
    margin-right: calc(50vw - 159px - 32px);
}

.shopping-cart-content {
    text-align: center;
    opacity: 0.5;
}


.shopping-cart-list {
    display: flex;
    gap: 0.75rem;
}

.shopping-cart-list-container {
    margin: 0 2rem;
    overflow: auto;
    display: flex;
    width: calc(100% - 64px);
    margin-top: 1.75rem;
    padding-bottom: 0.5rem;
}

.shopping-cart-list-container::-webkit-scrollbar {
  height: 0.4rem;
}

/* Track */
.shopping-cart-list-container::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
.shopping-cart-list-container::-webkit-scrollbar-thumb {
  background: #FF4D0080;

}

/* Handle on hover */
.shopping-cart-list-container::-webkit-scrollbar-thumb:hover {
  background: var(--bg-color-primary); 
}
.shopping-cart-container {
    height: calc(100vh - 64px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>