<script setup>
import TitleBar from "../components/HomeView/TitleBarView.vue";
import FooterBar from "../components/HomeView/FooterBarView.vue";
import AppStoreIcon from "/src/assets/social/app-store.png";
import PlayStoreIcon from "/src/assets/social/google-play.png";
import DocGreenIcon from "/src/assets/icon/doc_green.svg";
import TipBlueIcon from "/src/assets/icon/tip_blue.svg";
import EarthRedIcon from "/src/assets/icon/earth_red.svg";
import ForumYellowIcon from "/src/assets/icon/forum_yellow.svg";
</script>

<template>
    <div class="main_screen_container">
        <TitleBar :tabIndexNum="1" />
        <div class="main_scroll_view">
            <div class="cover_container">
                <b class="title_label">BART BONG</b>
                <div class="description_label">
                    Personalized AI, Perfectly Tuned for Bong.
                </div>
                <a class="theme_button_border hide_mobile app_store_modify" href="/login">
                    Chat with Bart Bong
                </a>
                <div class="theme_button_border show_mobile app_store_modify">
                    <img :src="AppStoreIcon" class="icon_image_style">
                    App Store
                </div>
                <div class="safe_button_border show_mobile app_store_modify">
                    <img :src="PlayStoreIcon" class="icon_image_style">
                    Play Store
                </div>
            </div>

            <div class="body_container">
                <div class="inner_body_container regular_style">
                    <img :src="EarthRedIcon" class="title_image_style">
                    <b class="title_paragraph_style">
                        Unlocking Information
                    </b>
                    <p class="paragraph_style">
                        Intelligent assistant is designed to be your ultimate knowledge navigator. Simply ask a
                        question, and it will search its database and the web to provide you with the most accurate,
                        up-to-date, and comprehensive answer possible.
                    </p>
                </div>
            </div>

            <div class="body_container">
                <div class="inner_body_container regular_style">
                    <img :src="TipBlueIcon" class="title_image_style">
                    <b class="title_paragraph_style">
                        Reasoning Power
                    </b>
                    <p class="paragraph_style">
                        AI that thinks and reasons alongside you. Tackling your toughest problems and sparking
                        innovative solutions. It goes beyond answers, providing you with creative ideas and step-by-step
                        guidance to help you navigate any challenge and achieve your goals.
                    </p>
                </div>
            </div>

            <div class="body_container">
                <div class="inner_body_container regular_style">
                    <img :src="DocGreenIcon" class="title_image_style">
                    <b class="title_paragraph_style">
                        Document Assistant
                    </b>
                    <p class="paragraph_style">
                        Ai designed to seamlessly build, read, and process information from a wide range of documents.
                        It can design and generate new documents precisely to your specifications. Effortlessly convert
                        your documents between various formats.
                    </p>
                </div>
            </div>

            <div class="body_container">
                <div class="inner_body_container regular_style">
                    <img :src="ForumYellowIcon" class="title_image_style">
                    <b class="title_paragraph_style">
                        Your Companion
                    </b>
                    <p class="paragraph_style">
                        AI friend designed to understand you and evolve with you. Have human-like responses and
                        personality. It can engage in meaningful discussions on any topic, offering a truly personalized
                        experience.
                    </p>
                </div>
            </div>

            <div class="body_container">
                <div class="inner_body_container card_style">
                    <b class="title_paragraph_style">
                        Bart Bong API
                    </b>
                    <p class="paragraph_style">
                        APIs and tools make it incredibly easy for developers to integrate custom and finetuned AI into
                        their own services.
                    </p>
                    <a class="theme_button_border app_store_modify" href="https://platform.bartbong.com/">
                        Get Start
                    </a>
                </div>
            </div>
            <FooterBar />
        </div>
    </div>
</template>

<style scoped>
.main_screen_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.main_scroll_view {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.title_paragraph_style {
    color: white;
    text-align: center;
    font-size: 22px;
}

.paragraph_style {
    color: white;
    max-width: 500px;
    text-align: center;
}

.app_store_modify {
    width: 100%;
    max-width: 280px;
    box-sizing: border-box;
    text-decoration: none;;
}

.body_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: black;
    padding: 20px;
    box-sizing: border-box;
}

.inner_body_container {
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    padding: 30px;
    box-sizing: border-box;
}

.regular_style {
    border-radius: 10px;
    align-items: center;
    justify-content: center;
}

.card_style {
    border-radius: 10px;
    background-color: #1f1f1f;
    align-items: center;
    justify-content: center;
}

.cover_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url("/src/assets/cover.svg");
    background-size: cover;
    background-position: center;
    gap: 10px;
}

.title_image_style {
    width: 100px;
    height: 100px;
}

.title_label {
    font-size: 60px;
    color: white;
}

.description_label {
    font-size: 18px;
    color: white;
}

.show_mobile {
    display: none;
}

.hide_mobile {
    display: flex;
}

.icon_image_style {
    width: 20px;
    height: 20px;
}

@media (max-width: 420px) {
    .title_label {
        font-size: 40px;
    }

    .description_label {
        font-size: 14px;
    }
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