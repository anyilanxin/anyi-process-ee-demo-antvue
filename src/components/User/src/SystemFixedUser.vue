<template>
  <Table
    :columns="columns"
    :row-selection="{
      onSelect: handleOnSelect,
      selectedRowKeys: selectKeys,
      onSelectAll: handleOnSelectAll,
      type: systemDataType == 1 ? 'radio' : 'checkbox',
    }"
    :customRow="onClick"
    :data-source="userData"
    :rowKey="rowKey"
    bordered
    size="small"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'userStatus'">
        <Badge status="default" v-if="record.userStatus == 0" text="未激活" />
        <Badge status="processing" v-else-if="record.userStatus == 1" text="正常" />
        <Badge status="warning" v-else text="冻结" />
      </template>
    </template>
  </Table>
</template>

<script lang="ts" setup>
  import { Badge, Table } from 'ant-design-vue';
  import type { PropType } from 'vue';
  import { reactive, watch, ref, toRaw } from 'vue';
  import type { AnYiExtendProperty } from 'anyi-process-ee-antvue/dist/types/types/designercommon.d';
  import { columns } from './data';
  const rowKey = ref('userId');
  const emit = defineEmits(['change']);
  const userData = reactive([
    {
      userName: 'lingluo',
      userId: '1560469355556814848',
      realName: '零落成泥碾作尘',
      userStatus: 1,
    },
    {
      userName: 'yimiyangguang',
      userId: '1560466276803461120',
      realName: '一米阳光',
      userStatus: 1,
    },
    {
      userName: 'test2',
      userId: '1559828130000584704',
      realName: '测试用户2',
      userStatus: 1,
    },
    {
      userName: 'zxiaozhou',
      userId: '1444190920879161344',
      realName: 'zxiaozhou',
      userStatus: 1,
    },
  ]);
  const selectRows = ref<any[]>([]);
  const selectKeys = ref<string[]>([]);
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
          userId: item.value,
          realName: item.valueDescribe,
          userName: item.valueExtend,
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
          value: item.userId,
          valueDescribe: item.realName,
          valueExtend: item.userName,
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
