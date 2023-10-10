<template lang="pug">
.not-founded-item(v-if="sortedItems.length === 0")
  h1 NO ITEMS!!
div.table-container(v-else)
  table.table-list
    thead.table-list-head
      tr
        th(v-for="(header,index) in tableHeaders" @click="header.isSortable && sort(index)" :key="index+header.item") {{ header.item }}
    tbody
      tr(v-for="(item,index) in sortedItems" :key="item._id")
        td.table-row(v-for="(column,index) in Object.keys(item).filter(x => x.indexOf('_id') !== 0 || (x.indexOf('_id') == 0 && x[3] != undefined && x[3].toLowerCase() == x[3]))" :key="'12x'+item._id")
          //-.item-container(v-if="")
          .image-container(v-if="column === 'imageSrc'")
            img( v-for="(images) in item[column]" :src="images.image" :alt="images.alt" style="width: 45%; max-width: 8rem;")
          template(v-else-if="Array.isArray(item[column]) && item[column].find(x => typeof x === 'string')")
            p(v-for="(element) in item[column]") {{ element }}
          template(v-else) 
            .table-content {{ item[column] === true ? 'Yes' : item[column] === false ? 'No' : item[column] }}
        td 
          .table-list-buttons(v-if="sortedItems[0]?.user === undefined")
            FilledButton(:content="buttonName" :isRightArrow="false" :handleOpen="() => handleOpen(index)")
            OutlinedButton(content="Delete" :handleClick="() => handleClick(item)")
          .table-list-buttons(v-else)
            FilledButton(content="Display Product" :isRightArrow="false" :handleOpen="() => handleOpen(index, 'product')")
            FilledButton(content="Display User" :isRightArrow="false" :handleOpen="() => handleOpen(index, 'user')")
            OutlinedButton(content="Delete" :handleClick="() => handleClick(item)")

</template>
  
<script>
import { ref, computed, watch } from 'vue';
import OutlinedButton from '../outlined-button.vue'
import FilledButton from '../filled-button.vue'
import { useStore } from 'vuex'

export default {
  name: 'Table',
  components: {
    OutlinedButton,
    FilledButton
  },
  props: {
    handleOpen: {
      type: Function,
      default: () => { }
    },
    deleteDispatch: {
      type: String,
      default: ""
    },  
    tableHeaders: {
      type: Array,
      required: true
    },
    tableContent: {
      type: Array,
      required: true
    },
    buttonName: {
      type: String,
      default: 'Display'
    }
  },
  setup(props) {
    const store = useStore()
    const items = computed(() => props.tableContent)
    console.log(items)
    let sortOrder = ref(1); // 1 for ascending, -1 for descending
    let sortBy = ref(null); // Column to sort by (null for no sorting)
    const sortedItems = computed(() => {
      if (!sortBy.value || items.length === 0) {
        return items.value;
      }

      const itemsCopy = [...items.value];
      const sortItemAttribute = Object.keys(itemsCopy[0])[sortBy.value]
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(item => item.toLowerCase());
      itemsCopy.sort((a, b) => {
        const aValue = typeof a[sortItemAttribute] === 'string' ? a[sortItemAttribute].toLowerCase().replace('/', '-') : a[sortItemAttribute];
        const bValue = typeof b[sortItemAttribute] === 'string' ? b[sortItemAttribute].toLowerCase().replace('/', '-') : b[sortItemAttribute];
        if (sortItemAttribute === 'releaseMonth') {
          return (months.indexOf(aValue) - months.indexOf(bValue)) * sortOrder.value
        }
        return typeof aValue === 'string' ? aValue.localeCompare(bValue) * sortOrder.value : (aValue - bValue) * sortOrder.value;
      });
      return itemsCopy;
    });

    const sort = (column) => {
      if (sortBy.value === column) {
        sortOrder.value *= -1;
      } else {
        sortBy.value = column;
        sortOrder.value = 1;
      }
    };

    const handleClick = (item) => {
      console.log(item)
      store.dispatch(props.deleteDispatch, item)
    }

    return {
      items,
      sortedItems,
      sort,
      handleClick
    }
  }
}
</script>
  
<style lang="css">
.table-container {
  width: 100%;
}

td>p {
  margin: 0.10rem 0;
}

.table-row {
  max-width: 15rem;
  text-align: center;
  vertical-align: middle;
  max-height: 15rem;
}

.table-content {
  display: -webkit-box;
  max-height: 7rem;
  width: 100%;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.table-list-buttons {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
}

.image-container {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.table-list,
.table-list>tbody {
  width: 100%;
  border-spacing: 0;
}

.table-list {
  table-layout: auto;
}

.table-list-head {
  position: sticky;
  top: 0;
  background-color: white;

}

.table-list>tbody {
  overflow: auto;
}

.table-list-content {
  max-width: 20rem;
}

.table-list>tbody>tr>td,
.table-list-head>tr>th {
  border: 0.5px solid #00000040;
  padding: 8px;
  font-weight: 500;
}

.table-list-head>tr>th {
  background-color: var(--bg-color-primary);
  color: white;
}

.table-list>tbody>tr:nth-child(odd) {
  background-color: var(--bg-color-table-transparent);
}
</style>
  