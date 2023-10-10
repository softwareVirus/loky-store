<template lang="pug">
div.table-container
  table.table-list
    thead.table-list-head
      tr
        th(v-for="(header,index) in tableHeaders" @click="header.isSortable && sort(headerConverter(header.item))" :key="uniqueID()") {{ header.item }}
    tbody
      tr(v-for="(item,index) in sortedItems" :key="item.id")
        td.table-row(v-for="(column,index) in Object.keys(item).filter(x => x !== 'id')" :key="uniqueID()")
          .image-container(v-if="column === 'imageSrc'")
            img( v-for="(images) in item[column]" :src="images.image" :alt="images.alt" style="width: 45%; max-width: 8rem;")
          template(v-else-if="Array.isArray(item[column]) && item[column].find(x => typeof x === 'string')")
            p(v-for="(element) in item[column]") {{ element }}
          template(v-else) 
            .table-content {{ item[column] === true ? 'Yes' : item[column] === false ? 'No' : item[column] }}
        td 
          .table-list-buttons 
            OutlinedButton(content="Delete")
            FilledButton(:content="buttonName" :isRightArrow="false" :handleOpen="() => handleOpen(index)")
</template>
  
<script>
import { ref, computed } from 'vue';
import OutlinedButton from '../outlined-button.vue'
import FilledButton from '../filled-button.vue'
import { useStore } from 'vuex'
import { uniqueID } from '@/utils/utils.js'

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
    const items = ref(props.tableContent)
    let sortOrder = ref(1); // 1 for ascending, -1 for descending
    let sortBy = ref(null); // Column to sort by (null for no sorting)

    const headerConverter = (item) => {
      return item.toLowerCase().replace(' ', '-')
    }

    const sortedItems = computed(() => {
      if (!sortBy.value) {
        return items.value;
      }

      const itemsCopy = [...items.value];

      itemsCopy.sort((a, b) => {
        const aValue = a[sortBy.value].toLowerCase().replace('/', '-');
        const bValue = b[sortBy.value].toLowerCase().replace('/', '-');
        return aValue.localeCompare(bValue) * sortOrder.value;
      });
      console.log(itemsCopy)
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

    return {
      items,
      sortedItems,
      sort,
      headerConverter,
      uniqueID
    }
  }
}
</script>
  
<style lang="css">
.table-container {
  width: 100%;
}

td > p {
  margin: 0.10rem 0;
}

.table-row {
  max-width: 15rem;
  text-align: center;
  vertical-align: middle;
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
  height: 50vh;
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
  