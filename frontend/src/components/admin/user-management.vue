<template lang="pug">
Popup(v-if="isDialogOpen")
    UserEdit(:userItem="data" :handleClose="handleClose")
.order-management(:class="isDialogOpen ? 'popup-open' : ''")
    h1.order-management-title User List
    .table-search
        PrimaryInput(placeholder="Search..." type="text" :modelValue="searchQuery" name="price" @update:modelValue="newValue => searchQuery = newValue")
    .table-cont
        Table(:handleOpen="handleOpen" :tableHeaders='tableHeaders' :tableContent="tableContent" buttonName="Edit" deleteDispatch="deleteUser")
</template>
<script>
import Table from './table.vue';
import Popup from './popup.vue';
import PrimaryInput from '../primary-input.vue';
import UserEdit from './popup-dialogs/user-edit.vue';
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import Fuse from 'fuse.js'

export default {
    name: 'ProductManagement',
    components: {
        Table,
        Popup,
        UserEdit,
        PrimaryInput
    },
    async setup(props) {
        const isDialogOpen = ref(false);
        const selectedIndex = ref(null);
        const store = useStore()
        const tableHeaders = ref(['First Name', 'Last Name', 'Email', 'Admin Situation', 'Control Buttons'].map((item, index) => ({
            item: item,
            isSortable: index < 2
        })))
        await store.dispatch("fetchUsers")
        const tableContent = ref(store.state.users)
        let fuseOptions = {
            shouldSort: true,
            includeScore: true,
            threshold: 0.0,
            keys: ['firstName', 'lastName']
        }
        let userListFuse = new Fuse(tableContent.value, fuseOptions)
        const searchQuery = ref('')
        const handleOpen = (index) => {
            isDialogOpen.value = !isDialogOpen.value
            selectedIndex.value = index
        }
        watch(searchQuery, (newValue, oldValue) => {
            if (searchQuery.value.trim() === '') {
                tableContent.value = store.state.users
                return;
            }
            tableContent.value = userListFuse.search(newValue.trim()).map(item => item.item)
        })
        watch(() => store.state.users, (newValue, oldValue) => {
            tableContent.value = store.state.users
            userListFuse = new Fuse(tableContent.value, fuseOptions)
        })
        const data = computed(() => {
            if (selectedIndex.value === null)
                return null
            return store.state.users[selectedIndex.value]
        })
        const handleClose = () => {
            isDialogOpen.value = false;
            selectedIndex.value = null;
        }
        console.log(data)
        return {
            isDialogOpen,
            handleOpen,
            data,
            handleClose,
            tableHeaders,
            tableContent,
            searchQuery
        }
    }
}
</script>
<style lang="css">
.order-management-title {
    font-size: 3rem;
    margin: 1rem 0;
}

.table-search {
    width: 95%;
    margin: 0 auto 2rem;
    display: flex;
    justify-content: flex-start;
}

.table-cont {
    overflow: auto;
    width: 95%;
    height: calc(80vh);
    display: flex;
    justify-content: center;
}

.order-management {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
</style>