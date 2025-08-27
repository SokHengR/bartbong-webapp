<script setup>
import { ref, onMounted, watchEffect } from "vue";
import ChatView from "../components/ChatView.vue";
import SideBar from "../components/SideBar.vue";
import { useRouter } from "vue-router";
// import ReviewDialog from "./pop_up_dialog/DevelopmentDialog.vue";
import ProfileDialog from "./pop_up_dialog/ProfileDialog.vue";
import DevelopmentDialog from "./pop_up_dialog/DevelopmentDialog.vue";
import FeedbackDialog from "./pop_up_dialog/FeedbackDialog.vue";
import ConfirmAlertDialog from "./pop_up_dialog/ConfirmAlertDialog.vue";
import LoadingIndicator from "./pop_up_dialog/LoadingIndicator.vue";

const router = useRouter();

const isExpand = ref(false);
const isKhmer = ref(true);
const chatArray = ref([]);
const ChatHistoryArray = ref([]); // Added ChatHistoryArray
const isGenerating = ref(true);
const isSignedIn = ref(false);
const acceptDevelopmentWarning = ref(false);
const showProfileDialog = ref(false);
const showFeedbackDialog = ref(false);
const showConfirmAlertDialog = ref(false)
const showLoadingIndicator = ref(false); // New reactive variable for loading indicator

const title_confirmDialog = ref("")
const message_confirmDialog = ref("")

const titleConfirm_kh = "តើបងប្រាកដទេ?";
const titleConfirm_en = "Are you sure?";
const messageConfirm_kh = "ការសន្ទនារបស់បងទាំងអស់នឹងត្រូវបានលុបចោល";
const messageConfirm_en = "All your chat history will be deleted";

onMounted(() => {
  const isKhmerLang = localStorage.getItem("is_khmer");
  if (isKhmerLang !== null) {
    isKhmer.value = isKhmerLang === "true";
  }
  const alreadySignedIn = localStorage.getItem("is_signed_in");
  if (alreadySignedIn !== null) {
    isSignedIn.value = alreadySignedIn === "true";
  }
  fetchChatHistory(); // Initialize ChatHistoryArray on mount
});

function toggleExpand() {
  isExpand.value = !isExpand.value;
}

async function fetchChatHistory() {
  const sessionToken = localStorage.getItem("session_token");
  if (!sessionToken) {
    console.error("Session token not found. Unable to fetch chat history.");
    return;
  }

  try {
    const response = await fetch(`https://server.bartbong.com/api/chat/all_chat_list?token=${sessionToken}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      ChatHistoryArray.value = data; // Replace with new response
      console.log("Chat history fetched successfully:", ChatHistoryArray.value);
    } else {
      console.error("Failed to fetch chat history on the server.");
    }
  } catch (error) {
    console.error("Error fetching chat history:", error);
  }
}

async function deleteChatHistory(conversationId) {
  const sessionToken = localStorage.getItem("session_token");
  if (!sessionToken) {
    console.error("Session token not found. Unable to delete chat history.");
    return;
  }

  try {
    const response = await fetch(`https://server.bartbong.com/api/chat/chat_list?conversation_id=${conversationId}&token=${sessionToken}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(`Chat history with ID ${conversationId} deleted successfully.`);
      ChatHistoryArray.value = ChatHistoryArray.value.filter(chat => chat.id !== conversationId);
    } else {
      console.error(`Failed to delete chat history with ID ${conversationId} on the server.`);
    };
  } catch (error) {
    console.error("Error deleting chat history:", error);
  }
}

