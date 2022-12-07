## 1.0.0

### FEATURES
1. Init


## 1.1.0

### IMPROVEMENTS
1. Update bpmnjs to 9.3.2

### FEATURES
1. Handling missing 'Multi-instance' settings
2. Handle missing 'Call Activity' settings


## 1.2.0

### IMPROVEMENTS
1. Separate out the CSS with some dependencies for less volume


## 1.2.1

BUG FIXES
1. Fixed CSS animations not being compatible in Safari

## 1.2.2

### BUG FIXES
1. Fixed naming errors
2. Fixed the custom information form display exception
### IMPROVEMENTS
1. Upgrade bpmnjs dependencies


## 1.2.3

### BUG FIXES
1. Fixed download error
### IMPROVEMENTS
1. Upgrade bpmnjs dependencies
### FEATURES
1. Add diagram differ
### NOTICE
1. Incompatible with previous versions(instance rendering needs to provide sequenceFlowMap information)



## 1.2.4

### IMPROVEMENTS
1. Change the process category return data format
```
export interface Category {
  label: string;
  value: string;
  disabled?: boolean;
}
```
2. Add default category
```
{
  label: 'bpmn默认',
  value: 'http://bpmn.io/schema/bpmn',
}
```
### FEATURES
1. Add zeebe design model (beta)
```
<template>
  <div id="app">
    <SkillFullZeebeBpmnDesigner @change="handleChange" ref="diagramDesigner" :dataApi="url" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { getCategory, groupPage, userPage, expressionPage, orgTree } from './httpUtil';
  const diagramDesigner = ref();
  const url = reactive({
    categoryApi: getCategory,
    userApi: userPage,
    groupApi: groupPage,
    expressionApi: expressionPage,
    orgTreeApi: orgTree,
  });
  function handleChange(__diagram: any) {
    // console.log('---diagram---', diagram);
  }
  onMounted(() => {
    diagramDesigner.value.createNewDiagram();
  });
</script>
```


## 2.0.0-beta2

### IMPROVEMENTS
1. Provide the ts type
2. bpmn dependency update
3. change project name anyi-process-ee-antvue
### FEATURES
1. C7 Designer refactoring。
2. Provides external components to render asynchronous data


## 2.0.0-beta3

### IMPROVEMENTS
1. bpmn依赖升级
2. 重构c7建模