<template lang="pug">
div#minimap-container
    .products-container(
        ref="dragWrapperList"
        style="width: fit-content !important"
        @click="clickMinimap"
        @wheel="handleWheel"
      )
        ProductQuarter
        ProductQuarter
        ProductQuarter
        ProductQuarter
        ProductQuarter
        ProductQuarter
        ProductQuarter
        ProductQuarter
    #custom-rectangle-scrollbar(
        @mousedown="startDrag"
        @mousemove="handleDrag"
        @mouseup="endDrag"
        @wheel="handleWheel"
        @mouseleave="endDrag"
        ref="dragWrapper"
    )
</template>

<script>
import ProductQuarter from './product-quarter.vue'
import { ref, reactive, onMounted } from 'vue'
export default {
  name: 'ProductListMinimap',
  components: {
    ProductQuarter,
  },
  props: {
    getRef: {
      type: Function,
      default: () => {},
    },
    startDrag: {
      type: Function,
      default: () => {},
    },
    handleDrag: {
      type: Function,
      default: () => {},
    },
    endDrag: {
      type: Function,
      default: () => {},
    },
    clickMinimap: {
      type: Function,
      default: () => {},
    },
    handleWheel: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const dragWrapper = ref(null)
    const dragWrapperList = ref(null)
    const items = reactive([
      { id: 1, text: 'Item 1' },
      { id: 2, text: 'Item 2' },
      { id: 3, text: 'Item 3' },
      // Add more items as needed
    ])
    const updateScrollLeft = value => {
      console.log(value)
      dragWrapper.value.style.marginLeft = value.target.scrollLeft / 5 + 'px'
    }

    onMounted(() => {
      props.getRef(dragWrapper.value, dragWrapperList.value)
    })
    return {
      items,
      dragWrapper,
      dragWrapperList,
      updateScrollLeft,
    }
  },
}
</script>
<style lang="css">
#minimap-container {
  height: 162px;
}

.minimap .products-container {
  gap: 4.8px !important;
  margin: 50px auto 0 !important;
  width: auto !important;
  user-select: none;
}

.products-container {
  display: flex;
  gap: 24px;
  margin-left: 32px;
  position: relative;
  top: 37px;
  width: calc(100% - 32px);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.products-container::-webkit-scrollbar {
  display: none;
}
</style>
