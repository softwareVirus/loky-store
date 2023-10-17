<template lang="pug">
.user-edit-container
    .close-button-box
        IconButton(:isCloseButton="true" className="no-bgcolor" :handleClose="handleClose")
    form.user-edit-form(@submit.prevent="handleSubmit")
        .user-form-input-v2
            label.cost-label First Name:
            PrimaryInput(placeholder="Name" type="text" :modelValue="firstName" @update:modelValue="newValue => firstName = newValue")
        .user-form-input-v2
            label.cost-label Last Name: 
            PrimaryInput(placeholder="Last Name" type="text" :modelValue="lastName" @update:modelValue="newValue => lastName = newValue")
        .user-form-input-v2
            label.cost-label Email: 
            PrimaryInput(placeholder="Email" type="text" :modelValue="email" @update:modelValue="newValue => email = newValue" style="width: 14rem")
        .user-form-input-box
            h4.title Admin Situation:
            .user-form-input
                .user-form-input-item(v-for="(item, index) in [true, false]" :key="'13x'+item")
                    label(:for="'isAdmin'+item") {{ item ? 'Yes' : 'No' }}
                    input(type="radio" v-model="selectedIsAdmin" :name="'isAdmin'+item" :value="item")
        FilledButton(content="Submit" :isRightArrow="false" type="submit")
        
</template>
<script>
import IconButton from '../../icon-button.vue'
import PrimaryTextarea from '../../primary-textarea.vue'
import PrimaryInput from '../../primary-input.vue'
import OutlinedInput from '../../outlined-textarea.vue'
import FilledButton from '../../filled-button.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
    name: "ContactDialog",
    props: {
        userItem: {
            type: Object,
            required: true
        },
        handleClose: {
            type: Function,
            required: true
        }
    },
    components: {
        IconButton,
        PrimaryInput,
        PrimaryTextarea,
        OutlinedInput,
        FilledButton
    },
    setup(props) {
        const userItem = props.userItem
        
        const firstName = ref(userItem.firstName);
        const lastName = ref(userItem.lastName)
        const email = ref(userItem.email)
        const selectedIsAdmin = ref(userItem.isAdmin)
        const store = useStore()

        const handleFileUpload = (e) => console.log(e);
        
        const handleIsAdmin = (event) => {
            selectedIsAdmin.value = event
        }
        const handleSubmit = async (e) => {
            const result = await store.dispatch('updateUser', {
                _id: userItem._id,
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                isAdmin: selectedIsAdmin.value
            })
            if(result < 400)
                props.handleClose()
        }
        return {
            handleFileUpload,
            handleIsAdmin,
            handleSubmit,
            firstName,
            lastName,
            email,
            selectedIsAdmin
        }
    }
}
</script>
<style lang="css">
.title {
    margin: 0;
}

.cost-label {
    font-weight: 500;
}

.submit-input {
    display: flex;
    justify-content: center;
}

.month-selection {
    border: 2px solid var(--bg-color-secondary);
    color: var(--bg-color-primary);
    outline: none;
}

.month-selection:focus {
    border: 2px solid var(--bg-color-primary);
}

.user-form-input-box {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.user-edit-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.user-form-input-v2 {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.user-form-input-container {
    display: flex;
    gap: 2rem;
}

.close-button-box {
    display: flex;
    justify-content: flex-end;
    width: 100%;
}

.user-form-input-item {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    align-items: center;
    flex-direction: row-reverse;
}

.user-edit-container {
    background-color: white;
    border-radius: 0.5rem;
    max-width: 40rem;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 1rem 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
}

input[type="checkbox"] {
    display: grid;
    place-content: center;
    width: 0.75em;
    height: 0.75em;
}

input[type="checkbox"]::before {
    content: "";
    width: 0.75em;
    height: 0.75em;
    transform: scale(0);
    border-radius: 0.15em;
    box-shadow: inset 1em 1em var(--bg-color-primary);
    background-color: white;
}

input[type="checkbox"]:checked::before {
    transform: scale(1);
}

input[type='radio']:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: #d1d3d1;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
}

input[type='radio']:checked:after {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    top: -2px;
    left: -1px;
    position: relative;
    background-color: var(--bg-color-primary);
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid white;
}
</style>