<script setup>
</script>

<template>
    <div class="cell_container">
        <img src="" class="profile_image" />
        <div class="scoped_text_container">
            <div class="name_label">
                Michael Jackson
            </div>
            <div class="description_label">
                I have repeatedly asked parents, both verbally and in writing, not to park here.
            </div>
        </div>
        <div class="date_label">
            5 Dec 2020
        </div>
    </div>
</template>

<style scoped>
.cell_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding: 10px;
    gap: 10px;
    border-bottom: 1px solid #383838;
    box-sizing: border-box;
}

.scoped_text_container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-width: 0;
    color: white;
    box-sizing: border-box;
}

.profile_image {
    width: 40px;
    height: 40px;
    border-radius: 1000px;
    border: 1px solid white;
    flex-shrink: 0;
}

.name_label {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.description_label {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.5);
}

.date_label {
    color: white;
    font-size: 12px;
    flex-shrink: 0;
}
</style>