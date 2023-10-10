<template lang="pug">
Popup(v-if="isDialogOpen")
    ContactDialog(:contactItem="data" :handleClose="handleClose")
.order-management(:class="isDialogOpen ? 'popup-open' : ''")
    h1.order-management-title Contact List
    .table-search
        PrimaryInput(placeholder="Search..." type="text" :modelValue="searchQuery" name="price" @update:modelValue="newValue => searchQuery = newValue")
    .table-cont
        Table(:handleOpen="handleOpen" :tableHeaders='tableHeaders' :tableContent="tableContent" deleteDispatch="deleteContact")
</template>
<script>
import Table from './table.vue';
import Popup from './popup.vue'
import ContactDialog from './popup-dialogs/contact-dialog.vue';
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import Fuse from 'fuse.js';
import PrimaryInput from '../primary-input.vue';

export default {
    name: 'ContactList',
    components: {
        Table,
        Popup,
        ContactDialog,
        PrimaryInput
    },
    async setup(props) {
        const isDialogOpen = ref(false);
        const selectedIndex = ref(null);
        const store = useStore()
        const tableHeaders = ref(['Name', 'Email', 'Content', 'Control Buttons'].map((item, index) => ({
            item: item,
            isSortable: index < 2
        })))
        await store.dispatch('fetchContacts')
        const tableContent = computed(() => store.state.contacts)
        const handleOpen = (index) => {
            isDialogOpen.value = !isDialogOpen.value
            selectedIndex.value = index
        }
        const contactListFuse = new Fuse(store.state.contacts, {
            shouldSort: true,
            includeScore: true,
            threshold: 0.0,
            keys: ['name', 'email']
        })
        const searchQuery = ref('')
        watch(searchQuery, (newValue, oldValue) => {
            if (searchQuery.value.trim() === '') {
                tableContent.value = store.state.contacts
                return;
            }
            tableContent.value = contactListFuse.search(newValue.trim()).map(item => item.item)
        })

        const data = computed(() => {
            if (selectedIndex.value === null)
                return null
            return store.state.contacts[selectedIndex.value]
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