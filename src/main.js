import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Ant from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'

const app = createApp(App)

app.use(Ant);

app.use(router)

app.mount('#app')