<template>
  <div class="dark_background show_dialog_animation first_index">
    <div class="dialog_container vertical_container zoom_dialog_animation">
      <label style="font-weight: bold; font-size: 20px; text-align: center">
        Settings
      </label>
      <button class="button_border logout_button" @click="logout()">
        Logout
      </button>
    </div>
  </div>
  <LoadingIndicator v-if="isLoading" />
</template>

<script setup>
import { defineEmits, ref } from "vue";
import { useRouter } from "vue-router";
import LoadingIndicator from "./LoadingIndicator.vue";

const emit = defineEmits(["close_setting_dialog"]);
const router = useRouter();
const isLoading = ref(false);

async function logout() {
  isLoading.value = true;
  const sessionToken = localStorage.getItem("session_token");
  if (sessionToken) {
    try {
      await fetch(
        `https://server.bartbong.com/api/auth/logout?token=${sessionToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Logout request failed:", error);
    }
  }

  localStorage.clear();
  sessionStorage.clear();
  isLoading.value = false;
  router.push("/login");
  emit("close_setting_dialog");
}
</script>

<style scoped>
.first_index {
  z-index: 1;
}

.logout_button {
  width: 100%;
  font-weight: bold;
  font-size: 15px;
  margin-top: 10px;
  padding: 10px;
  background-color: red;
  color: white;
  border: none;
}
</style>
