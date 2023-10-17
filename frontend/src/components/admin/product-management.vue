<template lang="pug">
Popup(v-if="isDialogOpen")
    ProductEdit(:productItem="data" :handleClose="handleClose" :isCreatingProduct="selectedIndex == -1")
.order-management(:class="isDialogOpen ? 'popup-open' : ''")
    h1.order-management-title Product List
    .table-search
        PrimaryInput(placeholder="Search..." type="text" :modelValue="searchQuery" name="price" @update:modelValue="newValue => searchQuery = newValue")
        FilledButton(content="Add product" :isRightArrow="false" :handleOpen="() => handleOpen(-1)")
    .table-cont
        Table(:handleOpen="handleOpen" :tableHeaders='tableHeaders' :tableContent="tableContent" buttonName="Edit" deleteDispatch="deleteProduct")
</template>
<script>
import Table from './table.vue';
import Popup from './popup.vue';
import PrimaryInput from '../primary-input.vue';
import ProductEdit from './popup-dialogs/product-edit.vue';
import FilledButton from '../filled-button.vue';
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import Fuse from 'fuse.js'

export default {
    name: 'ProductManagement',
    components: {
        Table,
        Popup,
        ProductEdit,
        PrimaryInput,
        FilledButton
    },
    async setup(props) {
        const isDialogOpen = ref(false);
        const selectedIndex = ref(null);
        const store = useStore()
        const tableHeaders = ref(['Name', 'Dimensions', 'Image', 'Sizes', 'Price', 'Release Year', 'Release Month', 'Stock Situation', 'Detail', 'Control Buttons'].map((item, index) => ({
            item: item,
            isSortable: index > 2 && index < 7
        })))
        await store.dispatch("fetchProducts")
        const tableContent = ref(store.state.products)
        let fuseOptions = {
            shouldSort: true,
            includeScore: true,
            threshold: 0.0,
            keys: ['name', 'price', { name: 'releaseYear', weight: 1 }]
        }
        let productListFuse = new Fuse(store.state.products, fuseOptions)
        const searchQuery = ref('')
        const handleOpen = (index) => {
            isDialogOpen.value = !isDialogOpen.value
            selectedIndex.value = index
        }
        watch(() => store.state.products, (newValue, oldValue) => {
            tableContent.value = newValue
            productListFuse = new Fuse(tableContent.value, fuseOptions)
        })
        watch(searchQuery, (newValue, oldValue) => {
            if (searchQuery.value.trim() === '') {
                tableContent.value = store.state.products
                return;
            }
            tableContent.value = productListFuse.search(newValue.trim()).map(item => item.item)
        })
        const data = computed(() => {
            if (selectedIndex.value === null)
                return null
            if(selectedIndex.value === -1) 
                return ({
                    name: '',
                    dimensions: [],
                    imageSrc: [],
                    sizes: [],
                    inStock: false,
                    detail: '',
                    releaseYear: '1970',
                    releaseMonth: 'January',
                    price: '0'
                })
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
            tableContent,
            searchQuery,
            selectedIndex
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
    justify-content: space-between;
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