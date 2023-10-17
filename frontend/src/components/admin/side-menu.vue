<template lang="pug">
.side-menu
    .side-menu-logo
        Logo(:width="180" :height="144")
    h2.side-menu-title Admin Panel
    .side-menu-links 
        router-link(to="/admin/contact-list")
            p.side-menu-links-items Contacts 
        router-link(to="/admin/product-management")
            p.side-menu-links-items Product Management
        router-link(to="/admin/order-management")
            p.side-menu-links-items Order Management
        router-link(to="/admin/user-management")
            p.side-menu-links-items User Management
</template>
<script>
import Logo from '../logo.vue';
export default {
    name: 'SideMenu',
    components: {
        Logo
    },
    setup(props) {
        
    }
}
</script>
<style lang="css">
.side-menu {
    width: 23rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid;
    border-color: var(--bg-color-primary);
    padding: 1rem;
    box-sizing: border-box;
}

.side-menu-logo {
    margin-left: 3rem;
}

.side-menu-links {
    width: 100%;
}
.side-menu-links-items {
    color: var(--bg-color-primary)
}

</style>