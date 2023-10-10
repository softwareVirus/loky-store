
<template lang="pug">
button(:class="selectedClass.concat(' dimension-button' + (isSizesButton ? ' size-button' : ''))" @click="() => handleClickEvent(index)" :disabled="disabled") {{content}}
</template>
<script>
export default {
  name: 'DimensionButton',
  props: {
    content: {
      type: String,
      required: true,
    },
    selectedClass: {
      type: String,
      required: true,
    },
    clickButton: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    isSizesButton: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false
    },
    refValue: {
      type: String,
      default: null
    },
    updateRefValue: {
      type: Function,
      default: () => { }
    }
  },
  setup(props, { emit }) {
    const handleClickEvent = (index) => {
      emit('updateRefValue', props.refValue === props.content ? null : props.content)
      props.clickButton(index)
    }
    return {
      handleClickEvent
    }
  }
}
</script>
<style lang="css">
.dimension-button {
  height: 33.17px;
  width: 33.17px;
  border: 0.7px solid var(--bg-textColor-thirth);
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  font-size: 12px;
  line-height: 14.4px;
  color: var(--bg-textColor-secondary);
  box-sizing: border-box;
  cursor: pointer;
}

.active {
  box-sizing: content-box;
  border-color: #ff4d00e5;
  color: #ff4d00e5;
  background-color: #ff4d0080;
  padding: 0;
}

.size-button {
  height: 36px !important;
  width: 36px !important;
  border-width: 1px !important;
}

.dimension-button:disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
