<script setup>
defineProps({
    buttonText: String,
    imageSrc: String,
    identification: String,
    haveBorder: Boolean,
    isRed: Boolean,
})
</script>

<template>
    <div :class="{
        'border_button': haveBorder,
        'danger_border_button': isRed,
        'theme_button': !haveBorder && !isRed
    }">
        <img class="standard_icon_size" :src="imageSrc" :alt="buttonText">
        <label :id="identification">{{ buttonText || 'Saved' }}</label>
    </div>
</template>

<style scoped>
.border_button,
.theme_button,
.danger_border_button {
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    color: white;
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
}

.border_button {
    border: 1px solid #383838;
    background-color: rgba(255, 255, 255, 0.03);
    flex-direction: row;
}

.border_button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.theme_button {
    justify-content: left;
    background-color: transparent;
}

.theme_button:hover {
    background-color: rgba(255, 255, 255, 0.03);
}

.danger_border_button {
    border: 1px solid #491B1B;
    background-color: #1A1212;
    color: #FF4A4A;
}

.danger_border_button:hover {
    background-color: #491B1B;
}
</style>