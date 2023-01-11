<template>
  <Tabs
    v-model:activeKey="activeKey"
    size="small"
    @change="handleActiveChange"
    :tabBarStyle="{ margin: '0px' }"
  >
    <TabPane :key="2" tab="表达式">
      <SystemExpression @change="handleChange" :modelValue="singleData.value" />
    </TabPane>
    <TabPane :key="3" tab="自定义表达式">
      <CustomExpression @change="handleChange" :modelValue="singleData.value" />
    </TabPane>
  </Tabs>
</template>

<script lang="ts" setup>
  import { ref, watch, toRaw, reactive } from 'vue';
  import { Tabs, TabPane } from 'ant-design-vue';
  import CustomExpression from './CustomExpression.vue';
  import SystemExpression from './SystemExpression.vue';
  import type { PropType } from 'vue';
  import type {
    AnYiExtendInfoSingle,
    AnYiExtendProperty,
  } from 'anyi-process-ee-antvue/dist/types/types/designercommon.d';
  const emit = defineEmits(['change']);
  const activeKey = ref<number>(1);
  const singleData = reactive<AnYiExtendInfoSingle>({} as AnYiExtendInfoSingle);
  const props = defineProps({
    modelValue: {
      type: Object as PropType<AnYiExtendInfoSingle>,
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
    activeKey.value = props.modelValue.type || 2;
    singleData.type = activeKey.value;
    singleData.value = props.modelValue.value;
  }
  function handleActiveChange(type: any) {
    activeKey.value = type;
    singleData.value = {};
  }
  function handleChange(data?: AnYiExtendProperty) {
    singleData.type = activeKey.value;
    singleData.value = data;
    emit('change', toRaw(singleData));
  }
</script>

<style lang="less"></style>
