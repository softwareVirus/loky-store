<template lang="pug">
.sign-in-container
    .form-container-sign-in
        h2#form-title Sign up to order :)
        form
            .form-inputs
                OutlinedInput(placeholder="FIRST NAME(required)" type="text")
                OutlinedInput(placeholder="LAST NAME(required)" type="text")
                OutlinedInput(placeholder="EMAIL(required)" type="text")
                OutlinedInput(placeholder="PASSWORD(required)" type="password")
                .sign-in-buttons 
                    FilledButton(content="Sign up ") 
</template>
<script>
import { ref,onUnmounted } from 'vue'
import { useStore } from 'vuex'
import OutlinedButton from '../components/outlined-button.vue';
import OutlinedInput from '../components/outlined-input.vue';
import OutlinedTextarea from '../components/outlined-textarea.vue';
import FilledButton from '../components/filled-button.vue';
export default {
    name: "SignUp",
    props: {
        logoSize: {
            type: Boolean,
            required: true
        }
    },
    components: {
        OutlinedInput,
        OutlinedTextarea,
        FilledButton,
        OutlinedButton
    },
    setup(props) {
    }
}
</script>
<style lang="css">
.sign-in-container {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
}

#form-title {
    font-size: 36px;
    font-weight: 500;
    line-height: 43px;
    letter-spacing: 0em;
    text-align: left;
    color: #FF4D00;
}
.form-container-sign-in {
    margin-top: 200px;
}
.form-inputs {
    display: flex;
    flex-direction: column;
    gap: 11px;
}

.sign-in-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
}
</style>