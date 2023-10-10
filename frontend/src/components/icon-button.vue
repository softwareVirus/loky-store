<template lang="pug">
button(:class="'icon-button ' + (isCloseButton ? 'close-button' : 'favorite-button') + (className !== '' ? ' radius-button' : '')" @click.native="buttonClickEvent" @click="handleClose")
    PlusIcon(v-if="isCloseButton" :className="'close-icon' + (className !== '' ? ' ' + className : '')" :color="className !== '' ? '#ff4d00' : 'white'")
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
        },
        className: {
            type: String,
            default: ""
        },
        handleClose: {
            type: Function,
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

.no-bgcolor {
    background-color: white;
}

.radius-button {
    border-radius: 2rem;
    border: none;
    background-color: white;
}

.radius-button:hover {
    background-color: white;
}
.radius-button > svg {
    width: 2rem;
    height: 2rem;
}
</style>