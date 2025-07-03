<script setup>
import FooterSocialView from "../HomeView/FooterSocialView.vue"
</script>

<template>
    <div class="horizontal_container main_container_scoped">
        <div class="main_inner_container">
            <div class="hide_mobile">
                <FooterSocialView />
            </div>
            <div class="content_container">
                <b class="main_label_text">Research</b>
                <a class="sub_label_text" href="/research/r1"> Manga ADM-1 </a>
                <a class="sub_label_text" href="/research/r1"> Anime AD-1 </a>
                <a class="sub_label_text" href="/research/r1"> Bart Bong RE-1</a>
                <a class="sub_label_text" href="/research/r1"> Bart Bong C0-1</a>
            </div>
            <div class="content_container">
                <b class="main_label_text">Product</b>
                <a class="sub_label_text" href="https://play.google.com/store/apps/"> Mobile App </a>
                <a class="sub_label_text" href="/"> Web Ai Chat </a>
                <a class="sub_label_text" href="https://platform.bartbong.com"> API Platform </a>
            </div>
            <div class="content_container">
                <b class="main_label_text">Privacy and Safety</b>
                <a class="sub_label_text" href="/privacy"> Privacy Policy </a>
                <a class="sub_label_text" href="/term"> Terms of Use </a>
            </div>
            <div class="content_container">
                <b class="main_label_text">Other</b>
                <a class="sub_label_text" href="/about"> About </a>
                <a class="sub_label_text" href="/contact"> Contact </a>
                <a class="sub_label_text" href="/pricing"> Pricing </a>
                <a class="sub_label_text" href="/thank"> Thank </a>
            </div>
            <div class="show_mobile">
                <FooterSocialView />
            </div>
        </div>
    </div>
</template>

<style scoped>
.main_container_scoped {
    width: 100%;
    align-items: center;
    justify-content: center;
    background: black;
    padding: 10px;
    padding-top: 40px;
    padding-bottom: 40px;
    box-sizing: border-box;
}

.main_inner_container {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 900px;
    padding: 10px;
    align-items: start;
    justify-content: space-between;
}

.content_container {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 5px;
}

.main_label_text {
    color: white;
    font-weight: bold;
    font-size: 15px;
}

.sub_label_text {
    color: rgb(178, 178, 178);
    text-decoration: none;
    font-size: 15px;
}

.sub_label_text:hover {
    color: white;
}

.show_mobile {
    display: none;
}

.hide_mobile {
    display: flex;
}

@media (max-width: 750px) {
    .main_inner_container {
        flex-direction: column;
        gap: 50px;
    }

    .hide_mobile {
        display: none;
    }

    .show_mobile {
        display: flex;
    }

    .main_container_scoped {
        padding: 10px;
    }
}
</style>