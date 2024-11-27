<script setup>
import { ref } from 'vue';
import ChatView from '../components/ChatView.vue';
import SideBar from '../components/SideBar.vue';

const isExpand = ref(false);
const isKhmer = ref(true);
const chatArray = ref([]);

function toggleExpand() {
    isExpand.value = !isExpand.value;
}

function clearAllChat() {
    console.log("Clean Chat");
    chatArray.value = [];
}
</script>

<template>
    <div class="split_view_container">
        <ChatView :isExpand="isExpand" :isKhmer="isKhmer" :chatArray="chatArray" @toggle-expand="toggleExpand" />
        <SideBar :isExpand="isExpand" :isKhmer="isKhmer" :isDesktop="true" :chatList="chatArray"
            @toggle-expand="toggleExpand" @clear-all-chat="clearAllChat" />
    </div>
    <div v-if="isExpand" class="overlay_sidebar">
        <SideBar :isExpand="isExpand" :isKhmer="isKhmer" :isDesktop="false" :chatList="chatArray"
            @toggle-expand="toggleExpand" @clear-all-chat="clearAllChat" />
        <div class="decoy_sidebar" @click="toggleExpand"></div>
    </div>
</template>

<style scoped>
@keyframes overlay_sidebar_open {
    0% {
        background-color: rgba(0, 0, 0, 0);
    }
    100% {
        background-color: rgba(0, 0, 0, 0.7);
    }
}

.split_view_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
}

.decoy_sidebar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
}

.overlay_sidebar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.7);
    display: none;
    justify-content: right;
    animation: overlay_sidebar_open 0.1s;
}

@media (max-width: 720px) {
    .overlay_sidebar {
        display: flex;
    }
}
</style>
