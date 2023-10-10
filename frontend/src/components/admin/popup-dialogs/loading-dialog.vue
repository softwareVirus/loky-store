<template lang="pug">
.loading-container(:style="style")
    .close-button-box
        IconButton(:isCloseButton="true" className="no-bgcolor" :handleClose="handleClose")
    .loading-info-box
        Loading
</template>
<script>
import IconButton from '../../icon-button.vue'
import Loading from '../../loading.vue';
export default {
    name: "LoadingDialog",
    props: {
        loadingItem: {
            type: Object,
            required: true
        },
        handleClose: {
            type: Function,
            required: true
        },
        style: {
            type: CSSStyleDeclaration,
            required: false
        }
    },
    components: {
        IconButton,
        Loading
    },
}
</script>
<style lang="css">
.loading-info-box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 90%;
}

.loading-container {
    background-color: white;
    border-radius: 0.5rem;
    max-width: 30vw;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 8rem;
}


.close-button-box {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}
</style>