<template>
  <div class="chat_history_cell" @click="selectChat">
    <div class="chat_info">
      <p class="chat_title">{{ chatTitle }}</p>
      <p class="chat_date">{{ formattedDate }}</p>
    </div>
    <button @click.stop="deleteChatHistory" class="delete_button">
      <img src="../../assets/icon/delete.svg" alt="Delete" class="delete_icon" />
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    chatHistory: {
      type: Object,
      required: true,
    },
  },
  emits: ['delete-chat', 'chat-selected'],
  setup(props, { emit }) {
    const chatTitle = computed(() => props.chatHistory.title || "New Chat");

    const formattedDate = computed(() => {
      const date = new Date(props.chatHistory.updated_at);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const chatDate = new Date(date);
      chatDate.setHours(0, 0, 0, 0);

      if (chatDate.getTime() === today.getTime()) {
        return "Today";
      } else {
        const options = { day: 'numeric', month: 'long' };
        return date.toLocaleDateString('en-US', options);
      }
    });

    const deleteChatHistory = () => {
      emit('delete-chat', props.chatHistory.id);
    };

    const selectChat = () => {
      emit('chat-selected', props.chatHistory.id);
    };

    return {
      chatTitle,
      formattedDate,
      deleteChatHistory,
      selectChat,
    };
  },
};
</script>

<style scoped>
.chat_history_cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  padding-left: 10px;
  border-bottom: solid 1px #383838;
  cursor: pointer;
}

.chat_history_cell:hover {
  background-color: #ffffff15;
}

.chat_info {
  flex-grow: 1;
  min-width: 0;
  overflow: hidden;
}

.chat_title {
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat_date {
  font-size: 12px;
  color: #979797;
}

.delete_button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  margin-left: 10px;
}

.delete_icon {
  width: 20px;
  height: 20px;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.delete_button:hover .delete_icon {
  opacity: 1;
}
</style>
