<template lang="pug">
.contact-container
    .close-button-box
        IconButton(:isCloseButton="true" className="no-bgcolor" :handleClose="handleClose")
    .contact-info-box
        h3 Name: 
        p.contact-user {{ contactItem.name }}
    .contact-info-box        
        h3 Email: 
        p.contact-user {{ contactItem.email }}
    h3 Content: 
    p.contact-user(style="text-indent: 3em; margin: 0;") {{contactItem.message }}
</template>
<script>
import IconButton from '../../icon-button.vue'

export default {
    name: "ContactDialog",
    props: {
        contactItem: {
            type: Object,
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
}
</script>
<style lang="css">
    
.contact-user {
    overflow-wrap: break-word;
    tab-size: 2;
}

.contact-info-box>h3,
.contact-info-box>p {
    margin: 0;
}

.contact-info-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.contact-container {
    background-color: white;
    border-radius: 0.5rem;
    max-width: 30vw;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact-container>h3 {
    margin: 0;
}

.close-button-box {
    display: flex;
    justify-content: flex-end;
}
</style>