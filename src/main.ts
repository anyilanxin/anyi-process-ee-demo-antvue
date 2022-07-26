import { createApp } from 'vue';
import antd from 'ant-design-vue';
// Register icon sprite
import App from './App.vue';
import SkillfullProcessPro from 'skillfull-process-pro-antvue';
import 'ant-design-vue/dist/antd.less';
import 'skillfull-process-pro-antvue/dist/style.css';
createApp(App).use(antd).use(SkillfullProcessPro).mount('#app');
