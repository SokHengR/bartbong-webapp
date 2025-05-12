<script setup>
import { ref, onMounted } from "vue";
import profileImage from "/src/assets/bart_bong_logo.jpg";
import verifiedIcon from "/src/assets/icon/verified_icon.svg";

const isKhmer = ref(true);

const emit = defineEmits(["close_profile_dialog"]);

const close_khmer = "បិទ";
const close_english = "Close";

const edit_khmer = "កែសម្រួលទិន្នន័យ";
const edit_english = "Edit Information";

onMounted(() => {
    const isKhmerLang = localStorage.getItem('is_khmer');
    if (isKhmerLang !== null) {
        isKhmer.value = isKhmerLang === "false";
    }
});

function closeAlert() {
    emit("close_profile_dialog", false);
}
</script>

<template>
    <div class="dark_background show_dialog_animation first_index">
        <div class="dialog_container_profile zoom_dialog_animation">
            <div class="scroll_content_container">
                <img :src="profileImage" class="profile">
                <div class="title_verify_label">
                    BART BONG
                    <img :src="verifiedIcon">
                </div>
                <div style="text-align: center; font-size: 17px; color: gray">
                    Your online assistant
                </div>
                <div class="prompt_label">
                    Be Kind
                </div>
            </div>

            <div class="horizontal_line"></div>

            <div style="padding: 10px;">
                <button class="button_border profile_close_button" @click="closeAlert()">
                    {{ isKhmer ? close_khmer : close_english }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.first_index {
    z-index: 2;
}

.dialog_container_profile {
    display: flex;
    flex-direction: column;
    background-color: #141414;
    border: 1px solid #383838;
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
    margin: 20px;
    color: white;
    box-sizing: border-box;
}

.scroll_content_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: auto;
    overflow-x: hidden;
    width: 100%;
    padding: 10px;
    gap: 5px;
    box-sizing: border-box;
}

.title_verify_label {
    font-weight: bold;
    font-size: 25px;
    display: flex;
    text-align: center;
    justify-content: center;
    gap: 5px;
    box-sizing: border-box;
}

.prompt_label {
    text-align: left;
    font-size: 15px;
    color: gray;
    border: solid 1px #383838;
    padding: 5px;
    border-radius: 10px;
    width: 100%;
    box-sizing: border-box;
}

.profile {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    border: 5px solid #383838;
    box-sizing: border-box;
}

.profile_close_button {
    width: 100%;
    font-weight: bold;
    font-size: 17px;
    padding: 10px;
}
</style>