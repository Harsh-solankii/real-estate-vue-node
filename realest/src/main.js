import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import { io } from "socket.io-client";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


export const socket = io('http://localhost:3087');

loadFonts()

createApp(App)
 .use(router)
  .use(store)
  .use(vuetify)
  .use(socket)
  .use(VueSweetalert2)
  .mount('#app')
