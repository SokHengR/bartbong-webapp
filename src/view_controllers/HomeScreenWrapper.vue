<script setup>
import { ref } from 'vue'
import Chat from './ChatScreen.vue'
import Portfolio from './HomeScreen.vue'

const currentView = ref(Portfolio)
</script>

<template>
    <component :is="currentView" />
</template>