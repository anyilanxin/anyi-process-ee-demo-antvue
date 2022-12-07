<template>
  <Form
    :label-col="{ span: 3 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    layout="vertical"
    style="margin: 20px"
    :model="data"
  >
    <FormItem
      label="表达式名称"
      name="valueDescribe"
      :rules="{ required: true, message: '请输入表达式名称!' }"
    >
      <Input
        placeholder="请输入表达式名称"
        v-model:value="data.valueDescribe"
        @change="handleChange"
      />
    </FormItem>
    <FormItem
      label="表达式内容"
      name="value"
      :rules="{
        required: true,
        pattern: /^(\$\{)(.+)(})$/g,
        message: '请输入自定义表达式',
        trigger: ['change', 'blur'],
      }"
      help="必须'${'符号开头，'}'符号结尾"
    >
      <TextArea
        :rows="4"
        @change="handleChange"
        placeholder="请输入表达式内容"
        v-model:value="data.value"
      />
    </FormItem>
  </Form>
</template>

<script lang="ts" setup>
  import { watch, reactive, toRaw } from 'vue';
  import type { PropType } from 'vue';
  import { Form, FormItem, Input } from 'ant-design-vue';
  import { AnYiExtendProperty } from '../../../../src/types/modeler.d';
  const TextArea = Input.TextArea;
  const emit = defineEmits(['change']);
  const data = reactive<AnYiExtendProperty>({} as AnYiExtendProperty);
  const props = defineProps({
    modelValue: {
      type: Object as PropType<AnYiExtendProperty[]>,
      default: () => [],
    },
  });
  watch(
    () => props.modelValue,
    () => {
      initData();
    },
    { immediate: true }
  );
  function initData() {
    if (props.modelValue && props.modelValue.length > 0) {
      const currentData = props.modelValue[0];
      data.value = currentData.value;
      data.valueDescribe = currentData.valueDescribe;
      data.valueExtend = currentData.valueExtend;
    }
  }
  function handleChange() {
    emit('change', [toRaw(data)]);
  }
</script>

<style lang="less"></style>
