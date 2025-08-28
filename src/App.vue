<script setup>
import { onMounted, watch, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const languageState = proxy.$language;

onMounted(() => {
  document.documentElement.classList.toggle('khmer-lang', languageState.isKhmer);
});

watch(() => languageState.isKhmer, (newValue) => {
  document.documentElement.classList.toggle('khmer-lang', newValue);
});
</script>

<template>
  <router-view></router-view>
</template>