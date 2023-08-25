<template lang="html">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 12H18" :stroke="color" stroke-width="1.5" />
  </svg>
</template>
<script>
export default {
  name: 'MinusIcon',
  props: {
    color: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ""
    }
  }
}
</script>
<style lang=""></style>
