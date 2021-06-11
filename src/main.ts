import 'windi.css';
import 'swiper/swiper-bundle.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import './styles/index.postcss';
import { createApp } from 'vue';
import App from './App.vue';
import setupAnimate from './plugins/animate';

const app = createApp(App);

setupAnimate(app);

app.mount('#app');
