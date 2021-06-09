<template>
    <div
        class="foraging-footer"
        position="fixed bottom-0 left-0 right-0 grid"
        h="20"
        m="auto"
        p="x-8"
        items="center"
        grid="cols-2"
    >
        <button class="round-btn" shadow="xl" justify="self-start" bg="blue-400">
            <mdi-plus class="align-text-bottom" />
        </button>

        <button class="round-btn" shadow="xl" justify="self-end" bg="green-400">
            <mdi-plus class="align-text-bottom" />
        </button>
    </div>
</template>

<script setup lang="ts">
</script>

<style>
.foraging-footer {
    max-width: 74ch;
}
</style>