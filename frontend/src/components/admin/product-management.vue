<template lang="pug">
Popup(v-if="isDialogOpen")
    ProductEdit(:productItem="data" :handleClose="handleClose")
.order-management(:class="isDialogOpen ? 'popup-open' : ''")
    h1.order-management-title Contact List
    .table-cont
        Table(:handleOpen="handleOpen" :tableHeaders='tableHeaders' :tableContent="tableContent" buttonName="Edit")
</template>
<script>
import Table from './table.vue';
import Popup from './popup.vue';
import ProductEdit from './popup-dialogs/product-edit.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'ProductManagement',
    components: {
        Table,
        Popup,
        ProductEdit
    },
    setup(props) {
        const isDialogOpen = ref(false);
        const selectedIndex = ref(null);
        const store = useStore()
        const tableHeaders = ref(['Dimensions', 'Image', 'Sizes', 'Price', 'Release Year', 'Release Month', 'Stock Situation', 'Detail', 'Control Buttons'].map((item, index) => ({
            item: item,
            isSortable: index < 2
        })))
        const tableContent = ref(store.state.products)
        console.log(store.state)
        const handleOpen = (index) => {
            isDialogOpen.value = !isDialogOpen.value
            selectedIndex.value = index
        }

        const data = computed(() => {
            if (selectedIndex.value === null)
                return null
            return store.state.products[selectedIndex.value]
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