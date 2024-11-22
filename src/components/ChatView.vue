<script setup>
import { defineProps, defineEmits } from 'vue';
import ChatBar from './ChatBar.vue';

const props = defineProps({
    isExpand: Boolean,
    isKhmer: Boolean,
});

const emit = defineEmits(['toggle-expand']);

const message_english = "How can I help you, Bong?";
const message_khmer = "តើប្អូនអាចជួយអ្វីបងបាន?";
</script>

<template>
    <div class="chat_view_container">
        <div class="chat_title_bar">

            <div class="horizontal_container">
                <img class="profile_div" src="/src/assets/default_profile.jpg">
                <img class="icon_button" src="/src/assets/icon/app.svg">
            </div>

            <div class="button_border">
                បាទបងខ្នាតតូច
                <img src="/src/assets/icon/expand_down.svg">
            </div>

            <div>
                <div v-if="isExpand" class="standard_icon_size"></div>
                <img v-if="!isExpand" class="icon_button" src="/src/assets/icon/menu.svg"
                    @click="emit('toggle-expand')">
            </div>

        </div>

        <div class="horizontal_line"></div>

        <div class="main_chat_container">
            <div class="chat_title_welcome">
                {{ isKhmer ? message_khmer : message_english }}
            </div>
            <ChatBar :isKhmer="isKhmer" />
        </div>
    </div>
</template>

<style scoped>
.chat_title_welcome {
    font-family: "Dangrek", sans-serif;
    color: white;
    padding: 20px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
}

@media (min-width: 700px) {
    .chat_title_welcome {
        font-size: 40px;
    }
}

@media (min-width: 900px) {
    .chat_title_welcome {
        font-size: 60px;
    }
}

.chat_view_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chat_title_bar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
}

.profile_div {
    width: 35px;
    height: 35px;
    border-radius: 200px;
    box-shadow: 0px 0px 5px;
}

.main_chat_container {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
}
</style>