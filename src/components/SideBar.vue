<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import ThemeButton from "./CustomButton/ThemeButton.vue";
import ChatHistoryCell from "./ChatCellView/ChatHistoryCell.vue"; // Import ChatHistoryCell
import SettingDialog from "../view_controllers/pop_up_dialog/SettingDialog.vue";

import bart_bong_long from "/src/assets/bart_bong_long.png";
import bart_bong_short from "/src/assets/bart_bong_short.png";
import addIcon from "/src/assets/icon/add.svg";
import group3 from "/src/assets/icon/group3.svg";
import folderIcon from "/src/assets/icon/school.svg";
import reviewIcon from "/src/assets/icon/review.svg";
import settingIcon from "/src/assets/icon/setting.svg";
import deleteIcon from "/src/assets/icon/delete.svg";
import menuIcon from "/src/assets/icon/menu.svg";

import england_flag from "../assets/icon/us_flag.svg";
import cambodia_flag from "../assets/icon/kh_flag.svg";

const emit = defineEmits(["toggle-expand", "clear-all-chat", "toggle-language", "show-feedback-dialog", "delete-chat-history", "switch-conversation", "create-new-chat"]);

const props = defineProps({
  isExpand: Boolean,
  isKhmer: Boolean,
  isDesktop: Boolean,
  showFeedback: Boolean,
  chatHistoryArray: {
    // Add chatHistoryArray prop
    type: Array,
    default: () => [],
  },
});

const sideBarWidth = "350px";
const sideBarWidthMobile = "270px";
const sideBarAnimationDuration = "0.3s";

const justify_space = "justify-content: space-between;";
const justify_center = "justify-content: center;";

const new_chat_english = "New Chat";
const new_chat_khmer = "បង្កើតការពិភាក្សាថ្មី";

const assistant_english = "My Companion";
const assistant_khmer = "ជំនួយការរបស់បង";

const file_english = "Learn";
const file_khmer = "រៀនប្រើ";

const feedback_english = "Feedback";
const feedback_khmer = "ផ្តល់មតិកែលម្អ";

const setting_english = "Setting";
const setting_khmer = "ការកំណត់";

const clear_english = "Clear All Chat";
const clear_khmer = "ជម្រះការពិភាក្សាទាំងអស់";

const showSettingDialog = ref(false);

// Create a local reactive copy of chatHistoryArray for immediate UI update
const localChatHistoryArray = ref([]);

watch(() => props.chatHistoryArray, (newVal) => {
  localChatHistoryArray.value = [...newVal];
}, { immediate: true }); // Initialize immediately

function desktopClass() {
  if (props.isDesktop) {
    return " desktop_device";
  } else {
    return "_mobile mobile_device";
  }
}

function clear_all_chat() {
  emit("toggle-expand");
  emit("clear-all-chat");
}
function toggle_sys_language() {
  emit("toggle-language");
}
function show_feedback_dialog() {
  emit("show-feedback-dialog");
}
function show_setting_dialog_func() {
  showSettingDialog.value = true;
}
function close_setting_dialog_func() {
  showSettingDialog.value = false;
}

function handleDeleteChat(chatId) {
  // Update local array for immediate visual feedback
  localChatHistoryArray.value = localChatHistoryArray.value.filter(chat => chat.id !== chatId);
  // Emit to parent for actual state management
  emit('delete-chat-history', chatId);
}

