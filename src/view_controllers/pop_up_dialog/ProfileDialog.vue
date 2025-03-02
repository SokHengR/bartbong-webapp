<template>
    <div class="dark_background show_dialog_animation">
        <div class="dialog_container vertical_container zoom_dialog_animation">
            <img :src="profileImage" class="profile">
            <label style="font-weight: bold; font-size: 25px; text-align: center;">
                BART BONG
            </label>
            <label style="text-align: center; font-size: 17px;">
                Your online assistant
            </label>
            <label style="text-align: center; font-size: 15px; color: gray;">
                A personal assistant and question-answering AI designed to provide direct and accurate answers, engaging
                users like a real person to ensure clarity.
            </label>
            <button class="button_border edit_button" @click="closeAlert()">
                {{ isKhmer ? edit_khmer : edit_english }}
            </button>
            <button class="button_border close_button" @click="closeAlert()">
                {{ isKhmer ? close_khmer : close_english }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import profileImage from "/src/assets/bart_bong_logo.jpg";

const isKhmer = ref(true);

const emit = defineEmits(["close_profile_dialog"]);

const close_khmer = "រួចរាល់";
const close_english = "Finish";

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

<style scoped>
.profile {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: 1px solid #383838;
}

.close_button {
    width: 100%;
    font-weight: bold;
    font-size: 17px;
    padding: 10px;
}

.edit_button {
    width: 100%;
    font-weight: bold;
    font-size: 17px;
    margin-top: 10px;
    padding: 10px;
    background-color: #007bff;
}

.edit_button:hover {
    background-color: #0051ff;
}
</style>