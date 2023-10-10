<template lang="pug">
button.primary-button #[LeftArrow]{{ content  }}
</template>
<script>
import LeftArrow from './left-button.vue'
export default {
    name: 'PrimaryButton',
    props: {
        content: {
            type: String,
            required: true
        }
    },
    components: {
        LeftArrow
    }
}
</script>
<style lang="css">
.primary-button {
    background-color: white;
    border: none;
    color: #FF4D00;
    line-height: 19.2px;
    font-weight: 500;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
}
</style>