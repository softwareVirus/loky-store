<template lang="pug">
button.icon-button-v2 
    PlusIcon(color="#ff4d00" v-if="isPlusIcon")
    MinusIcon(color="#ff4d00" v-else)
</template>
<script>
import PlusIcon from './order-card/plus-icon.vue';
import MinusIcon from './order-card/minus-icon.vue';
export default {
    name: "IconButtonNoPadding",
    props: {
        isPlusIcon: {
            type: Boolean,
            default: false
        }
    },
    components: {
        PlusIcon,
        MinusIcon
    }
}
</script>
<style lang="css">
.icon-button-v2 {
    background-color: white;
    border: none;
    padding: 0;
    cursor: pointer;
    height: 1.5rem;
    transition: all 0.1s ease-in;
}

.icon-button-v2:hover {
    background-color: rgb(231 231 231);
}
</style>