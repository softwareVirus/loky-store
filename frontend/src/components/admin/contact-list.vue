<template lang="pug">
Popup(v-if="isDialogOpen")
    ContactDialog(:contactItem="data" :handleClose="handleClose")
.order-management(:class="isDialogOpen ? 'popup-open' : ''")
    h1.order-management-title Contact List
    .table-cont
        Table(:handleOpen="handleOpen" :tableHeaders='tableHeaders' :tableContent="tableContent")
</template>
<script>
import Table from './table.vue';
import Popup from './popup.vue'
import ContactDialog from './popup-dialogs/contact-dialog.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'ContactList',
    components: {
        Table,
        Popup,
        ContactDialog
    },
    setup(props) {
        const isDialogOpen = ref(false);
        const selectedIndex = ref(null);
        const store = useStore()
        const tableHeaders = ref(['Name', 'Email', 'Content', 'Control Buttons'].map((item, index) => ({
            item: item,
            isSortable: index < 2
        })))
        const tableContent = ref(store.state.contactItems)
        console.log(store.state)
        const handleOpen = (index) => {
            isDialogOpen.value = !isDialogOpen.value
            selectedIndex.value = index
        }

        const data = computed(() => {
            if (selectedIndex.value === null)
                return null
            return store.state.contactItems[selectedIndex.value]
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
            tableContent
        }
    }
}
</script>
<style lang="css">
.order-management-title {
    font-size: 3rem;
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