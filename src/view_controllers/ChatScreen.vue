<script setup>
import { ref, onMounted, watchEffect } from "vue";
import ChatView from "../components/ChatView.vue";
import SideBar from "../components/SideBar.vue";
import { useRouter } from "vue-router";
import ReviewDialog from "./pop_up_dialog/DevelopmentDialog.vue";
import ProfileDialog from "./pop_up_dialog/ProfileDialog.vue";
import DevelopmentDialog from "./pop_up_dialog/DevelopmentDialog.vue";

const router = useRouter();

const isExpand = ref(false);
const isKhmer = ref(true);
const chatArray = ref([]);
const isGenerating = ref(true);
const isSignedIn = ref(false);
const acceptDevelopmentWarning = ref(false);
const showProfileDialog = ref(false);

onMounted(() => {
  const isKhmerLang = localStorage.getItem("is_khmer");
  if (isKhmerLang !== null) {
    isKhmer.value = isKhmerLang === "false";
  }
  const alreadySignedIn = localStorage.getItem("is_signed_in");
  if (alreadySignedIn !== null) {
    isSignedIn.value = alreadySignedIn === "true";
  }
});

watchEffect(() => {
  if (isSignedIn.value === false) {
    router.push("/login");
  }
});

function toggleExpand() {
  isExpand.value = !isExpand.value;
}

function clearAllChat() {
  console.log("Clean Chat");
  chatArray.value = [];
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
</script>

<template>
  <ProfileDialog
    v-if="showProfileDialog"
    @close_profile_dialog="setProfileDialog"
  />
  <DevelopmentDialog
    v-if="!acceptDevelopmentWarning"
    @close_notice_dialog="closeNoticeDialog"
  />
  <div class="split_view_container">
    <ChatView
      :isExpand="isExpand"
      :isKhmer="isKhmer"
      :isGenerating="isGenerating"
      :isSignedIn="isSignedIn"
      :chatArray="chatArray"
      @toggle-expand="toggleExpand"
      @set-is-generating-to="setIsGeneratingTo"
      @showProfileDialog="setProfileDialog"
    />
    <SideBar
      :isExpand="isExpand"
      :isKhmer="isKhmer"
      :isDesktop="true"
      :chatList="chatArray"
      @toggle-expand="toggleExpand"
      @clear-all-chat="clearAllChat"
      @toggle-language="toggleLanguage"
    />
  </div>
  <div v-if="isExpand" class="overlay_sidebar">
    <SideBar
      :isExpand="isExpand"
      :isKhmer="isKhmer"
      :isDesktop="false"
      :chatList="chatArray"
      @toggle-expand="toggleExpand"
      @clear-all-chat="clearAllChat"
      @toggle-language="toggleLanguage"
    />
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
