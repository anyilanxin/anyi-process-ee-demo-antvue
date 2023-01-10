<template>
  <Tabs
    v-model:activeKey="activeKey"
    size="small"
    @change="handleActiveChange"
    :tabBarStyle="{ margin: '0px' }"
  >
    <TabPane :key="1" tab="系统">
      <SystemFixedRole
        @change="handleChange"
        :modelValue="arrayData.value"
        :systemDataType="systemDataType"
      />
    </TabPane>
    <TabPane :key="2" tab="表达式">
      <SystemExpression @change="handleChange" :modelValue="arrayData.value" />
    </TabPane>
    <TabPane :key="3" tab="自定义表达式">
      <CustomExpression @change="handleChange" :modelValue="arrayData.value" />
    </TabPane>
  </Tabs>
</template>

<script lang="ts" setup>
  import { ref, watch, toRaw, reactive } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import CustomExpression from './CustomExpression.vue';
  import SystemExpression from './SystemExpression.vue';
  import SystemFixedRole from './SystemFixedRole.vue';
  import type { PropType } from 'vue';
  import {
    AnYiExtendInfoArray,
    AnYiExtendProperty,
  } from 'anyi-process-ee-antvue/dist/types/types/designercommon.d';
  const emit = defineEmits(['change']);
  const activeKey = ref<number>(1);
  const arrayData = reactive<AnYiExtendInfoArray>({} as AnYiExtendInfoArray);
  const props = defineProps({
    modelValue: {
      type: Object as PropType<AnYiExtendInfoArray>,
      default: () => {},
    },
    systemDataType: {
      type: Number,
      default: 1,
    },
  });
  watch(
    () => props.modelValue?.value,
    () => {
      initData();
    },
    { immediate: true }
  );
  function initData() {
    activeKey.value = props.modelValue.type || 1;
    arrayData.type = activeKey.value;
    arrayData.value = props.modelValue.value;
  }
  function handleActiveChange(type: any) {
    activeKey.value = type;
    if (type == 1 && props.systemDataType == 2) {
      arrayData.value = [];
    }
  }
  function handleChange(data?: AnYiExtendProperty[]) {
    arrayData.type = activeKey.value;
    arrayData.value = data;
    emit('change', toRaw(arrayData));
  }
</script>

<style lang="less"></style>
