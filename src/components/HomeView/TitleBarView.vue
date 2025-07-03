<script setup>
import BartBongLogo from "/src/assets/bart_bong_short.png";
import CloseIcon from "/src/assets/icon/close.svg";
import MenuIcon from "/src/assets/icon/menu.svg"
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const isShowSidebar = ref(false);

const props = defineProps({
    tabIndexNum: {
        type: Number,
        default: 1
    }
});

const router = useRouter();

function getMenuButtonClass(index) {
    return props.tabIndexNum === index ? 'menu_button_selected' : 'menu_button_normal';
};

function getMenuButtonClassMobile(index) {
    return props.tabIndexNum === index ? 'menu_button_selected_mobile' : 'menu_button_normal_mobile';
};

function menuButtonClick(index) {
    if (index === 1) {
        router.push("/home");
    } else if (index === 2) {
        router.push("/about");
    } else if (index === 3) {
        router.push("/product");
    } else if (index === 4) {
        router.push("/pricing");
    } else if (index === 5) {
        router.push("/thank");
    } else if (index === 6) {
        router.push("/login");
    }
}

function openSideBar() {
    isShowSidebar.value = true;
}

function closeSideBar() {
    isShowSidebar.value = false;
}
</script>

<template>
    <div class="horizontal_container main_container_scoped">
        <div class="horizontal_container main_inner_container">
            <img :src="BartBongLogo" class="logo_style_scoped" @click="menuButtonClick(1)">
            <div class="horizontal_container menu_button_container hide_mobile">
                <div :class="getMenuButtonClass(1)" @click="menuButtonClick(1)">Home</div>
                <div :class="getMenuButtonClass(2)" @click="menuButtonClick(2)">About</div>
                <div :class="getMenuButtonClass(3)" @click="menuButtonClick(3)">Product</div>
                <div :class="getMenuButtonClass(4)" @click="menuButtonClick(4)">Pricing</div>
                <div :class="getMenuButtonClass(5)" @click="menuButtonClick(5)">Thank</div>
            </div>
            <div class="button_border hide_mobile" @click="menuButtonClick(6)">Sign In</div>
            <img :src="MenuIcon" class="icon_button show_mobile" @click="openSideBar">
        </div>
    </div>
    <div v-if="isShowSidebar" class="sidebar_overlay_container show_mobile">
        <div class="emptiness_container" @click="closeSideBar"></div>
        <div class="sidebar_inner_container">
            <div class="sidebar_title_container">
                <img :src="CloseIcon" class="icon_button" @click="closeSideBar">
            </div>
            <div :class="getMenuButtonClassMobile(1)" @click="menuButtonClick(1)">Home</div>
            <div :class="getMenuButtonClassMobile(2)" @click="menuButtonClick(2)">About</div>
            <div :class="getMenuButtonClassMobile(3)" @click="menuButtonClick(3)">Product</div>
            <div :class="getMenuButtonClassMobile(4)" @click="menuButtonClick(4)">Pricing</div>
            <div :class="getMenuButtonClassMobile(5)" @click="menuButtonClick(5)">Thank</div>
            <div style="flex: 1"></div>
            <div class="button_border" style="width: 100%; box-sizing: border-box;" @click="menuButtonClick(6)">Sign In</div>
        </div>
    </div>
</template>

<style scoped>
.main_container_scoped {
    width: 100%;
    background-color: black;
    align-items: center;
    justify-content: center;
}

.main_inner_container {
    padding: 10px;
    width: 100%;
    max-width: 900px;
    justify-content: space-between;
}

@keyframes sidebar_show_animation {
    from {
        width: 0px;
    }

    to {
        width: 280px;
    }
}

@keyframes fade_in_animation {
    from {
        backdrop-filter: blur(0px);
        background-color: transparent;
    }

    to {
        backdrop-filter: blur(5px);
        background-color: rgba(0, 0, 0, 0.5);
    }
}

.sidebar_overlay_container {
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 1;
    animation: fade_in_animation 0.3s;
}

.sidebar_inner_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 280px;
    height: 100%;
    background: rgb(5, 5, 5);
    border-left: solid 1px rgb(56, 56, 56);
    padding: 20px;
    gap: 20px;
    animation: sidebar_show_animation 0.3s;
    box-sizing: border-box;
}

.sidebar_title_container {
    display: flex;
    flex-direction: row;
    justify-content: end;
}

.emptiness_container {
    flex: 1;
    height: 100%;
}

.menu_button_container {
    gap: 10px;
}

.menu_button_normal {
    width: 100px;
    text-align: center;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    padding: 5px;
}

.menu_button_normal:hover {
    color: white;
}

.menu_button_selected {
    color: white;
    background: #007AFF;
    font-weight: bold;
    width: 100px;
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    cursor: default;
}

.menu_button_normal_mobile {
    width: 100%;
    text-align: center;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.7);
    box-sizing: border-box;
    cursor: pointer;
    padding: 5px;
}

.menu_button_normal_mobile:hover {
    color: white;
}

.menu_button_selected_mobile {
    color: white;
    background: #007AFF;
    font-weight: bold;
    width: 100%;
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    box-sizing: border-box;
    cursor: default;
}

.logo_style_scoped {
    width: 45px;
    height: 40px;
    cursor: pointer;
}

.show_mobile {
    display: none;
}

.hide_mobile {
    display: flex;
}

@media (max-width: 750px) {
    .hide_mobile {
        display: none;
    }

    .show_mobile {
        display: flex;
    }
}
</style>