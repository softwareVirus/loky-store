<template lang="pug">
textarea.primary-textarea(v-if="min === undefined" :placeholder="placeholder" :value="value")
textarea.primary-textarea(v-else :min="min" :max="max" :placeholder="placeholder" :type="type" :value="value")
</template>
<script>
export default {
    name: "PrimaryTextarea",
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
        }
    }
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