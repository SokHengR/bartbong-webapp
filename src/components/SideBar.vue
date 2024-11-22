<script setup lang="ts">
import ThemeButton from './ThemeButton.vue';
</script>

<template>
    <div class="sidebar_container">

        <div class="inner_sidebar_container">

            <div class="sidebar_header">
                <img class="icon_button" src="/src/assets/icon/menu.svg">
                <img style="height: 30px;" src="/src/assets/bart_bong_long.png">
                <div style="width: 30px; height: 30px;"></div>
            </div>
        </div>

        <div class="horizontal_line"></div>

        <div class="inner_sidebar_container">

            <ThemeButton buttonText="New Chat" imageSrc="/src/assets/icon/add.svg"
                identification="new_chat_label" haveBorder/>

            <ThemeButton buttonText="Saved" imageSrc="/src/assets/icon/bookmark.svg"
                identification="standard_icon_size" />

            <ThemeButton buttonText="Feedback" imageSrc="/src/assets/icon/review.svg"
                identification="feedback_label" />

            <ThemeButton buttonText="Setting" imageSrc="/src/assets/icon/setting.svg"
                identification="setting_label" />

        </div>

        <div class="horizontal_line"></div>

        <div class="chat_history_list">

        </div>

        <div class="horizontal_line"></div>

        <div class="inner_sidebar_container">
            <ThemeButton buttonText="Clear Chat" imageSrc="/src/assets/icon/delete.svg"
                identification="delete_label" isRed/>
        </div>

    </div>
</template>

<style scoped>
.sidebar_container {
    width: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #131313;
}

.inner_sidebar_container {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    align-items: center;
    padding: 10px;
    width: 100%;
    gap: 5px;
}

.sidebar_header {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
}

.chat_history_list {
    overflow-y: auto;
    scrollbar-color: black;
    flex: 1;
    width: 100%;
}
</style>