<script setup>
import { defineProps, ref, nextTick, computed } from 'vue';

const props = defineProps({
    isKhmer: Boolean,
    chatArray: Array,
});

const type_english = "Bart Bong?";
const type_khmer = "បាទបង?";

const text = ref('');

const isSendButtonEnabled = computed(() => {
    return text.value.trim() !== '';
});

function add_new_message() {
    if (text.value.trim() !== '') {
        props.chatArray.push({ user: 'user', message: text.value });
        props.chatArray.push({ user: 'assistant', message: text.value });
        text.value = "";
        nextTick(() => {
            const textarea = document.querySelector('.chat_text_editor');
            textarea.focus(); 
        });
    }
}
</script>

<template>
    <div class="chat_container">
        <textarea v-model="text" @input="adjustHeight" ref="textarea"
            :style="{ height: height, maxHeight: '200px', minHeight: minHeight, lineHeight: '1.5' }"
            :placeholder="isKhmer ? type_khmer : type_english" rows="1" class="chat_text_editor">
        </textarea>
        <div class="chat_bar_tools">
            <div class="horizontal_container">
                <div class="button_border" style="padding: 5px;">
                    <img src="../assets/icon/attach_file.svg">
                </div>
                <div class="button_border" style="padding: 5px;">
                    <img src="../assets/icon/auto_fix.svg">
                </div>
            </div>
            <div class="button_border" style="padding: 5px" @click="add_new_message()" :class="{ disabled: !isSendButtonEnabled }">
                <img src="../assets/icon/arrow_upward.svg">
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
                textarea.style.height = 'auto'; // Reset height
                textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
            }
        },
    },
    data() {
        return {
            height: 'auto',
            minHeight: '40px',
        };
    }
};
</script>

<style scoped>
.chat_container {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid #383838;
    width: 100%;
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
    opacity: 0.5;
    pointer-events: none; 
}
</style>
