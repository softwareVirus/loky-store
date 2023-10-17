<template lang="pug">
footer.shopping-cart-footer
    .shopping-cart-info
        p.shopping-cart-total Total Price: #[span.second-color {{ price }} USD]
        p.shopping-cart-type Shopping: #[span.second-color Calculated at checkout]
    .shopping-cart-button
        FilledButton(content="Checkout Securely" :style="style" :handleOpen="handleOrder")
</template>
<script>
import { useStore } from 'vuex'
import FilledButton from './filled-button.vue'
import { ref } from 'vue'
export default {
    name: 'ShoppingCartFooter',
    components: {
        FilledButton
    },
    props: {
        price: {
            type: Number,
            default: 0
        },
        refValue: {
            type: Object,
            required: true
        },
        updateList: {
            type: Function,
            default: () => { }
        }
    },
    setup(props, { emit }) {
        const store = useStore()
        const total = ref(45)
        const style = ref({
            width: 'auto',
            padding: '8px 12px'
        })
        const handleOrder = async () => {
            const data = JSON.parse(localStorage.getItem("productList:" + store.state.user._id)).map(item => {
                return {
                    product: {
                        _id: item.product._id
                    },
                    user: {
                        _id: store.state.user._id
                    },
                    size: item.size,
                    dimension: item.dimension,
                    quantity: item.quantity,
                    totalPrice: item.product.price * item.quantity
                }
            })
            console.log(data)
            const response = await store.dispatch('createOrder', data)
            if (response.status === 200) {
                localStorage.clear()
                emit('updateList', [])
            }
        }
        return {
            total,
            style,
            handleOrder
        }
    }
}
</script>
<style lang="css">
.shopping-cart-footer {
    display: flex;
    justify-content: space-between;
    width: calc(100% - 64px);
    margin: 0 32px 12px;
    align-items: center;
}

.shopping-cart-info {
    display: flex;
    gap: 24px
}

.shopping-cart-info>p {
    margin: 0;
    font-weight: 500;
    color: #FF4D0080;
}

.second-color {
    color: #FF4D00;
}

@media (max-width: 600px) {
    .shopping-cart-type {
        display: none;
    }
    .shopping-cart-footer {
        width: 85%;
        margin: 0 auto;
        margin-bottom: 1rem;
    }
}
</style>