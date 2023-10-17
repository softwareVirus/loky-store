<template lang="pug">
.error-message-container(:class="isOpen ? 'open-error-message' : ''") 
    .error-message-content {{ content }}
    .error-message__close 
        IconButton(:isCloseButton="true" className="no-bgcolor" :handleClose="handleClose")
</template>
<script>
import { computed, watch } from 'vue';
import IconButton from './icon-button.vue';
import { useStore } from 'vuex';
export default {
    name: 'ErrorMessage',
    components: {
        IconButton
    },
    setup() {
        const store = useStore()
        const isOpen = computed(() => store.state.isErrorMessageOpen)
        const content = computed(() => store.state.errorMessage)
        const handleClose = () => {
            store.state.isErrorMessageOpen = false
        }
        let interval = null
        watch(() => store.state.isErrorMessageOpen, (newValue, oldValue) => {
            console.log(newValue)
            if(newValue === false && interval !== null) {
                clearInterval(interval)    
            } else {
                interval = setInterval(() => {
                    if(store.state.isErrorMessageOpen)
                        store.state.isErrorMessageOpen = false
                }, 10000)
            }
        })
        return {
            isOpen,
            content,
            handleClose
        }
    }
}
</script>
<style lang="css">
.error-message-container {
    display: none;
    transition: all 0.3s ease-in;
}

.open-error-message {
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: 0.5rem;
    box-shadow: inset;
    background-color: #cc0000;
    color: white;
    position: absolute;
    bottom: 1rem;
    left: 1rem;
}
.error-message__close {
    background-color: white;
    width: 3rem;
    height: 3rem;
    border-radius: 4rem;
    display: flex;
    padding: 0.25rem;
    box-sizing: border-box;
    justify-content: center;
}
</style>