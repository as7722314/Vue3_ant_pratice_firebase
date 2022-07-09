<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <a-menu
        v-model="selectedKeys"
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">商品</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <div :style="{ marginTop: '28px' }">
        <a-button type="primary" @click="showModal">新增商品</a-button>
        <a-modal
          v-model:visible="visible"
          title="商品資料"
          ok-text="新增"
          cancel-text="取消"
          @ok="handleOk"
        >
          <a-form
            ref="formRef"
            :model="formState"
            layout="vertical"
            name="form_in_modal"
          >
            <a-form-item
              label="商品名稱"
              name="name"
              :rules="[{ required: true, message: '不能空白' }]"
            >
              <a-input v-model:value="formState.name" />
            </a-form-item>

            <a-form-item
              label="價格(最低)"
              name="min_price"
              :rules="[{ required: true, message: '不能空白' }]"
            >
              <a-input v-model:value="formState.min_price" />
            </a-form-item>

            <a-form-item
              label="價格(最高)"
              name="max_price"
              :rules="[{ required: true, message: '不能空白' }]"
            >
              <a-input v-model:value="formState.max_price" />
            </a-form-item>

            <a-form-item
              label="圖片名稱"
              name="img"
              :rules="[{ required: true, message: '不能空白' }]"
            >
              <a-input v-model:value="formState.img" />
            </a-form-item>

            <a-form-item
              label="Index"
              name="index"
              :rules="[{ required: true, message: '不能空白' }]"
            >
              <a-input v-model:value="formState.index" />
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
      <div
        :style="{
          background: '#fff',
          padding: '24px',
          minHeight: '520px',
          marginTop: '28px',
        }"
      >
        <a-table
          :columns="columns"
          :data-source="dataSource"
          :loading="tableLoading"
          bordered
          :scroll="{ x: 1280 }"
        >
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'operation'">
              <div class="editable-row-operations">
                <span v-if="editableData[record.id]">
                  <a-typography-link style="color: green" @click="save(record)">
                    存檔
                  </a-typography-link>
                  <a-popconfirm
                    title="確定取消嗎 ?"
                    @confirm="cancel(record.id)"
                  >
                    <a style="color: red">取消</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a @click="edit(record.id)">編輯</a>
                </span>
              </div>
            </template>
            <template v-else>
              <div>
                <a-input
                  v-if="editableData[record.id]"
                  v-model:value="editableData[record.id][column.dataIndex]"
                  style="margin: -5px 0"
                />
                <template v-else>
                  {{ text }}
                </template>
              </div>
            </template>
          </template>
        </a-table>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { createData, getDataList, updateData } from "../../firebase.js";
import { cloneDeep, omit } from "lodash-es";
import { notification } from "ant-design-vue";

const selectedKeys = ref(["1"]);
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};

const visible = ref(false);

const showModal = () => {
  visible.value = true;
};

const handleOk = async (e) => {
  await formRef.value
    .validateFields()
    .then(async (values) => {
      await saveProduct();
      formRef.value.resetFields();
    })
    .catch((info) => {
      console.log("Validate Failed:", info);
    });
  await getProducts();
  visible.value = false;
};

// ---------------Form----------------
const formRef = ref();
const formState = reactive({
  name: "",
  min_price: "",
  max_price: "",
  img: "",
  index: "",
});

const saveProduct = async () => {
  try {
    await createData("products", formState);
    openNotification("新增成功");
  } catch (error) {
    console.log(error);
    openNotification("新增錯誤");
  }
};
// ----------------Table-----------------
const data = [];
const dataSource = ref(data);
const editableData = reactive({});
const tableLoading = ref(false);

const getProducts = async () => {
  try {
    tableLoading.value = true;
    let tmp = await getDataList("products");
    tmp.forEach((item) => {
      dataSource.value.push({
        id: item.id,
        name: item.data.name,
        min_price: item.data.min_price,
        max_price: item.data.max_price,
        img: item.data.img,
        index: item.data.index,
      });
    });
  } catch (error) {
    console.log(error);
  }

  tableLoading.value = false;
};

onMounted(async () => {
  await getProducts();
});

const columns = reactive([
  {
    title: "Index",
    dataIndex: "index",
    width: "10%",
  },
  {
    title: "商品名稱",
    dataIndex: "name",
    width: "25%",
  },
  {
    title: "最低價",
    dataIndex: "min_price",
    width: "10%",
  },
  {
    title: "最高價",
    dataIndex: "max_price",
    width: "10%",
  },
  {
    title: "圖片名稱",
    dataIndex: "img",
    width: "25%",
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "20%",
  },
]);

const edit = (key) => {
  editableData[key] = cloneDeep(
    dataSource.value.filter((item) => key === item.id)[0]
  );
};

const save = async (data) => {
  let key = data.id;
  try {
    tableLoading.value = true;
    await updateData("products", data.id, omit(data, ["id"]));
    Object.assign(
      dataSource.value.filter((item) => key === item.id)[0],
      editableData[key]
    );
  } catch (error) {
    openNotification("修改錯誤");
  }
  tableLoading.value = false;
  delete editableData[key];
};

const cancel = (key) => {
  delete editableData[key];
};

const openNotification = (msg, title = "系統通知") => {
  notification.open({
    message: title,
    description: msg,
    style: {
      width: "400px",
      marginLeft: `${335 - 600}px`,
      color: "#930000",
    },
    class: "notification-custom-class",
  });
};
</script>



<style scoped>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}

.editable-row-operations a {
  margin-right: 8px;
}
</style>