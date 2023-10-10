<template lang="pug">
.admin-panel 
    SideMenu
    Suspense
        .admin-panel-content
            router-view
        template(#fallback)
            .loading-container
                .loading-box
                    Loading
                    p Loading

</template>
<script>
import SideMenu from '../components/admin/side-menu.vue';
import Loading from '../components/loading.vue';
export default {
    name: 'Admin',
    components: {
        SideMenu,
        Loading
    }
}
</script>
<style lang="css">
.admin-panel {
    display: flex;
    justify-content: space-between;
}

.admin-panel-content {
    width: calc(100vw - 23rem);
    margin-left: auto;
}

.loading-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.loading-container {
    width: calc(100vw - 23rem);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>