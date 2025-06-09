<template>
  <div class="dark_background show_dialog_animation first_index">
    <div class="dialog_container vertical_container zoom_dialog_animation">
      <label style="font-weight: bold; font-size: 20px; text-align: center">
        {{ titleLabel }}
      </label>
      <label style="text-align: center; font-size: 15px">
        {{ messageLabel }}
      </label>
      <button class="button_border understand_button" @click="closeAlert()">
        {{ buttonLabel }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";

const props = defineProps({
  titleLabel: String,
  messageLabel: String,
  buttonLabel: String,
});

const emit = defineEmits(["close_custom_dialog"]);

function closeAlert() {
  emit("close_custom_dialog");
}
</script>

<style scoped>
.first_index {
  z-index: 1;
}

.understand_button {
  width: 100%;
  font-weight: bold;
  font-size: 15px;
  margin-top: 10px;
  padding: 10px;
}
</style>
