<template lang="pug">
.contact-container
    .form-container 
        h2#form-title Fill out the form and we will#[br]be in touch.
        form(@submit.prevent="handleSubmit")
            .form-inputs
                OutlinedInput(placeholder="NAME(required)" type="text" :modelValue="name" name="name" @update:modelValue="newValue => name = newValue")
                OutlinedInput(placeholder="EMAİL(required)" type="email" :modelValue="email" name="email" @update:modelValue="newValue => email = newValue")
                OutlinedTextarea(placeholder="MESSAGE(required)" :modelValue="detail" name="detail" @update:modelValue="newValue => detail = newValue")
                FilledButton(content="Contact us " type="submit")

</template>
<script>
import { ref, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import OutlinedInput from '../components/outlined-input.vue';
import OutlinedTextarea from '../components/outlined-textarea.vue';
import FilledButton from '../components/filled-button.vue';
export default {
    name: "Contact",
    props: {
        logoSize: {
            type: Boolean,
            required: true
        }
    },
    components: {
        OutlinedInput,
        OutlinedTextarea,
        FilledButton
    },
    setup(props) {
        const store = useStore();
        const name = ref('');
        const email = ref('');
        const detail = ref('');
        const handleSubmit = () => {
            store.dispatch('createContact', {
                name: name.value,
                email: email.value,
                message: detail.value
            })
        }
        return {
            name,
            email,
            detail,
            handleSubmit
        }
    }
}
</script>
<style lang="css">
.contact-container {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
}

#form-title {
    font-size: 36px;
    font-weight: 500;
    line-height: 43px;
    letter-spacing: 0em;
    text-align: left;
    color: #FF4D00;
}

.form-container {
    position: relative;
    right: 204px;
    top: 130px
}

.form-inputs {
    display: flex;
    flex-direction: column;
    gap: 11px;
}
</style>