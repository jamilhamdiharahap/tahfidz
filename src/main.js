import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSelect from 'vue-select'
import App from './App.vue'
import router from './router/index.js';

router.beforeEach((to, from, next) => {
    document.title = to.meta.title == undefined ? '': "PUB - " + to.meta.title  || 'Title';
    next();
});

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("v-select", VueSelect)

app.mount('#app')
