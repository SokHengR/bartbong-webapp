import { createApp, reactive } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index';

const languageState = reactive({
  isKhmer: localStorage.getItem('is_khmer') === 'true'
});

const app = createApp(App);

app.config.globalProperties.$language = languageState;

app.use(router).mount('#app');
