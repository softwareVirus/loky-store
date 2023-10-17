<template lang="pug">
.sign-up-container
    .form-container-sign-up
        h2#form-title Sign up to order :)
        form
            .form-inputs
                OutlinedInput(placeholder="FIRST NAME(required)" type="text" :modelValue="firstName" @update:modelValue="newValue => firstName = newValue")
                OutlinedInput(placeholder="LAST NAME(required)" type="text" :modelValue="lastName" @update:modelValue="newValue => lastName = newValue")
                OutlinedInput(placeholder="EMAIL(required)" type="text" :modelValue="email" @update:modelValue="newValue => email = newValue")
                OutlinedInput(placeholder="PASSWORD(required)" type="password" :modelValue="password" @update:modelValue="newValue => password = newValue")
                .sign-in-buttons 
                    FilledButton(content="Sign up " :handleOpen="handleCreateUser") 
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
        const store = useStore();
        const router = useRouter();
        const firstName = ref(null)
        const lastName = ref(null)
        const email = ref(null)
        const password = ref(null)
        const handleCreateUser = async (e) => {
            try {
                console.log({
                    firstName,
                    lastName,
                    email,
                    password
                })
                const reponse = await store.dispatch('createUser', {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: email.value,
                    password: password.value
                })
                console.log(store.state.user)
                if (store.state.user !== null) {
                    router.push('/products')
                }
                console.log(reponse)
            } catch (e) {
                console.log(e)
                store.dispatch('handleErrorMessage', e.message)
            }
        }
        return {
            firstName,
            lastName,
            email,
            password,
            handleCreateUser
        }
    }
}
</script>
<style lang="css">
.sign-up-container {
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

.form-container-sign-up {
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


@media (max-width: 1020px) {
    .form-container-sign-up {
        width: 80%;
    }
    .sign-up-container {
        justify-content: flex-start;
        padding: 0 3rem;
    }
}

@media (max-width: 600px) {
    #form-title {
        font-size: 1.5rem;
        line-height: 2rem;
    }
    .form-container-sign-up {
        width: 100%;
    }
    .sign-up-container {
        justify-content: flex-start;
        padding: 0;
        width: 90%;
    }
}
</style>