<template lang="pug">
button(:class="'icon-button ' + (isCloseButton ? 'close-button' : 'favorite-button')" @click.native="buttonClickEvent")
    CloseIcon(v-if="isCloseButton")
    FavoriteIcon(v-else)
</template>
<script>
import CloseIcon from './close-icon.vue';
import FavoriteIcon from './order-card/favorite-icon.vue';
export default {
    name: "IconButton",
    components: {
        CloseIcon,
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
<style lang="">
.icon-button {
    padding: 8px
}    
</style>