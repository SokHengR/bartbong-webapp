<template>
  <div class="dark_background show_dialog_animation first_index">
    <div class="dialog_container vertical_container zoom_dialog_animation">
      <label style="font-weight: bold; font-size: 20px; text-align: center">
        {{ isKhmer ? title_kh : title_en }}
      </label>
      <textarea class="scoped_text_editor" :placeholder="isKhmer ? message_kh : message_en"></textarea>
      <div class="horizontal_container scoped_hstack">
        <button class="danger_button_border scoped_button_size" @click="closeAlert()">
          {{ isKhmer ? cancel_kh : cancel_en }}
        </button>
        <button class="safe_button_border scoped_button_size" @click="closeAlert()">
          {{ isKhmer ? feedback_kh : feedback_en }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";

const emit = defineEmits(["close_feedback_dialog"]);

const props = defineProps({
  isKhmer: Boolean
});

const cancel_en = "Cancel";
const cancel_kh = "បោះបង់";

const feedback_en = "Send Feedback";
const feedback_kh = "ផ្ញើមតិកែលម្អ";

const message_en = "You have any ideas for new features or feedback? Tell us!";
const message_kh = "បងមានគំនិតសម្រាប់មុខងារថ្មី ឬមតិកែលម្អមែនទេ? ប្រាប់ប្អូនបាន!";

const title_en = "Give Feedback";
const title_kh = "ផ្តល់គំនិតយោបល់កែលម្អ";


function closeAlert() {
  emit("close_feedback_dialog");
}
</script>

<style scoped>
.first_index {
  z-index: 2;
}

.scoped_hstack {
  width: 100%;
}

.scoped_button_size {
  width: 100%;
  font-family: 'Noto Sans', sans-serif;
}

.scoped_text_editor {
  text-align: left;
  font-size: 15px;
  color: white;
  border: solid 1px #383838;
  padding: 5px;
  border-radius: 10px;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  background-color: transparent;
  resize: none;
}
</style>