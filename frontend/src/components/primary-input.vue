<template lang="pug">
input.primary-input(v-if="min === undefined" :style="style" :name="name" :placeholder="placeholder" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" autocomplete="off")
input.primary-input(v-else :min="min" :max="max" :name="name" :style="style" :placeholder="placeholder" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" autocomplete="off")
</template>
<script>
export default {
    name: "PrimaryInput",
    props: {
        placeholder: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        modelValue: {
            type: String,
            default: ""
        },
        min: {
            type: Number,
            required: false,
            default: undefined
        },
        max: {
            type: Number,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        style: {
            type: String,
            default: ""
        }
    },
    emits: ['update:modelValue'] 
}
</script>
<style lang="css">
.primary-input {
    border: 2px solid var(--bg-color-secondary);
    padding: 0.25rem;
    color: var(--bg-color-primary);
}

.primary-input::placeholder {
    color: var(--bg-color-secondary);
}

.primary-input:focus {
    border: 2px solid var(--bg-color-primary) !important;
    outline: none;
}
</style>