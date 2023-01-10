<template>
  <Table
    :columns="roleColumns"
    :row-selection="{
      onSelect: handleOnSelect,
      selectedRowKeys: selectKeys,
      onSelectAll: handleOnSelectAll,
      type: systemDataType == 1 ? 'radio' : 'checkbox',
    }"
    :customRow="onClick"
    :data-source="roleData"
    :rowKey="rowKey"
    bordered
    size="small"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'roleStatus'">
        <Badge status="default" v-if="record.roleStatus == 0" text="禁用" />
        <Badge status="processing" v-else-if="record.roleStatus == 1" text="启用" />
      </template>
    </template>
  </Table>
</template>

<script lang="ts" setup>
  import { Badge, Table } from 'ant-design-vue';
  import type { PropType } from 'vue';
  import { reactive, watch, nextTick, ref, toRaw } from 'vue';
  import {
    AnYiExtendInfoArray,
    AnYiExtendProperty,
  } from 'anyi-process-ee-antvue/dist/types/types/designercommon.d';
  import { roleColumns } from './data';
  const selectRows = ref<any[]>([]);
  const rowKey = ref('roleId');
  const selectKeys = ref<string[]>([]);
  const emit = defineEmits(['change']);
  const roleData = reactive([
    {
      roleId: '1544242595517480960',
      roleName: '演示',
      roleStatus: 1,
      roleCode: 'demo1',
    },
    {
      roleId: '15442425955',
      roleName: '演示2',
      roleStatus: 1,
      roleCode: 'demo22',
    },
    {
      roleId: '1544242560',
      roleName: '演示3',
      roleStatus: 1,
      roleCode: 'demo3333',
    },
    {
      roleId: '1314235356968173568',
      roleName: '超级管理员',
      roleStatus: 1,
      roleCode: 'SUPER_ADMIN',
    },
  ]);
  const props = defineProps({
    modelValue: {
      type: Object as PropType<AnYiExtendProperty[]>,
      default: () => [],
    },
    systemDataType: {
      type: Number,
      default: 1,
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
    if (props.modelValue && props.modelValue.length > 0) {
      const currentSelectRows: any[] = [];
      const currentSelectRowKey: string[] = [];
      props.modelValue.forEach((item: AnYiExtendProperty) => {
        currentSelectRows.push({
          roleId: item.value,
          roleName: item.valueDescribe,
          roleCode: item.valueExtend,
        });
        currentSelectRowKey.push(item.value as string);
      });
      selectRows.value = currentSelectRows;
      // 设置选中的key
      selectKeys.value = currentSelectRowKey;
    }
  }
  function selectionChange() {
    const rows = selectRows.value;
    const nowData: AnYiExtendProperty[] = [];
    if (rows && rows.length > 0) {
      rows.forEach((item: any) => {
        nowData.push({
          value: item.roleId,
          valueDescribe: item.roleName,
          valueExtend: item.roleCode,
        });
      });
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
  function handleOnSelectAll(selected, selectedRows, changeRows) {
    if (!selectRows.value) {
      selectRows.value = [];
      selectKeys.value = [];
    }
    if (selected) {
      selectRows.value = selectRows.value.concat(selectedRows);
      const nowKey: string[] = [];
      selectedRows.forEach((item: any) => {
        nowKey.push(item[rowKey.value + '']);
      });
      selectKeys.value = selectKeys.value.concat(nowKey);
    } else {
      const changeRowKey = {} as any;
      if (changeRows && changeRows.length > 0) {
        changeRows.forEach((item: any) => {
          changeRowKey[item[rowKey.value + '']] = item[rowKey.value + ''];
        });
        const nowRows = selectRows.value.filter((item) => {
          return changeRowKey[item[rowKey.value + '']] == undefined;
        });
        const nowKey = selectKeys.value.filter((key) => {
          return changeRowKey[key] == undefined;
        });
        selectRows.value = nowRows;
        selectKeys.value = nowKey;
      }
    }
    selectionChange();
  }
  function handleClientChange(record, index) {
    console.log('-------index-------', index);
    const key = record[rowKey.value];
    selectCustomChange(record, key, props.systemDataType == 1 ? 'radio' : 'checkbox');
  }
  function selectCustomChange(record, key, type) {
    if (!selectKeys.value) {
      selectKeys.value = [];
      selectRows.value = [];
    }
    if (type == 'radio') {
      if (selectKeys.value.length == 0 || !selectKeys.value.includes(key)) {
        selectRows.value = [record];
        selectKeys.value = [key];
      } else {
        selectRows.value = [];
        selectKeys.value = [];
      }
    } else {
      if (selectKeys.value.length == 0 || !selectKeys.value.includes(key)) {
        selectRows.value = selectRows.value.concat([record]);
        selectKeys.value = selectKeys.value.concat([key]);
      } else {
        const nowRows = selectRows.value.filter((item) => {
          return item[rowKey.value + ''] != key;
        });
        const nowKeys = selectKeys.value.filter((nowKey) => {
          return nowKey != key;
        });
        selectRows.value = nowRows;
        selectKeys.value = nowKeys;
      }
    }
    selectionChange();
  }
</script>

<style lang="less">
  .ant-table-wrapper {
    margin-top: 20px;
  }
</style>
