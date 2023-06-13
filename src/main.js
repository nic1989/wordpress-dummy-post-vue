import './assets/main.css'
import './assets/style.scss'
import { RouterLink, RouterView } from 'vue-router'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