async function clearAllChat() {
  console.log("Clean Chat");
  showLoadingIndicator.value = true; // Show loading indicator
  const sessionToken = localStorage.getItem("session_token");
  if (!sessionToken) {
    console.error("Session token not found. Unable to clear chat.");
    showLoadingIndicator.value = false; // Dismiss loading indicator on error
    return;
  }

  try {
    const response = await fetch(`https://server.bartbong.com/api/chat/all_chat_list?token=${sessionToken}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log("All chat history cleared successfully on the server.");
      chatArray.value = [];
      fetchChatHistory(); // Refresh ChatHistoryArray after clearing
    } else {
      console.error("Failed to clear chat history on the server.");
      // Optionally, handle error response from the server
    }
  } catch (error) {
    console.error("Error clearing chat history:", error);
  } finally {
    showLoadingIndicator.value = false; // Dismiss loading indicator regardless of success or failure
  }
}

function setIsGeneratingTo(isActive) {
  console.log("Setting isGenerating to: ", isActive);
  isGenerating.value = isActive;
}

function closeNoticeDialog() {
  acceptDevelopmentWarning.value = true;
}

function setProfileDialog(isActive) {
  showProfileDialog.value = isActive;
}

function toggleLanguage() {
  isKhmer.value = !isKhmer.value;
  localStorage.setItem("is_khmer", isKhmer.value ? "true" : "false");
}

function closeFeedbackDialog() {
  showFeedbackDialog.value = false;
}

function showFeedbackDialogAlert() {
  showFeedbackDialog.value = true;
}

function closeConfirmDialog() {
  showConfirmAlertDialog.value = false;
}

function acceptConfirmDialog() {
  clearAllChat();
  closeConfirmDialog();
}

function openConfirmDialog() {
  title_confirmDialog.value = isKhmer.value ? titleConfirm_kh : titleConfirm_en;
  message_confirmDialog.value = isKhmer.value ? messageConfirm_kh : messageConfirm_en;
  showConfirmAlertDialog.value = true;
}
</script>

<template>
  <ProfileDialog v-if="showProfileDialog" :titleLabel="title_confirmDialog" @close_profile_dialog="setProfileDialog" />
  <DevelopmentDialog v-if="!acceptDevelopmentWarning" @close_notice_dialog="closeNoticeDialog" />
  <FeedbackDialog v-if="showFeedbackDialog" @close_feedback_dialog="closeFeedbackDialog" :isKhmer="isKhmer" />
  <ConfirmAlertDialog v-if="showConfirmAlertDialog" :titleLabel="title_confirmDialog" :messageLabel="message_confirmDialog" @cancel_confirm_dialog="closeConfirmDialog"
    @accept_confirm_dialog="acceptConfirmDialog" />
  <LoadingIndicator v-if="showLoadingIndicator" /> <!-- Loading Indicator component -->
  <div class="split_view_container">
    <ChatView :isExpand="isExpand" :isKhmer="isKhmer" :isGenerating="isGenerating" :isSignedIn="isSignedIn"
      :chatArray="chatArray" @toggle-expand="toggleExpand" @set-is-generating-to="setIsGeneratingTo"
      @showProfileDialog="setProfileDialog" @message-sent="fetchChatHistory" />
    <SideBar :isExpand="isExpand" :isKhmer="isKhmer" :isDesktop="true" :showFeedback="showFeedbackDialog"
      :chatList="chatArray" :chatHistoryArray="ChatHistoryArray" @toggle-expand="toggleExpand" @clear-all-chat="openConfirmDialog"
      @toggle-language="toggleLanguage" @show-feedback-dialog="showFeedbackDialogAlert" @delete-chat-history="deleteChatHistory" />
  </div>
  <div v-if="isExpand" class="overlay_sidebar">
    <SideBar :isExpand="isExpand" :isKhmer="isKhmer" :isDesktop="false" :showFeedback="showFeedbackDialog"
      :chatList="chatArray" :chatHistoryArray="ChatHistoryArray" @toggle-expand="toggleExpand" @clear-all-chat="openConfirmDialog"
      @toggle-language="toggleLanguage" @show-feedback-dialog="showFeedbackDialogAlert" @delete-chat-history="deleteChatHistory" />
    <div class="decoy_sidebar" @click="toggleExpand"></div>
  </div>
</template>

<style scoped>
@keyframes overlay_sidebar_open {
  0% {
    background-color: rgba(0, 0, 0, 0);
  }

  100% {
    background-color: rgba(0, 0, 0, 0.7);
  }
}

.split_view_container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.decoy_sidebar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.overlay_sidebar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
  display: none;
  justify-content: right;
  animation: overlay_sidebar_open 0.1s;
}

@media (max-width: 720px) {
  .overlay_sidebar {
    display: flex;
  }
}
</style>
