<script setup>
import { defineProps, defineEmits } from 'vue';
import ThemeButton from './ThemeButton.vue';

const emit = defineEmits(['toggle-expand', 'clear-all-chat']);

const props = defineProps({
    isExpand: Boolean,
    isKhmer: Boolean,
    isDesktop: Boolean,
});

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

function desktopClass() {
    if (props.isDesktop) {
        return ' desktop_device';
    } else {
        return '_mobile mobile_device';
    }
}

function clear_all_chat() {
    emit('toggle-expand');
    emit('clear-all-chat');
}
</script>

<template>
    <div :class="isExpand ? 'sidebar_container' + desktopClass() : 'sidebar_container_close' + desktopClass()">
        <div class="inner_sidebar_container">
            <div class="sidebar_header" :style="isExpand ? justify_space : justify_center">
                <img v-if="isExpand" class="icon_button" @click="$emit('toggle-expand')" src="/src/assets/icon/menu.svg"
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

        <div v-if="!isExpand && isDesktop" class="inner_sidebar_container">

            <img class="button_border" src="/src/assets/icon/add.svg" alt="New Chat">

            <div class="button_theme">
                <img class="standard_icon_size" src="/src/assets/icon/folder.svg" alt="My File">
            </div>

            <div class="button_theme">
                <img class="standard_icon_size" src="/src/assets/icon/bookmark.svg" alt="Saved Chat">
            </div>

            <div class="button_theme">
                <img class="standard_icon_size" src="/src/assets/icon/review.svg" alt="Feedback">
            </div>

            <div class="button_theme">
                <img class="standard_icon_size" src="/src/assets/icon/setting.svg" alt="Setting">
            </div>

        </div>

        <div v-if="isExpand" class="horizontal_line"></div>

        <div v-if="isExpand" class="chat_history_list"></div>

        <div v-if="isExpand" class="horizontal_line"></div>

        <div v-if="isExpand" class="inner_sidebar_container">
            <ThemeButton :buttonText="isKhmer ? clear_khmer : clear_english" imageSrc="/src/assets/icon/delete.svg"
                identification="delete_label" isRed @click="clear_all_chat()" />
        </div>
    </div>
</template>

<style scoped>
@keyframes side_bar_open {
    0% {
        width: 70px;
    }

    100% {
        width: 300px;
    }
}

@keyframes side_bar_close {
    0% {
        width: 300px;
    }

    100% {
        width: 70px;
    }
}

/* ---------------------------------------- Mobile Version */
@keyframes side_bar_open_mobile {
    0% {
        width: 0px;
    }

    100% {
        width: 300px;
    }
}

@keyframes side_bar_close_mobile {
    0% {
        width: 300px;
    }

    100% {
        width: 0px;
    }
}

/* ---------------------------------------- Mobile Version */

.mobile_device {
    display: flex;
}

.desktop_device {
    display: flex;
}

.sidebar_container {
    width: 300px;
    flex-direction: column;
    align-items: center;
    background-color: #131313;
    animation: side_bar_open 0.1s;
}

.sidebar_container_close {
    width: 70px;
    flex-direction: column;
    align-items: center;
    background-color: #131313;
    animation: side_bar_close 0.1s;
}

/* ---------------------------------------- Mobile Version */
.sidebar_container_mobile {
    width: 300px;
    flex-direction: column;
    align-items: center;
    background-color: #131313;
    animation: side_bar_open_mobile 0.1s;
}

.sidebar_container_close_mobile {
    overlay: hidden;
    width: 0px;
    flex-direction: column;
    align-items: center;
    background-color: #131313;
    animation: side_bar_close_mobile 0.1s;
}

/* ---------------------------------------- Mobile Version */

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

@media (max-width: 720px) {
    .desktop_device {
        display: none;
    }
}
</style>