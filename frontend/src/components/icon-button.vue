<template lang="pug">
button(:class="'icon-button ' + (isCloseButton ? 'close-button' : 'favorite-button') + (className !== '' ? ' radius-button' : '')" @click.prevent="handleClick")
    PlusIcon(v-if="isCloseButton" :className="'close-icon' + (className !== '' ? ' ' + className : '')" :color="className !== '' ? '#ff4d00' : 'white'")
    FavoriteIcon(v-else :isFilled="isFilled")
</template>
<script>
import PlusIcon from './order-card/plus-icon.vue';
import { computed } from 'vue';
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
        className: {
            type: String,
            default: ""
        },
        handleClose: {
            type: Function,
            default: () => {}
        }, 
        useEmit: {
            type: Boolean,
            default: false
        },
        updateValue: {
            type: Function,
            default: () => {}
        },
        isFilled: {
            type: Boolean,
            default: false
        },
        updateFavorite: {
            type: Function,
            default: () => {}
        }
    }, 
    setup(props, {emit}) {
        const isFavorite = computed(() => props.isFilled)
        console.log(isFavorite.value, props.useEmit)
        const handleClick = () => {
            if(props.useEmit) {
                emit('updateFavorite')
                return;
            }
            props.handleClose()
        }
        return {
            handleClick,
            isFavorite
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