<template lang="pug">
.popup-container 
    slot
</template>
<script>
export default {
    name: 'Popup',
}
</script>
<style lang="css">
.popup-container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00000080;
    margin-left: -23rem;
    z-index: 15;
}

</style>