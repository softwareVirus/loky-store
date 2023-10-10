<template lang="pug">
.empty-basket 
    .empty-basket-box 
        EmptyBasketIcon
        h2.empty-basket-title Your cart is empty 
        p.empty-basket-content You can examine our carefully prepared #[<br>] products on the products page!
        PrimaryButton(content="Back to shop" :handleClick="handleClick")
</template> 
<script>
import { useRouter } from 'vue-router';
import EmptyBasketIcon from './empty-basket-icon.vue';
import PrimaryButton from './primary-button.vue';
export default {
    name: 'EmptyShoppingCart',
    components: {
        EmptyBasketIcon,
        PrimaryButton
    },
    setup() {
        const router = useRouter()
        const handleClick = () => {
            router.push('/')
        }
        return {
            handleClick
        }
    }
}
</script>
<style lang="css">
    .empty-basket {
        position: absolute;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
    }
    .empty-basket-title {
        margin: 16px 0 0 0;
    }
    .empty-basket-content {
        text-align: center;
        margin: 12px 0 22px 0;
        color: #FF4D0080;
    }
    .empty-basket-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>