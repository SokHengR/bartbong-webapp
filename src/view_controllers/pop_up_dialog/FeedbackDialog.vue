<template>
  <div class="dark_background show_dialog_animation first_index">
    <div class="dialog_container vertical_container zoom_dialog_animation">
      <label style="font-weight: bold; font-size: 20px; text-align: center">
        {{ isKhmer ? title_kh : title_en }}
      </label>
      <textarea
        class="scoped_text_editor"
        :placeholder="isKhmer ? message_kh : message_en"
        v-model="feedbackContent"
      ></textarea>
      <div class="horizontal_container scoped_hstack">
        <button class="danger_button_border scoped_button_size" @click="closeAlert()">
          {{ isKhmer ? cancel_kh : cancel_en }}
        </button>
        <button class="safe_button_border scoped_button_size" @click="sendFeedback()">
          {{ isKhmer ? feedback_kh : feedback_en }}
        </button>
      </div>
    </div>
  </div>

  <LoadingIndicator v-if="isLoading" />

  <ConfirmAlertDialog
    v-if="showAlert"
    :titleLabel="alertTitle"
    :messageLabel="alertMessage"
    @cancel_confirm_dialog="handleConfirmAlertClose"
    @accept_confirm_dialog="handleConfirmAlertClose"
  />
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
import LoadingIndicator from "./LoadingIndicator.vue";
import ConfirmAlertDialog from "./ConfirmAlertDialog.vue";

const emit = defineEmits(["close_feedback_dialog"]);

const props = defineProps({
  isKhmer: Boolean
});

const feedbackContent = ref("");
const isLoading = ref(false);
const showAlert = ref(false);
const alertTitle = ref("");
const alertMessage = ref("");

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

async function sendFeedback() {
  const authToken = localStorage.getItem("session_token");
  const encodedContentBody = encodeURIComponent(feedbackContent.value);

  if (!authToken) {
    alertTitle.value = props.isKhmer ? "បញ្ហាក្នុងការផ្ញើមតិកែលម្អ" : "Feedback Submission Issue";
    alertMessage.value = props.isKhmer ? "មិនមានការអនុញ្ញាត។ សូមចូលម្តងទៀត។" : "Authentication token not found. Please log in again.";
    showAlert.value = true;
    return;
  }

  if (!encodedContentBody) {
    alertTitle.value = props.isKhmer ? "សូមបញ្ចូលមតិកែលម្អ" : "Please Enter Feedback";
    alertMessage.value = props.isKhmer ? "សូមបំពេញខ្លឹមសារមតិកែលម្អមុនពេលផ្ញើ។" : "Please fill in the feedback content before sending.";
    showAlert.value = true;
    return;
  }

  isLoading.value = true;

  try {
    const response = await fetch(
      `https://server.bartbong.com/api/feedback?authToken=${authToken}&contentBody=${encodedContentBody}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();

    if (data.status === "success") {
      alertTitle.value = props.isKhmer ? "ជោគជ័យ" : "Success";
      alertMessage.value = props.isKhmer ? "មតិកែលម្អរបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ" : "Your feedback was sent successfully";
    } else {
      alertTitle.value = props.isKhmer ? "បរាជ័យ" : "Failed";
      alertMessage.value = props.isKhmer ? "ការផ្ញើមតិកែលម្អបានបរាជ័យ។ សូមព្យាយាមម្តងទៀតនៅពេលក្រោយ។" : "Failed to send feedback. Please try again later.";
    }
  } catch (error) {
    console.error("Error sending feedback:", error);
    alertTitle.value = props.isKhmer ? "បញ្ហា​បច្ចេកទេស" : "Technical Issue";
    alertMessage.value = props.isKhmer ? "មានបញ្ហាក្នុងការភ្ជាប់ទៅម៉ាស៊ីនមេ។" : "There was an issue connecting to the server.";
  } finally {
    isLoading.value = false;
    showAlert.value = true;
  }
}

function handleConfirmAlertClose() {
  showAlert.value = false;
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