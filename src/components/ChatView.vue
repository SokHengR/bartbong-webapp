<script setup lang="ts">
import ChatBar from './ChatBar.vue';
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

            <img class="icon_button" src="/src/assets/icon/menu.svg">

        </div>

        <div class="horizontal_line"></div>

        <div class="main_chat_container">
            <div class="chat_title_welcome">
                How can I help you, Bong?
            </div>
            <ChatBar />
        </div>
    </div>
</template>

<style scoped>
.chat_title_welcome {
    color: white;
    padding: 20px;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
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