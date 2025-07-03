<script setup>
import TitleBar from "../components/HomeView/TitleBarView.vue";
import FooterBar from "../components/HomeView/FooterBarView.vue";
import BartBongLogo from "/src/assets/bart_bong_logo.jpg";
import TverAppLogo from "/src/assets/tver_app_logo.jpg";
</script>

<template>
    <div class="main_screen_container">
        <TitleBar :tabIndexNum="3" />
        <div class="main_scroll_view">
            <div class="cover_container">
                <b class="title_label">Our Product</b>
                <p class="description_label">Helpful products, built just for Bong.</p>
            </div>

            <div class="body_container">
                <div class="inner_body_container border_style">
                    <img :src="BartBongLogo" class="title_image_style">
                    <b class="title_paragraph_style">
                        Bart Bong Ai Chat
                    </b>
                    <div class="paragraph_style">
                        Your personal AI chat assistant and companion, ready to assist you with learning,
                        exploration, problem-solving, and much more.
                    </div>

                    <div class="theme_button_border" style="width: 100%; box-sizing: border-box;">
                        Learn More
                    </div>
                </div>
            </div>

            <div class="body_container">
                <div class="inner_body_container border_style">
                    <img :src="BartBongLogo" class="title_image_style">
                    <b class="title_paragraph_style">
                        Bart Bong API
                    </b>
                    <div class="paragraph_style">
                        Empower your application or service with AI using our Bart Bong API, complete with powerful
                        development tools and dedicated API services.
                    </div>

                    <div class="theme_button_border" style="width: 100%; box-sizing: border-box;">
                        Learn More
                    </div>
                </div>
            </div>

            <div class="body_container">
                <div class="inner_body_container border_style">
                    <img :src="TverAppLogo" class="title_image_style">
                    <b class="title_paragraph_style">
                        Tver App
                    </b>
                    <div class="paragraph_style">
                        Start building your business's application or website quickly and affordably with our web and
                        animation development services. We include a built-in dashboard, hosting, and analytics.
                    </div>

                    <div class="theme_button_border" style="width: 100%; box-sizing: border-box;">
                        Learn More
                    </div>
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

.inner_body_container {
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    gap: 20px;
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
    align-items: center;
    justify-content: center;
}

.title_paragraph_style {
    color: white;
    font-size: 22px;
    text-align: center;
}

.paragraph_style {
    text-align: center;
    color: white;
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

.description_label {
    font-size: 18px;
    color: white;
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