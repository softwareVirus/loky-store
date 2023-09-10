<template lang="pug">
input.primary-input(v-if="min === undefined" :name="name" :placeholder="placeholder" :type="type" :value="value")
input.primary-input(v-else :min="min" :max="max" :name="name" :placeholder="placeholder" :type="type" :value="value")
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
        value: {
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
    },
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