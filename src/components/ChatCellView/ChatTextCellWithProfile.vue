<template>
    <div :class="['chat-cell', { 'user-cell': isUser }]">
        <div v-if="showProfile" class="avatar">
            <img :src="isUser ? userAvatar : botAvatar" alt="profile" />
        </div>
        <div class="content-bubble" :class="{ user: isUser }">
            {{ contentText }}
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import userAvatar from '/src/assets/bart_bong_logo.jpg';
import botAvatar from '/src/assets/bart_bong_logo.jpg';

const props = defineProps({
    senderType: String,
    contentText: String,
    showProfile: {
        type: Boolean,
        default: true
    }
})

const isUser = computed(() => props.senderType === 'user');
</script>

<style scoped>
.chat-cell {
    display: flex;
    align-items: flex-end;
    margin: 8px 0;
}

.user-cell {
    flex-direction: row-reverse;
}

.avatar {
    width: 36px;
    height: 36px;
    margin: 0 8px;
}

.avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.content-bubble {
    max-width: 80%;
    padding: 12px 16px;
    border-radius: 12px;
    background-color: #333;
    color: white;
    word-wrap: break-word;
}

.content-bubble.user {
    background-color: #007AFF;
}
</style>