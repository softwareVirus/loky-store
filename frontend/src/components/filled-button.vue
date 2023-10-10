<template lang="pug">
button.filled-button(v-if="handleOpen !== null" :style="style" @click.prevent="handleOpen" :type="type" :disabled="disabled") {{ content }} #[RightArrow(v-if="isRightArrow")] 
button.filled-button(v-else :style="style" :type="type" :disabled="disabled") {{ content }} #[RightArrow(v-if="isRightArrow")] 
</template>
<script>
import RightArrow from './right-arrow.vue';
export default {
    name: 'FilledButton',
    components: {
        RightArrow
    },
    props: {
        style: {
            type: Object,
            required: false
        },
        isRightArrow: {
            type: Boolean,
            default: true
        },
        content: {
            type: String,
            required: true
        },
        handleOpen: {
            type: Function,
            default: null
        },
        type: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style lang="css">
.filled-button {
    height: 35px;
    padding: 8px 12px 8px 12px;
    border: none;
    background-color: #FF4D00;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.1s ease-in;
    cursor: pointer;
}

.filled-button:hover {
    background-color: #B13600;
    border-color: #B13600;
}

.filled-button:disabled {
    opacity: 0.5;
    user-select: none;
    cursor: default;
}

.filled-button:disabled:hover {
    background-color: var(--bg-color-primary);
    border-color: var(--bg-color-primary);
}
</style>