<template lang="pug">
.product-edit-container
    .close-button-box
        IconButton(:isCloseButton="true" className="no-bgcolor" :handleClose="handleClose")
    form.product-edit-form(@submit.prevent="handleSubmit")
        .product-form-input-v2
            label.cost-label Release Month: 
            select.month-selection(v-model="releaseMonth")
                option(v-for="item in months" :key="item" :value="item") {{ item }}
        .product-form-input-v2
            label.cost-label Release Year:
            PrimaryInput(placeholder="1970" name="releaseYear" type="number"  :min="1900" :max="2099" :step="1" :modelValue="releaseYear" @update:modelValue="newValue => releaseYear = newValue")
        .product-form-input-v2
            label.cost-label Price: 
            PrimaryInput(placeholder="25" type="number" :modelValue="price" name="price" @update:modelValue="newValue => price = newValue")
        .product-form-input-container
            .product-form-input-box
                h4.title Dimensions:
                .product-form-input
                    .product-form-input-item(v-for="(item,index) in dimensions" :key="'x'+index+item")
                        label(:for="'dimension'+item+index") {{ item }}
                        input(type="checkbox" :name="'dimension'+item+index" :value="item" v-model="selectedDimensions")
            .product-form-input-box
                h4.title Sizes:
                .product-form-input
                    .product-form-input-item(v-for="(item,index) in sizes" :key="'y'+index+item")
                        label(:for="'size'+item+index") {{ item }}
                        input(type="checkbox" :name="'size'+item+index" :value="item" v-model="selectedSizes")
            .product-form-input-box
                h4.title Stock Situation:
                .product-form-input
                    .product-form-input-item(v-for="(item, index) in stock" :key="index+item")
                        label(:for="'stock'+item") {{ item ? 'Yes' : 'No' }}
                        input(type="radio" v-model="selectedStockSituation" :name="'stock'+item" :value="item")
        .product-form-input-box
            h4.title Detail:
            PrimaryTextarea(style="margin-top: 1rem" :modelValue="detail" placeholder="Detail..." @update:modelValue="newValue => detail = newValue")
        FilledButton(content="Submit" :isRightArrow="false" type="submit")
        
</template>
<script>
import IconButton from '../../icon-button.vue'
import PrimaryTextarea from '../../primary-textarea.vue'
import PrimaryInput from '../../primary-input.vue'
import OutlinedInput from '../../outlined-textarea.vue'
import FilledButton from '../../filled-button.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
    name: "ContactDialog",
    props: {
        productItem: {
            type: Object,
            required: true
        },
        handleClose: {
            type: Function,
            required: true
        },
        isCreatingProduct: {
            type: Boolean,
            default: false
        }
    },
    components: {
        IconButton,
        PrimaryInput,
        PrimaryTextarea,
        OutlinedInput,
        FilledButton
    },
    setup(props) {
        const store = useStore()
        const productItem = props.productItem
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dimensions = ['S', '55', 'M', '58', 'L', '61', 'XL', '64', 'XXL', '67'];
        const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
        const stock = [true, false];

        const selectedDimensions = ref(productItem.dimensions);
        const selectedSizes = ref(productItem.sizes);
        const releaseYear = ref(productItem.releaseYear.toString());
        const releaseMonth = ref(productItem.releaseMonth.toString());
        const price = ref(productItem.price.toString());
        const selectedStockSituation = ref(productItem.inStock);
        const detail = ref(productItem.detail);

        const handleFileUpload = (e) => console.log(e);

        const handleStockSituation = (event) => {
            console.log(event.target.checked)
            selectedStockSituation.value = event
        }

        const handleSubmit = async (e) => {
            if (props.isCreatingProduct) {
                const createdProduct = await store.dispatch('createProduct', {
                    name: 'Hello World',
                    dimensions: selectedDimensions.value,
                    sizes: selectedSizes.value,
                    releaseYear: releaseYear.value,
                    releaseMonth: releaseMonth.value,
                    price: price.value,
                    inStock: selectedStockSituation.value,
                    detail: detail.value,
                    imageSrc: [
                        {
                            image: require('@/assets/Untitled.png'),
                            alt: 'Image 1',
                        },
                        {
                            image: require('@/assets/Untitled.png'),
                            alt: 'Image 1',
                        },
                    ],
                })
                if (createdProduct === true)
                    props.handleClose()
            } else {
                const updatedProduct = await store.dispatch('updateProduct', {
                    _id: productItem._id,
                    name: 'Hello World',
                    dimensions: selectedDimensions.value,
                    imageSrc: [
                        {
                            image: require('@/assets/Untitled.png'),
                            alt: 'Image 1',
                        },
                        {
                            image: require('@/assets/Untitled.png'),
                            alt: 'Image 1',
                        },
                    ],
                    sizes: selectedSizes.value,
                    releaseYear: releaseYear.value,
                    releaseMonth: releaseMonth.value,
                    price: price.value,
                    inStock: selectedStockSituation.value,
                    detail: detail.value,
                    
                })
                if (updatedProduct === true)
                    props.handleClose()
            }

        }
        return {
            handleFileUpload,
            dimensions,
            sizes,
            selectedDimensions,
            handleStockSituation,
            selectedStockSituation,
            selectedSizes,
            handleSubmit,
            months,
            releaseYear,
            releaseMonth,
            price,
            detail,
            stock
        }
    }
}
</script>
<style lang="css">
.title {
    margin: 0;
}

.cost-label {
    font-weight: 500;
}

.submit-input {
    display: flex;
    justify-content: center;
}

.month-selection {
    border: 2px solid var(--bg-color-secondary);
    color: var(--bg-color-primary);
    outline: none;
}

.month-selection:focus {
    border: 2px solid var(--bg-color-primary);
}

.product-form-input-box {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.product-edit-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.product-form-input-v2 {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.product-form-input-container {
    display: flex;
    gap: 2rem;
}

.close-button-box {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.product-form-input-item {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    align-items: center;
    flex-direction: row-reverse;
}

.product-edit-container {
    background-color: white;
    border-radius: 0.5rem;
    max-width: 40rem;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 1rem 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
}

input[type="checkbox"] {
    display: grid;
    place-content: center;
    width: 0.75em;
    height: 0.75em;
}

input[type="checkbox"]::before {
    content: "";
    width: 0.75em;
    height: 0.75em;
    transform: scale(0);
    border-radius: 0.15em;
    box-shadow: inset 1em 1em var(--bg-color-primary);
    background-color: white;
}

input[type="checkbox"]:checked::before {
    transform: scale(1);
}

input[type='radio']:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: #d1d3d1;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
}

input[type='radio']:checked:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: var(--bg-color-primary);
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
}
</style>