<template lang="pug">
footer.shopping-cart-footer
    .shopping-cart-info
        p.shopping-cart-total Total Price: #[span.second-color {{ total }} USD]
        p.shopping-cart-type Shopping: #[span.second-color Calculated at checkout]
    .shopping-cart-button
        FilledButton(content="Checkout Securely" :style="style")
</template>
<script>
import FilledButton from './filled-button.vue'
import { ref } from 'vue'
export default {
    name: 'ShoppingCartFooter',
    components: {
        FilledButton
    },
    setup() {
        const total = ref(45)
        const style = ref({
            width: 'auto',
            padding: '8px 12px'
        })
        return {
            total,
            style
        }
    }
}
</script>
<style lang="css">
    .shopping-cart-footer {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 24px;
        width: calc(100% - 64px);
        left: 32px;
        align-items: center;
    }

    .shopping-cart-info {
        display: flex;
        gap: 24px
    }

    .shopping-cart-info > p {
        margin: 0;
        font-weight: 500;
        color: #FF4D0080;
    }

    .second-color {
        color: #FF4D00;
    }
</style>