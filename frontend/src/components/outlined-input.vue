<template lang="pug">
div.input-container
    input.input-text(:placeholder="placeholder" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)")
    div
</template>
<script>
export default {
    name: "OutlinedInput",
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
    },
    emits: ['update:modelValue']
}
</script>
<style lang="css">
.input-text {
    width: 443px;
    height: 34px;
    border: none;
    border-bottom: 3px solid #F5D5C6;
    padding: 6px 0px 8px 5px;
    box-sizing: border-box;
    color: #FF4D00;
    font-size: 21px;
    line-height: 28.8px;
}

.input-text::placeholder {
    font-size: 21px;
    color: #F5D5C6;
    line-height: 28.8px;
}

.input-text+div {
    content: "";
    width: 0;
    display: block;
    height: 3px;
    background-color: #FF4D00;
    transition: all 0.3s ease-in;
    position: relative;
    top: -3px;
}

.input-text:focus {
    outline: none;
}

.input-text:focus+div {
    width: 443px;
}

@media (max-width: 600px) {
    .input-text::placeholder {
        font-size: 1.25rem;
        line-height: 1.25rem;
    }

    .input-text {
        width: 100%;
    }

    .input-text:focus+div {
        width: 100%;
    }
}</style>