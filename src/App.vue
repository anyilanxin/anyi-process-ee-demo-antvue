<!-- 建模 -->
<template>
  <div id="app">
    <AnYiBpmnDesigner @change="handleChange" ref="diagramDesigner" :comps="comps" />
  </div>
</template>
<script lang="ts" setup>
  import { Category } from './components/Category';
  import { Role } from './components/Role';
  import { User } from './components/User';
  import { Time } from './components/Time';
  import { UserSingle } from './components/UserSingle';
  import { Expression } from './components/Expression';
  import { ref, onMounted } from 'vue';
  const diagramDesigner = ref();
  const comps = {
    category: Category,
    followUpDate: Time,
    dueDate: Time,
    conditionExpression: Expression,
    candidateStarterGroups: Role,
    candidateStarterUsers: User,
    assignee: UserSingle,
    anYiCopyToUsers: User,
    collection: User,
    candidateGroups: Role,
    candidateUsers: User,
  };
  function handleChange(__diagram: any) {
    // console.log('---diagram---', diagram);
  }
  onMounted(() => {
    diagramDesigner.value.createNewDiagram();
  });
</script>
<!-- 预览流程实例 -->
<!-- <template>
  <div id="app">
    <AnYiBpmnPreviewInstance
      ref="diagramInstanceDomRef"
      :createHtml="getHtml"
      tagId="Activity_1s3ocxk:e63351bb-faaa-11ec-9f3a-0242ac1f090f"
    />
  </div>
</template>
<script lang="ts" setup>
  import type { CreateHtmlFuncArgs } from 'anyi-process-ee-antvue';
  import instancesdata from './instancesdata.json';
  import { ref, onMounted } from 'vue';
  const diagramInstanceDomRef = ref();
  function getHtml(info: CreateHtmlFuncArgs) {
    console.log('-----info-------', info);
    return '<scan>Nihao</scan>';
  }
  onMounted(() => {
    diagramInstanceDomRef.value.viewInstance(instancesdata.data);
  });
</script> -->

<!-- 预览流程模型 -->

<!-- <template>
  <div id="app">
    <AnYiBpmnPreview ref="diagramDomRef" buttonPosition="top" />
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
    <AnYiBpmnDiffer ref="diagramDomRef" />
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

<!-- zeebe建模 -->
<!-- <template>
  <div id="app">
    <AnYiBpmnDesignerZeebe @change="handleChange" ref="diagramDesigner" :comps="comps" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, onMounted } from 'vue';
  import { Category } from './components/Category';
  import { Role } from './components/Role';
  import { User } from './components/User';
  import { Time } from './components/Time';
  import { UserSingle } from './components/UserSingle';
  import { Expression } from './components/Expression';
  const diagramDesigner = ref();
  const comps = {
    category: Category,
    followUpDate: Time,
    dueDate: Time,
    conditionExpression: Expression,
    candidateStarterGroups: Role,
    candidateStarterUsers: User,
    assignee: UserSingle,
    anYiCopyToUsers: User,
    collection: User,
    candidateGroups: Role,
    candidateUsers: User,
  };
  function handleChange(__diagram: any) {
    // console.log('---diagram---', diagram);
  }
  onMounted(() => {
    diagramDesigner.value.createNewDiagram();
  });
</script> -->
