<template lang="pug">
.not-found-container
    NotFound404
    p.not-found-explanation I guess what you are looking for is not here &nbsp;&nbsp;-Loky
</template>
<script>
import NotFound404 from '../components/not-found-404.vue';
export default {
    name: "NotFoundPage",
    components: {
        NotFound404
    }
}
</script>
<style lang="css">
.not-found-container {
    position: relative;
    top: 167px;
    margin: 0 auto;
    width: 700px;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.not-found-explanation {
    font-size: 16px;
    line-height: 19.2px;
    color: #FF4D0080;
    margin-top: 64px;

}
</style>