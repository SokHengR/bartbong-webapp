<script setup>
const props = defineProps({
    senderType: String,
    contentText: String,
})

function isUser() {
    return props.senderType === 'user';
}
</script>

<template>
    <div :class="'chat_text_cellview ' + (isUser() ? 'for_user' : 'for_assistant')">
        <div :class="isUser() ? 'user_chat_container' : 'assistant_chat_container'">
            {{ contentText }}
        </div>
    </div>
</template>

<style>
.chat_text_cellview {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: top;
    padding-top: 4px;
    box-sizing: border-box;
}

.for_user {
    justify-content: right;
}

.for_assistant {
    justify-content: left;
}

.user_chat_container {
    color: white;
    padding: 10px;
    border-radius: 5px;
    background-color: orangered;
}

.assistant_chat_container {
    color: white;
    padding: 20px;
    background-color: transparent;
}
</style>
