<template lang="pug">
button.outlined-button(:style="style") {{ content }} 
</template>
<script>
import RightArrow from './right-arrow.vue';
export default {
    name: 'OutlinedButton',
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
.outlined-button {
    height: 35px;
    padding: 8px 12px 8px 12px;
    border: none;
    color: #FF4D00;
    border: 1px solid #FF4D00;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    background-color: white;
    align-items: center;
    justify-content: center;
    transition: all 0.1s ease-in;
}

.outlined-button:hover {
    background-color: rgb(231 231 231);
}

.outlined-button:disabled {
    opacity: 0.5;
    user-select: none;
}
</style>