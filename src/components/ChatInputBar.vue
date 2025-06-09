<script setup>
import axios from "axios";
import khmerFlagIcon from "../assets/icon/kh_flag.svg";
import englishFlagIcon from "../assets/icon/us_flag.svg";
import { defineProps, defineEmits, ref, nextTick, computed } from "vue";

const props = defineProps({
  isKhmer: Boolean,
  isGenerating: Boolean,
  chatArray: Array,
});

const type_english = "Bart Bong?";
const type_khmer = "បាទបង?";

const text = ref("");
const khmerResponse = ref(true)

const emit = defineEmits(["set-is-generating-to", "scroll-to-bottom"]);

const isSendButtonEnabled = computed(() => {
  return text.value.trim() !== "";
});

function send_message(message_content) {
  if (text.value.trim() !== "") {
    emit("set-is-generating-to", true);
    console.log("isGenerating = " + props.isGenerating);
    add_new_message("user", message_content);
    fetch_api(message_content);
  }
}

function add_new_message(user_type, message_content) {
  props.chatArray.push({ role: user_type, content: message_content });
  if (user_type.toLowerCase() == "user") {
    text.value = "";
  }
  nextTick(() => {
    const textarea = document.querySelector(".chat_text_editor");
    textarea.focus();
  });
  emit("scroll-to-bottom");
}

async function fetch_api() {
  try {
    const response = await axios.post(
      "https://server.bartbong.com/v1/chat/completions",
      props.chatArray
    );

    console.log(response)

    emit("set-is-generating-to", false);

    if (response.data && response.data.content) {
      add_new_message(response.data.role, response.data.content);
    } else {
      console.error("Invalid response format:", response.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    emit("set-is-generating-to", false);
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
        <div class="button_border" style="padding: 5px">
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
