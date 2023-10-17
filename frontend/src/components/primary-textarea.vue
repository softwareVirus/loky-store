<template lang="pug">
textarea.primary-textarea(:placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)")
</template>
<script>
export default {
    name: "PrimaryTextarea",
    props: {
        placeholder: {
            type: String,
            required: true
        },
        modelValue: {
            type: String,
            default: ""
        },
    },
    emits: ['update:modelValue']
}
</script>
<style lang="css">
.primary-textarea {
    border: 2px solid var(--bg-color-secondary);
    padding: 0.25rem;
    color: var(--bg-color-primary);
    width: 100%;
    min-height: 10rem;
    resize: none;
}

.primary-textarea::placeholder {
    color: var(--bg-color-secondary);
}

.primary-textarea:focus {
    border: 2px solid var(--bg-color-primary) !important;
    outline: none;
}
</style>