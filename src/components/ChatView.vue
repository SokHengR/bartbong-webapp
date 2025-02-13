<script setup>
import { defineProps, defineEmits, ref, nextTick } from "vue";
import ChatInputBar from "./ChatInputBar.vue";
import ChatTextCell from "./ChatCellView/ChatTextCell.vue";
import GeneratingCell from "./ChatCellView/GeneratingCell.vue";

const props = defineProps({
  isExpand: Boolean,
  isKhmer: Boolean,
  isGenerating: Boolean,
  isSignedIn: Boolean,
  chatArray: Array,
});

const emit = defineEmits(["toggle-expand", "set-is-generating-to"]);

const chatListScrollView = ref(null);

const message_english = "How can I help you, Bong?";
const message_khmer = "តើប្អូនអាចជួយអ្វីបងបាន?";

const make_mistake_english =
  "Bart Bong can make mistakes. Please double-check it.";
const make_mistake_khmer =
  "កម្មវិធីបាទបងអាចនឹងផ្តល់នូវព័ត៌មានមិនត្រឹមត្រូវ សូមបងត្រួតពិនិត្យមើលផង";
const signin_english = "Sign In";
const signin_khmer = "ចូលគណនី";

function scrollToBottom() {
  nextTick(() => {
    if (chatListScrollView.value) {
      chatListScrollView.value.scrollTop =
        chatListScrollView.value.scrollHeight;
    }
  });
}

function presentLoginScreen() {
  window.location.href = "/login";
}
</script>

<template>
  <div class="chat_view_container">
    <div class="chat_title_bar">
      <div v-if="isSignedIn" class="horizontal_container" style="gap: 5px">
        <img class="profile_div" src="/src/assets/default_profile.jpg" />
      </div>
      <div v-if="!isSignedIn" class="button_border" @click='presentLoginScreen()'>
        {{ isKhmer ? signin_khmer : signin_english }}
      </div>

      <div class="button_border no_break_line">
        បាទបង (ឥតគិតថ្លៃ)
        <img src="/src/assets/icon/expand_down.svg" />
      </div>

      <div>
        <img
          v-if="!isExpand"
          class="icon_button"
          src="/src/assets/icon/menu.svg"
          @click="emit('toggle-expand')"
        />
      </div>
    </div>

    <div class="horizontal_line"></div>

    <div v-if="chatArray.length != 0" class="chat_title_name_bar">
      <div class="chat_title_name_bar_container">
        <img class="title_logo_profile" src="../assets/bart_bong_logo.jpg" />
        <div
          style="
            display: flex;
            flex: 1;
            flex-direction: column;
            gap: 1px;
            overflow: hidden;
          "
        >
          <label class="no_break_line" style="font-weight: bold">
            San Nimith
          </label>
          <label class="no_break_line" style="font-size: small; color: gray">
            Your online assistant
          </label>
        </div>
        <div style="display: flex; flex-direction: row; gap: 5px">
          <div class="safe_button_border" style="padding: 5px">
            <img style="width: 20px" src="../assets/icon/bookmark_green.svg" />
          </div>

          <div class="warn_button_border" style="padding: 5px">
            <img style="width: 20px" src="../assets/icon/cleaning.svg" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="main_chat_container"
      :style="{
        height: `calc(100% - ${chatArray.length > 0 ? '160px' : '100px'})`,
      }"
    >
      <div v-if="chatArray.length == 0" class="chat_title_welcome">
        {{ isKhmer ? message_khmer : message_english }}
      </div>

      <div
        v-if="chatArray.length > 0"
        class="chat_list_scrollview"
        ref="chatListScrollView"
      >
        <div class="chat_list_scroll_content">
          <div v-for="(chat, index) in chatArray" :key="index">
            <ChatTextCell :senderType="chat.role" :contentText="chat.content" />
          </div>

          <GeneratingCell v-if="isGenerating" :isKhmer="isKhmer" />
        </div>
      </div>

      <ChatInputBar
        :isKhmer="isKhmer"
        :isGenerating="isGenerating"
        :chatArray="chatArray"
        @set-is-generating-to="
          (isActive) => emit('set-is-generating-to', isActive)
        "
        @scroll-to-bottom="scrollToBottom"
      />
      
    </div>

    <div class="mini_friendly_reminder no_break_line">
      {{ isKhmer ? make_mistake_khmer : make_mistake_english }}
    </div>
  </div>
</template>

<style scoped>
@keyframes chat_list_expansion {
  0% {
    height: 0%;
  }

  100% {
    height: 100%;
  }
}

.chat_title_name_bar {
  color: white;
  width: 100%;
  padding: 10px;
  max-width: 800px;
  border: 1px solid #383838;
  box-sizing: border-box;
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.chat_title_name_bar_container {
  display: flex;
  flex-direction: row;
  height: 45px;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  gap: 10px;
}

.title_logo_profile {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 1px solid #383838;
}

.mini_friendly_reminder {
  flex: 1;
  width: 100%;
  color: white;
  font-size: 12px;
  text-align: center;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;;
}

.chat_list_scroll_content {
  width: calc(100% - 60px);
  max-width: 780px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.chat_list_scrollview {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
  animation: chat_list_expansion 0.3s linear;
}

.chat_list_scrollview::-webkit-scrollbar {
  width: 6px;
}

.chat_list_scrollview::-webkit-scrollbar-track {
  background: transparent;
}

.chat_list_scrollview::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

.chat_list_scrollview::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.chat_title_welcome {
  font-family: "Koulen", sans-serif;;
  color: white;
  padding: 20px;
  font-size: 30px;
  text-align: center;
}

.roboto_condensed {
  font-family: "Roboto Condensed", sans-serif;
  font-weight: bold;
}

.chat_view_container {
  width: 100%;
  flex-grow: 1;
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
  padding-left: 20px;
  padding-right: 20px;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
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

@media (max-width: 840px) {
  .chat_title_name_bar {
    border-left: none;
    border-right: none;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
}
</style>
