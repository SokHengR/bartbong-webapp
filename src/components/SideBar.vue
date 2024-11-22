<script setup>
import { defineProps, defineEmits } from 'vue';
import ThemeButton from './ThemeButton.vue';

const props = defineProps({
    isExpand: Boolean,
    isKhmer: Boolean,
});

const emit = defineEmits(['toggle-expand']);

const bart_bong_long = '/src/assets/bart_bong_long.png';
const bart_bong_short = '/src/assets/bart_bong_short.png';
const justify_space = 'justify-content: space-between;';
const justify_center = 'justify-content: center;';

const new_chat_english = "New Chat";
const new_chat_khmer = "បង្កើតការពិភាក្សាថ្មី";

const file_english = "My File";
const file_khmer = "ឯកសាររបស់បង";

const save_english = "Saved Chat";
const save_khmer = "ពិភាក្សាដែលបានរក្សាទុក";

const feedback_english = "Feedback";
const feedback_khmer = "ផ្តល់មតិកែលម្អ";

const setting_english = "Setting";
const setting_khmer = "ការកំណត់";

const clear_english = "Clear All Chat";
const clear_khmer = "ជម្រះការពិភាក្សាទាំងអស់";
</script>

<template>
    <div :class="isExpand ? 'sidebar_container' : 'sidebar_container_close'">
        <div class="inner_sidebar_container">
            <div class="sidebar_header" :style="isExpand ? justify_space : justify_center">
                <img v-if="isExpand" class="icon_button" @click="emit('toggle-expand')" src="/src/assets/icon/menu.svg"
                    alt="Toggle Menu" />
                <img style="height: 30px;" :src="isExpand ? bart_bong_long : bart_bong_short" />
                <div v-if="isExpand" style="width: 30px; height: 30px;"></div>
            </div>
        </div>

        <div v-if="isExpand" class="horizontal_line"></div>

        <div v-if="isExpand" class="inner_sidebar_container">
            <ThemeButton :buttonText="isKhmer ? new_chat_khmer : new_chat_english" imageSrc="/src/assets/icon/add.svg"
                identification="new_chat_label" haveBorder />
                <ThemeButton :buttonText="isKhmer ? file_khmer : file_english" imageSrc="/src/assets/icon/folder.svg"
                identification="standard_icon_size" />
            <ThemeButton :buttonText="isKhmer ? save_khmer : save_english" imageSrc="/src/assets/icon/bookmark.svg"
                identification="standard_icon_size" />
            <ThemeButton :buttonText="isKhmer ? feedback_khmer : feedback_english"
                imageSrc="/src/assets/icon/review.svg" identification="feedback_label" />
            <ThemeButton :buttonText="isKhmer ? setting_khmer : setting_english" imageSrc="/src/assets/icon/setting.svg"
                identification="setting_label" />
        </div>

        <div v-if="!isExpand" class="inner_sidebar_container">

            <img class="button_border" src="/src/assets/icon/add.svg">

            <div class="button_theme">
                <img class="standard_icon_size" src="/src/assets/icon/folder.svg">
            </div>

            <div class="button_theme">
                <img class="standard_icon_size" src="/src/assets/icon/bookmark.svg">
            </div>

            <div class="button_theme">
                <img class="standard_icon_size" src="/src/assets/icon/review.svg">
            </div>

            <div class="button_theme">
                <img class="standard_icon_size" src="/src/assets/icon/setting.svg">
            </div>

        </div>

        <div v-if="isExpand" class="horizontal_line"></div>

        <div v-if="isExpand" class="chat_history_list"></div>

        <div v-if="isExpand" class="horizontal_line"></div>

        <div v-if="isExpand" class="inner_sidebar_container">
            <ThemeButton :buttonText="isKhmer ? clear_khmer : clear_english" imageSrc="/src/assets/icon/delete.svg"
                identification="delete_label" isRed />
        </div>
    </div>
</template>

<style scoped>
@keyframes sideBarOpen {
    0% {
        width: 70px;
    }

    100% {
        width: 400px;
    }
}

@keyframes sideBarClose {
    0% {
        width: 400px;
    }

    100% {
        width: 70px;
    }
}

.sidebar_container {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #131313;
    animation: sideBarOpen 0.1s linear;
}

.sidebar_container_close {
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #131313;
    animation: sideBarClose 0.1s linear;
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