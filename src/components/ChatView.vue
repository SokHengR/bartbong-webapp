<script setup>
import { defineProps, defineEmits } from "vue";
import ChatBar from "./ChatBar.vue";
import ChatTextCell from "./ChatCellView/ChatTextCell.vue";
import GeneratingCell from "./ChatCellView/GeneratingCell.vue";

const props = defineProps({
  isExpand: Boolean,
  isKhmer: Boolean,
  isGenerating: Boolean,
  chatArray: Array,
});

const emit = defineEmits(["toggle-expand", "set-is-generating-to"]);

const message_english = "How can I help you, Bong?";
const message_khmer = "តើប្អូនអាចជួយអ្វីបងបាន?";

const make_mistake_english =
  "Bart Bong can make mistakes. Please double-check it.";
const make_mistake_khmer =
  "កម្មវិធីបាទបងអាចនឹងផ្តល់នូវព័ត៌មានមិនត្រឹមត្រូវ សូមបងត្រួតពិនិត្យមើលផង";
</script>

<template>
  <div class="chat_view_container">
    <div class="chat_title_bar">
      <div class="horizontal_container" style="gap: 5px;">
        <img class="profile_div" src="/src/assets/default_profile.jpg" />
        <img class="icon_button" src="/src/assets/icon/app.svg" />
      </div>

      <div class="button_border">
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

    <div class="main_chat_container">
      <div v-if="chatArray.length == 0" class="chat_title_welcome">
        {{ isKhmer ? message_khmer : message_english }}
      </div>

      <div v-if="chatArray.length > 0" class="chat_list_scrollview">
        <div class="chat_list_scroll_content">
          <div v-for="(chat, index) in chatArray" :key="index">
            {{ console.log(chatArray) }}
            <ChatTextCell :senderType="chat.role" :contentText="chat.content" />
          </div>

          <GeneratingCell v-if="isGenerating" :isKhmer="isKhmer" />
        </div>
      </div>

      <ChatBar
        :isKhmer="isKhmer"
        :isGenerating="isGenerating"
        :chatArray="chatArray"
        @set-is-generating-to="(isActive) => emit('set-is-generating-to', isActive)"
      />
    </div>

    <div class="mini_friendly_reminder">
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

.mini_friendly_reminder {
  color: white;
  font-size: 12px;
  padding: 4px;
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
  animation: chat_list_expansion 1s;
}

.chat_title_welcome {
  font-family: "Suwannaphum", sans-serif;
  color: white;
  padding: 20px;
  font-size: 30px;
  text-align: center;
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
  height: calc(100% - 105px);
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
</style>
