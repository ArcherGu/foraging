<template>
    <div
        class="foraging-header"
        position="flex"
        :h="height"
        bg="purple-500"
        items="center"
        justify="center"
    >
        <Logo h="12" w="12" />
        <span text="4xl white" p="l-3">Foraging</span>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const height = ref<string | number>('full');

setTimeout(() => {
    height.value = 20;
}, 1000);
</script>

<style>
.foraging-header {
    transition: all 0.5s ease-in-out;
    position: relative;
    z-index: 99;
}
</style>