<!-- 建模 -->
<!-- <template>
  <div id="app">
    <SkillFullBpmnDesigner @change="handleChange" ref="diagramDesigner" :dataApi="url" />
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
</script> -->
<!-- 预览流程实例 -->
<template>
  <div id="app">
    <SkillfullInstanceBpmnPreview
      ref="diagramInstanceDomRef"
      tagId="Activity_1s3ocxk:e63351bb-faaa-11ec-9f3a-0242ac1f090f"
    />
  </div>
</template>
<script lang="ts" setup>
  import { instanceData } from './process';
  import { ref, onMounted } from 'vue';
  const diagramInstanceDomRef = ref();
  onMounted(() => {
    diagramInstanceDomRef.value.viewInstance(instanceData.data);
  });
</script>

<!-- 预览流程模型 -->

<!-- <template>
  <div id="app">
    <SkillFullBpmnPreview ref="diagramDomRef" buttonPosition="top" />
  </div>
</template>
<script lang="ts" setup>
  import { base64BpmnData } from './process';
  import { ref, onMounted } from 'vue';
  const diagramDomRef = ref();
  onMounted(() => {
    diagramDomRef.value.viewBase64Bpmn(base64BpmnData);
  });
</script> -->

<!-- 模型比较 -->
<!-- <template>
  <div id="app">
    <SkillFullBpmnDiffer ref="diagramDomRef" />
  </div>
</template>
<script lang="ts" setup>
  import { base64BpmnData, bpmn2 } from './process';
  import { ref, onMounted, nextTick } from 'vue';
  const diagramDomRef = ref();
  onMounted(() => {
    nextTick(() => {
      diagramDomRef.value.openDiagram(base64BpmnData, 'history');
      diagramDomRef.value.openDiagram(bpmn2, 'current');
    });
  });
</script> -->
