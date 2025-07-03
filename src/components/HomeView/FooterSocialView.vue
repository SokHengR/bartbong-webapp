<script setup>
import BartBongLogo from "/src/assets/bart_bong_long.png"
import FacebookIcon from "/src/assets/social/facebook.png"
import InstagramIcon from "/src/assets/social/instagram.png"
import TwitterIcon from "/src/assets/social/twitter.png"
import YoutubeIcon from "/src/assets/social/youtube.png"
import TelegramIcon from "/src/assets/social/telegram.png"
import TiktokIcon from "/src/assets/social/tiktok.png"

function getCurrentYear() {
    return new Date().getFullYear()
}
</script>

<template>
    <div class="content_container">
        <img :src="BartBongLogo" class="logo_style" />
        <div class="horizontal_container">
            <img :src="FacebookIcon" class="social_media_button" />
            <img :src="InstagramIcon" class="social_media_button" />
            <img :src="TwitterIcon" class="social_media_button" />
            <img :src="YoutubeIcon" class="social_media_button" />
            <img :src="TelegramIcon" class="social_media_button" />
            <img :src="TiktokIcon" class="social_media_button" />
        </div>
        <div class="label_style_scoped">
            {{ getCurrentYear() }} ✦ Bart Bong Technology.
        </div>
    </div>
</template>

<style scoped>
.social_media_button {
    height: 30px;
    width: 30px;
    background-color: white;
    border-radius: 100%;
    cursor: pointer;
    border: solid 1px rgb(255, 255, 255);
}

.logo_style {
    height: 40px;
    width: 100px;
}

.content_container {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 5px;
}

.label_style_scoped {
    color: white;
}
</style>