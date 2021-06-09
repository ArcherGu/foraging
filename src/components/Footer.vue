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
        <div justify="self-start" position="flex">
            <button class="round-btn small-btn" bg="blue-400" @click="emit('random')">
                <fa-solid-dice />
            </button>

            <a
                class="round-btn small-btn"
                bg="dark-100"
                href="https://github.com/ArcherGu/foraging"
                target="_blank"
                m="l-2"
            >
                <uil-github-alt />
            </a>
        </div>

        <button class="round-btn" justify="self-end" bg="green-400" position="relative">
            <ph-arrow-fat-down
                v-if="isEmpty"
                position="absolute -top-24"
                text="7xl"
                class="transform rotate-45 animate-bounce"
            />
            <mdi-plus />
        </button>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmit } from "vue";

const props = defineProps({
    isEmpty: Boolean
});

const emit = defineEmit(['random']);
</script>

<style>
.foraging-footer {
    max-width: 74ch;
}
</style>