<template lang="pug">
#product-map-container 
    ProductList(:getRef="getRef" )
    .minimap 
        ProductListMinimap(
            :getRef="getRef" 
            :handleWheel="handleWheel"
            :startDrag="startDrag" 
            :handleDrag="handleDrag" 
            :endDrag="endDrag" 
            :clickMinimap="clickMinimap"
        )
</template>
<script>
import ProductList from '../components/product-list.vue';
import ProductListMinimap from '../components/product-list-minimap.vue'
import { ref, reactive } from 'vue'
export default {
    name: "Products",
    components: {
        ProductList,
        ProductListMinimap
    },
    setup() {
        const dragWrapper = ref(null);
        const dragWrapperList = ref(null);
        const dragWrapperCarousel = ref(null);
        const items = reactive([
            { id: 1, text: 'Item 1' },
            { id: 2, text: 'Item 2' },
            { id: 3, text: 'Item 3' },
            // Add more items as needed
        ]);
        const getRef = (ref1,ref2) => {
            if(ref2 !== undefined) {
                dragWrapper.value = ref1
                dragWrapperList.value = ref2
            } else {
                dragWrapperCarousel.value = ref1
            }
        }
        let isDrag = false;
        const startDrag = (e) => {
            isDrag = true;
        }
        const handleDrag = (e) => {
            if(!isDrag) return;
            const screenX = e.view.innerWidth;
            const MouseFromPageEdgeX = e.clientX;
            const MinimapRectangleMinimapX = dragWrapper.value.offsetWidth
            const divWidth = dragWrapperList.value.clientWidth;
            const MarginLeft = (screenX-divWidth)/2;
            const MouseFromBeginOfDivX = MouseFromPageEdgeX - MarginLeft;
            if(MouseFromBeginOfDivX+10 >= MinimapRectangleMinimapX/2 && divWidth - MinimapRectangleMinimapX/2 > MouseFromBeginOfDivX) {
                dragWrapper.value.style.marginLeft = (MouseFromBeginOfDivX - MinimapRectangleMinimapX/2)+"px";
                dragWrapperCarousel.value.scrollLeft = ((MouseFromBeginOfDivX - MinimapRectangleMinimapX/2)*5)
                console.log(divWidth,MinimapRectangleMinimapX)
            } else if(MouseFromBeginOfDivX+10 < MinimapRectangleMinimapX/2) {
                dragWrapper.value.style.marginLeft = "0px";
                dragWrapperCarousel.value.scrollLeft = 0
            } else {
                console.log(divWidth,MinimapRectangleMinimapX)
                dragWrapper.value.style.marginLeft = (divWidth-MinimapRectangleMinimapX) + "px"
                dragWrapperCarousel.value.scrollLeft = (divWidth-MinimapRectangleMinimapX)*5+32
            }
        }
        const endDrag = (e) => {
            isDrag = false;
        }
        const clickMinimap = (e) => {
            console.log(e)
        }
        function handleWheel(event) {
          // Check if the Shift key is pressed to enable horizontal scrolling
            console.log(event,dragWrapper.value.style.marginLeft)
            const scrollAmount = event.deltaY;
            const divWidth = dragWrapperList.value.clientWidth;
            const MinimapRectangleMinimapX = dragWrapper.value.offsetWidth;
            const currentMargin = (parseInt(dragWrapper.value.style.marginLeft === '' ? 0 : dragWrapper.value.style.marginLeft)+scrollAmount/7.5)
            if(currentMargin > 0 && currentMargin < divWidth - MinimapRectangleMinimapX) {
                dragWrapper.value.style.marginLeft = currentMargin+"px";
                dragWrapperCarousel.value.scrollLeft = currentMargin * 5;
            } else if(currentMargin <= 0) {
                dragWrapper.value.style.marginLeft = "0px"
                dragWrapperCarousel.value.scrollLeft = 0
            } else {
                dragWrapper.value.style.marginLeft = (divWidth-MinimapRectangleMinimapX) + "px"
                dragWrapperCarousel.value.scrollLeft = (divWidth-MinimapRectangleMinimapX)*5+32
            }
          
        }
        return {
            items,
            startDrag,
            handleDrag,
            endDrag,
            dragWrapper,
            dragWrapperCarousel,
            dragWrapperList,
            clickMinimap,
            getRef,
            handleWheel
        };
    },
    
}
</script>
<style lang="css">
#custom-rectangle-scrollbar {
    width: calc(20vw - 6.1px);
    height: 133px;
    position: relative;
    top: -83px;
    border: solid 1px #FF4D00;
}

#product-map-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#products-container::-webkit-scrollbar {
    display: none;
}
</style>