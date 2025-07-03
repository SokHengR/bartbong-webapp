<script setup>
import { ref, onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import Chat from './ChatScreen.vue'
import Portfolio from './HomeScreen.vue'

const currentView = ref(auth.currentUser ? Chat : Portfolio)

onMounted(() => {
    onAuthStateChanged(auth, user => {
        currentView.value = user ? Chat : Portfolio
    })
})
</script>

<template>
    <component :is="currentView" />
</template>