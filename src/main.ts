import { createApp } from 'vue';
import antd from 'ant-design-vue';
// Register icon sprite
import App from './App.vue';
import AnYiProcessEE from 'anyi-process-ee-antvue';
import 'anyi-process-ee-antvue/dist/style.css';
import 'ant-design-vue/dist/antd.less';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js-color-picker/colors/color-picker.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import 'bpmn-js/dist/assets/bpmn-js.css';
import 'bpmn-js-properties-panel/dist/assets/properties-panel.css';
import 'bpmn-js-token-simulation/assets/css/bpmn-js-token-simulation.css';
import 'diagram-js-minimap/assets/diagram-js-minimap.css';
import 'bpmn-js-bpmnlint/dist/assets/css/bpmn-js-bpmnlint.css';

createApp(App).use(antd).use(AnYiProcessEE).mount('#app');
