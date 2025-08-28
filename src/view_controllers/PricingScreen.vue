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
                <div class="inner_body_container">
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
                <div class="inner_body_container">
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
                <div class="inner_body_container">
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
                <div class="inner_body_container">
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
    border-radius: 8px;
    padding: 10px 15px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    text-align: center;
}

.a_button:hover {
    background-color: #fbbc05da;
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
    background-color: black; /* Added black background */
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
    padding: 50px 20px;
    box-sizing: border-box;
}

.body_container {
    width: 100%;
    max-width: 1200px; /* Added max-width */
    margin: 40px auto; /* Centered with auto margins and added top/bottom margin */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap; /* Allow items to wrap */
    gap: 25px; /* Increased gap */
    align-items: stretch; /* Stretch items to equal height */
    justify-content: center;
    background-color: black; /* Slightly lighter background */
    padding: 20px;
    box-sizing: border-box;
}

.inner_body_container {
    flex: 1; /* Allow items to grow and shrink */
    min-width: 280px; /* Minimum width for responsiveness */
    display: flex;
    flex-direction: column;
    padding: 30px; /* Increased padding */
    box-sizing: border-box;
    gap: 15px; /* Increased gap */
    border-radius: 12px; /* More rounded corners */
    background-color: #212121; /* Darker background for cards */
    border: 1px solid #3a3a3a; /* Subtle border */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transitions */
    align-items: flex-start; /* Align content to the start */
    justify-content: flex-start;
}

.inner_body_container:hover {
    transform: translateY(-5px); /* Lift effect on hover */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
}


.horizontal_line {
    width: 100%;
    height: 1px;
    background-color: #3a3a3a;
    margin: 10px 0;
}

.title_paragraph_style {
    color: #fbbc05; /* Highlight title */
    font-size: 28px; /* Larger title */
    text-align: left;
    font-weight: bold;
}

.large_paragraph_style {
    font-weight: bold;
    font-size: 36px; /* Larger price */
    text-align: left;
    color: white;
}

.paragraph_style {
    text-align: left;
    align-items: center;
    width: 100%;
    color: #cccccc; /* Lighter text color */
    display: flex; /* For icon alignment */
    gap: 8px; /* Space between icon and text */
}

.mini_paragraph_style {
    font-size: 14px; /* Slightly larger mini text */
    text-align: left;
    color: #FBBC05;
    align-self: flex-end; /* Align to the bottom of the price */
    margin-bottom: 5px; /* Adjust spacing */
}

.title_image_style {
    width: 60px; /* Slightly smaller logo */
    height: 60px;
    border-radius: 8px;
    border: solid 1px rgb(56, 56, 56);
    margin-bottom: 10px;
}

.title_label {
    font-size: 60px;
    color: white;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Add text shadow */
}

/* Responsive adjustments */
@media (max-width: 1200px) {
    .body_container {
        gap: 20px;
    }
    .inner_body_container {
        min-width: 300px;
    }
}

@media (max-width: 768px) {
    .body_container {
        flex-direction: column;
        align-items: center;
        margin: 20px auto;
    }

    .inner_body_container {
        width: 90%;
        max-width: 400px;
    }

    .title_label {
        font-size: 50px;
    }
}

@media (max-width: 480px) {
    .cover_container {
        padding: 40px 15px;
    }

    .title_label {
        font-size: 36px;
    }

    .inner_body_container {
        padding: 25px;
        gap: 12px;
    }

    .title_paragraph_style {
        font-size: 24px;
    }

    .large_paragraph_style {
        font-size: 32px;
    }

    .paragraph_style {
        font-size: 15px;
    }
}
</style>