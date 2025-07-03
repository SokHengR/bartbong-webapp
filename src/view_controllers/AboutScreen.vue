<script setup>
import TitleBar from "../components/HomeView/TitleBarView.vue";
import FooterBar from "../components/HomeView/FooterBarView.vue";
import RocketIcon from "../assets/icon/rocket_launch_red.svg";
import WorkIcon from "../assets/icon/work_yellow.svg";
</script>

<template>
    <div class="main_screen_container">
        <TitleBar :tabIndexNum="2" />
        <div class="main_scroll_view">
            <div class="cover_container">
                <b class="title_label">
                    About Us
                </b>
                <p class="description_label" style="max-width: 500px;">
                    We build and fine-tune AI tools you can trust for any task, big or small, for you and your business.
                </p>
            </div>

            <div class="body_container">
                <div class="inner_body_container regular_style">
                    <img :src="RocketIcon" class="title_image_style">
                    <b class="title_paragraph_style">
                        Our Mission
                    </b>
                    <p class="paragraph_style">
                        Our mission is to harness the power of AI to create innovative tools and systems. We aim to
                        build AI that works alongside you, learns with you, and helps you achieve success together.
                    </p>
                </div>
            </div>

            <div class="body_container">
                <div class="inner_body_container card_style">
                    <img :src="WorkIcon" class="title_image_style">
                    <b class="title_paragraph_style">
                        Join our team
                    </b>
                    <p class="paragraph_style">
                        We're looking for skilled and professional developers to join our team and help us build the
                        best AI tool. If you have the talent, come join us!
                    </p>
                    <a class="theme_button_border modified_button" href="/job">
                        See Open Position
                    </a>
                </div>
            </div>

            <FooterBar />
        </div>
    </div>
</template>

<style scoped>
.modified_button {
    width: 100%;
    max-width: 150px;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: black;
    padding: 20px;
    box-sizing: border-box;
}

.title_image_style {
    width: 100px;
    height: 100px;
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

.title_label {
    font-size: 60px;
    color: white;
    text-align: center;
}

.description_label {
    font-size: 18px;
    color: white;
    text-align: center;
}

@media (max-width: 420px) {
    .title_label {
        font-size: 40px;
    }

    .description_label {
        font-size: 14px;
    }
}
</style>