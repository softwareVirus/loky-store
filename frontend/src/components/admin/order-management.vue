<template lang="pug">
Popup(v-if="isDialogOpen")
    template(v-if="popupType === 'product'")
        Suspense
            ProductDialog( :productId="data" :handleClose="handleClose")
            template(#fallback)
                LoadingDialog(style="height: 35rem")
    template(v-else)
        Suspense
            UserDialog(:userId="data" :handleClose="handleClose")
            template(#fallback)
                LoadingDialog(style="height: 16rem")
.order-management(:class="isDialogOpen ? 'popup-open' : ''")
    h1.order-management-title Order List
    .table-search
        PrimaryInput(placeholder="Search..." type="text" :modelValue="searchQuery" name="price" @update:modelValue="newValue => searchQuery = newValue")
    .table-cont
        Table(:handleOpen="handleOpen" :tableHeaders='tableHeaders' :tableContent="tableContent" buttonName="Edit" deleteDispatch="deleteOrder")
</template>
<script>
import Table from './table.vue';
import Popup from './popup.vue';
import ProductDialog from './popup-dialogs/product-dialog.vue';
import UserDialog from './popup-dialogs/user-dialog.vue';
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import Fuse from 'fuse.js'
import PrimaryInput from '../primary-input.vue';
import LoadingDialog from './popup-dialogs/loading-dialog.vue';
import dateFns from 'date-fns'
export default {
    name: 'OrderManagement',
    components: {
        Table,
        Popup,
        ProductDialog,
        PrimaryInput,
        UserDialog,
        LoadingDialog
    },
    async setup(props) {
        const isDialogOpen = ref(false);
        const selectedIndex = ref(null);
        const popupType = ref(null)
        const store = useStore()
        const tableHeaders = ref(['Product Name', 'User Name', 'Order Date', 'Quantity', 'Size', 'Dimension', 'Total Price', 'Control Buttons'].map((item) => ({
            item: item,
            isSortable: false
        })))
        await store.dispatch('fetchOrders')
        console.log(store.state.orders)
        const orderDataWithId = computed(() => store.state.orders.map(item => ({
            idOrderCart: item.product._id,
            idUser: item.user._id
        })))
        console.log(orderDataWithId.value)
        const tableContent = ref(store.state.orders.map((item) => ({
            _id: item._id,
            product: item.product.name,
            user: item.user.firstName + " " + item.user.lastName,
            orderDate: dateFns.format(new Date(item.orderDate), "DD-MM-YYYY HH:mm:ss"),
            quantity: item.quantity,
            size: item.size,
            dimension: item.dimension,
            totalPrice: item.totalPrice,
        })))
        let fuseOptions = {
            shouldSort: true,
            includeScore: true,
            threshold: 0.0,
            keys: ['product', 'user']
        }
        let orderListFuse = new Fuse(store.state.orders, fuseOptions)
        const searchQuery = ref('')
        watch(searchQuery, (newValue, oldValue) => {
            if (searchQuery.value.trim() === '') {
                tableContent.value = orderData.value
                return;
            }
            tableContent.value = orderListFuse.search(newValue.trim()).map(item => item.item)
        })
        watch(() => store.state.orders, (newValue, oldValue) => {
            console.log('orders')
            tableContent.value = store.state.orders.map((item) => ({
                _id: item._id,
                product: item.product.name,
                user: item.user.firstName + " " + item.user.lastName,
                orderDate: dateFns.format(new Date(item.orderDate), "DD-MM-YYYY HH:mm:ss"),
                quantity: item.quantity,
                size: item.size,
                dimension: item.dimension,
                totalPrice: item.totalPrice,
            }))
            orderListFuse = new Fuse(tableContent.value, fuseOptions)
        })
        const handleOpen = (index, popupTypeButton) => {
            console.log(index, popupTypeButton)
            isDialogOpen.value = !isDialogOpen.value
            selectedIndex.value = index
            popupType.value = popupTypeButton
        }

        const data = computed(() => {
            if (selectedIndex.value === null)
                return null
            console.log(popupType.value)
            return popupType.value === 'product' ? orderDataWithId.value[selectedIndex.value].idOrderCart
                : orderDataWithId.value[selectedIndex.value].idUser
        })

        const handleClose = () => {
            isDialogOpen.value = false;
            selectedIndex.value = null;
        }

        return {
            isDialogOpen,
            handleOpen,
            data,
            handleClose,
            tableHeaders,
            tableContent,
            searchQuery,
            popupType
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