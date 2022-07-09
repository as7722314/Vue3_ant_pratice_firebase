<template>
  <div>
    <div class="header">
      <div class="navbar">
        <ul class="navbar_list">
          <li
            v-for="(item, index) in navbar"
            :key="index"
            @click="routeChange(item.data.value)"
          >
            {{ item.data.name }}
          </li>
        </ul>
      </div>
    </div>
    <div class="main">
      <!-- <div class="tags_group">
        <div class="tag">
          <div class="logo logo_first">
            <h1>Facebook</h1>
          </div>
        </div>
        <div class="tag">
          <div class="logo">
            <h1>Instagram</h1>
          </div>
        </div>
        <div class="tag">
          <div class="logo">
            <h1>誠信</h1>
          </div>
        </div>
      </div> -->
      <div class="container">
        <div class="navbar">
          <div class="navbar_logo"></div>
          <ul class="navbar_list">
            <li
              v-for="(item, index) in navbar"
              :key="index"
              @click="routeChange(item.data.value)"
            >
              {{ item.data.name }}
            </li>
          </ul>
        </div>
        <div class="content">
          <transition name="product-ts">
            <div v-if="navbarValue == 'phone'" class="product_card">
              <div
                v-for="(item, index) in products"
                :key="index"
                class="product"
              >
                <div class="product_img">
                  <img :src="item.data.img" />
                </div>
                <div class="text">
                  <h2>{{ item.data.name }}</h2>
                  <h4><b>TWD : {{ `${item.data.min_price} ~ ${item.data.max_price}` }}</b></h4>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="footer">
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { getDataList} from "../firebase.js";

const navbarValue = ref("");
const ObjectInStatus = ref(true);
const navbar = reactive([]);
const products = reactive([]);

onMounted(async () => {
  navbarValue.value = "phone";
  await getNavBatList();
  await getProducts();
});

const routeChange = (router) => {
  navbarValue.value = router;
};

const getNavBatList = async () => {
  let types = await getDataList("types");
  types.forEach((item) => {
    navbar.push(item);
  });
};

const getProducts = async () => {
  let data = await getDataList("products");
  data.forEach((product) => {
    products.push(product);
    // console.log(product)
  });
};
</script>

<style scoped>
@import "@/assets/css/home/index.css";
@import "@/assets/css/home/main.css";
@import "@/assets/css/home/header.css";
@import "@/assets/css/home/footer.css";
</style>