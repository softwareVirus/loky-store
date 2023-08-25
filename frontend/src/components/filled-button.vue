<template lang="pug">
button.filled-button(:style="style") {{ content }} #[RightArrow(v-if="isRightArrow")] 
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
}
</style>