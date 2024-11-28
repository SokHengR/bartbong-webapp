<script setup>
import { computed, onMounted } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css'

const props = defineProps({
    senderType: String,
    contentText: String,
})

// Configure marked to use highlight.js for code blocks
marked.setOptions({
    highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        try {
            return hljs.highlight(code, { language }).value
        } catch (error) {
            return code
        }
    },
    langPrefix: 'hljs language-',
})

// Compute the markdown-rendered content
const renderedContent = computed(() => {
    return marked.parse(props.contentText || '')
})

function isUser() {
    return props.senderType === 'user'
}

// Add this to ensure highlighting is applied after rendering
onMounted(() => {
    hljs.highlightAll()
})
</script>

<template>
    <div :class="'chat_text_cellview ' + (isUser() ? 'for_user' : 'for_assistant')">
        <div :class="isUser() ? 'user_chat_container' : 'assistant_chat_container'" v-html="renderedContent"
            ref="contentRef"></div>
    </div>
</template>

<style>
.chat_text_cellview {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: top;
    padding-top: 10px;
    box-sizing: border-box;
}

.for_user {
    justify-content: right;
}

.for_user p {
    margin: 0px;
}

.for_assistant {
    justify-content: left;
}

.user_chat_container {
    word-wrap: break-word;
    color: white;
    padding: 10px;
    border-radius: 5px;
    background-color: #398300;
    max-width: 80%;
}

.assistant_chat_container {
    word-wrap: break-word;
    color: white;
    background-color: transparent;
    box-sizing: border-box;
    max-width: 100%;
}

.user_chat_container pre {
    background-color: rgba(255, 255, 255, 0.2) !important;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
}

.assistant_chat_container pre {
    background-color: rgba(0, 0, 0, 0.1) !important;
    padding: 10px;
    border-radius: 4px;
    overflow-x: auto;
}

.user_chat_container code,
.assistant_chat_container code {
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
}
</style>