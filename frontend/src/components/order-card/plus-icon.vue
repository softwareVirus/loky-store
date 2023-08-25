<template lang="html">
  <svg :class="className" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 18V6" :stroke="color" stroke-width="1.5" />
    <path d="M6 12H18" :stroke="color" stroke-width="1.5" />
  </svg>
</template>
<script>
export default {
  name: 'PlusIcon',
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
<style lang="css">
.close-icon {
  transform: rotateZ(45deg);
}
</style>