async function handleChatSelected(conversationId) {
  try {
    const sessionToken = localStorage.getItem("session_token");
    if (!sessionToken) {
      console.error("Session token not found.");
      return;
    }
    const apiUrl = `https://server.bartbong.com/api/chat/conversations?token=${sessionToken}&conversation_id=${conversationId}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Conversation switched successfully:", data);
    emit('switch-conversation', conversationId); // Emit event to parent to update main chat view
  } catch (error) {
    console.error("Error switching conversation:", error);
  }
}

function create_new_chat_button() {
  emit("create-new-chat");
}
</script>

<template>
  <div :class="isExpand
    ? 'sidebar_container' + desktopClass()
    : 'sidebar_container_close' + desktopClass()
    ">
    <div class="inner_sidebar_container">
      <div class="sidebar_header" :style="isExpand ? justify_space : justify_center">
        <img v-if="isExpand" class="icon_button" @click="$emit('toggle-expand')" :src="menuIcon" alt="Toggle Menu" />
        <img style="height: 30px" :src="isExpand ? bart_bong_long : bart_bong_short" />
        <img v-if="isExpand" style="height: 30px; width: 30px" class="icon_button" @click="toggle_sys_language()"
          :src="props.isKhmer ? cambodia_flag : england_flag" />
      </div>
    </div>

    <div v-if="isExpand" class="horizontal_line"></div>

    <div v-if="isExpand" class="inner_sidebar_container">
      <ThemeButton :buttonText="props.isKhmer ? new_chat_khmer : new_chat_english" :imageSrc="addIcon"
        identification="new_chat_label" haveBorder @click="create_new_chat_button()" />
      <ThemeButton :buttonText="props.isKhmer ? assistant_khmer : assistant_english" :imageSrc="group3"
        identification="standard_icon_size" @click="$router.push('/chum')" />
      <ThemeButton :buttonText="props.isKhmer ? file_khmer : file_english" :imageSrc="folderIcon"
        identification="standard_icon_size" />
      <ThemeButton :buttonText="props.isKhmer ? feedback_khmer : feedback_english" :imageSrc="reviewIcon"
        identification="feedback_label" @click="show_feedback_dialog()" />
      <ThemeButton :buttonText="props.isKhmer ? setting_khmer : setting_english" :imageSrc="settingIcon"
        identification="setting_label" @click="show_setting_dialog_func()" />
    </div>

    <div v-if="!isExpand && isDesktop" class="inner_sidebar_container">
      <img class="button_border" :src="addIcon" alt="New Chat" @click="create_new_chat_button()" />

      <div class="button_theme" @click="$router.push('/chum')">
        <img class="standard_icon_size" :src="group3" alt="My Assistant" />
      </div>

      <div class="button_theme">
        <img class="standard_icon_size" :src="folderIcon" alt="My File" />
      </div>

      <div class="button_theme" @click="show_feedback_dialog">
        <img class="standard_icon_size" :src="reviewIcon" alt="Feedback" />
      </div>

      <div class="button_theme" @click="show_setting_dialog_func()">
        <img class="standard_icon_size" :src="settingIcon" alt="Setting" />
      </div>
    </div>

    <div v-if="isExpand" class="horizontal_line"></div>

    <div v-if="isExpand" class="chat_history_list">
      <ChatHistoryCell
        v-for="chat in localChatHistoryArray"
        :key="chat.id"
        :chatHistory="chat"
        @delete-chat="handleDeleteChat"
        @chat-selected="handleChatSelected"
      />
    </div>

    <div v-if="isExpand" class="horizontal_line"></div>

    <div v-if="isExpand" class="inner_sidebar_container">
      <ThemeButton :buttonText="props.isKhmer ? clear_khmer : clear_english" :imageSrc="deleteIcon"
        identification="delete_label" isRed @click="clear_all_chat()" />
    </div>
  </div>

  <SettingDialog v-if="showSettingDialog" @close_setting_dialog="close_setting_dialog_func" />
</template>

<style scoped>
@keyframes side_bar_open {
  0% {
    width: 70px;
  }

  100% {
    width: v-bind(sideBarWidth);
  }
}

@keyframes side_bar_close {
  0% {
    width: v-bind(sideBarWidth);
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
    width: v-bind(sideBarWidthMobile);
  }
}

@keyframes side_bar_close_mobile {
  0% {
    width: v-bind(sideBarWidthMobile);
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
  width: v-bind(sideBarWidth);
  flex-direction: column;
  align-items: center;
  background-color: #050505;
  border-left: 1px solid #383838;
  animation: side_bar_open v-bind(sideBarAnimationDuration);
}

.sidebar_container_close {
  width: 70px;
  flex-direction: column;
  align-items: center;
  background-color: #050505;
  border-left: 1px solid #383838;
  animation: side_bar_close v-bind(sideBarAnimationDuration);
}

/* ---------------------------------------- Mobile Version */
.sidebar_container_mobile {
  width: v-bind(sideBarWidthMobile);
  flex-direction: column;
  align-items: center;
  background-color: #050505;
  border-left: 1px solid #383838;
  animation: side_bar_open_mobile v-bind(sideBarAnimationDuration);
}

.sidebar_container_close_mobile {
  overlay: hidden;
  width: 0px;
  flex-direction: column;
  align-items: center;
  background-color: #050505;
  animation: side_bar_close_mobile v-bind(sideBarAnimationDuration);
}

/* ---------------------------------------- Mobile Version */

.inner_sidebar_container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-items: center;
  padding: 10px;
  width: 100%;
  gap: 2px;
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