<template lang="pug">
.sign-in-container
    .form-container-sign-in
        h2#form-title Sign in to manage your#[br]orders or sign up :)
        form
            .form-inputs
                OutlinedInput(placeholder="EMAIL(required)" type="text" :modelValue="email" @update:modelValue="newValue => email = newValue")
                OutlinedInput(placeholder="PASSWORD(required)" type="password" :modelValue="password" @update:modelValue="newValue => password = newValue")
                .sign-in-buttons 
                    FilledButton(content="Sign in " :handleOpen="handleLogin") 
                    router-link(to="/sign-up")
                        OutlinedButton(content="Create a new account")
</template>
<script>
import { ref, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import OutlinedButton from '../components/outlined-button.vue';
import OutlinedInput from '../components/outlined-input.vue';
import OutlinedTextarea from '../components/outlined-textarea.vue';
import FilledButton from '../components/filled-button.vue';
import { useRouter } from 'vue-router';
export default {
    name: "SignIn",
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
        const store = useStore();
        const email = ref(null);
        const password = ref(null);
        const router = useRouter()

        const handleLogin = async (e) => {
            await store.dispatch('login', {
                email: email.value,
                password: password.value
            })
            if (store.state.user !== null) {
                router.push('/products')
            } else {
                store.dispatch('handleErrorMessage', 'Login is failed!')
            }
        }
        return {
            email,
            password,
            handleLogin
        }
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