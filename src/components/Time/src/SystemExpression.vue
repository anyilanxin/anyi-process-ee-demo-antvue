<template>
  <Table
    :columns="expressionColumns"
    :data-source="expressionData"
    :rowKey="rowKey"
    bordered
    :customRow="onClick"
    size="small"
    :row-selection="{
      onSelect: handleOnSelect,
      selectedRowKeys: selectKeys,
      type: type,
    }"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'expressionState'">
        <Badge status="default" v-if="record.expressionState == 0" text="禁用" />
        <Badge status="processing" v-else text="启用" />
      </template>
      <template v-if="column.dataIndex === 'handleType'">
        <Tag color="green" v-if="record.handleType == 0">人员</Tag>
        <Tag color="cyan" v-else-if="record.handleType == 1">角色</Tag>
        <Tag color="blue" v-else-if="record.handleType == 2">时间</Tag>
        <Tag color="purple" v-else-if="record.handleType == 3">条件</Tag>
        <Tag color="orange" v-else-if="record.handleType == 4">其他</Tag>
      </template>
    </template>
  </Table>
</template>

<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { Badge, Tag, Table } from 'ant-design-vue';
  import { watch, reactive, ref, toRaw } from 'vue';
  import { AnYiExtendProperty } from '../../../../src/types/modeler.d';
  import { expressionColumns } from './data';
  import { keyBy } from 'lodash';
  const selectRows = ref<any[]>([]);
  const rowKey = ref('expressionId');
  const type = ref<any>('radio');
  const selectKeys = ref<string[]>([]);
  const emit = defineEmits(['change']);
  const expressionData = reactive([
    {
      expressionId: '1535332521688481792',
      handleType: 3,
      expressionName: '不同意',
      elExpressionValue: '${nrOfInstanceStatus == 20}',
      expressionState: 1,
    },
    {
      expressionId: '1535332295539998720',
      handleType: 3,
      expressionName: '同意',
      elExpressionValue: '${nrOfInstanceStatus == 21}',
      expressionState: 1,
    },
  ]);
  const props = defineProps({
    modelValue: {
      type: Object as PropType<AnYiExtendProperty>,
      default: () => {},
    },
  });
  watch(
    () => props.modelValue,
    (newVal, oldVal) => {
      if ((!oldVal && newVal) || JSON.stringify(toRaw(oldVal)) != JSON.stringify(toRaw(newVal))) {
        initData();
      }
    },
    { immediate: true }
  );
  function initData() {
    selectRows.value = [];
    selectKeys.value = [];
    if (props.modelValue && Object.keys(props.modelValue).length > 0) {
      const currentData = props.modelValue;
      const selectData = {
        elExpressionValue: currentData.value,
        expressionName: currentData.valueDescribe,
        expressionId: currentData.valueExtend,
      };
      selectRows.value = [selectData];
      selectKeys.value = [currentData.valueExtend as string];
    }
  }
  function selectionChange() {
    const rows = selectRows.value;
    const nowData = {} as AnYiExtendProperty;
    if (rows && rows.length > 0) {
      const row = rows[0];
      nowData.value = row.elExpressionValue;
      nowData.valueDescribe = row.expressionName;
      nowData.valueExtend = row.expressionId;
    } else {
      nowData.value = '';
      nowData.valueDescribe = '';
      nowData.valueExtend = '';
    }
    emit('change', nowData);
  }
  function handleOnSelect(_record, _selected, selectedRows, _nativeEvent) {
    if (!selectRows.value) {
      selectRows.value = [];
      selectKeys.value = [];
    }
    selectRows.value = selectedRows;
    selectKeys.value = [selectedRows[0][rowKey.value]];
    selectionChange();
  }
  function onClick(record, index) {
    return {
      onClick: (e) => {
        e?.stopPropagation();
        handleClientChange(record, index);
      },
    };
  }
  function handleClientChange(record, index) {
    const key = record[rowKey.value];
    selectCustomChange(record, key);
  }
  function selectCustomChange(record, key) {
    if (!selectKeys.value) {
      selectKeys.value = [];
      selectRows.value = [];
    }
    if (selectKeys.value.length == 0 || !selectKeys.value.includes(key)) {
      selectRows.value = [record];
      selectKeys.value = [key];
    } else {
      selectRows.value = [];
      selectKeys.value = [];
    }
    selectionChange();
  }
</script>

<style lang="less">
  .ant-table-wrapper {
    margin-top: 20px;
  }
</style>
