<template lang="pug">
.user-container
    .close-button-box
        IconButton(:isCloseButton="true" className="no-bgcolor" :handleClose="handleClose")
    .user-info-box
        h3 Name: 
        p.user-user {{ user.firstName + " " + user.lastName }}
    .user-info-box
        h3 Email: 
        p.user-user {{ user.email }}
    .user-info-box
        h3 Admin Situation: 
        p.user-user {{ user.isAdmin ? 'Yes' : 'No' }}
    
</template>
<script>
import IconButton from '../../icon-button.vue'
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    name: "userDialog",
    props: {
        userId: {
            type: String,
            required: true
        },
        handleClose: {
            type: Function,
            required: true
        }
    },
    components: {
        IconButton
    },
    async setup(props) {
        const store = useStore()
        console.log(props.userId)
        const user = await store.dispatch('fetchUser', props.userId)
        console.log(user)
        return {
            user
        }
    }
}
</script>
<style lang="css">
    
.user-user {
    overflow-wrap: break-word;
    tab-size: 2;
}

.user-info-box>h3,
.user-info-box>p {
    margin: 0;
}

.user-info-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.user-info-box-vertical {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
}

.user-container {
    background-color: white;
    border-radius: 0.5rem;
    max-width: 30vw;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.user-container>h3 {
    margin: 0;
}

.close-button-box {
    display: flex;
    justify-content: flex-end;
}
</style>