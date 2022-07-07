<!-- <script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template> -->

<template>
  <div id="app">
    <div class="header">
      <div class="navbar">
        <ul class="navbar_list">
          <li
            v-for="(item, index) in navbar"
            :key="index"
            @click="routeChange(item.value)"
          >
            {{ item.name }}
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
              @click="routeChange(item.value)"
            >
              {{ item.name }}
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
                  <img :src="item.img" />
                </div>
                <div class="text">
                  <h3>{{ item.name }}</h3>
                  <span>TWD : {{ item.price }}</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";

const navbarValue = ref("");
const ObjectInStatus = ref(true);
const navbar = reactive([
  {
    name: "手機",
    value: "phone",
  },
  {
    name: "手機殼",
    value: "phone_case",
  },
  {
    name: "保護貼",
    value: "protector",
  },
  {
    name: "耳機",
    value: "earphone",
  },
]);

const products = reactive([
  {
    index: "i11",
    name: "Iphone 11",
    price: "23,000 ~ 30,000",
    img: "../public/images/store/i11.jpg",
  },
  {
    index: "i12",
    name: "Iphone 12",
    price: "23,000 ~ 30,000",
    img: "../public/images/store/i12.jpg",
  },
  {
    index: "i13",
    name: "Iphone 13",
    price: "23,000 ~ 30,000",
    img: "../public/images/store/i13.jpg",
  },
  {
    index: "s22",
    name: "Samsung 22",
    price: "23,000 ~ 30,000",
    img: "../public/images/store/s22.jpg",
  },
  {
    index: "s22+",
    name: "Samsung 22+",
    price: "23,000 ~ 30,000",
    img: "../public/images/store/s22+.jpg",
  },
  {
    index: "s22u",
    name: "Samsung 22 Ultra",
    price: "23,000 ~ 30,000",
    img: "../public/images/store/s22u.jpg",
  },
]);
onMounted(() => {
  setTimeout(() => {
    navbarValue.value = "phone";
  }, 200);
});

const routeChange = (router) => {
  navbarValue = router;
};
</script>

<style>
@import "@/assets/css/home/index.css";
@import "@/assets/css/home/main.css";
@import "@/assets/css/home/header.css";
@import "@/assets/css/home/footer.css";
</style>
