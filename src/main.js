import { createApp } from 'vue'

import store from './store/index.js'

// import base components
import FadeIn from './components/base/FadeIn.vue';

import App from './App.vue'

const app = createApp(App);
app.use(store);

app.component('fade-in', FadeIn)

app.mount('#app');
