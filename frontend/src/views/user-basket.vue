<template lang="pug">
template(v-if="isThereOrder")
    UserShoppingCart
template(v-else)
    EmptyShoppingCart
</template>
<script>
import { computed } from 'vue';
import UserShoppingCart from '../components/user-shopping-cart.vue';
import EmptyShoppingCart from '../components/empty-shopping-cart.vue';
import { useStore } from 'vuex';
export default {
    name: 'UserBasket',
    components: {
        UserShoppingCart,
        EmptyShoppingCart
    },
    setup() {
        const store = useStore()
        const isThereOrder = computed(() => store.state.isThereOrder && JSON.parse(localStorage.getItem("productList:"+store.state.user._id))?.length)
        console.log(localStorage.getItem("productList:"+store.state.user._id),store.state.isThereOrder)
        return {
            isThereOrder
        }
    }
}
</script>
<style lang="">
    
</style>