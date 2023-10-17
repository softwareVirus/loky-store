<template lang="pug">
.shopping-cart-container(v-if="list.length !== 0")
    div
        .shopping-cart-header 
            PrimaryButton(content="Back to shop" :handleClick="handleClick")
            .shopping-cart-number-info
                h2.shopping-cart-title There are {{ list.length }} items in your cart
                p.shopping-cart-content You can proceed to the payment page by#[br] clicking the checkout button
        .shopping-cart-list-container(ref="shoppingCartRef" @wheel="handleWheel") 
            div.shopping-cart-list 
                template(v-for="(item, index) in list" :key="item._id")
                    ProductCart(
                        :refValue="list" 
                        :updateList="updateList" 
                        :productTitle="item.product.name" 
                        :productSize="item.size" 
                        :product="item.product" 
                        :isOrder="true" 
                        :quantity="item.quantity"
                        :index="index"
                    )
    ShoppingCartFooter(:price="price" :refValue="list" @updateList="updateList")
template(v-else)
    EmptyShoppingCart 
</template>
<script>
import ShoppingCartFooter from '../components/shopping-cart-footer.vue';
import ProductCart from '../components/product-card.vue';
import EmptyShoppingCart from '../components/empty-shopping-cart.vue';
import PrimaryButton from '../components/primary-button.vue';
import { ref, onBeforeUnmount, watch } from 'vue'
import { useStore } from 'vuex';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
export default {
    name: 'UserShoppingCart',
    components: {
        EmptyShoppingCart,
        ShoppingCartFooter,
        ProductCart,
        PrimaryButton,
        EmptyShoppingCart
    },
    setup(props) {
        const store = useStore();
        const router = useRouter();
        const shoppingCartRef = ref(null);
        const localValue = JSON.parse(localStorage.getItem('productList:' + store.state.user._id))
        const list = ref(localValue !== null ? localValue : [])
        const price = computed(() => list.value.reduce((totalPrice, currentItem) => totalPrice += currentItem.product.price * currentItem.quantity, 0))
        watch(list, (newValue, oldValue) => store.state.numberOfCart = newValue.length)

        const updateList = (newList) => {
            console.log(newList)
            list.value = newList
        }
        const handleClick = () => {
            router.push('/')
        }
        const handleWheel = (e) => {
            console.log(e)
            shoppingCartRef.value.scrollLeft += e.deltaY
        }

        const handleBeforeUnmountOrUnload = () => {
            localStorage.removeItem("productList:" + store.state.user._id)
            localStorage.setItem("productList:" + store.state.user._id, JSON.stringify(list.value))
        }
        window.onbeforeunload = () => handleBeforeUnmountOrUnload()
        onBeforeUnmount(() => handleBeforeUnmountOrUnload())


        return {
            shoppingCartRef,
            handleWheel,
            list,
            updateList,
            price,
            handleClick
        }
    }
}
</script>
<style lang="css">
.shopping-cart-header {
    display: flex;
    padding: 0 32px;
    margin-top: 30px;
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


@media (max-width: 600px) {
    .shopping-cart-header {
        flex-direction: column-reverse;
        width: 100%;
        align-items: center;
        padding: 0;
        gap: 0.75rem;
    }

    .shopping-cart-number-info {
        margin: 0;
        width: fit-content;
    }

    .shopping-cart-list-container {
        margin: 0 auto;
        width: 100%;
        margin-top: 2rem;
    }

    .shopping-cart-list {
        flex-direction: column;
        margin: 0 auto;
        max-height: 70vh;
        gap: 1.25rem;
    }

    .shopping-cart-list .icon-button {
        max-height: 2.65rem;
    }

    .shopping-cart-list .icon-button-v2 {
        height: 2rem;
    }
}
</style>