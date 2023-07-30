<script>
import { mapActions } from 'vuex'

import HelloWorld from '@/components/hello-world.vue'

export default {
  name: 'Home',
  data() {
    return ({
      event: 'click'
    })
  },
  components: {
    HelloWorld,
  },
  created() {
    this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers']),
    doThis(e) {
      console.log(e, 'hello world')
    },
    doThat(e) {
      console.log(e, 'hello-- world')
    },
  },
}
</script>

<template lang="html">
  <div style="display: flex;">
    <div @click="doThat">
    <!-- "doThis" yöntemi çağrılacak bir düğme -->
    <button @click="doThis">adsdasdsadsasdadsa</button>
  </div>
    <button v-on:click="doThis">asdasd</button>

    <!-- dynamic event -->
    <button v-on:[event]="doThis">asdasddadsasd</button>

    <!-- inline statement -->
    <button v-on:click="doThat('hello', $event)">asddssa</button>

    <!-- shorthand -->
    <button @click="doThis">asddsdaadsads</button>

    <!-- shorthand dynamic event -->
    <button @[event]="doThis">assadsdadsadsaasd</button>

    <!-- stop propagation -->
    <button @click.stop="doThis">adsdasdsadsasdadsa</button>

    <!-- prevent default -->
    <button @click.prevent="doThis">dsaaaaaaaaaa</button>

    <!-- prevent default without expression -->
    <form @submit.prevent>qweeweqwewqeq</form>

    <!-- chain modifiers -->
    <button @click.stop.prevent="doThis">asndkjajdkljakldja</button>

    <!-- key modifier using keyAlias -->
    <input @keyup.enter="onEnter" />

    <!-- the click event will be triggered at most once -->
    <button v-on:click.once="doThis">asdjklşakdlaskşdlkasda</button>

    <!-- object syntax -->
    <button v-on="{ mousedown: doThis, mouseup: doThat }">apdşasdjklşajdlkajsdlkas</button>
  </div>
</template>
