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


## 2.0.0-beta5

### IMPROVEMENTS
1. bpmn依赖升级
2. 流程实例弹框信息改由外部提供
   

## 2.0.0-beta8

### IMPROVEMENTS
1. 建模添加ts类型

## 2.0.0-beta9

### IMPROVEMENTS
1. 去掉多余样式

## 2.0.0-beta10

### IMPROVEMENTS
1. 建模添加ts类型
2. 去掉多余样式
3. 修复样式错误
4. 修复类型引用错误


## 2.0.0-beta11

### IMPROVEMENTS
1. 统一包名


## 2.0.0-beta13

### IMPROVEMENTS
1. 修复ant button样式错乱

## 2.0.0-beta14

### IMPROVEMENTS
1. 排除ant样式非必要引入


## 2.0.0-beta15

### IMPROVEMENTS
1. 修复颜色选择器错误
2. bpmn依赖升级
3. 颜色选择器依赖升级


## 2.0.0-beta16

### IMPROVEMENTS
1. 精简代码
2. 对建模器示例提供保存、部署、变更、打开历史模型案例