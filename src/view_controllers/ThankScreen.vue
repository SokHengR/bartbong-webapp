<script setup>
import TitleBar from "../components/HomeView/TitleBarView.vue";
import FooterBar from "../components/HomeView/FooterBarView.vue";
</script>

<template>
    <div class="main_screen_container">
        <TitleBar :tabIndexNum="5" />
        <div class="main_scroll_view">
            <div class="cover_container">
                <b class="title_label">Coming Soon</b>
                <p class="description_label">
                    This page will be available soon.
                </p>
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