<template>
    <div :class="['chat-cell', { 'user-cell': isUser }]">
        <div class="content-bubble" :class="{ user: isUser }">
            <div ref="markdownContent" class="markdown-content" v-html="processedContent"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUpdated, defineProps } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import DOMPurify from 'dompurify'

const props = defineProps({
    senderType: String,
    contentText: String
})

const isUser = computed(() => props.senderType === 'user')
const markdownContent = ref(null)

// Configure marked
marked.setOptions({
    highlight: (code, lang) => {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
    },
    breaks: true
})

// Process markdown content
const processedContent = computed(() => {
    const rawHtml = marked(props.contentText || '')
    return DOMPurify.sanitize(rawHtml)
})

// Add code block decorations
const processCodeBlocks = () => {
    if (!markdownContent.value) return

    markdownContent.value.querySelectorAll('pre').forEach((preElement) => {
        if (preElement.dataset.processed) return

        const codeElement = preElement.querySelector('code')
        const language = [...codeElement.classList]
            .find(c => c.startsWith('language-'))?.replace('language-', '') || 'code'

        // Add code block header
        const header = document.createElement('div')
        header.className = 'code-title-bar'
        header.innerHTML = `
        <label class="language-code">${language}</label>
        <button class="copy-button">Copy</button>
      `

        // Add copy functionality
        const copyButton = header.querySelector('.copy-button')
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(codeElement.innerText)
            copyButton.textContent = 'Copied!'
            setTimeout(() => copyButton.textContent = 'Copy', 2000)
        })

        preElement.insertBefore(header, codeElement)
        preElement.dataset.processed = true
    })
}

onMounted(processCodeBlocks)
onUpdated(processCodeBlocks)
</script>

<style scoped>
@keyframes expandHeight {
    from {
        max-height: 0px;
    }
    to {
        max-height: 10000px;
    }
}

.chat-cell {
    display: flex;
    margin: 8px 0;
}

.user-cell {
    justify-content: flex-end;
}

.content-bubble {
    color: white;
    max-width: 92%;
    overflow: hidden;
    padding: 12px 16px;
    border-radius: 12px;
    background: transparent;
    animation: expandHeight 3s ease-in-out;
}

.content-bubble.user {
    max-width: 80%;
    background: #007AFF;
    animation: none;
}

.markdown-content :deep(*) {
    margin: 0.2em 0;
    line-height: 1.5;
}

.markdown-content :deep(h1) {
    font-size: 1.5em;
    font-weight: bold;
}

.markdown-content :deep(code) {
    background: rgba(255, 255, 255, 0.3);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
}

.markdown-content :deep(pre) {
    position: relative;
    background: rgb(55, 55, 55);
    border: 1px solid #9d9d9d;
    border-radius: 8px;
    margin: 0.5em 0;
    overflow: hidden;
}

.markdown-content :deep(pre code) {
    background: none;
    padding: 1em;
    display: block;
    overflow-x: auto;
}

::v-deep(.code-title-bar) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0px;
    padding: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #9d9d9d;
    background: rgb(0, 0, 0);
}

::v-deep(.language-code) {
    color: white;
    font-weight: bold;
}

::v-deep(.language-code::first-letter) {
    text-transform: uppercase;
}

::v-deep(.copy-button) {
    background-color: transparent;
    border: 1px solid transparent;
    color: white;
    cursor: pointer;
}
::v-deep(.copy-button:hover) {
    border: 1px solid orange;
    border-radius: 5px;;
}

.copy-button:hover {
    background: rgba(255, 255, 255, 0.1);
}

.content-bubble.user .copy-button {
    color: #fff;
}
</style>