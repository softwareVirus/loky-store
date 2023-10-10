import { createApp } from 'vue'
import App from './app.vue'
import './register-service-worker'
import 'normalize.css'
import router from './router'
import store from './store'


async function main() {
  console.log(await store())
  const storeInstance = await store()

  createApp(App)
    .use(storeInstance)
    .use(router)
    .mount('#app')
}
main()
