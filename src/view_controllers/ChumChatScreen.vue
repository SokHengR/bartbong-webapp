<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import backIcon from "/src/assets/icon/back_arrow.svg";
import addIcon from "/src/assets/icon/add_circle.svg";

const isKhmer = ref(false);

const chat_title_kh = "ជជែកកំសាន្ត";
const chat_title_en = "Chat";

const router = useRouter();

onMounted(() => {
  const isKhmerLang = localStorage.getItem("is_khmer");
  if (isKhmerLang !== null) {
    isKhmer.value = isKhmerLang === "true";
  }
});

function goBack() {
  router.push('/');
}
</script>

<template>
    <div class="main_screen">
        <div class="conversation_list_container">
            <div class="scoped_title_bar">
                <img :src="backIcon" class="icon_button" @click="goBack">
                <label style="width: 100%; text-align: center; color: white;">
                    {{ isKhmer ? chat_title_kh : chat_title_en }}
                </label>
                <img :src="addIcon" class="icon_button">
            </div>
        </div>
        <div class="chat_detail_container">

        </div>
    </div>
</template>

<style scoped>
.main_screen {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.conversation_list_container {
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 100%;
    border-right: 1px solid #383838;
}

.scoped_title_bar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    border-bottom: 1px solid #383838;
}

.chat_detail_container {
    flex: 1;
    flex-direction: column;
    height: 100%;
}
</style>