<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import backIcon from "/src/assets/icon/back_arrow.svg";
import addIcon from "/src/assets/icon/add_circle.svg";
import groupChatIcon from "/src/assets/icon/group_chat.svg";
import group3Icon from "/src/assets/icon/group3.svg";
import settingIcon from "/src/assets/icon/setting.svg";
import accountIcon from "/src/assets/icon/account_circle.svg";
import sentIcon from "/src/assets/icon/arrow_upward.svg";
import smileIcon from "/src/assets/icon/smile_face.svg";
import fileIcon from "/src/assets/icon/attach_file.svg";

import ChatTextCell from "../components/ChatCellView/ChatTextCellWithProfile.vue";
import ChatProfileCell from "../components/ChatCellView/ChatProfileCell.vue";

const isKhmer = ref(false);
const chatInput = ref(null);
const hasInput = ref(false);

const isViewDetail = ref(false);

const tabIndex = ref(1);

const chat_title_kh = "ជជែកកំសាន្ត";
const chat_title_en = "Chat";

const type_here_kh = "សរសេរសារ";
const type_here_en = "Write your message";

const router = useRouter();

onMounted(() => {
    const isKhmerLang = localStorage.getItem("is_khmer");
    if (isKhmerLang !== null) {
        isKhmer.value = isKhmerLang === "true";
    }
});

function goBack() {
    router.push('/');
}

function adjustHeight() {
    nextTick(() => {
        const textarea = chatInput.value;
        if (textarea) {
            textarea.style.height = "22px";
            textarea.style.height = `${textarea.scrollHeight}px`;
            hasInput.value = textarea.value.length > 0;
        }
    });
}

function showChatDetail() {
    isViewDetail.value = true;
}

function closeChatDetail() {
    isViewDetail.value = false;
}

function selectTab(index) {
    tabIndex.value = index;
}
</script>

<template>
    <div class="main_screen">
        <div :class="['conversation_list_container', { 'hide_mobile': isViewDetail }]">
            <div class="scoped_title_bar">
                <img :src="backIcon" class="icon_button" @click="goBack">
                <label style="width: 100%; text-align: center; color: white;">
                    {{ isKhmer ? chat_title_kh : chat_title_en }}
                </label>
                <div style="width: 30px; height: 20px;"></div>
            </div>

            <div class="chat_list_view">
                <ChatProfileCell :isSelected="false" @profile-clicked="showChatDetail" />
                <ChatProfileCell :isSelected="true" @profile-clicked="showChatDetail" />
            </div>

            <div class="scoped_tab_bar">
                <div :class="tabIndex == 1 ? 'selected_button_scoped' : 'scoped_icon_button'" @click="selectTab(1)">
                    <img :src="groupChatIcon">
                </div>
                <div :class="tabIndex == 2 ? 'selected_button_scoped' : 'scoped_icon_button'" @click="selectTab(2)">
                    <img :src="group3Icon">
                </div>
                <div :class="tabIndex == 3 ? 'selected_button_scoped' : 'scoped_icon_button'" @click="selectTab(3)">
                    <img :src="accountIcon">
                </div>
                <div :class="tabIndex == 4 ? 'selected_button_scoped' : 'scoped_icon_button'" @click="selectTab(4)">
                    <img :src="settingIcon">
                </div>
            </div>
        </div>

        <div :class="['chat_detail_container', { 'hide_mobile': !isViewDetail }]">
            <div class="scoped_title_bar">
                <img :src="backIcon" class="icon_button show_on_mobile" @click="closeChatDetail">
                <label style="width: 100%; text-align: center; color: white;">
                    San Nimith
                </label>
                <div style="width: 30px; height: 20px;" class="show_on_mobile"></div>
            </div>

            <div class="chat_list_view">
                <ChatTextCell senderType="assistant" contentText="Hello! How can I help you?" :showProfile="true" />
                <ChatTextCell senderType="user" contentText="Hi! I'd like to learn more about your services."
                    :showProfile="true" />
            </div>

            <div class="scoped_tab_bar input_container">
                <textarea ref="chatInput" class="custom_text_area_scoped" @input="adjustHeight"
                    :placeholder="isKhmer ? type_here_kh : type_here_en"></textarea>
                <img :src="fileIcon" class="icon_button add_padding">
                <img :src="smileIcon" class="icon_button add_padding">
                <img v-if="hasInput" :src="sentIcon" class="icon_button add_padding">
            </div>
        </div>

    </div>
</template>

<style scoped>
@keyframes show_side_bar_anim {
    0% {
        width: 0px;
    }

    100% {
        width: 350px;
    }
}

.show_on_mobile {
    display: none;
}

.main_screen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.custom_text_area_scoped {
    width: 100%;
    height: 22px;
    resize: none;
    background-color: transparent;
    color: white;
    border: none;
    outline: none;
    overflow-y: scroll;
    font-size: 15px;
    max-height: 200px;
    line-height: 1.4;
}

.add_padding {
    padding: 5px;
    width: 20px;
    height: 20px;
}

.chat_list_view {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
}

.conversation_list_container {
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 100%;
    border-right: 1px solid #383838;
    animation: show_side_bar_anim 0.3s;
}

.scoped_icon_button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
    padding: 5px;
    cursor: pointer;
    border-radius: 10px;
}

.scoped_icon_button:hover {
    background-color: rgba(255, 255, 255, 0.3);
}

.selected_button_scoped {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
    padding: 5px;
    background-color: #007AFF;
    border-radius: 10px;
}

.scoped_title_bar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-bottom: 1px solid #383838;
}

.scoped_tab_bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-top: 1px solid #383838;
}

.input_container {
    align-items: end;
}

.chat_detail_container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}

@media (max-width: 900px) {
    .hide_mobile {
        display: none;
    }

    .conversation_list_container {
        width: 100%;
        animation: none;
    }

    .show_on_mobile {
        display: flex;
    }
}
</style>