<template>
  <Table
    :columns="columns"
    :row-selection="{
      onSelect: handleOnSelect,
      selectedRowKeys: selectKeys,
      onSelectAll: handleOnSelectAll,
      type: 'radio',
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
  import { AnYiExtendProperty } from 'anyi-process-ee-antvue/dist/types/types/designercommon.d';
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
      type: Object as PropType<AnYiExtendProperty>,
      default: () => {},
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
    if (props.modelValue && Object.keys(props.modelValue).length > 0) {
      if (props.modelValue.value) {
        selectRows.value = [
          {
            userId: props.modelValue.value,
            realName: props.modelValue.valueDescribe,
            userName: props.modelValue.valueExtend,
          },
        ];
        // 设置选中的key
        selectKeys.value = [props.modelValue.value];
      }
    }
  }
  function selectionChange() {
    const rows = selectRows.value;
    let nowData: AnYiExtendProperty = {};
    if (rows && rows.length > 0) {
      const row = rows[0];
      nowData = {
        value: row.userId,
        valueDescribe: row.realName,
        valueExtend: row.userName,
      };
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
  function handleClientChange(record, _index) {
    const key = record[rowKey.value];
    selectCustomChange(record, key, 'radio');
  }
  function selectCustomChange(record, key, _type) {
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
