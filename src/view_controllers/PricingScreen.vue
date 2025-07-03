<script setup>
import TitleBar from "../components/HomeView/TitleBarView.vue";
import FooterBar from "../components/HomeView/FooterBarView.vue";
import BartBongLogo from "/src/assets/bart_bong_logo.jpg";
import CheckIcon from "/src/assets/icon/check_outline_green.svg";
</script>

<template>
    <div class="main_screen_container">
        <TitleBar :tabIndexNum="4" />
        <div class="main_scroll_view">
            <div class="cover_container">
                <b class="title_label">Pricing</b>
            </div>

            <div class="body_container">
                <!-- MARK: FREE PLAN -->
                <div class="inner_body_container border_style">
                    <img :src="BartBongLogo" class="title_image_style">
                    <b class="title_paragraph_style">
                        FREE
                    </b>

                    <div class="horizontal_container" style="gap: 5px;">
                        <div class="large_paragraph_style">
                            0៛
                        </div>
                        <div class="mini_paragraph_style">
                            0$
                        </div>
                    </div>

                    <div class="paragraph_style">
                        Free For Everyone
                    </div>

                    <a class="theme_button_border a_button" href="/login">
                        Try Bart Bong
                    </a>

                    <div class="horizontal_line"></div>

                    <div class="horizontal_container paragraph_style">
                        <img :src="CheckIcon">
                        Chat with assistant and companion.
                    </div>
                    <div class="horizontal_container paragraph_style">
                        <img :src="CheckIcon">
                        Ability to search the web.
                    </div>
                    <div class="horizontal_container paragraph_style">
                        <img :src="CheckIcon">
                        Ability to think and reason.
                    </div>
                    <div class="horizontal_container paragraph_style">
                        <img :src="CheckIcon">
                        Save chat history.
                    </div>
                    <div class="horizontal_container paragraph_style">
                        <img :src="CheckIcon">
                        Chat on web and mobile.
                    </div>
                </div>

                <!-- MARK: MINI PLAN -->
                <div class="inner_body_container border_style">
                    <img :src="BartBongLogo" class="title_image_style">
                    <b class="title_paragraph_style">
                        MINI
                    </b>

                    <div class="horizontal_container" style="gap: 5px;">
                        <div class="large_paragraph_style">
                            20.000៛
                        </div>
                        <div class="mini_paragraph_style">
                            5$
                        </div>
                    </div>

                    <div class="paragraph_style">
                        Per person billed monthly.
                    </div>

                    <a class="theme_button_border a_button" href="/login">
                        Try Bart Bong
                    </a>

                    <div class="horizontal_line"></div>

                    <div class="horizontal_container paragraph_style">
                        <b>Everything in FREE and:</b>
                    </div>
                    <div class="horizontal_container paragraph_style">
                        <img :src="CheckIcon">
                        Create and edit document.
                    </div>
                    <div class="horizontal_container paragraph_style">
                        <img :src="CheckIcon">
                        Convert file format.
                    </div>
                    <div class="horizontal_container paragraph_style">
                        <img :src="CheckIcon">
                        Support voice chat.
                    </div>
                </div>

                <!-- MARK: PLUS PLAN -->
                <div class="inner_body_container border_style">
                    <img :src="BartBongLogo" class="title_image_style">
                    <b class="title_paragraph_style">
                        PLUS
                    </b>

                    <div class="horizontal_container" style="gap: 5px;">
                        <div class="large_paragraph_style">
                            100.000៛
                        </div>
                        <div class="mini_paragraph_style">
                            25$
                        </div>
                    </div>

                    <div class="paragraph_style">
                        Per person billed monthly.
                    </div>

                    <a class="theme_button_border a_button" href="/login">
                        Try Bart Bong
                    </a>

                    <div class="horizontal_line"></div>

                    <div class="horizontal_container paragraph_style">
                        <b>Everything in MINI and:</b>
                    </div>
                    <div class="horizontal_container paragraph_style">
                        <img :src="CheckIcon">
                        Canvas mode
                    </div>
                    <div class="horizontal_container paragraph_style">
                        <img :src="CheckIcon">
                        Coding assistant
                    </div>
                </div>

                <!-- MARK: PRO PLAN -->
                <div class="inner_body_container border_style">
                    <img :src="BartBongLogo" class="title_image_style">
                    <b class="title_paragraph_style">
                        PRO
                    </b>

                    <div class="horizontal_container" style="gap: 5px;">
                        <div class="large_paragraph_style">
                            400.000៛
                        </div>
                        <div class="mini_paragraph_style">
                            100$
                        </div>
                    </div>

                    <div class="paragraph_style">
                        Per person billed monthly.
                    </div>

                    <a class="theme_button_border a_button" href="/login">
                        Try Bart Bong
                    </a>

                    <div class="horizontal_line"></div>

                    <div class="horizontal_container paragraph_style">
                        <b>Everything in PLUS and:</b>
                    </div>
                    <div class="horizontal_container paragraph_style">
                        <img :src="CheckIcon">
                        Developer Mode
                    </div>
                </div>
            </div>

            <FooterBar />
        </div>
    </div>
</template>

<style scoped>
.a_button {
    width: 100%;
    box-sizing: border-box;
    text-decoration: none;
}

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
}

.body_container {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: start;
    justify-content: center;
    background-color: black;
    padding: 20px;
    box-sizing: border-box;
}

.inner_body_container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    gap: 10px;
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

.border_style {
    border-radius: 10px;
    border: solid 1px rgb(56, 56, 56);
    align-items: start;
    justify-content: center;
}

.title_paragraph_style {
    color: white;
    font-size: 22px;
    text-align: center;
}

.large_paragraph_style {
    font-weight: bold;
    font-size: 20px;
    text-align: left;
    color: white;
}

.paragraph_style {
    text-align: left;
    align-items: start;
    width: 100%;
    color: white;
}

.mini_paragraph_style {
    font-size: 10px;
    text-align: left;
    color: #FBBC05;
}

.title_image_style {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    border: solid 1px rgb(56, 56, 56);
}

.title_label {
    font-size: 60px;
    color: white;
}

@media (max-width: 1200px) {
    .body_container {
        flex-direction: column;
    }
}

@media (max-width: 420px) {
    .title_label {
        font-size: 40px;
    }

    .body_container {
        flex-direction: column;
        gap: 10px;
    }
}
</style>