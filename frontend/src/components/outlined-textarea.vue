<template lang="pug">
.textarea-container 
    textarea.outlined-textarea(:placeholder="placeholder" :style="style" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)")
    div
</template>
<script>
export default {
    name: 'OutlinedTextarea',
    props: {
        placeholder: {
            type: String,
            required: true
        },
        style: {
            type: String,
            default: ''
        },
        modelValue: {
            type: String,
            default: ""
        },

    }
}
</script>
<style lang="css">
.outlined-textarea {
    width: 438px;
    height: 150px;
    border: none;
    border-bottom: 3px solid #F5D5C6;
    padding: 6px 0px 8px 5px;
    box-sizing: border-box;
    color: #FF4D00;
    font-size: 21px;
    line-height: 28.8px;
    resize: none;
}

.outlined-textarea::placeholder {
    font-size: 21px;
    color: #F5D5C6;
    line-height: 28.8px;
}

.outlined-textarea+div {
    content: "";
    width: 0;
    display: block;
    height: 3px;
    background-color: #FF4D00;
    transition: all 0.3s ease-in;
    position: relative;
    top: -7px;
}

.outlined-textarea:focus {
    outline: none;
}

.outlined-textarea:focus+div {
    width: 443px;
}

@media (max-width: 600px) {
    .outlined-textarea {
        width: 100%;
    }

    .outlined-textarea::placeholder {
        font-size: 1.25rem;
        color: #F5D5C6;
        line-height: 1.25rem;
    }

    .outlined-textarea:focus+div {
        width: 100%;
    }
}
</style>