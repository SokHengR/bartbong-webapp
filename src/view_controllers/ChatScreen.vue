<script setup lang="ts">
import ChatView from '../components/ChatView.vue';
import SideBar from '../components/SideBar.vue';

</script>

<template>
    <div class="split_view_container">
        <ChatView />
        <SideBar />
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