<template lang="pug">
div(:class="isMenuOpen ? 'open-sidebar sidebar-menu' : 'sidebar-menu'")
    .sidebar-header 
        Logo 
        button#menu-button(@click.prevent="handleOpen")
            CloseIcon
    .sidebar-items 
        .sidebar-link-container
            .sidebar-link-item 
                router-link(to='/products') Products
            .sidebar-link-item 
                router-link(to='/cargo') Cargo
            .sidebar-link-item 
                router-link(to='/contact') Contact
            .sidebar-link-item(v-if="user === null")
                router-link(to='/sign-in') Sign in
            .sidebar-link-item(v-else) {{ user.firstName + " " + user.lastName}}
            .sidebar-link-item(v-if="user !== null")
                router-link(to='/user-basket') Cart({{ numberOfCart }})
            .sidebar-link-item(v-if="user !== null")
                a(@click.prevent="handleLogout") Logout
</template>
<script>
import { computed, watchEffect } from 'vue';
import Logo from './logo.vue'
import CloseIcon from './close-icon.vue'
import { useStore } from 'vuex';

export default {
    name: 'SidebarMenu',
    props: {
        isOpen: {
            type: Boolean,
            default: false
        },
        handleOpenSidebarMenu: {
            type: Function,
            default: () => { }
        }
    },
    components: {
        Logo,
        CloseIcon
    },
    setup(props, { emit }) {
        const store = useStore()
        const isMenuOpen = computed(() => props.isOpen)
        const user = computed(() => store.state.user)
        const numberOfCart = computed(() => store.state.numberOfCart)
        const handleOpen = (e) => {
            emit('updateOpen')
        }
        const handleLogout = () => {
            store.dispatch('logout')
        }
        return {
            isMenuOpen,
            handleOpen,
            user,
            numberOfCart,
            handleLogout
        }
    }
}
</script>
<style lang="css">
.open-sidebar {
    display: block !important;
}

.sidebar-menu {
    width: 100vw;
    height: 100vh;
    background-color: white;
    display: none;
    position: absolute;
    z-index: 999;
}

.sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    min-height: 68px;
}

#menu-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2.25rem;
    width: 2.25rem;
    height: 2.25rem;
}

.sidebar-link-container {
    display: flex;
    gap: 1rem;
    flex-direction: column;
}

.sidebar-items {
    padding: 2rem 1rem;
}

.sidebar-link-item {
    font-weight: 500;
    font-size: 1.75rem;
    color: inherit;
}

.sidebar-link-item > a {
  font-weight: 500;
  font-size: 1.75rem;
  color: inherit;
  cursor: pointer;
}
@media (max-width: 600px) {
    #menu-button {
        width: 2.5rem !important;
        height: 2.5rem !important;
    }

    .sidebar-header {
        min-height: 62px;
    }

    .sidebar-header>.logo {
        margin-top: 0.5rem;
    }
}
</style>