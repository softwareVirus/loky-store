<template lang="pug">
.product-edit-container
    .close-button-box
        IconButton(:isCloseButton="true" className="no-bgcolor" :handleClose="handleClose")
    form.product-edit-form(@submit.prevent="handleSubmit")
        .product-form-input-v2
            label.cost-label Release Month: 
            select.month-selection(v-model="releaseMonth")
                option(v-for="item in months" :key="uniqueID()" :value="item") {{ item }}
            p {{ releaseMonth }}
        .product-form-input-v2
            label.cost-label Release Year:
            PrimaryInput(placeholder="1970" name="releaseYear" type="number"  min="1900" max="2099" step="1" :value="releaseYear")
        .product-form-input-v2
            label.cost-label Price: 
            PrimaryInput(placeholder="25" type="number" :value="price" name="price")
        .product-form-input-container
            .product-form-input-box
                h4.title Dimensions:
                .product-form-input
                    .product-form-input-item(v-for="(item,index) in dimensions" :key="uniqueID()")
                        label(:for="'dimension'+item+index") {{ item }}
                        input(type="checkbox" :name="'dimension'+item+index" :checked="selectedDimensions.includes(item)")

            .product-form-input-box
                h4.title Sizes:
                .product-form-input
                    .product-form-input-item(v-for="(item,index) in sizes" :key="uniqueID()")
                        label(:for="'size'+item+index") {{ item }}
                        input(type="checkbox" :name="'size'+item+index" :checked="selectedSizes.includes(item)")
            .product-form-input-box
                h4.title Stock Situation:
                .product-form-input
                    .product-form-input-item(v-for="(item, index) in stock" :key="uniqueID()")
                        label(:for="'stock'+item") {{ item }}
                        input(type="checkbox" v-model="selectedStockSituation" :checked="selectedStockSituation == item" :name="'stock'+item" @change="() => handleStockSituation(item)")
        .product-form-input-box
            h4.title Detail:
            PrimaryTextarea(style="margin-top: 1rem" :value="productItem.detail")
        div.submit-input
            FilledButton(content="Submit" :isRightArrow="false" type="submit" :handleOpen="() => {}")
        
</template>
<script>
import IconButton from '../../icon-button.vue'
import PrimaryTextarea from '../../primary-textarea.vue'
import PrimaryInput from '../../primary-input.vue'
import OutlinedInput from '../../outlined-textarea.vue'
import FilledButton from '../../filled-button.vue'
import { ref } from 'vue'
import { uniqueID } from '@/utils/utils'

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
        const productItem = props.productItem
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dimensions = ref(['S', '55', 'M', '58', 'L', '61', 'XL', '64', 'XXL', '67']);
        const selectedDimensions = ref(productItem.dimensions)
        const selectedSizes = ref(productItem.size)
        const sizes = ref(['S', 'M', 'L', 'XL', 'XXL'])
        const stock = ref([true, false])
        const releaseYear = ref(productItem.releaseYear.toString())
        const releaseMonth = ref(productItem.releaseMonth.toString())
        const price = ref(productItem.price.toString())
        const selectedStockSituation = ref(productItem.inStock)

        const handleFileUpload = (e) => console.log(e);
        const handleStockSituation = (event) => {
            console.log(event.target.checked)
            selectedStockSituation.value = event
        }

        const handleSubmit = (e) => {
            console.log(e, releaseMonth.value, releaseYear.value, e.target.releaseYear.value)
            sizes.value.forEach((item, index) => {
                console.log(e.target['size' + item + index].checked)
            })
        }
        return {
            handleFileUpload,
            dimensions,
            sizes,
            selectedDimensions,
            uniqueID,
            handleStockSituation,
            selectedStockSituation,
            selectedSizes,
            handleSubmit,
            months,
            releaseYear,
            releaseMonth,
            price,
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
</style>