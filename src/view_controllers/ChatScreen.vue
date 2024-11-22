<script setup>
import { ref } from 'vue';
import ChatView from '../components/ChatView.vue';
import SideBar from '../components/SideBar.vue';

const isExpand = ref(true);
const isKhmer = ref(false);

function toggleExpand() {
    isExpand.value = !isExpand.value;
}
</script>

<template>
    <div class="split_view_container">
        <ChatView :isExpand="isExpand" :isKhmer="isKhmer" @toggle-expand="toggleExpand" />
        <SideBar :isExpand="isExpand" :isKhmer="isKhmer" @toggle-expand="toggleExpand" />
    </div>
</template>

<style scoped>
.split_view_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}
</style>
