import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import VConsole from 'vconsole'

declare module 'vconsole';

// Initialize vConsole
new VConsole();

createApp(App).mount('#app')
