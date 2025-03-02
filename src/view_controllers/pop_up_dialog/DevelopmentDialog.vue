<template>
    <div class="dark_background show_dialog_animation">
        <div class="dialog_container vertical_container zoom_dialog_animation">
            <label style="font-weight: bold; font-size: 25px; text-align: center;">
                {{ isKhmer ? title_khmer : title_english }}
            </label>
            <label style="text-align: center; font-size: 17px;">
                {{ isKhmer ? message_khmer : message_english }}
            </label>
            <button class="button_border understand_button" @click="closeAlert()">
                {{ isKhmer ? understand_khmer : understand_english }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isKhmer = ref(true);

const emit = defineEmits(["close_notice_dialog"]);

const title_khmer = "សូមបងជ្រាបថា";
const title_english = "Please be aware that";

const message_khmer = "AI របស់ពួកយើង កំពុងស្ថិតក្នុងដំណាក់កាលអភិវឌ្ឍន៍ដំបូង ដូច្នេះការឆ្លើយតបរបស់ AI ពួកយើងអាចនឹងផ្តល់នូវព័ត៌មានមិនត្រឹមត្រូវ ឬមិនសមរម្យ។";
const message_english = "Our AI model is in its first developmental phase. It is possible that the provided responses may not always be accurate or appropriate.";

// const message_khmer = "ការសន្ទនារបស់បងនឹងត្រូវបានត្រួតពិនិត្យសម្រាប់គោលបំណងបណ្តុះបណ្តាល នឹងកែឆ្នៃ AI របស់យើង, ដូច្នេះ សូមបងជៀសវាងក្នុងការចែករំលែកទិន្នន័យដែលមិនគួរចែករំលែក";
// const message_english = "Your conversations will be reviewed by our specialists for training purposes to improve our AI accuracy. As such, please avoid sharing sensitive information.";

const understand_khmer = "យល់​ព្រម";
const understand_english = "I understand";

onMounted(() => {
    const isKhmerLang = localStorage.getItem('is_khmer');
    if (isKhmerLang !== null) {
        isKhmer.value = isKhmerLang === "false";
    }
});

function closeAlert() {
    emit("close_notice_dialog");
}
</script>

<style scoped>
.understand_button {
    width: 100%;
    font-weight: bold;
    font-size: 17px;
    margin-top: 10px;
    padding: 10px;
}
</style>