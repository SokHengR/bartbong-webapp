<script setup>
import axios from "axios";
import khmerFlagIcon from "../assets/icon/kh_flag.svg";
import englishFlagIcon from "../assets/icon/us_flag.svg";
import { defineProps, defineEmits, ref, nextTick, computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  isKhmer: Boolean,
  isGenerating: Boolean,
  chatArray: Array,
  conversationId: String,
});

const type_english = "Bart Bong?";
const type_khmer = "បាទបង?";

const text = ref("");
const khmerResponse = ref(false)

const emit = defineEmits(["set-is-generating-to", "scroll-to-bottom", "message-sent", "new-message", "update:conversationId"]);
const router = useRouter();

const isSendButtonEnabled = computed(() => {
  return text.value.trim() !== "";
});

function printConversationId() {
  console.log("Conversation ID:", props.conversationId);
}

function send_message(message_content) {
  if (text.value.trim() !== "") {
    emit("set-is-generating-to", true);
    console.log("isGenerating = " + props.isGenerating);
    emit("new-message", { role: "user", content: message_content });
    text.value = "";
    fetch_api(message_content);
  }
}

async function fetch_api(message_content) {
  try {
    const authToken = localStorage.getItem("session_token");
    const preferLang = khmerResponse.value ? "kh" : "en";

    const requestBody = {
      conversationId: props.conversationId,
      chatStructure: {
        content: message_content,
        metaContent: message_content,
        role: "user",
        preferLang: preferLang,
      },
    };

    const response = await axios.post(
      `https://server.bartbong.com/api/chat?authToken=${authToken}`,
      requestBody
    );

    console.log(response)

    emit("set-is-generating-to", false);

    if (response.data && response.data.status === "fail" && response.data.message === "unauthorized") {
      localStorage.clear();
      console.log("Unauthorized: Local storage cleared.");
      router.push('/login');
      return; 
    }

    if (response.data && response.data.chatStructure) {
      if (response.data.conversationId) {
        emit("update:conversationId", response.data.conversationId);
      }
      emit("new-message", { role: response.data.chatStructure.role, content: response.data.chatStructure.content });
      emit('message-sent');
    } else {
      console.error("Invalid response format:", response.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    emit("set-is-generating-to", false);
  } finally {
    nextTick(() => {
      const textarea = document.querySelector(".chat_text_editor");
      if (textarea) {
        textarea.focus();
      }
    });
    emit("scroll-to-bottom");
  }
}

function toggle_response_language() {
  khmerResponse.value = !khmerResponse.value;
}
</script>

<template>
  <div class="chat_input_container">
    <textarea v-model="text" @input="adjustHeight" ref="textarea" :style="{
      height: height,
      maxHeight: '200px',
      minHeight: minHeight,
      lineHeight: '1.5',
    }" :placeholder="isKhmer ? type_khmer : type_english" rows="1" class="chat_text_editor">
    </textarea>
    <div class="chat_bar_tools">
      <div class="horizontal_container">
        <div class="button_border" style="padding: 5px">
          <img src="../assets/icon/attach_file.svg" />
        </div>
        <div class="button_border" style="padding: 5px" @click="printConversationId()">
          <img src="../assets/icon/auto_fix.svg" />
        </div>
        <div class="button_border" style="padding: 5px" @click="toggle_response_language()">
          <img style="width: 25px; padding-right: 5px;" :src="khmerResponse ? khmerFlagIcon : englishFlagIcon" />
          {{ khmerResponse ? "ភាសាខ្មែរ" : "English" }}
        </div>
      </div>
      <div class="button_border" style="padding: 5px; justify-content: center;" @click="send_message(text)"
        :class="{ disabled: !isSendButtonEnabled }">
        <img src="../assets/icon/arrow_upward.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    adjustHeight() {
      const textarea = this.$refs.textarea;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    },
  },
  data() {
    return {
      height: "auto",
      minHeight: "30px",
    };
  },
};
</script>

<style scoped>
.chat_input_container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #383838;
  width: calc(100% - 40px);
  max-width: 800px;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.03);
}

.chat_text_editor {
  font-size: 15px;
  width: 100%;
  resize: none;
  background-color: transparent;
  color: white;
  border: none;
  outline: none;
  box-sizing: border-box;
}

.chat_bar_tools {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
}

.disabled {
  pointer-events: none;
}
</style>