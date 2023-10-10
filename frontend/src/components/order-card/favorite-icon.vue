<template lang="html">
  <svg v-if="!isFilled" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.4999 11.5L11.9999 18L5.49989 11.5C4.11918 10.1193 4.11918 7.88072 5.49989 6.50001C6.8806 5.1193 9.11918 5.1193 10.4999 6.50001L11.9999 8.00001L13.4999 6.50001C14.8806 5.1193 17.1192 5.1193 18.4999 6.50001C19.8806 7.88072 19.8806 10.1193 18.4999 11.5Z"
      stroke="#FF4D00" stroke-opacity="0.5" stroke-width="1.5" />
  </svg>
  <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.4999 11.4999L11.9999 17.9999L5.49989 11.4999C4.11918 10.1192 4.11918 7.8806 5.49989 6.49989C6.8806 5.11918 9.11918 5.11918 10.4999 6.49989L11.9999 7.99989L13.4999 6.49989C14.8806 5.11918 17.1192 5.11918 18.4999 6.49989C19.8806 7.8806 19.8806 10.1192 18.4999 11.4999Z"
      fill="#FF4D00" stroke="#FF4D00" stroke-width="1.5" />
  </svg>
</template>
<script>
export default {
  name: 'FavoriteIcon',
  props: {
    isFilled: {
      type: Boolean,
      required: false
    }
  },
  setup(props) {
    console.log(props.isFilled)
  }
}
</script>
<style lang=""></style>
