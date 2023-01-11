<template>
  <Form
    :label-col="{ span: 3 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    layout="vertical"
    style="margin: 20px"
    :model="data"
  >
    <FormItem label="选择时间" name="value" :rules="{ required: true, message: '选择时间!' }">
      <DatePicker
        placeholder="选择时间"
        format="YYYY-MM-DD HH:mm:ss"
        class="anyi-width-full"
        valueFormat="YYYY-MM-DDTHH:mm:ssZ[Z]"
        @change="handleChange"
        show-time
        v-model:value="data.value"
      />
    </FormItem>
  </Form>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs';
  import { watch, reactive, toRaw } from 'vue';
  import type { PropType } from 'vue';
  import { Form, FormItem, DatePicker } from 'ant-design-vue';
  import type { AnYiExtendProperty } from 'anyi-process-ee-antvue/dist/types/types/designercommon.d';
  const emit = defineEmits(['change']);
  const data = reactive<AnYiExtendProperty>({} as AnYiExtendProperty);
  const props = defineProps({
    modelValue: {
      type: Object as PropType<AnYiExtendProperty>,
      default: () => {},
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
    if (props.modelValue && Object.keys(props.modelValue).length > 0) {
      const currentData = props.modelValue;
      data.value = currentData.value;
      data.valueDescribe = currentData.valueDescribe;
      data.valueExtend = currentData.valueExtend;
    }
  }
  function handleChange() {
    // value时间设置格式必须为ISO8601
    const valueDescribe = dayjs(data.value, 'YYYY-MM-DDTHH:mm:ssZ[Z]').format(
      'YYYY-MM-DD HH:mm:ss'
    );
    data.valueDescribe = valueDescribe;
    emit('change', toRaw(data));
  }
</script>

<style lang="less"></style>
