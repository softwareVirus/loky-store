<template lang="pug">
router-link#text-button(:to="direction" :class="disabled ? 'disabled' : ''") {{buttonContent}}
</template>
<script>
export default {
  name: 'TextButton',
  props: {
    buttonContent: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
}
</script>
<style lang="css">
.minimap #text-button {
  line-height: 4.4px;
  font-size: 2.8px;
}
#text-button {
  color: inherit;
  line-height: 22px;
  font-size: 14px;
  text-decoration: none;
}
.disabled {
  pointer-events: none;
  cursor: default;
}
</style>
