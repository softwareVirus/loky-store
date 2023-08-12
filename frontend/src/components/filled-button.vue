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
    width: 122px;
    height: 35px;
    padding: 8px 12px 8px 12px;
    border: none;
    background-color: #FF4D00;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>