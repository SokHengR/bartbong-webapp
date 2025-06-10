<template>
    <div class="dark_background show_dialog_animation first_index">
        <div class="dialog_container vertical_container zoom_dialog_animation">
            <label style="font-weight: bold; font-size: 20px; text-align: center">
                {{ titleLabel }}
            </label>
            <label style="text-align: center; font-size: 15px">
                {{ messageLabel }}
            </label>
            <div class="horizontal_container scoped_hstack">
                <button class="button_border understand_button" @click="cancelConfirmAlert">
                    {{ isKhmer ? cancel_kh : cancel_en }}
                </button>
                <button class="button_border understand_button" @click="acceptConfirmAlert">
                    {{ isKhmer ? accept_kh : accept_en }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";

const props = defineProps({
    titleLabel: String,
    messageLabel: String,
});

const cancel_kh = "បោះបង់";
const cancel_en = "Cancel";

const accept_kh = "យល់ព្រម";
const accept_en = "Confirm";

const emit = defineEmits(["cancel_confirm_dialog", "accept_confirm_dialog"]);

const isKhmer = ref(false);

onMounted(() => {
    const isKhmerLang = localStorage.getItem('is_khmer');
    if (isKhmerLang !== null) {
        isKhmer.value = isKhmerLang === "true";
    }
});

function acceptConfirmAlert() {
    emit("accept_confirm_dialog");
}

function cancelConfirmAlert() {
    emit("cancel_confirm_dialog");
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

.scoped_hstack {
    width: 100%;
}
</style>