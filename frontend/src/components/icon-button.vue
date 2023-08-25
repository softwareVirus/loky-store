<template lang="pug">
button(:class="'icon-button ' + (isCloseButton ? 'close-button' : 'favorite-button')" @click.native="buttonClickEvent")
    PlusIcon(v-if="isCloseButton" className="close-icon" color="white")
    FavoriteIcon(v-else)
</template>
<script>
import PlusIcon from './order-card/plus-icon.vue';
import FavoriteIcon from './order-card/favorite-icon.vue';
export default {
    name: "IconButton",
    components: {
        PlusIcon,
        FavoriteIcon
    },
    props: {
        isCloseButton: {
            type: Boolean,
            default: false
        },
        buttonClickEvent: {
            type: Function,
            required: true,
            default: () => {}
        }
    }
}
</script>
<style lang="css">
.icon-button {
    padding: 4px;
    max-height: 2rem;
    border: none;
    cursor: pointer;
}    

.close-button {
    background-color: var(--bg-color-primary);
    color: white;
}

.favorite-button {
    background-color: white;
}

.close-button:hover {
    background-color: #B13600;
}

.favorite-button:hover {
    background-color: rgb(231 231 231);
}
</style>