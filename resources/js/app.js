import './bootstrap';
import { createApp } from 'vue';
import router from './router'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-dark-teal/theme.css'

import PrimeVue from 'primevue/config'
import App from '@/App.vue'

createApp({
    components: {
        App,
    }
}).use(router).use(PrimeVue).mount('#app');
