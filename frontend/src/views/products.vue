<template lang="pug">
#product-map-container 
    ProductList(:getRef="getRef" :products="products")
    .minimap 
        ProductListMinimap(
            :getRef="getRef" 
            :handleWheel="handleWheel"
            :startDrag="startDrag" 
            :handleDrag="handleDrag" 
            :endDrag="endDrag" 
            :clickMinimap="clickMinimap"
            :products="products"
        )
</template>
<script>
import ProductList from '../components/product-list.vue';
import ProductListMinimap from '../components/product-list-minimap.vue'
import { ref, computed } from 'vue'
import { useStore } from 'vuex';
import { groupByDate } from '@/utils/utils'

export default {
    name: "Products",
    components: {
        ProductList,
        ProductListMinimap
    },
    async setup() {
        
        const dragWrapper = ref(null);
        const dragWrapperList = ref(null);
        const dragWrapperCarousel = ref(null);
        const store = useStore()
        await store.dispatch('fetchProducts')
        let months = ["January", "February", "March", "April", "May", "June",
  	        "July", "August", "September", "October", "November", "December"];
        const products = computed(() => groupByDate(store.state.products.sort((a,b) => {
            if(a.releaseYear - b.releaseYear !== 0)
                return Number(b.releaseYear) - Number(a.releaseYear)
            return months.indexOf(a.releaseMonth) - months.indexOf(b.releaseMonth)
        })))

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
            startDrag,
            handleDrag,
            endDrag,
            dragWrapper,
            dragWrapperCarousel,
            dragWrapperList,
            clickMinimap,
            getRef,
            handleWheel,
            products
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