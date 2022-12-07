<template>
  <Select
    class="anyi-width-full"
    :options="options"
    v-model:value="category"
    placeholder="请选择流程类别"
    @change="functionChange"
    :getPopupContainer="(triggerNode) => triggerNode.parentNode"
  ></Select>
</template>

<script lang="ts" setup>
  import { Select } from 'ant-design-vue';
  import { ref, watch } from 'vue';
  const props = defineProps({
    modelValue: {
      type: String,
    },
  });
  const emit = defineEmits(['change', 'update:value']);
  const category = ref<String>();
  watch(
    () => props.modelValue,
    (val1, val2) => {
      if (val1 != val2) {
        category.value = props.modelValue;
      }
    },
    { immediate: true }
  );
  const options = ref([
    {
      label: '测试1label',
      value: '测试1value',
    },
    {
      label: '测试2label',
      value: '测试2value',
    },
    {
      label: 'bpmn默认',
      value: 'http://bpmn.io/schema/bpmn',
    },
  ]);
  function functionChange(value: any) {
    emit('change', value);
  }
</script>

<style lang="less"></style>
