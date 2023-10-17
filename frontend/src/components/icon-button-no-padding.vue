<template lang="pug">
button.icon-button-v2(@click.prevent="handleClick") 
    PlusIcon(color="#ff4d00" v-if="isPlusIcon")
    MinusIcon(color="#ff4d00" v-else)
</template>
<script>
import PlusIcon from './order-card/plus-icon.vue';
import MinusIcon from './order-card/minus-icon.vue';
export default {
    name: "IconButtonNoPadding",
    props: {
        isPlusIcon: {
            type: Boolean,
            default: false
        },
        refValue: {
            type: Array,
            required: false
        },
        updateRefValue: {
            type: Function,
            default: () => { }
        },
        index: {
            type: Number,
            required: false
        }
    },
    components: {
        PlusIcon,
        MinusIcon
    },
    setup(props, { emit }) {
        const handleClick = () => {
            let list = []
            if (props.isPlusIcon) {
                list = props.refValue.map((item, index) => {
                    if (index === props.index) {
                        item.quantity += 1
                    }
                    return item
                })
            } else {
                list = props.refValue.map((item, index) => {
                    if (index === props.index) {
                        item.quantity -= 1
                    }
                    return item
                }).filter(item => item.quantity > 0)
            }
            console.log(list)
            emit('updateRefValue', Array.isArray(list) ? list : [])
        }
        return {
            handleClick
        }
    }
}
</script>
<style lang="css">
.icon-button-v2 {
    background-color: white;
    border: none;
    padding: 0;
    cursor: pointer;
    height: 1.5rem;
    transition: all 0.1s ease-in;
}

.icon-button-v2:hover {
    background-color: rgb(231 231 231);
}
</style>