<template>
    <div class="dark_background show_dialog_animation first_index">
        <div class="dialog_container vertical_container zoom_dialog_animation">
            <div class="generating_container">
                <div style="position: relative">
                    <img class="bart_bong_profile_image" src="/src/assets/bart_bong_logo.jpg">
                    <div class="loader"></div>
                </div>
            </div>
            <label class="title_scoped">
                {{ isKhmer ? loading_kh : loading_en }}
            </label>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const loading_kh = "កំពុងដំណើរការ ...";
const loading_en = "In Progress ...";

const isKhmer = ref(false);

onMounted(() => {
    const isKhmerLang = localStorage.getItem('is_khmer');
    if (isKhmerLang !== null) {
        isKhmer.value = isKhmerLang === "true";
    }
});

</script>

<style scoped>
.first_index {
    z-index: 5;
}

.title_scoped {
    text-align: center; 
    font-size: 15px;
    font-weight: bold;
}

.generating_container {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    color: gray;
    font-size: 15px;
    padding-top: 10px;
    padding-bottom: 5px;
}

.bart_bong_profile_image {
    position: absolute;
    width: 40px;
    height: 40px;
    top: 10px;
    left: 10px;
    border-radius: 100%;
}

.loader {
    width: 60px;
    aspect-ratio: 1;
    border-radius: 50%;
    background:
        radial-gradient(farthest-side, #ff9216 94%, #0000) top/8px 8px no-repeat,
        conic-gradient(#0000 30%, #ff9216);
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
    animation: l13 1s infinite linear;
}

@keyframes l13 {
    100% {
        transform: rotate(1turn)
    }
}
</style>